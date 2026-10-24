import {generateAtlas,createExpedition,landingZones} from './full/atlas.js?v=0.3.1';
import {createCampaign,deployForSetup,advanceCampaign,submitPlan,validateCampaign,polity} from './full/war-engine.js?v=0.3.1';
import {planOperationalAI,produceOperationalAI} from './full/war-ai.js?v=0.3.1';
import {WAR_UNITS} from './full/war-data.js?v=0.3.1';
import {copy,requireRule} from './full/util.js?v=0.3.1';
const surfaceUnits=(c,alliance)=>c.operational.commands.filter(x=>polity(c.operational,x.owner).alliance===alliance).flatMap(x=>x.units);
export function controlledRegionalCommands(c,empireId){if(!c.operational)return[];const alliance=c.attacker===empireId?'invasion':c.defender===empireId?'defense':null;return c.operational.polities.filter(p=>p.alliance===alliance&&!p.collapsed).map(p=>p.id);}
export function makeWorldCampaign(galaxy,world,attacker,troops){
 const seed=world.surfaceSeed||`${galaxy.seed}:surface:${world.id}`,climate={Oceanic:'oceanic',Temperate:'temperate',Volcanic:'arid',Arid:'arid',Glacial:'glacial'}[world.biome]||'temperate';
 let atlas=copy(world.surfaceAtlas||generateAtlas(seed,{size:'planetary',climate,polityCount:Math.min(3,Math.max(1,Math.ceil(world.garrison/2))),name:world.name,defender:world.owner||'independent'}));
 // An evacuated bridgehead returns to native administration; geography and damage persist.
 atlas.polities=atlas.polities.filter(p=>p.id!=='expedition');for(const r of atlas.regions){if(r.controller==='expedition')r.controller=r.originalController;if(r.expeditionaryBase){r.capital=false;delete r.expeditionaryBase;}}
 const landing=landingZones(atlas).sort((a,b)=>b.strategicValue-a.strategicValue||a.number-b.number)[0];requireRule(landing,'No coastal landing region available.');atlas=createExpedition(atlas,{landing:landing.id,attacker,name:galaxy.factions.find(f=>f.id===attacker).name+' Expedition'});
 let operational=createCampaign(seed,{atlas,setup:false});for(const p of operational.polities){p.resources=p.id==='expedition'?{fuel:3,alloy:3,materiel:3}:{fuel:6,alloy:8,materiel:10};}
 for(let i=0;i<troops;i++)operational=deployForSetup(operational,'expedition',landing.id,'cohort');const defenders=operational.polities.filter(p=>p.id!=='expedition');if(world.surfaceArmy?.length){for(const saved of world.surfaceArmy){const province=operational.atlas.regions.find(r=>r.id===saved.region),native=defenders.find(p=>p.id===province?.controller)||defenders[0];operational=deployForSetup(operational,native.id,province.id,saved.type);}}else for(let i=0;i<Math.max(world.garrison,defenders.length);i++){const p=defenders[i%defenders.length];operational=deployForSetup(operational,p.id,p.capital,'cohort');}
 operational.eventLimit=120;const c={id:`campaign-${world.id}-${galaxy.round}`,sector:world.id,name:world.name,attacker,defender:world.owner||'independent',cycle:0,operational,operationalRevision:0,operationalTargetRound:3,orbitalRound:0};validateCampaign(operational);return c;
}
export function worldCampaignReady(c){return !c.operational||!!c.operational.winner||c.operational.round>=c.operationalTargetRound;}
export function advanceAIWorldCampaign(c){let s=c.operational;let guard=0;while(!s.winner&&s.round<c.operationalTargetRound&&guard++<20){if(s.phase==='planning')for(const p of s.polities.filter(p=>!p.collapsed&&!p.ready))s=submitPlan(s,p.id,planOperationalAI(s,p.id));if(s.phase==='production')for(const p of s.polities.filter(p=>!p.collapsed))s=produceOperationalAI(s,p.id);s=advanceCampaign(s);}requireRule(s.winner||s.round>=c.operationalTargetRound,'Operational cycle did not finish.');c.operational=s;c.operationalRevision++;}
export function worldSurvivors(c,alliance='invasion'){return surfaceUnits(c,alliance).filter(u=>u.type==='cohort').length;}
export function persistSurfaceAtlas(world,c){const atlas=copy(c.operational.atlas),alliance=c.operational.winner||'defense';atlas.polities=atlas.polities.filter(p=>p.id!=='expedition').map(p=>({...p,collapsed:false}));for(const r of atlas.regions){r.controller=r.originalController;r.embattled=false;r.hotspot=false;if(r.expeditionaryBase){r.capital=false;delete r.expeditionaryBase;}}world.surfaceAtlas=atlas;world.surfaceSeed=atlas.seed;world.surfaceArmy=c.operational.commands.filter(cmd=>polity(c.operational,cmd.owner).alliance===alliance).flatMap(cmd=>cmd.units.filter(u=>!WAR_UNITS[u.type].temporary).map(u=>({type:u.type,region:cmd.region})));}

export function campaignCycleSummary(c){return {cycle:c.operational.round-1,targetCycles:c.operationalTargetRound-1,phase:c.operational.phase,attacking:surfaceUnits(c,'invasion').length,defending:surfaceUnits(c,'defense').length};}
export function validateWorldCampaign(c){requireRule(c.operational&&Number.isSafeInteger(c.operationalRevision)&&c.operationalRevision>=0&&Number.isSafeInteger(c.operationalTargetRound)&&c.operationalTargetRound>=3,'Invalid linked operational campaign.');validateCampaign(c.operational);}

export function reinforceWorldCampaign(c,empireId,provinceId,troops){
 requireRule(!c.operational.winner,'This planetary campaign has concluded.');
 const controlled=controlledRegionalCommands(c,empireId),r=c.operational.atlas.regions.find(r=>r.id===provinceId);
 requireRule(r?.kind==='land'&&r.port&&controlled.includes(r.controller),'Choose a coastal province controlled by your regional command.');
 requireRule(Number.isSafeInteger(troops)&&troops>0&&troops<=54,'Choose a valid number of embarked cohorts.');
 const originalPhase=c.operational.phase,originalRound=c.operational.round;let op=copy(c.operational);op.phase='economy';op.round=1;
 for(let n=0;n<troops;n++)op=deployForSetup(op,r.controller,r.id,'cohort');
 op.phase=originalPhase;op.round=originalRound;c.operational=op;c.operationalRevision++;
}

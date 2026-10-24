// Derive actionable choices from the same engine validation used to execute them.
import {command,faction,colonies,fleets,TECHS} from './engine.js?v=0.2.3';
export function actionAvailability(state,action){if(state.result)return{available:false,reason:'This campaign has concluded.'};try{command(state,action);return{available:true,reason:''};}catch(error){return{available:false,reason:error.message};}}
export function spendingChoices(state){const f=faction(state),items=[];const add=(label,category,action,cost)=>items.push({label,category,action,cost,...actionAvailability(state,action)});
 for(const x of colonies(state)){add(`Queue vessel at ${x.name}`,'Production',{type:'build',sector:x.id,unit:'ship'},`${4+f.blueprint.weapon+f.blueprint.shield} materials + 1 credit`);add(`Recruit four cohorts at ${x.name}`,'Production',{type:'build',sector:x.id,unit:'troops'},'3 materials + 1 credit');if(x.damage)add(`Repair ${x.name}`,'Production',{type:'build',sector:x.id,unit:'repair'},'2 materials');}
 for(const tech of TECHS.filter(t=>!f.tech.includes(t.id)))add(`Research ${tech.name}`,'Research',{type:'research',id:tech.id},`${Math.max(1,tech.cost-1)} science`);
 for(const x of state.sectors.filter(x=>x.revealed&&!x.discovered))add(`Survey ${x.name}`,'Exploration',{type:'explore',sector:x.id},'1 fuel');
 for(const x of fleets(state)){if(x.owner==='p')add(`Embark troops at ${x.name}`,'Expeditions',{type:'load',sector:x.id},'Available reserves and transport space');if(!x.owner&&(!x.inhabited||!x.garrison))add(`Colonize ${x.name}`,'Expeditions',{type:'colonize',sector:x.id},'3 credits + 2 materials');if(x.owner!=='p'&&x.inhabited&&!state.campaigns.some(c=>c.sector===x.id))add(`Invade ${x.name}`,'Expeditions',{type:'invade',sector:x.id},state.worldCampaigns?'5 fuel + 5 credits + 3 materials':'2 fuel + 2 credits');}
 if(f.warStress)add('Fund civilian relief','Stability',{type:'civilian-relief'},'3 credits + 1 material');return items;
}

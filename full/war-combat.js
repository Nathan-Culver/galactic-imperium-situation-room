import {copy,die,requireRule,sum} from './util.js';
import {WAR_UNITS,DEFAULT_STANCES,COLOR_FACES,HIT_ORDER,QUICK_VALUES,unitStance,unitAlive,unitOperational,unitRow,whiteVulnerable,WAR_RESOURCES} from './war-data.js';
export function colorRoll(randomState,count){return Array.from({length:count},()=>COLOR_FACES[die(randomState,12)-1]);}
export function combatUnits(battle,side,stage){return battle.units.filter(u=>u.side===side&&unitOperational(u)&&(stage==='air'?WAR_UNITS[u.type].category==='air':WAR_UNITS[u.type].category===(battle.regionType==='sea'?'naval':'ground')));}
function rowEligible(units){return units.filter(u=>!units.some(v=>unitRow(v)===unitRow(u)&&v.damage>0&&unitAlive(v))||u.damage>0);}
export function selectHitTarget(battle,attackerSide,color,stage,options={}){
 if(options.missColors?.includes(color))return null;const enemy=1-attackerSide;let units=combatUnits(battle,enemy,stage);
 if(color==='white')units=units.filter(u=>whiteVulnerable(u,battle.regionType));else if(color!=='black')units=units.filter(u=>WAR_UNITS[u.type].color===color);
 units=rowEligible(units);const priority=options.targetPriority||['monitor','platform','strike','crawler','escort','interceptor','battery','cohort','submersible','carrier_wing'];
 units.sort((a,b)=>(priority.indexOf(a.type)<0?99:priority.indexOf(a.type))-(priority.indexOf(b.type)<0?99:priority.indexOf(b.type))||b.damage-a.damage||a.id.localeCompare(b.id));return units[0]||null;
}
function hitUnit(battle,target,color,stage,policy={}){
 let unit=target;
 if(stage==='surface'&&battle.regionType==='sea'&&['monitor','platform'].includes(target.type)&&policy.escort!==false){
  const escorts=rowEligible(combatUnits(battle,target.side,stage).filter(u=>u.type==='escort'&&(u.stance||DEFAULT_STANCES.escort)==='escort')).sort((a,b)=>b.damage-a.damage||a.id.localeCompare(b.id));if(escorts.length)unit=escorts[0];
 }
 unit.damage++;if(unit.damage>=unitStance(unit,battle.regionType).hits)unit.eliminated=true;
 battle.events.push({type:'hit',stage,color,target:unit.id,owner:unit.owner,damage:unit.damage,eliminated:!!unit.eliminated,escorted:unit.id!==target.id});
}
export function assignColorBatch(battle,attackerSide,results,stage,options={}){
 const suppressed=stage==='surface'&&battle.forceAdvantage!==null&&battle.forceAdvantage!==attackerSide;
 for(const color of HIT_ORDER){const count=results.filter(c=>c===color).length;for(let i=0;i<count;i++){
  if(suppressed&&['black','white'].includes(color)){battle.events.push({type:'miss',stage,color,reason:'force-advantage'});continue;}
  const target=selectHitTarget(battle,attackerSide,color,stage,options);if(!target){battle.events.push({type:'miss',stage,color,reason:'no-legal-target'});continue;}hitUnit(battle,target,color,stage,options.defenderPolicy||{});
 }}
 // Diving submersibles leave only after every hit in this batch has been assigned.
 for(const unit of battle.units)if(unit.side!==attackerSide&&unit.type==='submersible'&&unit.damage>0&&!unit.eliminated&&!unit.escaped){unit.escaped=true;unit.damage=0;battle.events.push({type:'submerged',unit:unit.id,owner:unit.owner});}
}
export function forceAdvantage(battle){const category=battle.regionType==='sea'?'naval':'ground';const types=[0,1].map(side=>new Set(battle.units.filter(u=>u.side===side&&unitOperational(u)&&WAR_UNITS[u.type].category===category).map(u=>u.type)).size);return types[0]===types[1]?null:types[0]>types[1]?0:1;}
export function stageDice(battle,side,stage,quick=false){
 let total=0;for(const u of battle.units.filter(u=>u.side===side&&unitOperational(u)&&['air',battle.regionType==='sea'?'naval':'ground'].includes(WAR_UNITS[u.type].category))){const v=quick?QUICK_VALUES[battle.regionType][u.type]||{air:0,surface:0}:unitStance(u,battle.regionType);total+=battle.regionType==='land'&&u.type==='strike'&&u.stance==='strategic'&&stage==='surface'?0:v[stage]||0;}
 if(stage==='surface'&&battle.regionType==='sea'&&battle.portAdvantages?.[side]&&combatUnits(battle,side,'surface').length)total+=2;
 let cap=30;if(stage==='surface'&&battle.forceAdvantageCap&&battle.forceAdvantage!==null&&battle.forceAdvantage!==side){const category=battle.regionType==='sea'?'naval':'ground';const distinct=who=>new Set(battle.units.filter(u=>u.side===who&&unitOperational(u)&&WAR_UNITS[u.type].category===category).map(u=>u.type)).size;cap=distinct(1-side)-distinct(side)>=2?10:20;}return Math.min(cap,total);
}
function completeSet(results,color,hits,allowWhite){
 const pool=results.slice();const taken=[];for(let i=0;i<hits;i++){let index=pool.indexOf(color);if(index<0)index=pool.indexOf('black');if(index<0&&allowWhite&&!taken.includes('white'))index=pool.indexOf('white');if(index<0)return null;taken.push(pool[index]);pool.splice(index,1);}return{remaining:pool,taken};
}
export function assignQuickBatch(battle,attackerSide,results,stage,options={}){
 let pool=results.slice();if(stage==='surface'&&battle.forceAdvantage!==null&&battle.forceAdvantage!==attackerSide)pool=pool.filter(c=>!['black','white'].includes(c));
 const targets=combatUnits(battle,1-attackerSide,stage).sort((a,b)=>(WAR_UNITS[b.type].casualty-WAR_UNITS[a.type].casualty)||a.id.localeCompare(b.id));
 for(const unit of targets){const hits=['monitor','platform'].includes(unit.type)?3:2;const match=completeSet(pool,WAR_UNITS[unit.type].color,hits,unit.type!=='submersible');if(match){pool=match.remaining;unit.eliminated=true;battle.events.push({type:'quick-kill',stage,target:unit.id,owner:unit.owner,results:match.taken});}}
 if(stage==='surface'&&pool.filter(c=>c==='yellow').length%2===1){const sub=combatUnits(battle,1-attackerSide,stage).find(u=>u.type==='submersible');if(sub){sub.escaped=true;battle.events.push({type:'submerged',unit:sub.id,owner:sub.owner});}}
 return pool;
}
function runStage(battle,rng,stage,options){
 if(stage==='surface')battle.forceAdvantage=forceAdvantage(battle);const totals=[0,1].map(side=>stageDice(battle,side,stage,options.quick));battle.events.push({type:'stage',stage,dice:[...totals],forceAdvantage:battle.forceAdvantage});let batch=0;
 while(totals.some(n=>n>0)){for(const side of [battle.firstSide||0,1-(battle.firstSide||0)]){if(!totals[side])continue;let count=Math.min(10,totals[side]);totals[side]-=count;if(options.quick&&count===1)count=2;const results=colorRoll(rng,count);battle.events.push({type:'roll',stage,side,batch,results});if(options.quick)assignQuickBatch(battle,side,results,stage,options.policies?.[side]);else assignColorBatch(battle,side,results,stage,{...options.policies?.[side],defenderPolicy:options.policies?.[1-side]});}batch++;}
}
export function resolveOperationalBattle(input,rng,options={}){
 const battle=copy(input);battle.events=[];battle.forceAdvantage=null;battle.units=battle.units.map(u=>({...u,damage:0,eliminated:false,escaped:false,stance:u.stance||DEFAULT_STANCES[u.type]}));
 for(const u of battle.units)requireRule(WAR_UNITS[u.type]&&unitStance(u,battle.regionType),'Unknown operational unit or stance.');
 const hasAir=battle.units.some(u=>WAR_UNITS[u.type].category==='air');if(hasAir)runStage(battle,rng,'air',options);
 if(options.raidHandler)options.raidHandler(battle,rng);
 const hasSurface=battle.units.some(u=>WAR_UNITS[u.type].category===(battle.regionType==='sea'?'naval':'ground')&&unitOperational(u));if(hasSurface)runStage(battle,rng,'surface',options);
 if(!options.quick){for(const u of battle.units){if(u.eliminated||u.escaped)continue;const stance=unitStance(u,battle.regionType);if(u.damage>=stance.hits-1&&u.damage>0){const resources=options.resources?.[u.owner];const free=battle.regionType==='sea'&&WAR_UNITS[u.type].category==='naval'&&battle.portAdvantages?.[u.side];const policy=options.repairPolicies?.[u.owner];const type=policy?.resource||WAR_RESOURCES.slice().sort((a,b)=>(resources?.[b]||0)-(resources?.[a]||0))[0];if(free){battle.events.push({type:'repair',unit:u.id,free:true});}else if(policy?.repair!==false&&resources?.[type]>0){resources[type]--;battle.events.push({type:'repair',unit:u.id,resource:type});}else{u.eliminated=true;battle.events.push({type:'unrepaired-loss',unit:u.id,owner:u.owner});}}u.damage=0;}}
 battle.casualties=battle.units.filter(u=>u.eliminated).map(u=>({id:u.id,owner:u.owner,type:u.type,weight:WAR_UNITS[u.type].casualty}));battle.survivors=battle.units.filter(u=>!u.eliminated);return battle;
}
export function resolveGarrison(units,rng){const results=colorRoll(rng,2);const survivors=copy(units);let killed=null;if(!results.includes('white')){const types=[...new Set(survivors.filter(u=>WAR_UNITS[u.type].category==='ground').map(u=>u.type))];const type=types.find(type=>results.every(color=>color==='black'||color===WAR_UNITS[type].color));if(type){killed=survivors.find(u=>u.type===type);survivors.splice(survivors.indexOf(killed),1);}}return{results,survivors,killed};}

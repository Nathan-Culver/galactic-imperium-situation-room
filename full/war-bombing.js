import {WAR_UNITS,WAR_RESOURCES} from './war-data.js?v=0.3.1';
import {colorRoll} from './war-combat.js?v=0.3.1';
import {atomic,requireRule,event} from './util.js?v=0.3.1';
const resourceColors={yellow:'materiel',blue:'alloy',red:'fuel'};
const choices=new Set(['auto','industry','resources','construction','miss','yellow','blue','green','red','white']);
export function setBombingPolicy(state,owner,policy){return atomic(state,s=>{requireRule(['planning','combat','refit'].includes(s.phase),'Set raid priorities before combat resolves.');const p=s.polities.find(p=>p.id===owner&&!p.collapsed);requireRule(p&&choices.has(policy.priority)&&choices.has(policy.black),'Choose valid raid priorities.');p.bombingPolicy={priority:policy.priority,black:policy.black};});}
function industrial(r){return Object.values(r.industry).some(n=>n>0);}
// Policies are standing instructions. Every bomber resolves its four dice before the next bomber.
export function resolveBombingRaids(s,battle,r){
 if(r.kind!=='land')return;
 const friendly=(a,b)=>a===b||s.polities.find(p=>p.id===a)?.alliance===s.polities.find(p=>p.id===b)?.alliance;
 for(const side of [battle.firstSide||0,1-(battle.firstSide||0)]){
  const bombers=battle.units.filter(u=>(u.side??0)===side&&u.type==='strike'&&u.stance==='strategic'&&!u.eliminated&&!u.escaped);
  const defender=s.polities.find(p=>p.id===r.controller);if(!defender||!bombers.length)continue;
  const loss={fuel:0,alloy:0,materiel:0},destroyed=[],batches=[];let remaining=30,bombs=0;
  const income=r.embattled||r.depletedOriginal?r.embattledResources:r.resources;
  for(const bomber of bombers){if(friendly(bomber.owner,defender.id)||remaining===0)continue;
   const policy=s.polities.find(p=>p.id===bomber.owner)?.bombingPolicy||{priority:'auto',black:'auto'};
   const rolls=colorRoll(s,Math.min(4,remaining));remaining-=rolls.length;batches.push({bomber:bomber.id,rolls});
   const available=color=>{
    const options=[],key=resourceColors[color];
    for(const item of s.production.filter(x=>x.province===r.id&&x.owner===defender.id&&WAR_UNITS[x.type].color===color))options.push({kind:'construction',item,value:WAR_UNITS[item.type].casualty});
    if(key&&!s.options.quickPlay&&loss[key]<income[key]&&defender.resources[key]>0)options.push({kind:'resources',key,value:1});
    if(color==='white'&&(industrial(r)||r.damage<1))options.push({kind:'industry',value:2});return options;
   };
   for(let color of rolls){let options;
    if(color==='black'){
     if(policy.black==='miss')continue;
     options=['yellow','blue','green','red','white'].flatMap(available);
     if(['yellow','blue','green','red','white'].includes(policy.black))options=available(policy.black);
     else if(['industry','resources','construction'].includes(policy.black))options=options.filter(x=>x.kind===policy.black);
    }else options=available(color);
    if(!options.length)continue;
    const preference=policy.priority;
    options.sort((a,b)=>Number(b.kind===preference)-Number(a.kind===preference)||b.value-a.value||(a.item?.id||a.key||'').localeCompare(b.item?.id||b.key||''));
    const hit=options[0];if(hit.kind==='construction'){s.production=s.production.filter(x=>x.id!==hit.item.id);defender.casualties+=WAR_UNITS[hit.item.type].casualty;destroyed.push(hit.item.id);}
    if(hit.kind==='resources'){defender.resources[hit.key]--;loss[hit.key]++;}
    if(hit.kind==='industry'){r.damage++;bombs++;}
   }
  }
  event(s,'strategic-raid',`${r.name} suffered a strategic raid.`,{province:r.id,batches,rolls:batches.flatMap(b=>b.rolls),loss,destroyed,bombs,totalDamage:r.damage});
 }
}

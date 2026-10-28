import {planOperationalAI,produceOperationalAI} from './war-ai.js?v=0.3.1';
import {polity} from './war-engine.js?v=0.3.1';
import {WAR_UNITS} from './war-data.js?v=0.3.1';
export function operationalHint(state,human){
 const s=structuredClone(state);
 if(s.winner)return {title:'Game over',why:'The planetary campaign has concluded.',details:[]};
 const p=polity(s,human),name=id=>s.atlas.regions.find(r=>r.id===id)?.name||id;
 if(s.phase==='planning'&&!p.ready){const plan=planOperationalAI(s,human);return {title:'Prepare movement orders',why:'The operational AI ranks routes by progress toward hostile territory, strategic value, force strength and support, then stays within the order limit.',details:[...plan.orders.map(o=>{const c=s.commands.find(c=>c.id===o.command);return (c?.name||o.command)+': '+o.route.map(name).join(' → ')+(o.rail?' (rail)':'');}),'Fuel bid: '+plan.bid]};}
 if(s.phase==='production'){const next=produceOperationalAI(s,human),added=next.production.filter(x=>!s.production.some(old=>old.id===x.id));return {title:added.length?'Commission reinforcements':'Finish production',why:'The operational AI first buys civilian goods if stress requires them, then buys affordable units at controlled production sites, favoring types it has fewer of.',details:[...added.map(x=>(WAR_UNITS[x.type]?.name||x.type)+' at '+name(x.province)),'Civilian goods purchased: '+(polity(next,human).goods-p.goods)]};}
 const why={economy:'Collect income from controlled provinces before planning orders.',planning:'Your current orders are sealed; finish the remaining regional plans and resolve initiative.',movement:'Execute sealed movement orders in initiative order, applying route and pinning rules.',combat:'Resolve the current hotspots using the selected stances and combat policies.',refit:'Review tagged aircraft return routes and command organization before resolving refit.',morale:'Resolve casualty stress using the current goods, medals and morale policies.'};
 return {title:'Review and resolve '+s.phase,why:why[s.phase]||'Complete the current phase before planning another move.',details:['Regional command: '+p.name]};
}

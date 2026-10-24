export const VERSION=1;
export const FACTIONS=[
 {id:'p',name:'Meridian Accord',short:'ACCORD',color:'#5ed6ca',style:'Balanced explorers',bonus:'Scientific research costs 1 less.'},
 {id:'r',name:'Vesper Directorate',short:'VESPER',color:'#ee627b',style:'Calculated expansionists',bonus:'Industrial mobilization supports rapid expansion.'},
 {id:'v',name:'Orison Collective',short:'ORISON',color:'#af99ed',style:'Patient coalition builders',bonus:'Values treaties and secure borders.'}
];
export const TECHS=[
 {id:'drives',name:'Fold drives',category:'Propulsion',cost:5,desc:'Fleet movement range increases to 2 hexes.'},
 {id:'weapons',name:'Plasma lances',category:'Warfare',cost:5,desc:'Unlock enhanced weapons in ship blueprints.'},
 {id:'shields',name:'Phase shielding',category:'Warfare',cost:5,desc:'Unlock defensive ship components.'},
 {id:'logistics',name:'Orbital logistics',category:'Operations',cost:4,desc:'Ground supply shipments deliver 2 extra supplies.'},
 {id:'industry',name:'Autonomous fabrication',category:'Industry',cost:5,desc:'Each secure colony generates 1 additional material.'},
 {id:'sensors',name:'Deep-field arrays',category:'Science',cost:4,desc:'Exploration reveals a wider area; gain 2 science on discovery.'},
 {id:'doctrine',name:'Integrated command',category:'Operations',cost:6,desc:'One additional ground order per planetary cycle.'},
 {id:'civics',name:'Civilian reconstruction',category:'Society',cost:4,desc:'Occupation stabilizes immediately at the next upkeep.'}
];
export const UNITS=[
 {id:'infantry',name:'Cohort',role:'Occupation / defense',cost:1,attack:1,hp:2,domain:'land'},
 {id:'armor',name:'Siege crawler',role:'Assault / maneuver',cost:3,attack:3,hp:3,domain:'land'},
 {id:'artillery',name:'Lance battery',role:'Ranged support',cost:2,attack:2,hp:1,domain:'land'},
 {id:'fighter',name:'Skywing',role:'Air superiority',cost:2,attack:2,hp:1,domain:'air'},
 {id:'bomber',name:'Strike wing',role:'Strategic attacks',cost:3,attack:3,hp:1,domain:'air'},
 {id:'submarine',name:'Abyss hunter',role:'Convoy interdiction',cost:2,attack:2,hp:1,domain:'sea'},
 {id:'carrier',name:'Aerospace tender',role:'Air deployment',cost:4,attack:1,hp:4,domain:'sea'},
 {id:'cruiser',name:'Tide cruiser',role:'Maritime escort',cost:3,attack:3,hp:3,domain:'sea'},
 {id:'battleship',name:'Ocean dreadnought',role:'Heavy bombardment',cost:5,attack:4,hp:4,domain:'sea'}
];
export const PRIORITIES=[
 {id:'industry',name:'Industrial surge',desc:'Gain 4 materials. Rivals may pay 2 credits for 2 materials.'},
 {id:'science',name:'Research exchange',desc:'Gain 3 science. Rivals may pay 2 credits for 2 science.'},
 {id:'logistics',name:'Expeditionary lift',desc:'Gain 3 fuel and 3 reserves.'},
 {id:'diplomacy',name:'Diplomatic initiative',desc:'Gain 4 credits and +2 assembly votes.'}
];
export const LAWS=[
 {id:'reconstruction',name:'Reconstruction charter',desc:'Every civilization gains 2 credits for each occupied world at upkeep.'},
 {id:'restraint',name:'Orbital restraint',desc:'Orbital bombardment is prohibited for the next round.'},
 {id:'exchange',name:'Scientific commons',desc:'Every civilization gains 2 science each upkeep.'}
];
const NAMES=['Aster','Kestrel','Nacre','Solace','Varda','Pelagos','Eidolon','Talus','Meridian','Caelum','Tethra','Nim','Cinder','Halcyon','Vela','Sable','Auriga','Oriel','The Confluence','Ardent','Ilex','Thess','Eos','Caldera','Rime','Vesper','Osiris','Pyre','Lumen','Orison','Iskra','Neris','Thorne','Axiom','Haven','Corvus','Lyra'];
const BIOMES=['Oceanic','Temperate','Volcanic','Arid','Glacial'];
export const distance=(a,b)=>(Math.abs(a.q-b.q)+Math.abs(a.r-b.r)+Math.abs(a.q+a.r-b.q-b.r))/2;
export const clone=x=>structuredClone(x);
export const faction=(s,id='p')=>s.factions.find(f=>f.id===id);
export const sector=(s,id)=>s.sectors.find(x=>x.id===id);
export const neighbors=(s,x)=>s.sectors.filter(y=>distance(x,y)===1);
export const colonies=(s,id='p')=>s.sectors.filter(x=>x.owner===id);
export const fleets=(s,id='p')=>s.sectors.filter(x=>x.fleets[id]?.ships>0);
export const isTreaty=(s,a,b)=>s.treaties.some(t=>t.parties.includes(a)&&t.parties.includes(b)&&t.until>=s.round);
export function rand(s){s.rng=(Math.imul(s.rng,1664525)+1013904223)>>>0;return s.rng/4294967296;}
function hash(text){let h=2166136261;for(const c of String(text)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;}
export function log(s,text,type='info'){s.log.unshift({round:s.round,text,type});s.log=s.log.slice(0,180);}
function fail(text){throw new Error(text);}
function pay(f,cost){for(const [k,v]of Object.entries(cost))if(f[k]<v)fail(`Insufficient ${k}: need ${v}.`);for(const[k,v]of Object.entries(cost))f[k]-=v;}
function spend(s,id='p'){const f=faction(s,id);if(f.actions<=0)fail('No command actions remain. Resolve the round to refresh.');f.actions--;}
function freshFleet(){return{ships:0,troops:0};}
export function newGame(options={}){
 const seed=String(options.seed||'DAWN-042');
 const s={version:VERSION,id:Date.now().toString(36),name:String(options.name||'The first frontier').slice(0,60),seed,rng:hash(seed),round:1,maxRounds:Number(options.rounds)||12,difficulty:options.difficulty||'standard',phase:'planning',priority:null,law:null,agenda:0,vote:null,interventions:['resupply','intel'],treaties:[],campaigns:[],factions:[],sectors:[],log:[],stats:{explored:0,battles:0,conquests:0},scored:[],result:null};
 s.factions=FACTIONS.map((f,i)=>({...f,credits:14+(s.difficulty==='relaxed'&&!i?6:0),science:7,materials:14+(s.difficulty==='veteran'&&i?8:0),fuel:10+(s.difficulty==='relaxed'&&!i?6:0),reserves:9+(s.difficulty==='relaxed'&&!i?4:0),actions:5,tech:[],blueprint:{weapon:1,shield:0,transport:2},score:0,relations:0,priority:null}));
 let n=0;
 for(let q=-3;q<=3;q++)for(let r=-3;r<=3;r++)if(Math.abs(q+r)<=3){const inhabited=rand(s)>.26;s.sectors.push({id:`${q},${r}`,q,r,name:NAMES[n++],biome:BIOMES[Math.floor(rand(s)*BIOMES.length)],inhabited,garrison:inhabited?2+Math.floor(rand(s)*3):0,owner:null,orbit:null,occupation:0,income:{credits:1+Math.floor(rand(s)*2),science:1,materials:1+Math.floor(rand(s)*2)},fleets:{},revealed:false,discovered:false,damage:0});}
 const homes=[s.sectors.find(x=>x.q===-3&&x.r===1),s.sectors.find(x=>x.q===3&&x.r===-1),s.sectors.find(x=>x.q===0&&x.r===3)];
 homes.forEach((x,i)=>{x.owner=FACTIONS[i].id;x.orbit=x.owner;x.inhabited=true;x.garrison=5;x.fleets[x.owner]={ships:4,troops:5};x.income={credits:3,science:2,materials:3};x.home=true;x.name=['Meridian Prime','Vesper Reach','Orison'][i];});
 const home=homes[0];s.sectors.forEach(x=>x.revealed=distance(home,x)<=2);home.discovered=true;
 const frontier=neighbors(s,home).find(x=>!x.home);frontier.inhabited=true;frontier.garrison=2;frontier.name='Pelagos';frontier.biome='Oceanic';
 const center=s.sectors.find(x=>x.q===0&&x.r===0);center.name='The Confluence';center.inhabited=true;center.garrison=6;
 log(s,'Command established at Meridian Prime. Survey the frontier, build your expedition, and secure a beachhead.','discovery');
 return s;
}
export function income(s,id='p'){
 const f=faction(s,id),cs=colonies(s,id);const result={credits:0,science:0,materials:0,upkeep:Math.ceil(cs.length/2)+Math.floor(fleets(s,id).reduce((n,x)=>n+x.fleets[id].ships,0)/5)};
 for(const x of cs){const m=x.occupation>0?.5:1;for(const k of ['credits','science','materials'])result[k]+=Math.max(0,Math.floor((x.income[k]-x.damage)*m));if(f.tech.includes('industry')&&!x.occupation)result.materials++;if(s.law==='reconstruction'&&x.occupation)result.credits+=2;}
 if(s.law==='exchange')result.science+=2;return result;
}
export function command(state,action,id='p'){
 const s=clone(state);if(s.result)fail('This campaign has concluded. Start a new campaign to play again.');const f=faction(s,id);const x=action.sector?sector(s,action.sector):null;
 if(!f)fail('Unknown civilization.');
 switch(action.type){
 case 'priority':{
  if(f.priority)fail('A strategic priority is already committed this round.');const p=PRIORITIES.find(p=>p.id===action.id);if(!p)fail('Unknown strategic priority.');f.priority=p.id;
  if(p.id==='industry')f.materials+=4;if(p.id==='science')f.science+=3;if(p.id==='logistics'){f.fuel+=3;f.reserves+=3;}if(p.id==='diplomacy')f.credits+=4;
  // Secondary programs use paid, bounded benefits, once per other civilization.
  if(p.id==='industry'||p.id==='science')for(const other of s.factions.filter(g=>g.id!==id&&g.credits>=2)){other.credits-=2;other[p.id==='industry'?'materials':'science']+=2;}
  log(s,`${f.name} adopted ${p.name}.`,'politics');break;
 }
 case 'explore':{
  if(!x)fail('Select a sector.');if(id==='p'&&!x.revealed)fail('Explore along a visible frontier.');if(x.discovered)fail('This sector has already been surveyed.');
  if(!s.sectors.some(y=>(y.owner===id||y.fleets[id]?.ships)&&distance(x,y)<=1))fail('Survey must be adjacent to a colony or fleet.');pay(f,{fuel:1});spend(s,id);x.discovered=true;
  if(id==='p'){s.stats.explored++;for(const y of s.sectors)if(distance(x,y)<=(f.tech.includes('sensors')?2:1))y.revealed=true;}
  const reward=f.tech.includes('sensors')?3:1;f.science+=reward;log(s,`${f.name} surveyed ${x.name}: ${x.inhabited?'inhabited world; surface resistance detected':'uninhabited world; open for settlement'}. +${reward} science.`,'discovery');break;
 }
 case 'colonize':{
  if(!x||x.owner)fail('Choose an unclaimed world.');if(x.inhabited&&x.garrison>0)fail('Defended worlds require a successful planetary invasion.');if(!x.fleets[id]?.ships)fail('A fleet must be present to establish a colony.');pay(f,{credits:3,materials:2});spend(s,id);x.owner=id;x.orbit=id;x.inhabited=true;x.garrison=2;f.score+=1;log(s,`${f.name} established a colony on ${x.name}.`,'success');break;
 }
 case 'build':{
  if(!x||x.owner!==id)fail('Build at one of your colonies.');if(x.occupation)fail('This world must stabilize before producing fleets.');const unit=action.unit||'ship';if(!['ship','troops','repair'].includes(unit))fail('Unknown production order.');
  if(unit==='ship'){pay(f,{materials:4+f.blueprint.weapon+f.blueprint.shield,credits:1});spend(s,id);x.fleets[id]??=freshFleet();x.fleets[id].ships++;}
  if(unit==='troops'){pay(f,{materials:3,credits:1});spend(s,id);f.reserves+=4;}
  if(unit==='repair'){if(!x.damage)fail('Infrastructure is already intact.');pay(f,{materials:2});spend(s,id);x.damage=Math.max(0,x.damage-1);}
  log(s,`${f.name}: ${unit==='ship'?'new vessel commissioned':unit==='troops'?'4 cohorts recruited':'infrastructure repaired'} at ${x.name}.`,'production');break;
 }
 case 'load':{
  const fl=x?.fleets[id];if(!fl?.ships||x.owner!==id)fail('Load troops at a friendly colony with a fleet.');const cap=fl.ships*f.blueprint.transport-fl.troops;const count=Math.min(4,f.reserves,cap);if(count<=0)fail('No reserves or available transport capacity.');spend(s,id);fl.troops+=count;f.reserves-=count;log(s,`${count} cohorts embarked at ${x.name}.`,'production');break;
 }
 case 'move':{
  const from=sector(s,action.from),fl=from?.fleets[id];if(!x||!fl?.ships)fail('Choose a fleet to move.');const range=f.tech.includes('drives')?2:1;if(distance(from,x)<1||distance(from,x)>range)fail(`Fleet range is ${range} hex${range>1?'es':''}.`);
  if(x.owner&&x.owner!==id&&isTreaty(s,id,x.owner))fail('Nonaggression agreement prohibits entering this rival system.');
  // A two-hex move must use a passable intermediate sector.
  if(distance(from,x)===2&&!neighbors(s,from).some(y=>distance(y,x)===1&&!Object.keys(y.fleets).some(k=>k!==id&&y.fleets[k].ships>0)))fail('Hostile fleets block the route.');
  pay(f,{fuel:Math.max(1,Math.ceil(fl.ships/3))});spend(s,id);const moving={...fl};delete from.fleets[id];x.fleets[id]??=freshFleet();x.fleets[id].ships+=moving.ships;x.fleets[id].troops+=moving.troops;
  if(id==='p'){x.revealed=true;for(const y of neighbors(s,x))y.revealed=true;}resolveSpace(s,x,id);if(x.fleets[id]?.ships)x.orbit=id;
  log(s,`${f.name} moved from ${from.name} to ${x.name}.`,'movement');break;
 }
 case 'research':{
  const t=TECHS.find(t=>t.id===action.id);if(!t||f.tech.includes(t.id))fail('Choose an unresearched technology.');pay(f,{science:Math.max(1,t.cost-(id==='p'?1:0))});spend(s,id);f.tech.push(t.id);log(s,`${f.name} researched ${t.name}.`,'science');break;
 }
 case 'blueprint':{
  const b=action.blueprint;if(!b||!Number.isInteger(b.weapon)||!Number.isInteger(b.shield)||!Number.isInteger(b.transport)||b.weapon<1||b.weapon>2||b.shield<0||b.shield>1||b.transport<1||b.transport>3)fail('Invalid ship design.');if(b.weapon===2&&!f.tech.includes('weapons'))fail('Research Plasma lances first.');if(b.shield&&!f.tech.includes('shields'))fail('Research Phase shielding first.');if(b.weapon+b.shield+b.transport>5)fail('Blueprint has only 5 component slots.');
  if(fleets(s,id).some(y=>y.fleets[id].troops>y.fleets[id].ships*b.transport))fail('Unload or deploy embarked forces before reducing transport capacity.');pay(f,{materials:2});spend(s,id);f.blueprint={...b};log(s,`${f.name} refitted its fleet blueprint.`,'production');break;
 }
 case 'invade':{
  if(!x||x.owner===id)fail('Choose a hostile or independent defended world.');if(!x.inhabited||x.garrison<=0)fail('This world can be colonized without invasion.');if(x.orbit!==id||!x.fleets[id]?.ships)fail('Secure orbital superiority before landing.');if(x.owner&&isTreaty(s,id,x.owner))fail('A nonaggression agreement protects this world.');if(s.campaigns.some(c=>c.sector===x.id))fail('A campaign is already active here.');
  const fl=x.fleets[id];if(fl.troops<2)fail('Embark at least 2 cohorts before launching an invasion.');pay(f,{fuel:2,credits:2});spend(s,id);
  const troops=fl.troops;fl.troops=0;const c=makeCampaign(s,x,id,troops);s.campaigns.push(c);log(s,`${f.name} landed ${troops} cohorts on ${x.name}. Planetary campaign opened.`,'battle');break;
 }
 case 'ground-order':{
  const c=s.campaigns.find(c=>c.id===action.campaign);if(!c)fail('Campaign not found.');if(c.attacker!==id&&c.defender!==id)fail('You do not command this campaign.');const side=c.attacker===id?'a':'d';const src=c.tiles.find(t=>t.id===action.from),dst=c.tiles.find(t=>t.id===action.to);
  if(!src||src.owner!==side||!src.units)fail('Choose a region containing your formation.');if(!['advance','defend','support','bombard','raid'].includes(action.order))fail('Invalid operational order.');if(!dst)fail('Choose a target region.');
  if(action.order==='advance'&&distance(src,dst)!==1)fail('Ground advances move to an adjacent hex.');if(['support','bombard','raid'].includes(action.order)&&distance(src,dst)>2)fail('Target is beyond support range.');
  const key=`${side}:${src.id}`;const existing=c.orders.find(o=>o.key===key);const count=c.orders.filter(o=>o.side===side).length;if(!existing&&count>=3+(f.tech.includes('doctrine')?1:0))fail('Planetary command limit reached.');
  c.orders=c.orders.filter(o=>o.key!==key);c.orders.push({key,side,from:src.id,to:dst.id,type:action.order});break;
 }
 case 'cancel-ground':{const c=s.campaigns.find(c=>c.id===action.campaign);if(!c)fail('Campaign not found.');const side=c.attacker===id?'a':c.defender===id?'d':null;if(!side)fail('Not your command.');c.orders=c.orders.filter(o=>!(o.side===side&&o.from===action.from));break;}
 case 'recruit-ground':{
  const c=s.campaigns.find(c=>c.id===action.campaign),u=UNITS.find(u=>u.id===action.unit);if(!c||!u)fail('Unknown campaign or unit.');const side=c.attacker===id?'a':c.defender===id?'d':null;if(!side)fail('Not your command.');const t=c.tiles.find(t=>t.owner===side&&['Port','Industry'].includes(t.site));if(!t)fail('Control a port or industrial district first.');if(u.domain==='sea'&&t.terrain!=='Ocean'&&!c.tiles.some(y=>y.owner===side&&y.terrain==='Ocean'))fail('Secure a coastal region before maritime production.');pay(f,{materials:u.cost,credits:1});spend(s,id);t.units++;t.assets[u.id]=(t.assets[u.id]||0)+1;log(s,`${u.name} deployed on ${c.name}.`,'production');break;
 }
 case 'supply':{
  const c=s.campaigns.find(c=>c.id===action.campaign);if(!c)fail('Campaign not found.');const world=sector(s,c.sector),side=c.attacker===id?'a':c.defender===id?'d':null;if(!side)fail('Not your command.');if(world.orbit!==id)fail('Orbital access is required to deliver supplies.');pay(f,{fuel:2,materials:2});spend(s,id);c.supply[side]+=5+(f.tech.includes('logistics')?2:0);log(s,`Supply delivery reached ${c.name}.`,'production');break;
 }
 case 'orbital':{
  const c=s.campaigns.find(c=>c.id===action.campaign);if(!c)fail('Campaign not found.');const world=sector(s,c.sector);if(world.orbit!==id)fail('Orbital superiority is required.');if(s.law==='restraint')fail('Orbital restraint currently prohibits bombardment.');if(c.orbitalRound===s.round)fail('Orbital support already committed this round.');const t=c.tiles.find(t=>t.id===action.to),side=c.attacker===id?'a':c.defender===id?'d':null;if(!side||!t||t.owner===side)fail('Choose an enemy region.');pay(f,{fuel:2});spend(s,id);t.units=Math.max(0,t.units-1);world.damage=Math.min(2,world.damage+1);c.orbitalRound=s.round;log(s,`Orbital strike on ${c.name}; infrastructure damaged.`,'battle');break;
 }
 case 'withdraw':{
  const c=s.campaigns.find(c=>c.id===action.campaign);if(!c||c.attacker!==id)fail('Only the expedition commander may evacuate.');const world=sector(s,c.sector),fl=world.fleets[id];if(world.orbit!==id||!fl?.ships)fail('Evacuation requires friendly ships in orbit.');const survivors=c.tiles.filter(t=>t.owner==='a').reduce((n,t)=>n+t.units,0);fl.troops+=Math.min(survivors,Math.max(0,fl.ships*f.blueprint.transport-fl.troops));s.campaigns=s.campaigns.filter(v=>v!==c);world.garrison=Math.max(1,c.tiles.filter(t=>t.owner==='d').reduce((n,t)=>n+t.units,0));log(s,`${f.name} evacuated its expedition from ${c.name}.`,'battle');break;
 }
 case 'treaty':{
  const other=faction(s,action.with);if(!other||other.id===id)fail('Choose another civilization.');if(isTreaty(s,id,other.id))fail('An agreement is already active.');if(s.campaigns.some(c=>[c.attacker,c.defender].includes(id)&&[c.attacker,c.defender].includes(other.id)))fail('Settle active invasions before signing nonaggression.');if(other.relations<-2)fail('Relations are too hostile. Offer reparations first.');pay(f,{credits:3});other.credits+=3;s.treaties.push({parties:[id,other.id],until:s.round+2});other.relations+=1;log(s,`${f.name} and ${other.name} signed nonaggression through round ${s.round+2}.`,'politics');break;
 }
 case 'trade':{
  const other=faction(s,action.with);if(!other||other.id===id||other.materials<3)fail('The partner has no materials available.');if(other.relations<-2)fail('This civilization refuses trade while relations are hostile.');pay(f,{credits:4});other.credits+=4;other.materials-=3;f.materials+=3;log(s,`${f.name} purchased 3 materials from ${other.name} for 4 credits.`,'politics');break;
 }
 case 'gift':{const other=faction(s,action.with);if(!other||other.id===id)fail('Invalid recipient.');pay(f,{credits:3});other.credits+=3;other.relations+=2;log(s,`${f.name} offered reparations to ${other.name}.`,'politics');break;}
 case 'vote':{if(!['for','against'].includes(action.vote))fail('Choose a vote.');if(s.vote!==null)fail('Assembly ballot already cast for this round.');s.vote=action.vote;log(s,`${f.name} voted ${action.vote} the ${LAWS[s.agenda].name}.`,'politics');break;}
 case 'intervention':{
  const i=s.interventions.indexOf(action.id);if(i<0)fail('Intervention unavailable.');if(action.id==='resupply'){f.fuel+=4;f.reserves+=2;}else if(action.id==='intel'){if(!x)fail('Select a sector to scan.');x.revealed=true;x.discovered=true;for(const y of neighbors(s,x))y.revealed=true;}else fail('Unknown intervention.');s.interventions.splice(i,1);log(s,`Special operation: ${action.id==='resupply'?'emergency resupply':'deep reconnaissance'}.`,'discovery');break;
 }
 default:fail('Unknown command.');
 }
 return s;
}
function resolveSpace(s,x,attacker){
 for(const defender of Object.keys(x.fleets).filter(k=>k!==attacker&&x.fleets[k].ships>0)){
  const a=x.fleets[attacker],d=x.fleets[defender];if(!a?.ships)break;const af=faction(s,attacker),df=faction(s,defender);if(isTreaty(s,attacker,defender))continue;
  for(let round=0;round<4&&a.ships&&d.ships;round++){let ah=0,dh=0;for(let i=0;i<a.ships;i++)if(rand(s)<Math.min(.85,.32+.14*af.blueprint.weapon-.1*df.blueprint.shield))ah++;for(let i=0;i<d.ships;i++)if(rand(s)<Math.min(.85,.32+.14*df.blueprint.weapon-.1*af.blueprint.shield))dh++;a.ships=Math.max(0,a.ships-dh);d.ships=Math.max(0,d.ships-ah);}
  if(a.ships&&d.ships){ // Defender holds on an inconclusive engagement; attacker withdraws to a friendly neighbor.
   const retreat=neighbors(s,x).find(y=>y.owner===attacker&&!Object.keys(y.fleets).some(k=>k!==attacker&&y.fleets[k].ships));if(retreat){retreat.fleets[attacker]??=freshFleet();retreat.fleets[attacker].ships+=a.ships;retreat.fleets[attacker].troops+=Math.min(a.troops,a.ships*af.blueprint.transport);}delete x.fleets[attacker];x.orbit=defender;
  }else{if(!a.ships)delete x.fleets[attacker];if(!d.ships)delete x.fleets[defender];}
  for(const k of [attacker,defender])if(x.fleets[k])x.fleets[k].troops=Math.min(x.fleets[k].troops,x.fleets[k].ships*faction(s,k).blueprint.transport);
  if(attacker==='p'||defender==='p')s.stats.battles++;if(df.id!=='p')df.relations-=2;if(af.id!=='p')af.relations-=2;log(s,`Space engagement at ${x.name}: ${x.fleets[attacker]?.ships||0} attacking / ${x.fleets[defender]?.ships||0} defending vessels remain.`,'battle');
 }
}
function makeCampaign(s,x,attacker,troops){
 const tiles=[];let n=0;for(let q=-2;q<=2;q++)for(let r=-2;r<=2;r++)if(Math.abs(q+r)<=2){const site=q===-2&&r===0?'Port':q===1&&r===0?'Capital':q===0&&r===1?'Industry':q===0&&r===-1?'Defense':null;const ocean=x.biome==='Oceanic'&&q+r>0&&!site;const owner=q<=-1?'a':'d';const units=q===-2&&r===0?troops:q===1&&r===0?Math.ceil(x.garrison*.6):q===0&&r===-1?Math.floor(x.garrison*.4):0;tiles.push({id:String(n++),q,r,site,terrain:ocean?'Ocean':site?'Urban':rand(s)>.65?'Highlands':'Plains',owner,units,assets:{infantry:units},fort:site==='Defense'?1:0});}
 return{id:`campaign-${x.id}-${s.round}`,sector:x.id,name:x.name,attacker,defender:x.owner||'independent',cycle:0,tiles,orders:[],supply:{a:10,d:10},morale:{a:10,d:10},capitalHeld:0,orbitalRound:0};
}
function autoOrders(s,c,side){
 const own=c.tiles.filter(t=>t.owner===side&&t.units>0);const enemy=c.tiles.filter(t=>t.owner!==side);const cap=3;
 for(const t of own.slice().sort((a,b)=>b.units-a.units).slice(0,cap)){
  if(side==='d'&&t.site==='Capital'){c.orders.push({key:side+':'+t.id,side,from:t.id,to:t.id,type:'defend'});continue;}
  const adjacent=enemy.filter(y=>distance(t,y)===1).sort((a,b)=>(a.site==='Capital'?-4:0)+a.units-((b.site==='Capital'?-4:0)+b.units));
  const target=adjacent[0]||enemy.slice().sort((a,b)=>distance(t,a)-distance(t,b))[0];
  const step=target&&c.tiles.filter(y=>distance(t,y)===1).sort((a,b)=>distance(a,target)-distance(b,target))[0];
  c.orders.push({key:`${side}:${t.id}`,side,from:t.id,to:adjacent[0]?.id||step?.id||t.id,type:adjacent[0]&&adjacent[0].units>t.units+1?'defend':step?'advance':'defend'});
 }
}
function resolveGround(s,c){
 const world=sector(s,c.sector);c.cycle++;
 for(const side of ['a','d']){const owner=side==='a'?c.attacker:c.defender;if(owner!=='p')autoOrders(s,c,side);}
 const before=clone(c.tiles);const force=Object.fromEntries(c.tiles.map(t=>[t.id,{a:0,d:0}]));const guards={};
 for(const t of before){const order=c.orders.find(o=>o.side===t.owner&&o.from===t.id);guards[t.id]=order?.type==='defend'?1:0;if(order?.type==='advance'){const count=Math.max(1,t.units-1);force[order.to][t.owner]+=count;force[t.id][t.owner]+=t.units-count;}else force[t.id][t.owner]+=t.units;}
 for(const o of c.orders.filter(o=>['support','bombard','raid'].includes(o.type))){const from=before.find(t=>t.id===o.from),target=c.tiles.find(t=>t.id===o.to);if(!from?.units||!target)continue;const hostile=o.side==='a'?'d':'a';if(o.type==='raid'){c.supply[hostile]=Math.max(0,c.supply[hostile]-2);}else force[target.id][hostile]=Math.max(0,force[target.id][hostile]-1);}
 for(const t of c.tiles){let a=force[t.id].a,d=force[t.id].d;if(a&&d){const old=before.find(y=>y.id===t.id);const bonus=old.owner==='d'?(t.fort+guards[t.id]):0;const attack=Math.max(1,Math.floor(a*(.55+rand(s)*.6)));const defense=Math.max(1,Math.floor(d*(.55+rand(s)*.6))+bonus);a=Math.max(0,a-defense);d=Math.max(0,d-attack);c.morale.a-=force[t.id].a-a;c.morale.d-=force[t.id].d-d;}
  if(a&&!d){t.owner='a';t.units=a;}else if(d&&!a){t.owner='d';t.units=d;}else if(a&&d){if(a>d){t.owner='a';t.units=a-d;}else{t.owner='d';t.units=Math.max(1,d-a);}}else t.units=0;
  // Surviving unit identities remain attached to formations; destroyed assets are pruned.
  const old=before.find(y=>y.id===t.id);t.assets=old.owner===t.owner?{...old.assets}:{infantry:t.units};let total=Object.values(t.assets).reduce((a,b)=>a+b,0);for(const key of Object.keys(t.assets)){while(total>t.units&&t.assets[key]>0){t.assets[key]--;total--;}}if(total<t.units)t.assets.infantry=(t.assets.infantry||0)+t.units-total;
 }
 for(const side of ['a','d']){const port=c.tiles.some(t=>t.site==='Port'&&t.owner===side);const hasIndustry=c.tiles.some(t=>t.site==='Industry'&&t.owner===side);c.supply[side]=Math.max(0,c.supply[side]-1+(port?1:0)+(hasIndustry?1:0));if(!c.supply[side])c.morale[side]-=2;c.morale[side]=Math.max(0,c.morale[side]);}
 const capital=c.tiles.find(t=>t.site==='Capital');c.capitalHeld=capital.owner==='a'?c.capitalHeld+1:0;if(capital.owner==='a')c.morale.d=Math.max(0,c.morale.d-2);const attackers=c.tiles.filter(t=>t.owner==='a').reduce((n,t)=>n+t.units,0),defenders=c.tiles.filter(t=>t.owner==='d').reduce((n,t)=>n+t.units,0);
 c.orders=[];
 if(attackers>0&&c.capitalHeld>=2&&(defenders===0||c.morale.d<=3)){
  world.owner=c.attacker;world.occupation=2;world.garrison=Math.max(1,attackers);const f=faction(s,c.attacker);f.score+=3;if(c.attacker==='p')s.stats.conquests++;log(s,`${c.name} surrendered. Military occupation established; stabilization required.`,'success');return false;
 }
 if(!attackers||c.morale.a<=0){world.garrison=Math.max(1,defenders);log(s,`The expedition on ${c.name} collapsed. Planetary ownership is unchanged.`,'battle');return false;}
 log(s,`${c.name}, operation ${c.cycle}: ${attackers} expeditionary / ${defenders} defending formations; morale ${c.morale.a}/${c.morale.d}.`,'battle');return true;
}
export function planAI(state){
 let work=clone(state);const plans=[];
 for(const id of ['r','v']){
  const push=action=>{try{work=command(work,action,id);plans.push({id,action});return true;}catch{return false;}};
  push({type:'priority',id:id==='r'?'industry':'science'});
  const f=()=>faction(work,id);const own=()=>colonies(work,id);
  let built=false,researched=false;const moved=new Set();
  for(let step=0;step<5&&f().actions>0;step++){
   let acted=false;
   for(const at of fleets(work,id)){
    const fl=at.fleets[id];const campaign=work.campaigns.some(c=>c.sector===at.id);
    if(campaign)continue;
    if(at.owner!==id){
     if(!at.inhabited||at.garrison<=0){if(push({type:'colonize',sector:at.id})){acted=true;break;}}
     else if(fl.troops>=2&&push({type:'invade',sector:at.id})){acted=true;break;}
    }
    if(at.owner===id&&fl.troops<Math.min(4,fl.ships*f().blueprint.transport)&&f().reserves>0){if(push({type:'load',sector:at.id})){acted=true;break;}}
    if(!moved.has(at.id)){
     const known=neighbors(work,at).filter(t=>t.owner!==id&&(!t.owner||!isTreaty(work,id,t.owner))&&!work.campaigns.some(c=>c.sector===t.id));
     const score=t=>(!t.inhabited?6:fl.troops>=t.garrison?4:-4)+(t.owner==='p'?1:0)-Object.entries(t.fleets).filter(([k])=>k!==id).reduce((n,[,v])=>n+v.ships*2,0);
     const target=known.sort((a,b)=>score(b)-score(a))[0];
     if(target&&score(target)>=0&&push({type:'move',from:at.id,sector:target.id})){moved.add(target.id);acted=true;break;}
    }
   }
   if(acted)continue;
   const home=own().find(x=>!x.occupation);
   if(!built&&home&&push({type:'build',sector:home.id,unit:'ship'})){built=true;continue;}
   const t=TECHS.find(t=>!f().tech.includes(t.id)&&t.cost<=f().science);
   if(!researched&&t&&push({type:'research',id:t.id})){researched=true;continue;}
   if(home&&f().reserves<3&&push({type:'build',sector:home.id,unit:'troops'}))continue;
   break;
  }
 }
 return plans;
}
export function endRound(state,plans=planAI(state)){
 let s=clone(state);if(s.result)return s;
 for(const p of plans){try{s=command(s,p.action,p.id);}catch{/* Plans can become invalid after another civilization acts. */}}
 const law=LAWS[s.agenda];let yes=0,no=0;for(const f of s.factions){const votes=Math.max(1,colonies(s,f.id).length)+(f.priority==='diplomacy'?2:0);const supports=f.id==='p'?s.vote==='for':law.id==='restraint'?f.id==='v':true;if(f.id==='p'&&s.vote===null)continue;if(supports)yes+=votes;else no+=votes;}
 s.law=yes>no?law.id:null;log(s,`${law.name}: ${yes} for / ${no} against. ${s.law?'Motion carried.':'Motion failed.'}`,'politics');
 for(let cycle=0;cycle<2;cycle++)s.campaigns=s.campaigns.filter(c=>resolveGround(s,c));
 for(const f of s.factions){const inc=income(s,f.id);f.credits+=inc.credits-inc.upkeep;f.science+=inc.science;f.materials+=inc.materials;f.fuel+=2;f.actions=5;f.priority=null;if(f.credits<0){f.credits=0;f.actions=4;}for(const x of colonies(s,f.id))if(x.occupation)x.occupation=Math.max(0,x.occupation-(f.tech.includes('civics')?2:1));}
 s.treaties=s.treaties.filter(t=>t.until>=s.round+1);
 const pf=faction(s);const objectives=[['explorer',s.stats.explored>=3,2,'Frontier cartographer'],['scholar',pf.tech.length>=3,2,'Scientific ascendancy'],['conqueror',s.stats.conquests>=1,3,'A foothold among stars'],['diplomat',s.treaties.some(t=>t.parties.includes('p')),1,'Accord of civilizations']];
 for(const [id,met,points,name]of objectives)if(met&&!s.scored.includes(id)){s.scored.push(id);pf.score+=points;log(s,`Mandate completed: ${name}. +${points} prestige.`,'success');}
 for(const f of s.factions)f.score+=colonies(s,f.id).filter(x=>x.id==='0,0'&&!x.occupation).length;
 if(s.round>=s.maxRounds){const ranked=s.factions.map(f=>({id:f.id,score:f.score+colonies(s,f.id).filter(x=>!x.occupation).length*2+f.tech.length})).sort((a,b)=>b.score-a.score);s.result={winner:ranked[0].id,ranking:ranked};log(s,`${faction(s,ranked[0].id).name} leads the final council with ${ranked[0].score} prestige.`,'success');}
 else{s.round++;s.agenda=(s.agenda+1)%LAWS.length;s.vote=null;log(s,`Round ${s.round}: resources collected, commands refreshed. New assembly proposal available.`,'info');}
 return s;
}
export function validateSave(value){
 const s=value?.game||value;if(!s||s.version!==VERSION||!Array.isArray(s.sectors)||s.sectors.length!==37||!Array.isArray(s.factions)||s.factions.length!==3||!Array.isArray(s.campaigns)||!Array.isArray(s.log)||!Number.isInteger(s.round)||s.round<1||s.round>30||!Number.isInteger(s.maxRounds)||s.maxRounds<1||s.maxRounds>30||!Number.isInteger(s.rng))fail('This is not a compatible Galactic Imperium save.');
 const ids=new Set();for(const x of s.sectors){if(typeof x.id!=='string'||ids.has(x.id)||!Number.isInteger(x.q)||!Number.isInteger(x.r)||Math.abs(x.q)>3||Math.abs(x.r)>3||Math.abs(x.q+x.r)>3||x.id!==`${x.q},${x.r}`||typeof x.name!=='string'||x.name.length>80||!x.income||!x.fleets)fail('Invalid sector data.');ids.add(x.id);for(const n of Object.values(x.income))if(!Number.isFinite(n)||n<0||n>10000)fail('Invalid economy data.');for(const fl of Object.values(x.fleets))if(!Number.isInteger(fl.ships)||fl.ships<0||fl.ships>10000||!Number.isInteger(fl.troops)||fl.troops<0||fl.troops>10000)fail('Invalid fleet data.');}
 for(const f of s.factions){if(!FACTIONS.some(d=>d.id===f.id)||!Array.isArray(f.tech)||!f.blueprint)fail('Invalid civilization data.');for(const k of ['credits','science','materials','fuel','reserves','actions','score'])if(!Number.isFinite(f[k])||f[k]<0||f[k]>1000000)fail('Invalid resource data.');}
 if(!Array.isArray(s.treaties)||!Array.isArray(s.scored)||!Array.isArray(s.interventions)||s.log.some(e=>typeof e.text!=='string'||e.text.length>2000))fail('Invalid campaign history.');
 for(const c of s.campaigns)if(!ids.has(c.sector)||!Array.isArray(c.tiles)||c.tiles.length!==19||!Array.isArray(c.orders)||!c.supply||!c.morale)fail('Invalid planetary campaign data.');
 return clone(s);
}
export function encodeSave(s){return JSON.stringify({format:'galactic-imperium',version:VERSION,savedAt:new Date().toISOString(),game:s},null,2);}

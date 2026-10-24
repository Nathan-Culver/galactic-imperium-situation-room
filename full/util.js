export class RuleError extends Error { constructor(message,code='ILLEGAL_ACTION'){super(message);this.name='RuleError';this.code=code;} }
export const requireRule=(condition,message,code)=>{if(!condition)throw new RuleError(message,code);};
export const copy=value=>structuredClone(value);
export function seedNumber(value){let h=2166136261;for(const char of String(value)){h^=char.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;}
export function random(state){state.rng=(Math.imul(state.rng,1664525)+1013904223)>>>0;return state.rng/4294967296;}
export function die(state,sides=6){return 1+Math.floor(random(state)*sides);}
export function shuffle(state,list){const result=[...list];for(let i=result.length-1;i>0;i--){const j=Math.floor(random(state)*(i+1));[result[i],result[j]]=[result[j],result[i]];}return result;}
export const hexDistance=(a,b)=>(Math.abs(a.q-b.q)+Math.abs(a.r-b.r)+Math.abs(a.q+a.r-b.q-b.r))/2;
export const HEX_DIRECTIONS=[[1,0],[1,-1],[0,-1],[-1,0],[-1,1],[0,1]];
export const hexKey=(q,r)=>`${q},${r}`;
export function adjacentKeys(hex){return HEX_DIRECTIONS.map(([q,r])=>hexKey(hex.q+q,hex.r+r));}
export function graphPath(nodes,start,goal,passable=()=>true,max=Infinity){const byId=new Map(nodes.map(n=>[n.id,n]));if(!byId.has(start)||!byId.has(goal))return null;const queue=[[start]],seen=new Set([start]);while(queue.length){const path=queue.shift(),id=path.at(-1);if(id===goal)return path;if(path.length-1>=max)continue;const node=byId.get(id);for(const next of node.neighbors||adjacentKeys(node)){const target=byId.get(next);if(!target||seen.has(next)||!passable(target,node,path))continue;seen.add(next);queue.push([...path,next]);}}return null;}
export function components(nodes,predicate){const byId=new Map(nodes.map(n=>[n.id,n]));const unseen=new Set(nodes.filter(predicate).map(n=>n.id));const result=[];while(unseen.size){const queue=[unseen.values().next().value],group=[];unseen.delete(queue[0]);while(queue.length){const id=queue.shift(),node=byId.get(id);group.push(id);for(const key of node.neighbors||adjacentKeys(node))if(unseen.has(key)){unseen.delete(key);queue.push(key);}}result.push(group);}return result;}
export function event(state,type,text,data={}){state.events??=[];state.events.unshift({id:state.eventSequence=(state.eventSequence||0)+1,round:state.round,phase:state.phase,type,text,...data});if(state.events.length>500)state.events.length=500;}
export function pay(resources,cost){for(const [key,value]of Object.entries(cost)){requireRule(Number.isFinite(value)&&value>=0,'Invalid resource cost.');requireRule((resources[key]||0)>=value,`Insufficient ${key}: need ${value}.`);}for(const[key,value]of Object.entries(cost))resources[key]-=value;}
export function add(resources,values){for(const[key,value]of Object.entries(values))resources[key]=(resources[key]||0)+value;}
export const sum=values=>values.reduce((a,b)=>a+b,0);
export function atomic(state,operation){const next=copy(state);operation(next);return next;}

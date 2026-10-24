import {planAI} from './engine.js?v=0.2.2';
self.onmessage=event=>{try{self.postMessage({plans:planAI(event.data)});}catch(error){self.postMessage({error:String(error.message)});}};

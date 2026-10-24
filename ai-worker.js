import {planAI} from './engine.js?v=0.2.0';
self.onmessage=event=>{try{self.postMessage({plans:planAI(event.data)});}catch(error){self.postMessage({error:String(error.message)});}};

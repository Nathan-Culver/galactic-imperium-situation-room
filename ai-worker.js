import {planAI} from './engine.js';
self.onmessage=event=>{try{self.postMessage({plans:planAI(event.data)});}catch(error){self.postMessage({error:String(error.message)});}};

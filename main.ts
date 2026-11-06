import { drawInputs } from './input.js'
import  {} from './render.js'
import { } from './layout.js'
import { renderGraph } from './render.js'
import { buildGraph } from './graph.js';


const out = document.getElementById('out') as HTMLElement;
const options = document.getElementById('options') as HTMLElement;

if(out && options) {
    drawInputs(options, (cfg) => {
        const g = buildGraph(cfg);
        out.innerHTML = renderGraph(g);
    });
}
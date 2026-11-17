import { drawInputs } from './input.js'
import  {} from './render.js'
import { } from './layout.js'
import { renderGraph } from './render.js'
import { buildGraph, createVertices, createEdges } from './graph.js';


const out = document.getElementById('out') as HTMLElement;
const options = document.getElementById('options') as HTMLElement;

if(out && options) {
    drawInputs(options, (cfg) => {
        const g = buildGraph(cfg);
        out.innerHTML = renderGraph(g);
    });
}


const t1 = createVertices(5, 0);
t1[0].degree = 1; t1[1].degree = 3; t1[2].degree = 2; t1[3].degree = 2;
console.log("Test 1");
createEdges(t1);

console.log("Test 2");
createEdges(createVertices(3, 0));

console.log("Test 3");
createEdges(createVertices(0, 0));

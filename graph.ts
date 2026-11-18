import type { GraphConfig } from "./input.js";

type Position = {
  x: number;
  y: number;
};

export type Vertex = {
  id: number;
  label: string;
  degree: number;
  pos: Position;
};

export type Edge = {
  source: number; // source vertex id
  target: number; // target vertex id
  label: string;
};

export type Graph = {
  vertices: Vertex[];
  edges: Edge[];
};

export function createVertices(count: number, degree: number): Vertex[] {
  // { id: 0, label: "", degree: 0, pos: { x: 0, y: 0 } }
  const vertexArray: Vertex[] = [];
  for (let i = 0; i < count; i++) {
    const v: Vertex = { id: i, label: "v" + i, degree: degree, pos: { x: 0, y: 0 }};
    vertexArray.push(v);
  }
  return vertexArray;
}

// TODO: "nicht möglich" von "keine Kanten" unterscheiden (beides liefert []),
//       damit das Formular eine Meldung anzeigen kann.
export function createEdges(vertex: Vertex[]): Edge[] {
  // { source: 0, target: 1, label: "" }
  const edgeArray: Edge[] = [];
    
  
  const vertices = vertex.map(v => ({id: v.id, rest: v.degree }));

  // Havel-Hakimi Algorithmus
  while(true){
    vertices.sort((a, b) => b.rest - a.rest);
    if((vertices[0]?.rest ?? 0) === 0) break;
    
    const first = vertices[0];
    if(first.rest > vertices.length - 1)
      return [];
    for (let i = 1; i <= first.rest; i++) {
      if(vertices[i].rest === 0)
        return [];
      edgeArray.push({source: first.id, target: vertices[i].id, label: "" });
      vertices[i].rest--;
    }
    first.rest = 0;
  }
  return edgeArray;
}

export function getDegree(edges: Edge[], id: number): number {
  let count = 0;
  for (const edge of edges) {
    if (edge.source === id) count++;
    if (edge.target === id) count++;
  }
  return count;
}

export function createVertexNames(v: number): string {
  return `v${v}`;
}

export function deleteGraph() {
  document.querySelector('svg')?.remove();
}

export function buildGraph(cfg: GraphConfig) : Graph {
  const vertices = createVertices(cfg.vertexCount, cfg.regularEdgeCount);
  const edges = createEdges(vertices);
  return { vertices, edges };
}
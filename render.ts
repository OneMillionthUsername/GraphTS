import { createGrid } from "./layout.js";
import { createVertexNames, getDegree, Graph } from './graph.js'

const font_size_degree = 20;
const font_size_label = 40;

export function renderGraph(g: Graph, size = 1600 ): string {
  const radiusVertex = 30;
  const streuung = 125; // max. zufälliger Versatz in px, horizontal & vertikal
  const grid = createGrid(g.vertices.length, size);
  const cellWidth = Math.floor(size/grid.cols);
  const cellHeight = Math.floor(size/grid.rows);
  //create the vertices
  //----------------------------
  // fill the vertices set with data
  g.vertices.forEach((v, i) => {
    const col = i % grid.cols;
    const row = Math.floor(i / grid.cols);
    //const winkel = (2 * Math.PI * i) / V.length;
    const jitterX = (Math.random() - 0.5) * 2 * streuung; // default Faktor = 0.5
    const jitterY = (Math.random() - 0.5) * 2 * streuung;
    v.pos = {
      x: col * cellWidth + (cellWidth / 2) + jitterX,
      y: row * cellHeight + (cellHeight / 2) + jitterY
    }
    v.label = createVertexNames(i);
    v.degree = getDegree(g.edges,v.id);
  });

  const getVertexbyId = new Map(g.vertices.map(v => [v.id, v] as const));

  // liefert mit get den Winkel der Kante zurück (in rad).
  // const deg = new Map(V.map(v => [v.id, 0]));
  // for (const edge of E) {
  //   const source = edge.source;
  //   const target = edge.target;
  //   deg.set(source, deg.get(source)! + Math.random());
  //   deg.set(target, deg.get(target)! + 1);
  // }

  const edgesSvg = g.edges.map(edge => {
    const source = getVertexbyId.get(edge.source)!.pos;
    const target = getVertexbyId.get(edge.target)!.pos;
    return `<line x1="${source.x}" y1="${source.y}" x2="${target.x}" y2="${target.y}" stroke="#333" stroke-width="2" />`;
  }).join("\n");

  const nodesSvg = g.vertices.map(v => {
    const position = v.pos;
    //const winkel = deg.get(v.id)!;
    //const fill = winkel > 2 ? "#e6b0aa" : "#fff"; 
    const fill = "#fff";
    return `<g>
            <circle cx="${position.x}" cy="${position.y}" r="${radiusVertex}" fill="${fill}" stroke="#333" stroke-width="2" />
            <text x="${position.x}" y="${position.y}" text-anchor="middle" dominant-baseline="central" font-size="${font_size_label}">${v.label}</text>
            <text x="${position.x}" y="${position.y + radiusVertex + 14}" text-anchor="middle" font-size="${font_size_degree}" fill="#666">d=${v.degree}</text>
            </g>`;
  }).join("\n");

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
    ${edgesSvg}
    ${nodesSvg}
    </svg>`;
}


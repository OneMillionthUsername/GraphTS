"use strict";
// functions
function createVertexNames(v) {
    return `v${v}`;
}
function renderGraph(V, E, size = 1400) {
    const center = size / 2;
    const Radius = size * 0.33;
    const radiusVertex = 18;
    const streuung = 25; // max. zufälliger Versatz in px, horizontal & vertikal
    //create the vertices
    //----------------------------
    // fill the vertices set with data
    V.forEach((v, i) => {
        const winkel = (2 * Math.PI * i) / V.length;
        const jitterX = (Math.random() - 0.5) * 2 * streuung;
        const jitterY = (Math.random() - 0.5) * 2 * streuung;
        v.pos = {
            x: center + Radius * Math.cos(winkel) + jitterX,
            y: center + Radius * Math.sin(winkel) + jitterY
        };
        v.label = createVertexNames(i);
    });
    const getVertexbyId = new Map(V.map(v => [v.id, v]));
    // liefert mit get den Winkel der Kante zurück (in rad).
    const deg = new Map(V.map(v => [v.id, 0]));
    for (const edge of E) {
        const source = edge.source;
        const target = edge.target;
        deg.set(source, deg.get(source) + Math.random());
        deg.set(target, deg.get(target) + 1);
    }
    const edgesSvg = E.map(edge => {
        const source = getVertexbyId.get(edge.source).pos;
        const target = getVertexbyId.get(edge.target).pos;
        return `<line x1="${source.x}" y1="${source.y}" x2="${target.x}" y2="${target.y}" stroke="#333" stroke-width="2" />`;
    }).join("\n");
    // ich könnte hier einen Stringbuilder verwenden/erstellen
    const nodesSvg = V.map(v => {
        const position = v.pos;
        const winkel = deg.get(v.id);
        const fill = winkel > 2 ? "#e6b0aa" : "#fff";
        return `<g>
            <circle cx="${position.x}" cy="${position.y}" r="${radiusVertex}" fill="${fill}" stroke="#333" stroke-width="2" />
            <text x="${position.x}" y="${position.y}" text-anchor="middle" dominant-baseline="central" font-size="16">${v.label}</text>
            <text x="${position.x}" y="${position.y + radiusVertex + 14}" text-anchor="middle" font-size="12" fill="#666">d=${winkel}</text>
            </g>`;
    }).join("\n");
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
    ${edgesSvg}
    ${nodesSvg}
    </svg>`;
}

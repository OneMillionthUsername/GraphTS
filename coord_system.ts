const screenSize = 1600;
const maxVertexInARowOrColumn = 20;
const maxVertexNumber = maxVertexInARowOrColumn * maxVertexInARowOrColumn;
const vertexSize = screenSize / maxVertexInARowOrColumn; //min 80*80px; max 1600px*1600px
const vertexSizeMin = 80;
const vertexSizeMax = 1600;
//const vertexSizeDefault = 100;

export function getVertexSize(size: number): number {
    if (size + 80 <= vertexSizeMin) {
        return vertexSizeMin;
    }
    if (size + 1600 >= vertexSizeMax) {
        return vertexSizeMax;
    }
    return size;
}

export function getVertexPosition(vertexIndex: number): { x: number; y: number } {
    const row = Math.floor(vertexIndex / maxVertexInARowOrColumn);
    const col = vertexIndex % maxVertexInARowOrColumn;
    return {
        x: col * vertexSize,
        y: row * vertexSize
    };
}

export function center(size: number): number {
  return size / 2;
}


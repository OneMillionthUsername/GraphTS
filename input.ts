

export function drawInputs(container: HTMLElement) {
    // create not adjacent checkbox
    const input_notAdjacent = document.createElement("input");
    input_notAdjacent.type = "checkbox";
    input_notAdjacent.id = "adjacency";
    input_notAdjacent.name = "adjacency_checkbox";

    const label_input_notAdjacent = document.createElement("label");
    label_input_notAdjacent.htmlFor = input_notAdjacent.id;
    label_input_notAdjacent.textContent = "Nicht adjazent";
    // ---------------------------------------------------------
    // create vertext count 
    const input_vertexCount = document.createElement("input");
    input_vertexCount.type = "number";
    input_vertexCount.name = "vertex_input";
    input_vertexCount.defaultValue = "0";
    input_vertexCount.id = "vertexInput";
    
    const label_input_vertexCount = document.createElement("label");
    label_input_vertexCount.htmlFor = input_vertexCount.id;
    label_input_vertexCount.textContent = "Anzahl Knoten";
    // ---------------------------------------------------------
    // create vertex degree
    const input_vertexDegree = document.createElement("input");
    input_vertexDegree.type = "number";
    input_vertexDegree.id = "vertexDegree";
    input_vertexDegree.name = "vertexDegree_input";
    input_vertexDegree.defaultValue = "0";
    
    const label_input_vertexDegree = document.createElement("label");
    label_input_vertexDegree.htmlFor = input_vertexDegree.id;
    label_input_vertexDegree.textContent = "Anzahl Knotengrad";
    // ---------------------------------------------------------
    // create vertex degree
    const input_buttonVertex = document.createElement("button");
    input_buttonVertex.type = "button";
    input_buttonVertex.id = "buttonVertex";
    input_buttonVertex.name = "setVertexInputs";
    input_buttonVertex.textContent = "Erstellen";
    // ---------------------------------------------------------
    // TODO: in Schleife ausführen, je nachdem, wieviele Kanten existieren müssen?
    // aber nicht hier!
    container.append(input_notAdjacent, label_input_notAdjacent);
    container.append(input_vertexCount, label_input_vertexCount);
    container.append(input_vertexDegree, label_input_vertexDegree);
    container.append(input_buttonVertex);
    // ---------------------------------------------------------
    
    input_buttonVertex.addEventListener("click", () => {
        const fields = container.querySelectorAll('.vertex-row');
        const fieldsCount = container.querySelectorAll('.vertex-row').length;
        
        // TODO: nach dem Löschen, bleiben die Labels stehen.
        if(fieldsCount > 0) {
                fields.forEach(field => { field.remove(); });
            }
        createVertexInputsForDegree(input_vertexCount.valueAsNumber, container);
    });
}

function createVertexInputsForDegree(count: number, container: HTMLElement) {
    for (let i = 0; i < count; i++) {
        const input_vertexCount = document.createElement("input");
        input_vertexCount.type = "number";
        input_vertexCount.name = "vertex_degree";
        input_vertexCount.defaultValue = "0";
        input_vertexCount.id = "vertexCount_" + i;

        const label_input_vertexCount = document.createElement("label");
        label_input_vertexCount.htmlFor = input_vertexCount.id;
        label_input_vertexCount.textContent = "Knoten Nr: " + i;
        const row = document.createElement("div");
        row.className = "vertex-row";
        row.append(input_vertexCount, label_input_vertexCount);
        container.append(row);
    }
}
export type GraphConfig = { vertexCount: number; regularEdgeCount: number; vertexDegrees: number[] };

export function drawInputs(container: HTMLElement, onCreate: (cfg: GraphConfig) => void) {
    // create not adjacent checkbox
    const input_notAdjacent = document.createElement("input");
    input_notAdjacent.type = "checkbox";
    input_notAdjacent.id = "adjacency";
    input_notAdjacent.name = "adjacency_checkbox";

    const label_input_notAdjacent = document.createElement("label");
    label_input_notAdjacent.htmlFor = input_notAdjacent.id;
    label_input_notAdjacent.textContent = "Adjazent";
    // ---------------------------------------------------------
    // create regulärer Graph
    const input_regulaererGraph = document.createElement("input");
    input_regulaererGraph.type = "checkbox";
    input_regulaererGraph.id = "regularGraph";
    input_regulaererGraph.name = "regularGraph_checkbox";

    const label_input_regulaererGraph = document.createElement("label");
    label_input_regulaererGraph.htmlFor = input_regulaererGraph.id;
    label_input_regulaererGraph.textContent = "Regulärer Graph";
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
    container.append(input_regulaererGraph, label_input_regulaererGraph);
    container.append(input_vertexCount, label_input_vertexCount);
    container.append(input_buttonVertex);
    // ---------------------------------------------------------
    
    input_buttonVertex.addEventListener("click", () => {
        const fields = container.querySelectorAll('.vertex-row');
        const fieldsCount = container.querySelectorAll('.vertex-row').length;
        const regularGraph = container.querySelector<HTMLInputElement>('#regularGraph');
        const vertexCount = container.querySelector<HTMLInputElement>('#vertexInput');
        const individualVertexValue = container.querySelectorAll<HTMLInputElement>('[name="vertex_degree"]');

        if(!vertexCount || !regularGraph) return;

        if(fieldsCount > 0)
            fields.forEach(field => { field.remove(); });
        
        // erstelle individuelle Knoten oder den Input dafür, sonst den regulären Graphen.
        // was wenn vertexInputs schon existiert und inhalt hat?
        if (!regularGraph.checked && vertexCount.valueAsNumber > 0) {
            if(individualVertexValue.length > 0) {
                individualVertexValue.forEach(e => {
                    // soll ich hier zuerst auf gültigkeit prüfen und erst dann befüllen?
                    if(Number.isNaN(e.valueAsNumber)) return;
                    // jedem Knoten den Grad zuweisen
                    // VertexIdMap
                    // Ich brauche eine neue Datei als Verbindung zwischen input und render für
                    // die Logik wie die Knoten mit Kanten befüllt werden!
                    // ich muss mir von dort die Knoten holen und auf diese den Knotengrad anwenden,
                    // den ich (hier) aus dem Input auslese.
                    else {
                        // TODO: hier die speziellen (nicht regulären) Graphen bauen

                        // onCreate({
                        //     vertexCount: vertexCount.valueAsNumber,
                        // })
                    }
                });
            }
            else
            createIndividualVertexInputs(container, vertexCount.valueAsNumber);
        }
        else if(regularGraph.checked) {
            onCreate({
                vertexCount: vertexCount.valueAsNumber,
                regularEdgeCount: vertexCount.valueAsNumber - 1,
                vertexDegrees: []
            });
        }
    });
}

function createIndividualVertexInputs(container: HTMLElement, count: number,) {
    for (let i = 0; i < count; i++) {
        const input_vertexIndividual = document.createElement("input");
        input_vertexIndividual.type = "number";
        input_vertexIndividual.name = "vertex_degree";
        input_vertexIndividual.defaultValue = "0";
        input_vertexIndividual.id = "vertex_degree_" + i;

        const label_input_vertexIndividual = document.createElement("label");
        label_input_vertexIndividual.htmlFor = input_vertexIndividual.id;
        label_input_vertexIndividual.textContent = "Grad für Knoten v" + i;
        const row = document.createElement("div");
        row.className = "vertex-row";
        row.append(input_vertexIndividual, label_input_vertexIndividual);
        container.append(row);
    }
}




export function options(container: HTMLElement) {
    // create not adjacent checkbox
    const input_notAdjacent = document.createElement("input");
    input_notAdjacent.type = "checkbox";
    input_notAdjacent.id = "adjacency";
    input_notAdjacent.name = "adjacency_checkbox";

    const label_input_notAdjacent = document.createElement("label");
    label_input_notAdjacent.htmlFor = input_notAdjacent.id;
    label_input_notAdjacent.textContent = "Nicht adjazent";

    container.append(input_notAdjacent, label_input_notAdjacent);
    // ---------------------------------------------------------

    // create vertext set
    const input_vertexCount = document.createElement("input");
    input_vertexCount.type = "number";
    input_vertexCount.id = "vertexCount";
    input_vertexCount.name = "vertexCount_input";
    input_vertexCount.defaultValue = "0";

    const label_input_vertexCount = document.createElement("label");
    label_input_vertexCount.htmlFor = input_vertexCount.id;
    label_input_vertexCount.textContent = "Anzahl Knoten";

    container.append(input_vertexCount, label_input_vertexCount);
    // ---------------------------------------------------------

    
}
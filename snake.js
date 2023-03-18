window.onload = () => {
    const gridWidth = 16;
    const gridHeight = 9;
    const grid = document.getElementById("the-grid");
    let gridTemplateColumns = "";
    for(let i = 0; i < gridWidth * gridHeight; i++)
    {
        createCell(grid);
        // add a column for every time i is divisible by gridHeight (I thought it would be width but I guess this works)
        if (i % gridHeight == 0)
        {
            gridTemplateColumns += "auto ";
        }
    }
    grid.style.gridTemplateColumns = gridTemplateColumns;
}

function createCell(parent) {
    let cell = document.createElement("div");
    cell.className = "cell";
    parent.appendChild(cell)
}
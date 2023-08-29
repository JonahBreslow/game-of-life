var slider = document.getElementById("boardSize");
var output = document.getElementById("boardSizeValue");
slider.oninput = function () {
    output.innerHTML = "Board Size: ".concat(slider.value, " x ").concat(slider.value);
    clearGrid();
    createGrid(parseInt(slider.value), parseInt(slider.value));
};
var gridContainer = document.getElementById("grid");
var r = document.querySelector(":root");
function createGrid(rows, cols) {
    r.style.setProperty("--grid-rows", rows.toString());
    r.style.setProperty("--grid-cols", cols.toString());
    for (var c = 0; c < rows * cols; c++) {
        var cell = document.createElement("div");
        // cell.innerText = (c + 1).toString();
        gridContainer.appendChild(cell).className = "grid-item aspect-100";
    }
}
function clearGrid() {
    var gridItems = document.querySelectorAll(".grid-item");
    gridItems.forEach(function (item) {
        item.remove();
    });
}

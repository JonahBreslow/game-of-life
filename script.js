// HTML ELEMENTS
var slider = document.getElementById("boardSize");
var output = document.getElementById("boardSizeValue");
var gridContainer = document.getElementById("grid");
var r = document.querySelector(":root");
var gridItems = document.querySelectorAll(".grid-item");
// EVENT LISTENERS 
slider.addEventListener("input", function () {
    output.innerHTML = "Board Size: ".concat(slider.value, " x ").concat(slider.value);
    clearGrid();
    createGrid(parseInt(slider.value), parseInt(slider.value));
    gridItems = document.querySelectorAll(".grid-item");
});
// need to add event listener to gridContainer and NOT 
// gridItems because gridItems are dynamically created.
// This is called event delegation.
gridContainer.addEventListener("mouseover", function (event) {
    var target = event.target;
    if (target.classList.contains("grid-item")) {
        console.log("hovered");
        target.classList.add("hovered");
    }
});
// FUNCTIONS 
function createGrid(rows, cols) {
    r.style.setProperty("--grid-rows", rows.toString());
    r.style.setProperty("--grid-cols", cols.toString());
    for (var c = 0; c < rows * cols; c++) {
        var cell = document.createElement("div");
        gridContainer.appendChild(cell).className = "grid-item aspect-100";
    }
}
function clearGrid() {
    var gridItems = document.querySelectorAll(".grid-item");
    gridItems.forEach(function (item) {
        item.remove();
    });
}

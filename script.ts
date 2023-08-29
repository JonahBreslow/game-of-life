// HTML ELEMENTS
const slider = document.getElementById("boardSize") as HTMLInputElement;
const output = document.getElementById("boardSizeValue") as HTMLElement;
const smallBoard = document.getElementById("smallBoard") as HTMLElement;
const mediumBoard = document.getElementById("mediumBoard") as HTMLElement;
const largeBoard = document.getElementById("largeBoard") as HTMLElement;
const gridContainer = document.getElementById("grid") as HTMLElement;
const r = document.querySelector(":root") as HTMLElement;
let gridItems = document.querySelectorAll(".grid-item");
let isMouseDown = false;

// EVENT LISTENERS
smallBoard.addEventListener("click", () => {
    clearGrid();
    createGrid(16, 16);
    gridItems = document.querySelectorAll(".grid-item");
});

mediumBoard.addEventListener("click", () => {
    clearGrid();
    createGrid(45, 45);
    gridItems = document.querySelectorAll(".grid-item");
});

largeBoard.addEventListener("click", () => {
    clearGrid();
    createGrid(69, 69);
    gridItems = document.querySelectorAll(".grid-item");
});

gridContainer.addEventListener("mousedown", (event) => {
  isMouseDown = true;
});

gridContainer.addEventListener("mouseup", (event) => {
  isMouseDown = false;
});

gridContainer.addEventListener("mouseover", (event) => {
  const target = event.target as HTMLElement;
  if (target.classList.contains("grid-item")) {
    if (isMouseDown) {
      console.log("hovered");
      target.classList.add("hovered");
    }
  }
});

gridContainer.addEventListener("mousedown", (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains("grid-item")) {
        target.classList.add("hovered");
    }
});

// FUNCTIONS
function createGrid(rows: number, cols: number) {
  r.style.setProperty("--grid-rows", rows.toString());
  r.style.setProperty("--grid-cols", cols.toString());
  for (let c = 0; c < rows * cols; c++) {
    let cell = document.createElement("div");
    gridContainer.appendChild(cell).className = "grid-item aspect-100";
  }
}

function clearGrid() {
  const gridItems = document.querySelectorAll(".grid-item");
  gridItems.forEach((item) => {
    item.remove();
  });
}

clearGrid();
createGrid(16, 16);
// HTML ELEMENTS
const slider = document.getElementById("boardSize") as HTMLInputElement;
const output = document.getElementById("boardSizeValue") as HTMLElement;
const gridContainer = document.getElementById("grid") as HTMLElement;
const r = document.querySelector(":root") as HTMLElement;
let gridItems = document.querySelectorAll(".grid-item");

// EVENT LISTENERS 
slider.addEventListener("input", () => {
  output.innerHTML = `Board Size: ${slider.value} x ${slider.value}`;
  clearGrid();
  createGrid(parseInt(slider.value), parseInt(slider.value));
  gridItems = document.querySelectorAll(".grid-item");
});

// need to add event listener to gridContainer and NOT 
// gridItems because gridItems are dynamically created.
// This is called event delegation.
gridContainer.addEventListener("mouseover", (event) => {
  const target = event.target as HTMLElement;
  if (target.classList.contains("grid-item")) {
    console.log("hovered");
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

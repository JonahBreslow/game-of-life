let slider = document.getElementById("boardSize") as HTMLInputElement;
let output = document.getElementById("boardSizeValue") as HTMLElement;

slider.oninput = function () {
  output.innerHTML = `Board Size: ${slider.value} x ${slider.value}`;
  clearGrid();
  createGrid(parseInt(slider.value), parseInt(slider.value));
};

const gridContainer = document.getElementById("grid") as HTMLElement;
const r = document.querySelector(":root") as HTMLElement;

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

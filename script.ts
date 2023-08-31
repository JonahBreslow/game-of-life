// HTML ELEMENTS
const slider = document.getElementById("boardSize") as HTMLInputElement;
const output = document.getElementById("boardSizeValue") as HTMLElement;
const smallBoard = document.getElementById("smallBoard") as HTMLElement;
const mediumBoard = document.getElementById("mediumBoard") as HTMLElement;
const largeBoard = document.getElementById("largeBoard") as HTMLElement;
const resetBoardBtn = document.getElementById("resetBoard") as HTMLElement;
const startGameBtn = document.getElementById("startGame") as HTMLElement;
const gridContainer = document.getElementById("grid") as HTMLElement;
const startText = document.getElementById("startText") as HTMLElement;
const r = document.querySelector(":root") as HTMLElement;
let gridItems = document.querySelectorAll(".grid-item");
let isMouseDown = false;

// EVENT LISTENERS
smallBoard.addEventListener("click", () => {
  clearGrid();
  createGrid(6, 6);
  gridItems = document.querySelectorAll(".grid-item");
});

mediumBoard.addEventListener("click", () => {
  clearGrid();
  createGrid(69, 69);
  gridItems = document.querySelectorAll(".grid-item");
});

largeBoard.addEventListener("click", () => {
  clearGrid();
  createGrid(100, 100);
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

resetBoardBtn.addEventListener("click", () => {
  resetGrid();
});

startGameBtn.addEventListener("click", () => {
  gameOfLife();
});

// FUNCTIONS
function createGrid(rows: number, cols: number) {
  r.style.setProperty("--grid-rows", rows.toString());
  r.style.setProperty("--grid-cols", cols.toString());
  for (let c = 0; c < rows * cols; c++) {
    let cell = document.createElement("div");
    cell.id = c.toString();
    gridContainer.appendChild(cell).className = "grid-item aspect-100";
  }
}

function clearGrid() {
  gridItems.forEach((item) => {
    item.remove();
  });
  startText.remove();
}

function resetGrid() {
  gridItems.forEach((item) => {
    item.classList.remove("hovered");
  });
}

function gameOfLife() {
  let nAliveCells = countAliveCells();
  let value = 1; 
  function performIterations(iterationsLeft: number) {
    console.log(`iterationsLeft: ${iterationsLeft}`)
    console.log(`value: ${value}`)
    if (iterationsLeft === 0 || value === 0) {
      return;
    }
    setTimeout(() => {
      value = oneEvolution();
      nAliveCells = countAliveCells();
      performIterations(iterationsLeft - 1);
    }, 100); 
  }
  
  performIterations(10000); // Perform 3 iterations with a delay between each
}

function countAliveCells(): number {
  let nAliveCells = 0;
  gridItems.forEach((item) => {
    nAliveCells += item.classList.contains("hovered") ? 1 : 0;
  });
  return nAliveCells;
}

function oneEvolution(): number {
  const grid = [
    parseInt(r.style.getPropertyValue("--grid-rows")!),
    parseInt(r.style.getPropertyValue("--grid-cols")!),
  ];
  const turnOn: number[] = [];
  const turnOff: number[] = [];
  gridItems.forEach((item) => {
    const index = parseInt(item.id);
    const [row, col] = indexToRowCol(index, grid);
    const nNeighbors = countNeighbors(row, col, grid);
    if (item.classList.contains("hovered")) {
      if (nNeighbors < 2 || nNeighbors > 3) {
        turnOff.push(index);
      }
    } else {
      if (nNeighbors === 3) {
        turnOn.push(index);
      }
    }
  });

  if (turnOff.length === 0 && turnOn.length === 0) {
    return 0;
  } else {
    const returnVal = turnOn.length + turnOff.length;
    turnOn.forEach((index) => {
      const cell = document.getElementById(index.toString()) as HTMLElement;
      cell.classList.add("hovered");
    });
    turnOff.forEach((index) => {
      const cell = document.getElementById(index.toString()) as HTMLElement;
      cell.classList.remove("hovered");
    });
    return returnVal;
  }
}

function countNeighbors(row: number, col: number, grid: any) {
  const index = row * grid[0].length + col;
  const neighborOffset = [
    [-1, -1], // top left
    [-1, 0], // top
    [-1, 1], // top right
    [0, -1], // left
    [0, 1], // right
    [1, -1], // bottom left
    [1, 0], // bottom
    [1, 1], // bottom right
  ];

  let count = 0;
  for (const offset of neighborOffset) {
    const neighborRow = row + offset[0];
    const neighborCol = col + offset[1];
    if (isCellOnGrid(neighborRow, grid, neighborCol)) {
      const neighborIndex = neighborRow * grid[0] + neighborCol;
      const neighborCell = document.getElementById(
        neighborIndex.toString()
      ) as HTMLElement;
      if (
        neighborIndex >= 0 &&
        neighborIndex < grid[0] * grid[1] &&
        neighborCell.classList.contains("hovered")
      ) {
        count++;
      }
    }
  }
  return count;
}

function isCellOnGrid(neighborRow: number, grid: any, neighborCol: number) {
  return (
    neighborRow >= 0 &&
    neighborRow <= grid[0] &&
    neighborCol >= 0 &&
    neighborCol <= grid[1]
  );
}

function indexToRowCol(index: number, grid: number[]): number[] {
  const row = Math.floor(index / grid[0]);
  const col = index % grid[1];
  return [row, col];
}

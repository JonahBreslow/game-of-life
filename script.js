// HTML ELEMENTS
var slider = document.getElementById("boardSize");
var output = document.getElementById("boardSizeValue");
var smallBoard = document.getElementById("smallBoard");
var mediumBoard = document.getElementById("mediumBoard");
var largeBoard = document.getElementById("largeBoard");
var resetBoardBtn = document.getElementById("resetBoard");
var startGameBtn = document.getElementById("startGame");
var gridContainer = document.getElementById("grid");
var startText = document.getElementById("startText");
var r = document.querySelector(":root");
var gridItems = document.querySelectorAll(".grid-item");
var isMouseDown = false;
// EVENT LISTENERS
smallBoard.addEventListener("click", function () {
    clearGrid();
    createGrid(6, 6);
    gridItems = document.querySelectorAll(".grid-item");
});
mediumBoard.addEventListener("click", function () {
    clearGrid();
    createGrid(69, 69);
    gridItems = document.querySelectorAll(".grid-item");
});
largeBoard.addEventListener("click", function () {
    clearGrid();
    createGrid(100, 100);
    gridItems = document.querySelectorAll(".grid-item");
});
gridContainer.addEventListener("mousedown", function (event) {
    isMouseDown = true;
});
gridContainer.addEventListener("mouseup", function (event) {
    isMouseDown = false;
});
gridContainer.addEventListener("mouseover", function (event) {
    var target = event.target;
    if (target.classList.contains("grid-item")) {
        if (isMouseDown) {
            target.classList.add("hovered");
        }
    }
});
gridContainer.addEventListener("mousedown", function (event) {
    var target = event.target;
    if (target.classList.contains("grid-item")) {
        target.classList.add("hovered");
    }
});
resetBoardBtn.addEventListener("click", function () {
    resetGrid();
});
startGameBtn.addEventListener("click", function () {
    gameOfLife();
});
// FUNCTIONS
function createGrid(rows, cols) {
    r.style.setProperty("--grid-rows", rows.toString());
    r.style.setProperty("--grid-cols", cols.toString());
    for (var c = 0; c < rows * cols; c++) {
        var cell = document.createElement("div");
        cell.id = c.toString();
        gridContainer.appendChild(cell).className = "grid-item aspect-100";
    }
}
function clearGrid() {
    gridItems.forEach(function (item) {
        item.remove();
    });
    startText.remove();
}
function resetGrid() {
    gridItems.forEach(function (item) {
        item.classList.remove("hovered");
    });
}
function gameOfLife() {
    var nAliveCells = countAliveCells();
    var value = 1;
    function performIterations(iterationsLeft) {
        console.log("iterationsLeft: ".concat(iterationsLeft));
        console.log("value: ".concat(value));
        if (iterationsLeft === 0 || value === 0) {
            return;
        }
        setTimeout(function () {
            value = oneEvolution();
            nAliveCells = countAliveCells();
            performIterations(iterationsLeft - 1);
        }, 100);
    }
    performIterations(10000); // Perform 3 iterations with a delay between each
}
function countAliveCells() {
    var nAliveCells = 0;
    gridItems.forEach(function (item) {
        nAliveCells += item.classList.contains("hovered") ? 1 : 0;
    });
    return nAliveCells;
}
function oneEvolution() {
    var grid = [
        parseInt(r.style.getPropertyValue("--grid-rows")),
        parseInt(r.style.getPropertyValue("--grid-cols")),
    ];
    var turnOn = [];
    var turnOff = [];
    gridItems.forEach(function (item) {
        var index = parseInt(item.id);
        var _a = indexToRowCol(index, grid), row = _a[0], col = _a[1];
        var nNeighbors = countNeighbors(row, col, grid);
        if (item.classList.contains("hovered")) {
            if (nNeighbors < 2 || nNeighbors > 3) {
                turnOff.push(index);
            }
        }
        else {
            if (nNeighbors === 3) {
                turnOn.push(index);
            }
        }
    });
    if (turnOff.length === 0 && turnOn.length === 0) {
        return 0;
    }
    else {
        var returnVal = turnOn.length + turnOff.length;
        turnOn.forEach(function (index) {
            var cell = document.getElementById(index.toString());
            cell.classList.add("hovered");
        });
        turnOff.forEach(function (index) {
            var cell = document.getElementById(index.toString());
            cell.classList.remove("hovered");
        });
        return returnVal;
    }
}
function countNeighbors(row, col, grid) {
    var index = row * grid[0].length + col;
    var neighborOffset = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1], // bottom right
    ];
    var count = 0;
    for (var _i = 0, neighborOffset_1 = neighborOffset; _i < neighborOffset_1.length; _i++) {
        var offset = neighborOffset_1[_i];
        var neighborRow = row + offset[0];
        var neighborCol = col + offset[1];
        if (isCellOnGrid(neighborRow, grid, neighborCol)) {
            var neighborIndex = neighborRow * grid[0] + neighborCol;
            var neighborCell = document.getElementById(neighborIndex.toString());
            if (neighborIndex >= 0 &&
                neighborIndex < grid[0] * grid[1] &&
                neighborCell.classList.contains("hovered")) {
                count++;
            }
        }
    }
    return count;
}
function isCellOnGrid(neighborRow, grid, neighborCol) {
    return (neighborRow >= 0 &&
        neighborRow <= grid[0] &&
        neighborCol >= 0 &&
        neighborCol <= grid[1]);
}
function indexToRowCol(index, grid) {
    var row = Math.floor(index / grid[0]);
    var col = index % grid[1];
    return [row, col];
}

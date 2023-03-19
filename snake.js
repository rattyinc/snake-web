Array.prototype.last = function last() {
    if (this.length == 0) {
        return null;
    }
    return this[this.length - 1];
}

Array.prototype.first = function first() {
    if (this.length == 0) {
        return null;
    }
    return this[0];
}

class SnakeCell {
  
    x;
    y;
    targetCell;
    constructor(x, y, targetCell) {
      this.x = x;
      this.y = y;
      this.targetCell = targetCell;
    }

    get domEl() {
        return gridRows[this.y][this.x];
    }

    MoveToTarget = () => {
        this.x = this.targetCell.x;
        this.y = this.targetCell.y;
    }
}

let gridRows = [];

let snake = [];
// in milliseconds
let snakeSpeed = 1000;
let snakeTimer = 0;
let lastUpdate = Date.now();

const Direction = {
    RIGHT: 0,
    UP: 1,
    LEFT: 2,
    DOWN: 3
}

let direction = Direction.UP;


window.onload = () => {

    SetupGrid();
    InitSnake();
    lastUpdate = Date.now();
    // kick off update
    Update();
}

window.addEventListener('keyup', (e) => {
    if (e.code === "ArrowRight") {
        if (direction != Direction.LEFT) {
            direction = Direction.RIGHT;
        }
    }
    else if (e.code === "ArrowUp") {
        if (direction != Direction.DOWN) {
            direction = Direction.UP;
        }
    }
    else if (e.code === "ArrowLeft") {
        if (direction != Direction.RIGHT) {
            direction = Direction.LEFT;
        }
    }
    else if (e.code === "ArrowDown") {
        if (direction != Direction.UP) {
            direction = Direction.DOWN;
        }
    }
}); 

function deltaTime() {
    return Date.now() - lastUpdate;
}

function snakeCellDOM(snakeCell) {
    return gridRows[snakeCell.y][snakeCell.x];
}

// game update loop
function Update() {
    snakeTimer += deltaTime();
    if (snakeTimer >= snakeSpeed) {
        snakeTimer = 0;
        MoveSnake();
        DrawSnake();
    }

    // these two calls should be at the end
    lastUpdate = Date.now();
    window.requestAnimationFrame(Update);
}

function InitSnake() {
    // gridRows number is Y
    // gridRows[x] number is X
    // e.g. gridRows[y][x]
    // coord system is top left is (0, 0)
    snake.push(new SnakeCell(Math.floor(gridRows[0].length / 2), Math.floor(gridRows.length / 2), null));
    snake.push(new SnakeCell(snake.last().x, snake.last().y + 1, snake.last()));
    DrawSnake();
}

function DrawSnake() {
    snake.forEach((snakeCell) => {
        snakeCell.domEl.classList.add("snake-cell");
    })
}

function MoveSnake() {
    // change all the snakeCells first to their targets
    snake.forEach((snakeCell, index) => {
        // ignore first element | the head
        if (index == 0) {
            return;
        }
        // remove the snake cell css class from the last element
        if (index == snake.length - 1) {
            snakeCell.domEl.classList.remove("snake-cell");
        }
        snakeCell.MoveToTarget();
    })
    // move the head into a new position
    switch(direction) {
        case Direction.RIGHT:
            snake.first().x += 1;
        break;
        case Direction.UP:
            snake.first().y -= 1;
        break;
        case Direction.LEFT:
            snake.first().x -= 1;
        break;
        case Direction.DOWN:
            snake.first().y += 1;
        break;
    }
}

function SetupGrid() {
    const gridDiv = document.getElementById("the-grid");
    let gridTemplateColumns = "";
    // 20 * 12 grid
    for(let i = 0; i < 240; i++) {
        if (i % 12 == 0) {
            gridTemplateColumns += "auto ";
        }
        if (i % 20 == 0) {
            gridRows.push([])
        }
        // create reference to cells
        gridRows.last().push(CreateCell(gridDiv));
    }
    gridDiv.style.gridTemplateColumns = gridTemplateColumns;
}

function CreateCell(parent) {
    let cell = document.createElement("div");
    cell.className = "cell";
    return parent.appendChild(cell);
}
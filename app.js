let board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];
let countScore = 0;

function findEmptyRows() {
    let emptyRows = [];
    for (let row = 0; row < 4; row++) {
        for (let i = 0; i < 4; i++) {
            if (board[row][i] == 0) {
                emptyRows.push([row, i]);
            }
        }
    }
    return emptyRows;
}

function get2RandomItems(list, n) {
    let result = [];
    let copyList = [...list];
    for (let i = 0; i < n; i++) {
        if (copyList.length === 0) {
            break;
        }
        let randomIndex = Math.floor(Math.random() * copyList.length);
        result.push(copyList[randomIndex]);
        copyList.splice(randomIndex, 1);
    }
    return result;
}

function getRandomItem(list) {
    if (list.length === 0) {
        return null;
    }
    let randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
}

function fillBoardWithRandomItems(board, items) {
    items.forEach(item => {
        let row = item[0];
        let col = item[1];
        board[row][col] = 2;
    });
}

function fillBoardWithRandomItem(board, item) {
    if (item !== null) {
        let row = item[0];
        let col = item[1];
        board[row][col] = 2;
    }
}

function swapRight(board) {
    for (let row = 0; row < 4; row++) {
        let boardRow = board[row].filter(cell => cell !== 0);
        const newRow = [];
        for (let i = 0; i < boardRow.length; i++) {
            if (boardRow[i] === boardRow[i + 1]) {
                const mergedValue = boardRow[i] * 2;
                countScore += mergedValue;
                newRow.push(mergedValue);
                i++;
            } else {
                newRow.push(boardRow[i]);
            }
        }
        while (newRow.length < 4) {
            newRow.unshift(0);
        }
        board[row] = newRow;
    }
    return board;
}

function swapLeft(board) {
    for (let row = 0; row < 4; row++) {
        let boardRow = board[row].filter(cell => cell !== 0);
        const newRow = [];
        for (let i = 0; i < boardRow.length; i++) {
            if (boardRow[i] === boardRow[i + 1]) {
                const mergedValue = boardRow[i] * 2;
                countScore += mergedValue;
                newRow.push(mergedValue);
                i++;
            } else {
                newRow.push(boardRow[i]);
            }
        }
        while (newRow.length < 4) {
            newRow.push(0);
        }
        board[row] = newRow;
    }
    return board;
}

function transposeBoard(board) {
    const newBoard = [];
    for (let row = 0; row < 4; row++) {
        const newRow = [];
        for (let col = 0; col < 4; col++) {
            newRow.push(board[col][row]);
        }
        newBoard.push(newRow);
    }
    return newBoard;
}

function swapDown() {
    let transposedBoard = transposeBoard(board);
    transposedBoard = swapRight(transposedBoard);
    return transposeBoard(transposedBoard);
}

function swapUp() {
    let transposedBoard = transposeBoard(board);
    transposedBoard = swapLeft(transposedBoard);
    return transposeBoard(transposedBoard);
}

function checkGameOver(board) {
    if (findEmptyRows().length > 0) {
        return false;
    }
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (col < 3 && board[row][col] === board[row][col + 1]) {
                return false;
            }
            if (row < 3 && board[row][col] === board[row + 1][col]) {
                return false;
            }
        }
    }
    return true;
}

function initializeGame() {
    let emptyRows = findEmptyRows();
    let randomItems = get2RandomItems(emptyRows, 2);
    fillBoardWithRandomItems(board, randomItems);
    renderBoard();
}

function renderBoard() {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            let cell = document.getElementById(`cell-${row}-${col}`);
            cell.textContent = board[row][col] === 0 ? '' : board[row][col];
            cell.className = `game-cell value-${board[row][col]}`;
        }
    }
    document.getElementById('score').textContent = `Score: ${countScore}`;
}

function makeMove(direction) {
    let oldBoard = JSON.stringify(board);
    switch (direction) {
        case 'left':
            board = swapLeft(board);
            break;
        case 'right':
            board = swapRight(board);
            break;
        case 'up':
            board = swapUp();
            break;
        case 'down':
            board = swapDown();
            break;
    }
    if (oldBoard !== JSON.stringify(board)) {
        let emptyRows = findEmptyRows();
        let randomItem = getRandomItem(emptyRows);
        fillBoardWithRandomItem(board, randomItem);
    }
    renderBoard();
    if (checkGameOver(board)) {
        alert("Game Over!");
    }
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
            makeMove('left');
            break;
        case 'ArrowRight':
            makeMove('right');
            break;
        case 'ArrowUp':
            makeMove('up');
            break;
        case 'ArrowDown':
            makeMove('down');
            break;
    }
});

document.getElementById('restart-button').addEventListener('click', () => {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    countScore = 0;
    initializeGame();
});

initializeGame();

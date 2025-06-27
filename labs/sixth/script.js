document.addEventListener('DOMContentLoaded', startApp);

async function startApp() {
    try {
        const response = await fetch('levels.json');
        const levelsConfig = await response.json();
        initializeGame(levelsConfig);
    } catch (error) {
        console.error('Не вдалося завантажити рівні:', error);
    }
}

let boardState = [];
let stepsCount = 0;
let optimalMoves = 0;

function initializeGame(levels) {
    const levelSelectEl = document.getElementById('levelSelect');

    Object.keys(levels).forEach(levelKey => {
        const optionEl = document.createElement('option');
        optionEl.value = levelKey;
        optionEl.textContent = levelKey.toUpperCase();
        levelSelectEl.appendChild(optionEl);
    });

    levelSelectEl.addEventListener('change', () => {
        if (!levelSelectEl.value) {
            resetBoard();
        } else {
            loadLevel(levels[levelSelectEl.value]);
        }
    });

    document.getElementById('resetBtn').addEventListener('click', resetBoard);
}

function loadLevel({ grid: layout, minSteps: movesAllowed }) {
    boardState = layout.map(row => [...row]);
    stepsCount = 0;
    optimalMoves = movesAllowed;

    document.getElementById('moveCount').textContent = stepsCount;
    document.getElementById('minSteps').textContent = optimalMoves;
    renderBoard();
}

function resetBoard() {
    boardState = [];
    document.getElementById('grid').innerHTML = '';
    document.getElementById('moveCount').textContent = '0';
    document.getElementById('minSteps').textContent = '–';
}

function renderBoard() {
    const gridContainer = document.getElementById('grid');
    gridContainer.innerHTML = '';
    gridContainer.style.gridTemplateColumns = `repeat(${boardState[0].length}, 40px)`;

    boardState.forEach((row, rowIndex) => {
        row.forEach((cellValue, colIndex) => {
            const cellEl = document.createElement('div');
            cellEl.className = `cell ${cellValue ? 'on' : 'off'}`;
            cellEl.dataset.row = rowIndex;
            cellEl.dataset.col = colIndex;
            cellEl.addEventListener('click', handleCellClick);
            gridContainer.appendChild(cellEl);
        });
    });
}

function handleCellClick(event) {
    const r = Number(event.currentTarget.dataset.row);
    const c = Number(event.currentTarget.dataset.col);

    flipCell(r, c);
    flipCell(r - 1, c);
    flipCell(r + 1, c);
    flipCell(r, c - 1);
    flipCell(r, c + 1);

    stepsCount++;
    document.getElementById('moveCount').textContent = stepsCount;
    updateBoardUI();

    if (isGameWon()) {
        setTimeout(() => {
            alert(`Вітаю! Ви перемогли за ${stepsCount} ходів (мінімум — ${optimalMoves}).`);
        }, 100);
    }
}

function flipCell(r, c) {
    if (r < 0 || r >= boardState.length || c < 0 || c >= boardState[0].length) return;
    boardState[r][c] = boardState[r][c] ? 0 : 1;
}

function updateBoardUI() {
    document.querySelectorAll('#grid .cell').forEach(cellEl => {
        const r = Number(cellEl.dataset.row);
        const c = Number(cellEl.dataset.col);
        cellEl.className = `cell ${boardState[r][c] ? 'on' : 'off'}`;
    });
}

function isGameWon() {
    return boardState.every(row => row.every(val => val === 0));
}
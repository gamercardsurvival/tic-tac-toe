let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;

function makeMove(cell, index) {
    if (gameOver || board[index] !== '') {
        return;
    }
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkWin();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('turn').textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (board[a] === board[b] && board[b] === board[c] && board[a] !== '') {
            gameOver = true;
            document.getElementById('turn').textContent = `Player ${board[a]} wins!`;
            return;
        }
    }
    if (!board.includes('')) {
        gameOver = true;
        document.getElementById('turn').textContent = 'It\'s a draw!';
    }
}

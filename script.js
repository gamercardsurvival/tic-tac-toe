let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;
let player1Score = 0;
let player2Score = 0;

document.getElementById('play-button').addEventListener('click', startGame);

function startGame() {
    document.querySelector('.start-screen').style.display = 'none';
    document.querySelector('.game-board').style.display = 'grid';
    document.getElementById('reset-button').style.display = 'inline-block';
    document.getElementById('turn').textContent = `Player ${currentPlayer}'s turn`;
}

function makeMove(cell, index) {
    if (gameOver || board[index] !== '') {
        return;
    }
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    if (currentPlayer === 'X') {
        cell.classList.add('X');
    } else {
        cell.classList.add('O');
    }
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
            document.getElementById('result').textContent = `Congratulations, Player ${board[a]} won!`;
            if (board[a] === 'X') {
                player1Score++;
                document.getElementById('player1-score').textContent = `Player 1: ${player1Score}`;
            } else {
                player2Score++;
                document.getElementById('player2-score').textContent = `Player 2: ${player2Score}`;
            }
            return;
        }
    }
    if (!board.includes('')) {
        gameOver = true;
        document.getElementById('turn').textContent = 'It\'s a draw!';
        document.getElementById('result').textContent = 'Game ended in a draw!';
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    document.getElementById('turn').textContent = `Player ${currentPlayer}'s turn`;
    document.getElementById('result').textContent = '';
    document.querySelectorAll('.cell').forEach((cell) => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
}

document.querySelectorAll('.cell').forEach((cell, index) => {
    cell.addEventListener('click', () => {
        makeMove(cell, index);
    });
});

document.getElementById('reset-button').addEventListener('click', resetGame);

    const boardElement = document.getElementById('board');
    const statusElement = document.getElementById('status');
    const resetBtn = document.getElementById('resetBtn');

    let board = Array(9).fill(null);
    let currentPlayer = 'X';
    let gameOver = false;

    function createBoard() {
      boardElement.innerHTML = '';
      board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        if (cell) {
          cellElement.textContent = cell;
          cellElement.classList.add('taken');
        }
        cellElement.addEventListener('click', () => handleCellClick(index));
        boardElement.appendChild(cellElement);
      });
    }

    function handleCellClick(index) {
      if (board[index] || gameOver) return;
      board[index] = currentPlayer;
      if (checkWinner()) {
        statusElement.textContent = `Player ${currentPlayer} wins!`;
        gameOver = true;
      } else if (board.every(cell => cell)) {
        statusElement.textContent = "It's a draw!";
        gameOver = true;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusElement.textContent = `Player ${currentPlayer}'s turn`;
      }
      createBoard();
    }

    function checkWinner() {
      const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
      return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
      });
    }

    resetBtn.addEventListener('click', () => {
      board = Array(9).fill(null);
      currentPlayer = 'X';
      gameOver = false;
      statusElement.textContent = `Player ${currentPlayer}'s turn`;
      createBoard();
    });

    createBoard();
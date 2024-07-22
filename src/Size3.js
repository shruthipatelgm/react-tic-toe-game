import React, { useState } from 'react';
import './App.css';

const createBoard = () => {
  return Array(3).fill(null).map(() => Array(3).fill(null));
};

const checkWin = (board, player) => {
  const size = board.length;

  // Check rows
  for (let row = 0; row < size; row++) {
    if (board[row].every(cell => cell === player)) return true;
  }

  // Check columns
  for (let col = 0; col < size; col++) {
    if (board.every(row => row[col] === player)) return true;
  }

  // Check diagonals
  if (board.every((row, i) => row[i] === player)) return true;
  if (board.every((row, i) => row[size - 1 - i] === player)) return true;

  return false;
};

const isDraw = (board) => {
  return board.flat().every(cell => cell !== null);
};

function App() {
  const [board, setBoard] = useState(createBoard());
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('Start Game');
    console.log(board,"board");
  const handleClick = (row, col) => {
    if (board[row][col] !== null || gameOver) return;

    const newBoard = board.map((r, i) => 
      r.map((cell, j) => (i === row && j === col ? currentPlayer : cell))
    );

    setBoard(newBoard);

    if (checkWin(newBoard, currentPlayer)) {
      setMessage(`Player ${currentPlayer} wins!`);
      setGameOver(true);
    } else if (isDraw(newBoard)) {
      setMessage("It's a draw!");
      setGameOver(true);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(createBoard());
    setCurrentPlayer('X');
    setGameOver(false);
    setMessage('Start Game');
  };

  return (
    <div className="App">
      <h1>Tic-Tac-Toe</h1>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <button 
                key={colIndex} 
                className="cell" 
                onClick={() => handleClick(rowIndex, colIndex)}
              >
                {cell}
              </button>
            ))}
          </div>
        ))}
      </div>
      <p>{message}</p>
      {gameOver && <button onClick={resetGame}>Reset Game</button>}
    </div>
  );
}

export default App;

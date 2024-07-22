import React, { useState } from 'react';
import './App.css';

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const createBoard = () => Array(9).fill(null);

const checkWin = (board, player) => {
  return winPatterns.some(pattern => 
    pattern.every(index => board[index] === player)
  );
};

const isDraw = (board) => board.every(cell => cell !== null);

function App() {
  const [board, setBoard] = useState(createBoard());
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  const handleClick = (index) => {
    if (board[index] !== null || gameOver) return;

    const newBoard = board.map((cell, i) => (i === index ? currentPlayer : cell));
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
    setMessage('');
  };

  return (
    <div className="App">
      <h1>Tic-Tac-Toe</h1>
      <div className="board">
        {board.map((cell, index) => (
          <button 
            key={index} 
            className="cell" 
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>
      <p>{message}</p>
      {gameOver && <button onClick={resetGame}>Reset Game</button>}
    </div>
  );
}

export default App;

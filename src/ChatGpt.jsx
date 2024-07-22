import React, { useState } from 'react';
import './App.css';

const createBoard = (size) => {
  return Array(size).fill(null).map(() => Array(size).fill(null));
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

function ChatGpt() {
  const [size, setSize] = useState(3);
  const [board, setBoard] = useState(createBoard(size));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');
  console.log(board,"board");
  const handleClick = (row, col) => {
    debugger
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

  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setSize(newSize);
    setBoard(createBoard(newSize));
    setCurrentPlayer('X');
    setGameOver(false);
    setMessage('');
  };

  return (
    <div className="App">
      <h1>Tic-Tac-Toe</h1>
      <label>
        Board size:
        <input 
          type="number" 
          value={size} 
          onChange={handleSizeChange} 
          min="3" 
          max="10" 
        />
      </label>
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
    </div>
  );
}

export default ChatGpt;

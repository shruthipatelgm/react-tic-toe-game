import React, { useState } from 'react';
import '../App.css';

const generateWinningPatterns = (size) => {
  const patterns = [];

  // Rows
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      row.push(i * size + j);
    }
    console.log(row,"row")
    patterns.push(row);
  }

  // Columns
  for (let i = 0; i < size; i++) {
    const col = [];
    for (let j = 0; j < size; j++) {
      col.push(j * size + i);
    }
    console.log(col,"col")
    patterns.push(col);
  }

  // Main diagonal
  const mainDiagonal = [];
  for (let i = 0; i < size; i++) {
    mainDiagonal.push(i * size + i);
  }
  patterns.push(mainDiagonal);
  console.log(mainDiagonal,"mainDiagonal")
  // Anti-diagonal
  const antiDiagonal = [];
  for (let i = 0; i < size; i++) {
    antiDiagonal.push(i * size + (size - 1 - i));
  }
  console.log(antiDiagonal,"antiDiagonal")
  patterns.push(antiDiagonal);

  console.log(patterns,"patterns")
  return patterns;
};

const createBoard = (size) => Array(size * size).fill(null);

const checkWin = (board, player, winPatterns) => {
  return winPatterns.some(pattern => 
    pattern.every(index => board[index] === player)
  );
};

const isDraw = (board) => board.every(cell => cell !== null);

function DynamicSize() {
  const [size, setSize] = useState(3);
  const [board, setBoard] = useState(createBoard(size));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');
  const [winPatterns, setWinPatterns] = useState(generateWinningPatterns(size));

  const handleClick = (index) => {
    if (board[index] !== null || gameOver) return;

    const newBoard = board.map((cell, i) => (i === index ? currentPlayer : cell));
    setBoard(newBoard);

    if (checkWin(newBoard, currentPlayer, winPatterns)) {
      setMessage(`Player ${currentPlayer} wins!`);
      setGameOver(true);
    } else if (isDraw(newBoard)) {
      setMessage("It's a draw!");
      setGameOver(true);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const handleSizeChange = (event) => {
    const newSize = parseInt(event.target.value);
    setSize(newSize);
    setBoard(createBoard(newSize));
    setWinPatterns(generateWinningPatterns(newSize));
    setCurrentPlayer('X');
    setGameOver(false);
    setMessage('');
  };

  const resetGame = () => {
    setBoard(createBoard(size));
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
      <div className="board" style={{ gridTemplateColumns: `repeat(${size}, 50px)` }}>
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

export default DynamicSize;

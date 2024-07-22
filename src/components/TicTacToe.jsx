import { useState } from 'react';
import useTicTocToe from '../hook/use-tic-tac-toe';

const initalBoard = () => Array(9).fill(null);

const TicTacToe = () =>{
  const {board,calculateWinner,resetGame,getStatusMessage,handleClick}= useTicTocToe();
  console.log(board,"board");
  return (
    <div className='game'>
        <div className='status'>
          {getStatusMessage()}
          <button className='reset' onClick={resetGame}>Reset Game</button>
        </div>

        <div className='board'>
          {board?.map((b,index)=>{
            return <button className='cell' key={index} 
            onClick={()=>handleClick(index)}
            disabled={b!==null}
            >{board[index]}</button>
          })}
        </div>
    </div>
  );
}

export default TicTacToe;

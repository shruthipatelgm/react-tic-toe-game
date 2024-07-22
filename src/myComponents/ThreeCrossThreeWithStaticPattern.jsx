import { useState } from "react";
import "../App.css"
const createBoard = () =>Array(9).fill(null);
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
const ThreeCrossThreeWithStaticPattern = () =>{
    const [board,setBoard] = useState(createBoard());
    const [currentPlayer,setCurrentPlayer] = useState("X");
    const [isGameOver,setIsGameOver] = useState(false);
    const [message,setMessage] = useState("")

    const checkWinner = (updatedboard) =>{
       return winPatterns.some(pattern=>pattern.every(index=>updatedboard[index]==currentPlayer));
    }

    const resetGame = () =>{
        setBoard(createBoard());
        setIsGameOver(false);
    }

    const isDraw = (updatedBoard) =>{
        return updatedBoard.every(cell=>cell!==null);
    }
    const handleClick = (index) =>{
        if(checkWinner(board) || isGameOver) return;
        const newBoard = board.map((cell,i)=>i==index ? currentPlayer :cell);
        setBoard(newBoard);
        if(checkWinner(newBoard)){
            setMessage(`Player ${currentPlayer} is winner`);
            setIsGameOver(true);
        }
        else if(isDraw(newBoard)){
            setMessage("Its a draw game, please try again");
            setIsGameOver(true);
        }else{
            setCurrentPlayer(currentPlayer=="X"?'0':'X');
        }
    }
    return <div className="App">
            <h1>Tic Tac Toe Game</h1>
            {!isGameOver?<p>Now Playing: {currentPlayer}</p>: <p>{message}</p>}
            <div className="board">
                {board.map((cell,index)=><button
                    key={index}
                    className="cell"
                    onClick={()=>handleClick(index)}
                    >{cell}</button>
                )}
            </div>
            
            <button onClick={resetGame}>Reset Game</button>
    </div>
}

export default ThreeCrossThreeWithStaticPattern;
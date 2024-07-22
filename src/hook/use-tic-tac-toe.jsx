import { useState } from "react";

const initalBoard = () => Array(9).fill(null);

const useTicTocToe = () =>{
    const [board,setBoard] = useState(initalBoard())
    const [isXNext,setIsXNext] = useState(true);

    const WINNING_PATTERNS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    ];

    const calculateWinner = (currentBoard) =>{
        for(let i=0;i<WINNING_PATTERNS.length;i++){
            const [a,b,c] = WINNING_PATTERNS[i];
            
            if (
                currentBoard[a] &&
                currentBoard[a] === currentBoard[b] &&
                currentBoard[a] === currentBoard[c]
              ) {
                return currentBoard[a];
              }
        }
        return null;
    };

    const handleClick = (index) =>{
        //check winner
        const winner = calculateWinner(board);
        if(winner||board[index]) return;

        const newBoard = [...board];
        newBoard[index] = isXNext ? 'X' : '0';
        setBoard(newBoard);
        setIsXNext(!isXNext)
    }

    const getStatusMessage = () =>{
        const winner = calculateWinner(board);
        if(winner) return   `Player ${winner} wins`
        if(!board.includes(null)) return "Its a draw";
        return `Player ${isXNext ?"X":"0"} turn`
    };

    const resetGame = () =>{
        setBoard(initalBoard());
        setIsXNext(true);
    };

    return {board,handleClick,calculateWinner,getStatusMessage,resetGame};
}

export default useTicTocToe;
import { useState, useEffect, useRef } from "react";
import { ActiveTetro } from "../classes/ActiveTetro";
import {DIRECTION, getEmptyBoard, getOppositeDirection} from "../utils/utils";

export const useBoard = () => {
    const [board, setBoard] = useState(getEmptyBoard());

    const player = useRef(new ActiveTetro());
    const isFirstRender = useRef(true);
   // if(isFirstRender.current === true){
   //     player.current.drawOn(board);
   //     isFirstRender.current = false;
   //     setBoard([...board]);
   // }

    const initializePlayer = () =>{
        player.current = new ActiveTetro();
        player.current.drawOn(board);
        setBoard([...board]);
    }
    useEffect(() => {
        console.log("test");
        // updateBoard();
    }, []);

    const moveLeft = () =>{

        updateBoard(DIRECTION.left);
    }

    const moveRight = () => {
        updateBoard(DIRECTION.right);
    }

    const moveDown = () => {
        updateBoard(DIRECTION.down);
    }
    const rotate = () => {
        player.current.eraseFrom(board);
        let output = player.current.tetromino.shape[0].map((_, colIndex) => player.current.tetromino.shape.map(row => row[colIndex]));
        player.current.tetromino.shape = output;
        if(player.current.checkCollision(board)){
            output = player.current.tetromino.shape[0].map((_, colIndex) => player.current.tetromino.shape.map(row => row[colIndex]));
            output = output[0].map((_, colIndex) => output.map(row => row[colIndex]));
            output = output[0].map((_, colIndex) => output.map(row => row[colIndex]));
            player.current.tetromino.shape = output;
        }
        player.current.drawOn(board);
    }
/*
// Convert rows to columns
    const mtrx = matrix.map((_, index) => matrix.map(column => column[index]));
    // Reverse each row to rotate the matrix
    if (dir > 0) return mtrx.map(row => row.reverse());
    return mtrx.reverse();
*/

    const updateBoard = (direction= DIRECTION.down) => {

        player.current.eraseFrom(board);

        player.current.updatePosition(direction);

        let isCollided = player.current.checkCollision(board);

        if (isCollided) {
            player.current.updatePosition(getOppositeDirection(direction));
        }

        player.current.drawOn(board);

        if (isCollided && direction === DIRECTION.down) {
            let linesToErase = [];
            for(let i = 0; i < 20; i++){
                let isLineComplete = true;
                for(let j = 0; j < 12; j++){
                    if(board[i][j] === null){
                        isLineComplete = false;
                    }
                }
                if(isLineComplete){
                    linesToErase.push(i);
                }
            }
            eraseLine(linesToErase, board);
            player.current = new ActiveTetro();
            player.current.drawOn(board);
        }

        setBoard([...board]);
    };

    function eraseLine(linesToErase, board){
        for(let i = 0; i < linesToErase.length; i++){
           let lineIndex = linesToErase[i] - i;
           for(let k = lineIndex; k >= 0; k--){
                for(let m = 0; m < 12; m++){
                    board[k][m] = board[k - 1][m];
                }
           }
        }
    }

    return [updateBoard, board, moveRight, moveLeft, moveDown, rotate, initializePlayer];
};
import { useState, useEffect, useRef } from "react";
import { ActiveTetro } from "../classes/ActiveTetro";
import {DIRECTION, getEmptyBoard, getOppositeDirection} from "../utils/utils";

export const useBoard = () => {
    const [board, setBoard] = useState(getEmptyBoard());
    const [score, setScore] = useState(0);
    const player = useRef(new ActiveTetro());
    const isFirstRender = useRef(true);
   // if(isFirstRender.current === true){
   //     player.current.drawOn(board);
   //     isFirstRender.current = false;
   //     setBoard([...board]);
   // }

    const [gameOver, setGameOver] = useState(true);
    const initializePlayer = () =>{
        if(gameOver){
            const freshBoard = getEmptyBoard();;
            console.log(freshBoard)
            player.current = new ActiveTetro();
            player.current.drawOn(freshBoard);
            setBoard([...freshBoard]);
            setGameOver(false);
            setScore(0);
        }
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
    const rotateRight = () => {
        player.current.eraseFrom(board);
        var result = [];
        player.current.tetromino.shape.forEach(function (a, i, aa) {
            a.forEach(function (b, j, bb) {
                result[bb.length - j - 1] = result[bb.length - j - 1] || [];
                result[bb.length - j - 1][i] = b;
            });
        });
        player.current.tetromino.shape = result;
        player.current.drawOn(board);
    }

    const rotateLeft = () => {
        player.current.eraseFrom(board);
        var result = [];
        player.current.tetromino.shape.forEach(function (a, i, aa) {
            a.forEach(function (b, j, bb) {
                result[j] = result[j] || [];
                result[j][aa.length - i - 1] = b;
            });
        });
        player.current.tetromino.shape = result;
        if(player.current.checkCollision(board)){
            rotateRight();
        } else {
            player.current.drawOn(board);
        }
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
        //stop game cand ajunge sus
        if(isCollided && player.current.currentPos.row === 0){
            player.current.drawOn(board);
            setGameOver(true);
            console.log("game over!!!");
           //setBoard(getEmptyBoard());
            return;
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
                    setScore((prev) => prev + 1);
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
           let lineIndex = linesToErase[i];
           for(let k = lineIndex; k > 0; k--){
                for(let m = 0; m < 12; m++){
                    board[k][m] = board[k - 1][m];
                }
           }
        }
    }

    return [updateBoard, board, moveRight, moveLeft, moveDown, rotateLeft, initializePlayer, gameOver, score];
};
import { useState, useEffect, useRef } from "react";
import { ActiveTetro } from "../classes/ActiveTetro";
import {DIRECTION, getEmptyBoard, getOppositeDirection} from "../utils/utils";

export const useBoard = () => {
    const [board, setBoard] = useState(getEmptyBoard());

    const player = useRef(new ActiveTetro());

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
            player.current = new ActiveTetro();
        }

        setBoard([...board]);
    };

    return [updateBoard, board, moveRight, moveLeft, moveDown, rotate];
};
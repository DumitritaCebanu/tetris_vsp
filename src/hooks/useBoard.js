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

    return [updateBoard, board, moveRight, moveLeft];
};
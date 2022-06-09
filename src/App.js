import React, {useState, useCallback, useEffect} from "react";

import { GameContainer } from "./components/GameContainer";
import { RightPanel } from "./components/RightPanel";
import { TileBoard } from "./components/TitleBoard";
import { useGameTime } from "./hooks/useGameTime";
import { useBoard } from "./hooks/useBoard";
import "./App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {

    const [speed, setSpeed] = useState(1000);

    const  [updateBoard, board, moveRight, moveLeft, moveDown, rotateLeft, initializePlayer, gameOver, score] = useBoard();

    const onTick = useCallback(() => {
        console.log("tic tic");
        updateBoard();
    }, [gameOver]);

    const { isRunning, startTime, stopTime} = useGameTime({ onTick, speed });

    useEffect( () => {
        if(gameOver && isRunning){
            stopTime();
            setSpeed(1000);
        }
    },[gameOver])

    useEffect(() => {
        setSpeed((prev) => 0.9 * prev);
    }, [score])

    return (
        <GameContainer>
            <TileBoard board={board} />
            <RightPanel>
                <button className="button" onClick={()=>{initializePlayer(); startTime()}} disabled={isRunning && !gameOver} >
                    START
                </button>
                <button className="button" onClick={stopTime} disabled={!isRunning || gameOver}>
                    STOP
                </button>
                <button className="button" onClick={() => setSpeed((prev) => prev - 100)}>
                    GO FASTER
                </button>
                <span className="text">time is {isRunning ? "running" : "not running"}</span>
                <div className="btn-group">
                    <button className="button1" onClick={moveLeft} >left</button>
                    <button className="button1" onClick={moveRight}>right</button>
                    <button className="button1" onClick={moveDown}>down</button>
                    <button className="button1" onClick={rotateLeft}>rotate</button>
                    <span className="text-score"> Score: {score} </span>
               </div>
            </RightPanel>
        </GameContainer>
    );
}

export default App;
import React, { useState, useCallback } from "react";

import { GameContainer } from "./components/GameContainer";
import { RightPanel } from "./components/RightPanel";
import { TileBoard } from "./components/TitleBoard";
import { useGameTime } from "./hooks/useGameTime";
import { useBoard } from "./hooks/useBoard";
import "./App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {

    const [speed, setSpeed] = useState(1000);

    const  [updateBoard, board, moveRight, moveLeft, moveDown, rotate, initializePlayer] = useBoard();

    const onTick = useCallback(() => {
        console.log("tic tic");
        updateBoard();
    }, []);

    const { isRunning, startTime, stopTime} = useGameTime({ onTick, speed });

    return (
        <GameContainer>
            <TileBoard board={board} />
            <RightPanel>
                <button className="button" onClick={()=>{initializePlayer(); startTime()}} disabled={isRunning}>
                    START
                </button>
                <button className="button" onClick={stopTime} disabled={!isRunning}>
                    STOP
                </button>
                <button className="button" onClick={() => setSpeed((prev) => prev - 100)}>
                    GO FASTER
                </button>
                <span className="text">time is {isRunning ? "running" : "not running"}</span>
                <div className="btn-group">
                    <button className="button1" onClick={moveRight}>right</button>
                    <button className="button1" onClick={moveLeft} >left</button>
                    <button className="button1" onClick={moveDown}>down</button>
                    <button className="button1" onClick={rotate}>rotate</button>
               </div>
            </RightPanel>
        </GameContainer>
    );
}

export default App;
import React, { useState, useCallback } from "react";

import { GameContainer } from "./components/GameContainer";
import { RightPanel } from "./components/RightPanel";
import { TileBoard } from "./components/TitleBoard";
import { useGameTime } from "./hooks/useGameTime";
import { useBoard } from "./hooks/useBoard";
import "./App.css";

function App() {

    const [speed, setSpeed] = useState(1000);

    const  [updateBoard, board, moveRight, moveLeft] = useBoard();

    const onTick = useCallback(() => {
        console.log("tic tic");
        updateBoard();
    }, []);

    const { isRunning, startTime, stopTime } = useGameTime({ onTick, speed });

    return (
        <GameContainer>
            <TileBoard board={board} />
            <RightPanel>
                <button className="button" onClick={startTime} disabled={isRunning}>
                    START
                </button>
                <button className="button" onClick={stopTime} disabled={!isRunning}>
                    STOP
                </button>
                <button className="button" onClick={() => setSpeed((prev) => prev - 100)}>
                    GO FASTER
                </button>
                <span className="text">time is {isRunning ? "running" : "not running"}</span>
                <button onClick={moveRight}>right</button>
                <button onClick={moveLeft}>left</button>
            </RightPanel>
        </GameContainer>
    );
}

export default App;
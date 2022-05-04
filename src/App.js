import React, { useState, useCallback } from "react";

import { GameContainer } from "./components/GameContainer";
import { RightPanel } from "./components/RightPanel";
import { TileBoard } from "./components/TitleBoard";
import { useGameTime } from "./hooks/useGameTime";
import { useBoard } from "./hooks/useBoard";
import "./App.css";

function App() {

    const [speed, setSpeed] = useState(1000);

    const  [updateBoard, board] = useBoard();

    const onTick = useCallback(() => {
        console.log("tic tic");
        updateBoard();
    }, []);

    const { isRunning, startTime, stopTime } = useGameTime({ onTick, speed });

    return (
        <GameContainer>
            <TileBoard board={board} />
            <RightPanel>
                <button onClick={startTime} disabled={isRunning}>
                    START
                </button>
                <button onClick={stopTime} disabled={!isRunning}>
                    STOP
                </button>
                <button onClick={() => setSpeed((prev) => prev - 100)}>
                    GO FASTER
                </button>
                <span>time is {isRunning ? "curge" : "not curge"}</span>
            </RightPanel>
        </GameContainer>
    );
}

export default App;
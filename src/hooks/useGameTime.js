import { useCallback, useEffect, useRef, useState } from "react";

export function useGameTime({ onTick: handleTick, speed }) {
    const timeInterval = useRef(null);
    const [isRunning, setIsRunning] = useState(false);

    const startTime = useCallback(() => {
        console.log("starting time");

        if (timeInterval.current) {
            return console.warn("Timer already started");
        }

        timeInterval.current = setInterval(() => {
            handleTick();
        }, speed);
        setIsRunning(true);
    }, [handleTick, speed]);

    const stopTime = useCallback(() => {
        console.log("stopping time");

        if (!timeInterval.current) {
            console.warn("Nothing to stop!");
        }

        clearInterval(timeInterval.current);
        timeInterval.current = null;
        setIsRunning(false);
    }, [timeInterval]);

    useEffect(() => {
        if (!timeInterval.current) return;

        console.log('test');
        stopTime();
        startTime();
    }, [startTime, stopTime, speed]);

    return { isRunning, startTime, stopTime };
}
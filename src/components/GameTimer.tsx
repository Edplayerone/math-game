import React, { useEffect } from "react";

interface GameTimerProps {
  timeLeft: number;
  isRunning: boolean;
  onTimeUp: () => void;
}

const GameTimer: React.FC<GameTimerProps> = ({
  timeLeft,
  isRunning,
  onTimeUp,
}) => {
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        //Simulate time passing
      }, 1000);
    } else if (timeLeft <= 0) {
      onTimeUp();
    }
    return () => clearInterval(interval!);
  }, [isRunning, timeLeft, onTimeUp]);

  return <p>Time Left: {timeLeft} seconds</p>;
};

export default GameTimer;

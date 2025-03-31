import { useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { generateEquation } from "./utils/generateEquation";

function App() {
  const [count, setCount] = useState(0);
  const [equation, setEquation] = useState("");
  const [answer, setAnswer] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null); // Add ref for input element

  useEffect(() => {
    const { equation: newEquation, answer: newAnswer } = generateEquation({
      difficulty: 3,
    });
    setEquation(newEquation);
    setAnswer(newAnswer);
    setIsCorrect(null);
    setUserInput("");
  }, [count]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (inputRef.current) {
      inputRef.current.focus(); // Focus on input when component mounts
    }

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft <= 0) {
      setIsGameOver(true);
    }

    return () => clearInterval(interval!);
  }, [isRunning, timeLeft]);

  const handleStartStop = () => setIsRunning((prev) => !prev);

  const handleReset = () => {
    setTimeLeft(10);
    setIsRunning(false);
    setIsGameOver(false);
    setCount((prev) => prev + 1);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUserInput(event.target.value);

  const handleSubmit = () => {
    const userAnswer = parseInt(userInput, 10);
    if (isNaN(userAnswer)) {
      setIncorrectAnswers((prev) => prev + 1);
      setIsCorrect(false);
      return;
    }
    setIsCorrect(userAnswer === answer);
    if (userAnswer === answer) {
      setCorrectAnswers((prev) => prev + 1);
      setCount((prev) => prev + 1);
    } else {
      setIncorrectAnswers((prev) => prev + 1);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Math Game</h1>
      <div className="card">
        {isGameOver ? (
          <div>
            <h2>Game Over!</h2>
            <button onClick={handleReset}>Play Again</button>
          </div>
        ) : (
          <>
            <h2>{equation} = ?</h2>
            <input
              type="number"
              value={userInput}
              onChange={handleInput}
              onKeyDown={handleKeyPress} // Add onKeyDown event listener
              ref={inputRef} // Assign ref to input
            />
            <button onClick={handleSubmit}>Submit</button>
            {isCorrect !== null && (
              <p>{isCorrect ? "Correct!" : "Incorrect!"}</p>
            )}
            <p>Time Left: {timeLeft} seconds</p>
            <button onClick={handleStartStop}>
              {isRunning ? "Stop" : "Start"}
            </button>
            <div>
              <p>Correct Answers: {correctAnswers}</p>
              <p>Incorrect Answers: {incorrectAnswers}</p>
            </div>
          </>
        )}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;

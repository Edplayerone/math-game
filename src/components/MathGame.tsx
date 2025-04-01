import { useState, useEffect } from "react";
import Timer from "./Timer";
import Equation from "./Equation";
import AnswerInput from "./AnswerInput";
import ResultsTable from "./ResultsTable";
import { generateEquation } from "@/utils/generateEquation";
import { Result } from "@/types/gameTypes";

const MathGame: React.FC = () => {
  const [timer, setTimer] = useState<number>(30);
  const [equation, setEquation] = useState<string>(generateEquation());
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleSubmit = () => {
    const correctAnswer = eval(equation) as number;
    const isCorrect = parseInt(userAnswer) === correctAnswer;

    setResults((prevResults) => [
      ...prevResults,
      { equation, userAnswer, isCorrect },
    ]);
    setUserAnswer("");
    setEquation(generateEquation());
  };

  return (
    <div className="p-6 flex flex-col items-center space-y-6">
      <Timer timeLeft={timer} />
      <Equation equation={equation} />
      <AnswerInput value={userAnswer} onChange={setUserAnswer} />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
      >
        Submit
      </button>

      <ResultsTable results={results} />
    </div>
  );
};

export default MathGame;

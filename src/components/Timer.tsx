import { Progress } from "@/components/ui/progress";

interface TimerProps {
  timeLeft: number;
}

const Timer: React.FC<TimerProps> = ({ timeLeft }) => {
  return (
    <Progress
      value={(timeLeft / 30) * 100}
      className={`w-64 ${timeLeft < 10 ? "bg-red-500" : "bg-blue-500"}`}
    />
  );
};

export default Timer;

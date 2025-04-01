interface AnswerInputProps {
  value: string;
  onChange: (value: string) => void;
}

const AnswerInput: React.FC<AnswerInputProps> = ({ value, onChange }) => {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border-2 border-gray-300 p-2 rounded-xl text-center text-lg"
    />
  );
};

export default AnswerInput;

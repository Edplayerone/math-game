import { motion } from "framer-motion";

interface EquationProps {
  equation: string;
}

const Equation: React.FC<EquationProps> = ({ equation }) => {
  return (
    <motion.div
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 0.5, repeat: Infinity }}
    >
      <h1 className="text-3xl font-bold text-pink-500">{equation}</h1>
    </motion.div>
  );
};

export default Equation;

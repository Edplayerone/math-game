import React from "react";

interface EquationDisplayProps {
  equation: string;
}

const EquationDisplay: React.FC<EquationDisplayProps> = ({ equation }) => (
  <h2>{equation} = ?</h2>
);

export default EquationDisplay;

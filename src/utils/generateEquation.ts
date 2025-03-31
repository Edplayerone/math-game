export interface Equation {
  equation: string;
  answer: number;
}

interface GenerateEquationOptions {
  numLines?: number;
  difficulty?: number;
}

export function generateEquation(
  options: GenerateEquationOptions = {}
): Equation {
  const { numLines = 3, difficulty = 1 } = options;
  if (difficulty < 1 || difficulty > 5) {
    throw new Error("Difficulty must be between 1 and 5.");
  }

  let equationString = "";
  let currentAnswer = 0;
  let maxNumber: number;

  switch (difficulty) {
    case 1:
      maxNumber = 11; // Numbers 0-10
      break;
    case 2:
      maxNumber = 21; // Numbers 0-20
      break;
    case 3:
      maxNumber = 51; // Numbers 0-50
      break;
    case 4:
      maxNumber = 101; // Numbers 0-100
      break;
    case 5:
      maxNumber = 201; // Numbers 0-200
      break;
    default:
      maxNumber = 11;
  }

  const firstNum = Math.floor(Math.random() * maxNumber);
  currentAnswer += firstNum;
  equationString += firstNum;

  for (let i = 1; i < numLines; i++) {
    let operator = Math.random() < 0.5 ? "+" : "-";
    let num = Math.floor(Math.random() * maxNumber);

    if (operator === "-" && currentAnswer - num < 0) {
      // If subtraction would result in a negative number, switch to addition
      operator = "+";
    }

    if (operator === "-") {
      while (currentAnswer - num < 0) {
        num = Math.floor(Math.random() * maxNumber);
      }
    }

    equationString += ` ${operator} ${num}`;

    if (operator === "+") {
      currentAnswer += num;
    } else {
      currentAnswer -= num;
    }
  }

  return {
    equation: equationString,
    answer: currentAnswer,
  };
}

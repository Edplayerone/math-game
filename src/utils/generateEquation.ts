export interface Equation {
  equation: string;
  answer: number;
}

export function generateEquation(numLines: number = 3): Equation {
  let equationString = "";
  let currentAnswer = 0;
  const firstNum = Math.floor(Math.random() * 11); // Allow 0 as the first number
  currentAnswer += firstNum;
  equationString += firstNum;

  for (let i = 1; i < numLines; i++) {
    let operator = Math.random() < 0.5 ? "+" : "-";
    let num = Math.floor(Math.random() * 11); // Allow 0 for subsequent numbers

    if (operator === "-" && currentAnswer - num < 0) {
      // If subtraction would result in a negative number, switch to addition
      operator = "+";
    }

    if (operator === "-") {
      while (currentAnswer - num < 0) {
        num = Math.floor(Math.random() * 11);
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

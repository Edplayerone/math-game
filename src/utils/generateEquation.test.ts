import { generateEquation } from "./generateEquation";

describe("generateEquation", () => {
  it("should return an object with equation and answer properties", () => {
    const result = generateEquation();
    expect(result).toHaveProperty("equation");
    expect(result).toHaveProperty("answer");
  });

  it("should generate an equation with the correct number of lines", () => {
    const numLines = 5;
    const result = generateEquation(numLines);
    const equationParts = result.equation.split(" ");
    // Each number and operator is a part, so we expect 2*numLines - 1 parts
    expect(equationParts.length).toBe(2 * numLines - 1);
  });

  it("should generate an equation with a default of 3 lines", () => {
    const result = generateEquation();
    const equationParts = result.equation.split(" ");
    expect(equationParts.length).toBe(5); // 2*3 -1 = 5
  });

  it("should generate equations with only positive numbers or zero", () => {
    for (let i = 0; i < 100; i++) {
      const result = generateEquation(5);
      expect(result.answer).toBeGreaterThanOrEqual(0);

      const numbers = result.equation
        .split(/[\s+-]/)
        .filter((part) => part !== "");
      numbers.forEach((numStr) => {
        const num = parseInt(numStr);
        expect(num).toBeGreaterThanOrEqual(0);
      });
    }
  });

  it("should return the correct answer for the generated equation", () => {
    for (let i = 0; i < 100; i++) {
      const result = generateEquation(4);
      const equationParts = result.equation.split(" ");
      let calculatedAnswer = parseInt(equationParts[0]);

      for (let j = 1; j < equationParts.length; j += 2) {
        const operator = equationParts[j];
        const num = parseInt(equationParts[j + 1]);

        if (operator === "+") {
          calculatedAnswer += num;
        } else if (operator === "-") {
          calculatedAnswer -= num;
        }
      }
      expect(result.answer).toBe(calculatedAnswer);
    }
  });
  it("should generate equations with zero", () => {
    for (let i = 0; i < 100; i++) {
      const result = generateEquation(4);
      const equationParts = result.equation.split(" ");
      const numbers = equationParts.filter((part, index) => index % 2 === 0);
      numbers.forEach((numStr) => {
        const num = parseInt(numStr);
        expect([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).toContain(num);
      });
    }
  });
});

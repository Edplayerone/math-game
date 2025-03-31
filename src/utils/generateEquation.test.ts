import { generateEquation, Equation } from "./generateEquation";

describe("generateEquation", () => {
  it("should return an object with 'equation' and 'answer' properties", () => {
    const result = generateEquation();
    expect(result).toHaveProperty("equation");
    expect(result).toHaveProperty("answer");
  });

  it("should generate an equation string", () => {
    const result = generateEquation();
    expect(typeof result.equation).toBe("string");
    expect(result.equation.length).toBeGreaterThan(0);
  });

  it("should generate a number for the answer", () => {
    const result = generateEquation();
    expect(typeof result.answer).toBe("number");
  });

  it("should throw an error if difficulty is less than 1", () => {
    expect(() => generateEquation({ difficulty: 0 })).toThrowError(
      "Difficulty must be between 1 and 5."
    );
  });

  it("should throw an error if difficulty is greater than 5", () => {
    expect(() => generateEquation({ difficulty: 6 })).toThrowError(
      "Difficulty must be between 1 and 5."
    );
  });

  it("should generate equations with the correct number of lines", () => {
    const numLines = 5;
    const result = generateEquation({ numLines });
    const parts = result.equation.split(" ");
    // Each line has a number and an operator, except the first line which only has a number
    expect(parts.length).toBe(numLines * 2 - 1);
  });

  it("should generate equations with numbers between 0-10 for difficulty 1", () => {
    for (let i = 0; i < 100; i++) {
      const result = generateEquation({ numLines: 3, difficulty: 1 });
      const parts = result.equation.split(" ");
      parts.forEach((part) => {
        if (!isNaN(parseInt(part))) {
          expect(parseInt(part)).toBeGreaterThanOrEqual(0);
          expect(parseInt(part)).toBeLessThanOrEqual(10);
        }
      });
    }
  });

  it("should generate equations with numbers between 0-20 for difficulty 2", () => {
    for (let i = 0; i < 100; i++) {
      const result = generateEquation({ numLines: 3, difficulty: 2 });
      const parts = result.equation.split(" ");
      parts.forEach((part) => {
        if (!isNaN(parseInt(part))) {
          expect(parseInt(part)).toBeGreaterThanOrEqual(0);
          expect(parseInt(part)).toBeLessThanOrEqual(20);
        }
      });
    }
  });

  it("should generate equations with numbers between 0-50 for difficulty 3", () => {
    for (let i = 0; i < 100; i++) {
      const result = generateEquation({ numLines: 3, difficulty: 3 });
      const parts = result.equation.split(" ");
      parts.forEach((part) => {
        if (!isNaN(parseInt(part))) {
          expect(parseInt(part)).toBeGreaterThanOrEqual(0);
          expect(parseInt(part)).toBeLessThanOrEqual(50);
        }
      });
    }
  });

  it("should generate equations with numbers between 0-100 for difficulty 4", () => {
    for (let i = 0; i < 100; i++) {
      const result = generateEquation({ numLines: 3, difficulty: 4 });
      const parts = result.equation.split(" ");
      parts.forEach((part) => {
        if (!isNaN(parseInt(part))) {
          expect(parseInt(part)).toBeGreaterThanOrEqual(0);
          expect(parseInt(part)).toBeLessThanOrEqual(100);
        }
      });
    }
  });

  it("should generate equations with numbers between 0-200 for difficulty 5", () => {
    for (let i = 0; i < 100; i++) {
      const result = generateEquation({ numLines: 3, difficulty: 5 });
      const parts = result.equation.split(" ");
      parts.forEach((part) => {
        if (!isNaN(parseInt(part))) {
          expect(parseInt(part)).toBeGreaterThanOrEqual(0);
          expect(parseInt(part)).toBeLessThanOrEqual(200);
        }
      });
    }
  });

  it("should generate equations that do not result in negative answers", () => {
    for (let i = 0; i < 100; i++) {
      const result = generateEquation({ numLines: 5, difficulty: 3 });
      expect(result.answer).toBeGreaterThanOrEqual(0);
    }
  });

  it("should default to difficulty 1 if no difficulty is provided", () => {
    for (let i = 0; i < 100; i++) {
      const result = generateEquation();
      const parts = result.equation.split(" ");
      parts.forEach((part) => {
        if (!isNaN(parseInt(part))) {
          expect(parseInt(part)).toBeGreaterThanOrEqual(0);
          expect(parseInt(part)).toBeLessThanOrEqual(10);
        }
      });
    }
  });

  it("should default to 3 lines if no number of lines is provided", () => {
    const result = generateEquation();
    const parts = result.equation.split(" ");
    expect(parts.length).toBe(5);
  });
});

const {
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  power,
  squareRoot,
  calculate,
} = require("../calculator");

describe("calculator functions", () => {
  describe("addition", () => {
    test("adds the example values from the image", () => {
      expect(addition(2, 3)).toBe(5);
    });

    test("adds negative values", () => {
      expect(addition(-4, 10)).toBe(6);
    });

    test("adds decimal values", () => {
      expect(addition(2.5, 1.5)).toBe(4);
    });
  });

  describe("subtraction", () => {
    test("subtracts the example values from the image", () => {
      expect(subtraction(10, 4)).toBe(6);
    });

    test("returns a negative result when the second number is larger", () => {
      expect(subtraction(3, 8)).toBe(-5);
    });

    test("subtracts decimal values", () => {
      expect(subtraction(5.5, 2.25)).toBe(3.25);
    });
  });

  describe("multiplication", () => {
    test("multiplies the example values from the image", () => {
      expect(multiplication(45, 2)).toBe(90);
    });

    test("multiplies by zero", () => {
      expect(multiplication(45, 0)).toBe(0);
    });

    test("multiplies negative values", () => {
      expect(multiplication(-3, 4)).toBe(-12);
    });
  });

  describe("division", () => {
    test("divides the example values from the image", () => {
      expect(division(20, 5)).toBe(4);
    });

    test("returns decimal results when needed", () => {
      expect(division(7, 2)).toBe(3.5);
    });

    test("throws for division by zero", () => {
      expect(() => division(10, 0)).toThrow("Division by zero is not allowed.");
    });
  });

  describe("calculate", () => {
    test("dispatches named operations", () => {
      expect(calculate("addition", 8, 2)).toBe(10);
      expect(calculate("subtraction", 8, 2)).toBe(6);
      expect(calculate("multiplication", 8, 2)).toBe(16);
      expect(calculate("division", 8, 2)).toBe(4);
    });

    test("dispatches symbolic operations", () => {
      expect(calculate("+", 2, 3)).toBe(5);
      expect(calculate("-", 10, 4)).toBe(6);
      expect(calculate("*", 45, 2)).toBe(90);
      expect(calculate("/", 20, 5)).toBe(4);
    });

    test("supports operation aliases", () => {
      expect(calculate("add", 1, 2)).toBe(3);
      expect(calculate("subtract", 5, 3)).toBe(2);
      expect(calculate("multiply", 6, 7)).toBe(42);
      expect(calculate("divide", 9, 3)).toBe(3);
    });

    test("rejects unsupported operations", () => {
      expect(() => calculate("unknown", 8, 2)).toThrow(
        'Unsupported operation "unknown". Use addition, subtraction, multiplication, division, modulo, power, or squareRoot.'
      );
    });
  });

  describe("modulo", () => {
    test("returns the remainder of two integers", () => {
      expect(modulo(10, 3)).toBe(1);
    });

    test("returns zero when evenly divisible", () => {
      expect(modulo(9, 3)).toBe(0);
    });

    test("works with negative values", () => {
      expect(modulo(-7, 3)).toBe(-1);
    });

    test("throws for modulo by zero", () => {
      expect(() => modulo(5, 0)).toThrow("Modulo by zero is not allowed.");
    });
  });

  describe("power (exponentiation)", () => {
    test("raises base to a positive exponent", () => {
      expect(power(2, 10)).toBe(1024);
    });

    test("returns 1 for exponent of zero", () => {
      expect(power(5, 0)).toBe(1);
    });

    test("handles negative exponents", () => {
      expect(power(2, -2)).toBeCloseTo(0.25);
    });

    test("supports fractional exponents", () => {
      expect(power(4, 0.5)).toBeCloseTo(2);
    });
  });

  describe("squareRoot", () => {
    test("returns the square root of a perfect square", () => {
      expect(squareRoot(9)).toBe(3);
    });

    test("returns the square root of a non-perfect square", () => {
      expect(squareRoot(2)).toBeCloseTo(1.4142135623730951);
    });

    test("returns 0 for square root of 0", () => {
      expect(squareRoot(0)).toBe(0);
    });

    test("throws for square root of a negative number", () => {
      expect(() => squareRoot(-1)).toThrow(
        "Square root of a negative number is not allowed."
      );
    });
  });
});

#!/usr/bin/env node

/**
 * Node.js CLI calculator supporting basic and extended operations:
 * - addition
 * - subtraction
 * - multiplication
 * - division
 * - modulo
 * - power
 * - square root
 */

/**
 * addition: add two numbers together.
 */
function addition(left, right) {
  return left + right;
}

/**
 * subtraction: subtract the second number from the first.
 */
function subtraction(left, right) {
  return left - right;
}

/**
 * multiplication: multiply two numbers together.
 */
function multiplication(left, right) {
  return left * right;
}

/**
 * division: divide the first number by the second.
 */
function division(left, right) {
  if (right === 0) {
    throw new Error("Division by zero is not allowed.");
  }

  return left / right;
}

/**
 * modulo: return the remainder of dividing the first number by the second.
 */
function modulo(left, right) {
  if (right === 0) {
    throw new Error("Modulo by zero is not allowed.");
  }

  return left % right;
}

/**
 * power: raise the base to the provided exponent.
 */
function power(base, exponent) {
  return base ** exponent;
}

/**
 * squareRoot: return the square root of a number.
 */
function squareRoot(value) {
  if (value < 0) {
    throw new Error("Square root of a negative number is not allowed.");
  }

  return Math.sqrt(value);
}

function getOperation(operation) {
  const normalizedOperation = operation.toLowerCase();

  const operations = {
    addition,
    add: addition,
    "+": addition,
    subtraction,
    subtract: subtraction,
    "-": subtraction,
    multiplication,
    multiply: multiplication,
    "*": multiplication,
    x: multiplication,
    "×": multiplication,
    division,
    divide: division,
    "/": division,
    "÷": division,
    modulo,
    "%": modulo,
    mod: modulo,
    power,
    exponentiation: power,
    "^": power,
    "**": power,
    squareroot: squareRoot,
    "square root": squareRoot,
    sqrt: squareRoot,
  };

  return operations[normalizedOperation];
}

function parseNumber(value, label) {
  const parsedValue = Number(value);

  if (Number.isNaN(parsedValue)) {
    throw new Error(`Invalid ${label}: "${value}" must be a number.`);
  }

  return parsedValue;
}

function calculate(operation, left, right) {
  const operationHandler = getOperation(operation);

  if (!operationHandler) {
    throw new Error(
      `Unsupported operation "${operation}". Use addition, subtraction, multiplication, division, modulo, power, or square root.`
    );
  }

  return operationHandler(left, right);
}

function printUsage() {
  console.log(
    "Usage: node src/calculator.js <operation> <value> [right]\n" +
      "Operations: addition (+), subtraction (-), multiplication (*), division (/), modulo (%), power (**), square root (sqrt)\n" +
      "Square root uses a single numeric operand; the other operations require two."
  );
}

function runCli() {
  const [operation, leftInput, rightInput] = process.argv.slice(2);
  const normalizedOperation = operation?.toLowerCase();
  const isUnaryOperation =
    normalizedOperation === "sqrt" ||
    normalizedOperation === "squareroot" ||
    normalizedOperation === "square root";

  if (
    !operation ||
    leftInput === undefined ||
    (!isUnaryOperation && rightInput === undefined)
  ) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  try {
    const left = parseNumber(leftInput, "left operand");
    const right =
      isUnaryOperation || rightInput === undefined
        ? undefined
        : parseNumber(rightInput, "right operand");
    const result = calculate(operation, left, right);
    console.log(result);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  runCli();
}

module.exports = {
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  power,
  squareRoot,
  calculate,
};

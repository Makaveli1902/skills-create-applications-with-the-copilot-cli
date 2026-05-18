#!/usr/bin/env node

/**
 * Node.js CLI calculator supporting the following operations:
 * - addition
 * - subtraction
 * - multiplication
 * - division
 * - modulo
 * - exponentiation (power)
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
 * modulo: return the remainder of a divided by b.
 */
function modulo(a, b) {
  if (b === 0) {
    throw new Error("Modulo by zero is not allowed.");
  }

  return a % b;
}

/**
 * power: return base raised to the exponent.
 */
function power(base, exponent) {
  return Math.pow(base, exponent);
}

/**
 * squareRoot: return the square root of n.
 */
function squareRoot(n) {
  if (n < 0) {
    throw new Error("Square root of a negative number is not allowed.");
  }

  return Math.sqrt(n);
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
    mod: modulo,
    "%": modulo,
    power,
    pow: power,
    exponentiation: power,
    "^": power,
    "**": power,
    squareroot: squareRoot,
    sqrt: squareRoot,
    "√": squareRoot,
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
      `Unsupported operation "${operation}". Use addition, subtraction, multiplication, division, modulo, power, or squareRoot.`
    );
  }

  return operationHandler(left, right);
}

function printUsage() {
  console.log(
    "Usage: node src/calculator.js <operation> <left> <right>\n" +
      "Operations: addition (+), subtraction (-), multiplication (*), division (/), modulo (%), power (^), squareRoot (√)"
  );
}

function runCli() {
  const [operation, leftInput, rightInput] = process.argv.slice(2);

  if (!operation || leftInput === undefined || rightInput === undefined) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  try {
    const left = parseNumber(leftInput, "left operand");
    const right = parseNumber(rightInput, "right operand");
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

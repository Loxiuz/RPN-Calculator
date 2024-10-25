"use strict";

window.addEventListener("load", start);

let resultStack = [];

function start() {
  console.log("Script running...");
  console.log(calc("2 3 4 * +"));
  console.log(calc("85 31 -")); // 1
  console.log(calc("3 4 5 2 - * +")); // 2
}

function calc(input) {
  return execOps(createInputQueue(input));
}

function createInputQueue(input) {
  return input.split(" ").map((item) => {
    return isNaN(Number(item)) ? item : Number(item);
  });
}

function hasOps(queue) {
  for (const item of queue) {
    if (isNaN(Number(item))) return true;
  }
  return false;
}

function execOps(inputQueue) {
  if (hasOps(inputQueue)) {
    console.log("Executing operations...");
    let val1;
    let val2;
    let partResult;
    inputQueue.forEach((item) => {
      if (isNaN(Number(item))) {
        val2 = resultStack.pop();
        val1 = resultStack.pop();
      }

      //   console.log(item);
      //   console.log("Val 1: " + val1);
      //   console.log("Val 2: " + val2);

      switch (item) {
        case "+":
          partResult = val1 + val2;
          break;
        case "-":
          partResult = val1 - val2;
          break;
        case "*":
          partResult = val1 * val2;
          break;
        case "/":
          partResult = val1 / val2;
          break;
        case "^":
          partResult = val1 ^ val2;
          break;
        default:
          resultStack.push(item);
          break;
      }
      if (partResult) {
        resultStack.push(partResult);
      }
      console.log(resultStack);
    });
    return resultStack.pop();
  } else {
    console.log("No operations to execute.");
  }
}

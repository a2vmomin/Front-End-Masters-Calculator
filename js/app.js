let output = "0";
let previousOperator = null;
let runningTotal = 0;
let outputText = document.querySelector(".output");

let buttons = document.querySelector(".calculator-container");

buttons.addEventListener("click", function(event) {
  if (isNaN(parseInt(event.target.innerText))) {
    handleSymbol(event.target.innerText);
  } else {
    handleNumber(event.target.innerText);
  }
  rerender();
});

function handleSymbol(value) {
  switch (value) {
    case "C":
      output = "0";
      runningTotal = 0;
      previousOperator = null;
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(output));
      output = "" + runningTotal;
      runningTotal = 0;
      break;
    case "B":
      if (output.length === 1) {
        output = "0";
      } else {
        output = output.substring(0, output.length - 1);
      }
      break;
    default:
      handleMath(value);
      break;
  }
}

function handleNumber(value) {
  console.log(value);
  if (output === "0") {
    output = value;
  } else {
    output += value;
  }
  rerender();
}

function rerender() {
  outputText.innerText = "" + output;
}

function handleMath(value) {
  const intOutput = parseInt(output);
  if (runningTotal === 0) {
    runningTotal = intOutput;
  } else {
    flushOperation(intOutput);
  }
  previousOperator = value;
  output = "0";
}

function flushOperation(intOutput) {
    if(previousOperator === "+") {
        runningTotal += intOutput;
    }
    else if(previousOperator === "-") {
        runningTotal -= intOutput;
    }
    else if(previousOperator === "*") {
        runningTotal *= intOutput;
    }
    else {
        runningTotal /= intOutput;
    }
}
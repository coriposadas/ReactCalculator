import React, { useState, useEffect } from "react";
import CalculatorButtons from "./CalculatorButtons";
import "./Calculator.css";

const Calculator = () => {
  const [prevValue, setPrevValue] = useState(null);
  const [nextValue, setNextValue] = useState("0");
  const [operation, setOperation] = useState(null);

  useEffect(() => {}, [operation, nextValue, prevValue]);

  const CalculatorOperations = {
    "/": (firstValue, secondValue) => firstValue / secondValue,
    "*": (firstValue, secondValue) => firstValue * secondValue,
    "+": (firstValue, secondValue) => firstValue + secondValue,
    "-": (firstValue, secondValue) => firstValue - secondValue,
    "=": secondValue => secondValue
  };

  const performOperation = () => {
    const temp = CalculatorOperations[operation](
      parseFloat(prevValue),
      parseFloat(nextValue)
    );
    setOperation(null);
    setNextValue(String(temp));
    setPrevValue(null);
  };

  const handleNum = number => {
    setNextValue(nextValue === "0" ? String(number) : nextValue + number);
  };

  const insertDecimal = () => {
    if (!/\./.test(nextValue)) {
      setNextValue(nextValue + ".");
    }
  };
  const percentage = () => {
    setNextValue(parseFloat(nextValue) / 100);
    if (prevValue && nextValue === "") {
      setPrevValue(parseFloat(prevValue) / 100);
    }
  };
  const plusMinus = () => {
    setNextValue(parseFloat(nextValue) * -1);
  };
  const clear = () => {
    setNextValue("0");
    setPrevValue(0);
  };

  const handleOperation = value => {
    if (Number.isInteger(value)) {
      handleNum(parseInt(value, 10));
    } else if (value in CalculatorOperations) {
      if (operation === null) {
        setOperation(value);
        setPrevValue(nextValue);
        setNextValue("");
      }
      if (operation) {
        setOperation(value);
      }
      if (prevValue && operation && nextValue) {
        performOperation();
      }
    } else if (value === "c") {
      clear();
    } else if (value === "\xB1") {
      plusMinus();
    } else if (value === ".") {
      insertDecimal();
    } else if (value === "%") {
      percentage();
    }
  };

  return (
    <div className="calculator">
      <div className="user-input">
        <div className="result">{nextValue} </div>
      </div>
      <div className="keypad">
        <div className="functions">
          <CalculatorButtons keyValue={"c"} onClick={handleOperation} />
          <CalculatorButtons keyValue={"\xB1"} onClick={handleOperation} />
          <CalculatorButtons keyValue={"%"} onClick={handleOperation} />
        </div>
        <div className="operators">
          <CalculatorButtons keyValue={"+"} onClick={handleOperation} />
          <CalculatorButtons keyValue={"-"} onClick={handleOperation} />
          <CalculatorButtons keyValue={"*"} onClick={handleOperation} />
          <CalculatorButtons keyValue={"/"} onClick={handleOperation} />
          <CalculatorButtons keyValue={"="} onClick={handleOperation} />
        </div>
        <div className="numbers">
          <CalculatorButtons keyValue={9} onClick={handleOperation} />
          <CalculatorButtons keyValue={8} onClick={handleOperation} />
          <CalculatorButtons keyValue={7} onClick={handleOperation} />
          <CalculatorButtons keyValue={6} onClick={handleOperation} />
          <CalculatorButtons keyValue={5} onClick={handleOperation} />
          <CalculatorButtons keyValue={4} onClick={handleOperation} />
          <CalculatorButtons keyValue={3} onClick={handleOperation} />
          <CalculatorButtons keyValue={2} onClick={handleOperation} />
          <CalculatorButtons keyValue={1} onClick={handleOperation} />
          <CalculatorButtons
            className="decimal"
            keyValue={"."}
            onClick={handleOperation}
          />
          <CalculatorButtons
            className="zero"
            keyValue={0}
            onClick={handleOperation}
          />
        </div>
      </div>
    </div>
  );
};

export default Calculator;

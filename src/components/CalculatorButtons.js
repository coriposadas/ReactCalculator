import React from "react";
import "./CalculatorButtons.css";

const CalculatorButtons = props => {
  return (
    <button onClick={() => props.onClick(props.keyValue)}>
      {props.keyValue}{" "}
    </button>
  );
};

export default CalculatorButtons;

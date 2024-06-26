import React, { useState } from "react";
import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

function App() {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  })

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHtml;

    if (calc.num.length < 16) {
      setCalc({
        ...calc,
        num:
        calc.num === 0 && value === "0"
        ? "0"
        : calc.num % 1 === 0
        ? Number(calc.num + value)
        : calc.num + value,
      res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHtml;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHtml;

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  
  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
          {
            btnValues.flat().map((btn, i) => {
              return(
                <Button 
                key={i}
               className={btn === "=" ? "equals" : ""} value={btn} onClick={
                btn === "C"
                ? resetClickHandler
                : btn === "+-"
                ? invertClickHandler
                : btn === "%"
                ? percentClickHandler
                : btn === "="
                ? equalsClickHandler
                : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                ? signClickHandler
                : btn === "."
                ? commaClickHandler
                : numClickHandler
               } />
              )
            })
          }
      
      </ButtonBox>
    </Wrapper>
  );
}

export default App;

import React, { useState } from 'react';

const App = () => {
    const [inputExpression, setInputExpression] = useState("");
    const [result, setResult] = useState(0);
    const [variables, setVariables] = useState([]);
  
    const handleExtraction = (value) => {
      let newValue = value.replaceAll(" ", "");
      let regex = /[^a-zA-Z]/g;
      let variables = newValue.replace(regex, "");
      let newArray = variables.split("");
      let keyValueArray = [];
      console.log(newArray);
      for (let i = 0; i < newArray.length; i++) {
        let obj = {
          key: newArray[i],
          value: "",
        };
        keyValueArray.push(obj);
      }
      setVariables(keyValueArray);
    };
  
    const handleVariables = (e, index) => {
      let newVariables = [...variables];
      newVariables[index].value = e.target.value;
      resultCalulator(newVariables);
      setVariables(newVariables);
    };
  
    const handleInput = (event) => {
      setInputExpression(event.target.value);
      handleExtraction(event.target.value);
    };
  
    const resultCalulator = (newVariables) => {
      let newExpression = inputExpression.replaceAll(" ", "");
      let newArray = newExpression.split("+");
      let sum = 0;
      newArray.forEach((item, index) => {
        console.log(item.length);
        if (item.length > 1) {
          sum = sum + parseInt(item) * newVariables[index].value;
        } else {
          sum = sum + Number(newVariables[index].value);
        }
      });
      setResult(sum);
    };
  
    return (
      <div className="App">
        <p>{result}</p>
        <input type="text" onChange={handleInput} />
        {variables.map((item, index) => {
          return (
            <div>
              <label>{item.key}</label>
              <input
                type="text"
                value={variables[index].value}
                onChange={(e) => handleVariables(e, index)}
              />
            </div>
          );
        })}
      </div>
    );
};

export default App;

import React, { useState } from "react";

function RadioButton() {
  let colors = ["Black", "Brown", "Blue"];
  const [displayColor, setDisplaColor] = useState("");

  return (
    <div>
      <h1>
        How to set the default selected Radio Button & Get the Radio Button
        Value
      </h1>
      <hr />
      {colors.map((result) => (
        <>
          <input
            type="radio"
            value={result}
            checked={displayColor === result}
            onChange={(e) => setDisplaColor(e.target.value)}
          />
          <b>{result}</b>
        </>
      ))}
      <h1>{displayColor}</h1>
    </div>
  );
}

export default RadioButton;

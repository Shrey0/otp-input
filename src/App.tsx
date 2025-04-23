import { useEffect, useRef, useState } from "react";
import "./styles.css";

const OTP_DIGIT_COUNT = 6;

export default function App() {
  const [inputArray, setInputArr] = useState(
    new Array(OTP_DIGIT_COUNT).fill("")
  );

  const refArray = useRef([]);

  useEffect(() => {
    refArray.current[0]?.focus();
  }, []);

  const handleOnChange = (value, index) => {
    if (isNaN(value)) return;
    const newValue = value.trim();

    const newArray = [...inputArray];
    newArray[index] = newValue.slice(-1);
    setInputArr(newArray);

    newValue && refArray.current[index + 1]?.focus();
  };

  const handleOnKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      !e.target.value && refArray.current[index - 1]?.focus();
    }
  };

  return (
    <div className="App">
      <h1>Validate OTP</h1>

      {inputArray.map((input, index) => {
        return (
          <input
            className="otp-input"
            key={index}
            type="text"
            value={inputArray[index]}
            onKeyDown={(e) => handleOnKeyDown(e, index)}
            ref={(input) => (refArray.current[index] = input)}
            onChange={(e) => handleOnChange(e.target.value, index)}
          />
        );
      })}
    </div>
  );
}

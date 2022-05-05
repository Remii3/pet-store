import { useState } from "react";

const useAuthVerification = (valueValidation, additionalRule) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  if (!additionalRule) additionalRule = () => true;

  const isValid = valueValidation(enteredValue) && additionalRule(enteredValue);
  const hasError = !isValid && isTouched;

  const changeValueHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  const blurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };
  return {
    enteredValue,
    isValid,
    hasError,
    changeValueHandler,
    blurHandler,
    reset,
  };
};

export default useAuthVerification;

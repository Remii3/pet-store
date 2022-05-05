export const lettersOnlyCheck = (enteredValue) =>
  enteredValue.trim() !== "" && enteredValue.match("^[a-zA-Z ]+$");

export const numbersOnlyCheck = (enteredValue, additionalRule) =>
  enteredValue.trim() !== "" &&
  enteredValue.match("^[0-9 +-]+$") &&
  enteredValue.match(additionalRule);

export const lettersAndNumbersCheck = (enteredValue) =>
  enteredValue.trim() !== "" && enteredValue.match("^[a-zA-Z0-9 /.]+$");

export const emailCheck = (enteredValue) =>
  enteredValue.trim() !== "" &&
  enteredValue.match("^[a-zA-Z0-9 /@.]+$") &&
  enteredValue.includes("@") &&
  enteredValue.includes(".");

export const passwordCheck = (enteredValue) =>
  enteredValue.trim() !== "" &&
  enteredValue.match("^[a-zA-Z0-9 /@.]+$") &&
  enteredValue.length > 3;

export const telephoneCheck = (enteredValue) =>
  enteredValue.trim() !== "" && enteredValue.length >= 9;

export const whiteSpaceCheck = (enteredValue) => enteredValue.trim() !== "";

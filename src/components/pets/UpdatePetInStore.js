import useAuthVerification from "../../hooks/useAuthVerification";
import {
  lettersOnlyCheck,
  numbersOnlyCheck,
} from "../../lib/inputCheckTemplates";

import Button from "../UI/Button";

import classes from "./UpdatePetInStore.module.css";

function UpdatePetInStore(props) {
  const { sendRequest } = props;

  const {
    enteredValue: enteredPetId,
    isValid: petIdIsValid,
    hasError: petIdHasError,
    changeValueHandler: petIdChangeHandler,
    blurHandler: petIdBlurHandler,
    reset: petIdReset,
  } = useAuthVerification(numbersOnlyCheck);

  const {
    enteredValue: enteredName,
    isValid: nameIsValid,
    hasError: nameHasError,
    changeValueHandler: nameChangeHandler,
    blurHandler: nameBlurHandler,
    reset: nameReset,
  } = useAuthVerification(lettersOnlyCheck);

  const {
    enteredValue: enteredStatus,
    isValid: statusIsValid,
    hasError: statusHasError,
    changeValueHandler: statusChangeHandler,
    blurHandler: statusBlurHandler,
    reset: statusReset,
  } = useAuthVerification(lettersOnlyCheck);

  let formValid = false;

  if (petIdIsValid && nameIsValid && statusIsValid) formValid = true;

  const updateFormSubmitHandler = (e) => {
    e.preventDefault();

    if (!formValid) return;
    sendRequest({ enteredPetId, enteredName, enteredStatus });

    petIdReset();
    nameReset();
    statusReset();
  };

  const petIdClasses = petIdHasError ? classes.incorrect : "";
  const nameClasses = nameHasError ? classes.incorrect : "";
  const statusClasses = statusHasError ? classes.incorrect : "";

  return (
    <div className={classes["updatePetInStore-inner"]}>
      <div className={classes["title-space"]}>
        <h1>Update pet in store</h1>
      </div>
      <form
        onSubmit={updateFormSubmitHandler}
        className={classes["form-space"]}
      >
        <div>
          <div>
            <label htmlFor="petId">Pet id</label>
            <input
              type="number"
              id="petId"
              className={petIdClasses}
              min={0}
              value={enteredPetId}
              onChange={petIdChangeHandler}
              onBlur={petIdBlurHandler}
            />
          </div>
          {petIdHasError && (
            <p className={classes.invalidInput}>Invalid pet id</p>
          )}
        </div>
        <div>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className={nameClasses}
              value={enteredName}
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
            />
          </div>
          {nameHasError && <p className={classes.invalidInput}>Invalid name</p>}
        </div>
        <div>
          <div>
            <label htmlFor="status">Status</label>
            <input
              type="text"
              id="status"
              className={statusClasses}
              value={enteredStatus}
              onChange={statusChangeHandler}
              onBlur={statusBlurHandler}
            />
          </div>
          {statusHasError && (
            <p className={classes.invalidInput}>Invalid status</p>
          )}
        </div>
        <div className={classes["button-space"]}>
          <Button type="submit" disabled={!formValid}>
            Update!
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UpdatePetInStore;

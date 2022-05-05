import useAuthVerification from "../../hooks/useAuthVerification";
import { numbersOnlyCheck } from "../../lib/inputCheckTemplates";

import Button from "../UI/Button";

import classes from "./DeletePet.module.css";

function DeletePet(props) {
  const { sendRequest } = props;

  const {
    enteredValue: enteredPetId,
    isValid: petIdIsValid,
    hasError: petIdHasError,
    changeValueHandler: petIdChangeHandler,
    blurHandler: petIdBlurHandler,
    reset: petIdReset,
  } = useAuthVerification(numbersOnlyCheck);

  let formValid = false;

  if (petIdIsValid) formValid = true;

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!formValid) return;
    sendRequest({ enteredPetId });

    petIdReset();
  };

  const petIdClasses = petIdHasError ? classes.incorrect : "";

  return (
    <div className={classes["deletePet-inner"]}>
      <div className={classes["title-space"]}>
        <h1>Delete pet</h1>
      </div>
      <form onSubmit={formSubmitHandler} className={classes["form-space"]}>
        <div>
          <div>
            <label htmlFor="petId">Pet id</label>
            <input
              type="number"
              id="petId"
              className={petIdClasses}
              value={enteredPetId}
              onChange={petIdChangeHandler}
              onBlur={petIdBlurHandler}
            />
          </div>
          {petIdHasError && (
            <p className={classes.invalidInput}>Invalid pet id</p>
          )}
        </div>
        <div className={classes["button-space"]}>
          <Button type="submit" disabled={!formValid}>
            Delete
          </Button>
        </div>
      </form>
    </div>
  );
}

export default DeletePet;

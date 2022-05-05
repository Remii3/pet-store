import useAuthVerification from "../../hooks/useAuthVerification";
import {
  lettersOnlyCheck,
  numbersOnlyCheck,
  whiteSpaceCheck,
} from "../../lib/inputCheckTemplates";

import Button from "../UI/Button";

import classes from "./UploadPetImage.module.css";

function UploadPetImage(props) {
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
    enteredValue: enteredFile,
    isValid: fileIsValid,
    changeValueHandler: fileChangeHandler,
    blurHandler: fileBlurHandler,
    reset: fileReset,
  } = useAuthVerification(whiteSpaceCheck);

  const {
    enteredValue: enteredAdditionalMetaData,
    changeValueHandler: additionalMetaDataChangeHandler,
    blurHandler: additionalMetaDataBlurHandler,
    reset: additionalMetaDataReset,
  } = useAuthVerification(lettersOnlyCheck);

  let formValid = false;

  if (petIdIsValid && fileIsValid) formValid = true;

  const photoFormSubmitHandler = (e) => {
    e.preventDefault();

    if (!formValid) return;
    sendRequest({ enteredPetId, enteredFile, enteredAdditionalMetaData });

    petIdReset();
    fileReset();
    additionalMetaDataReset();
  };

  const petIdClasses = petIdHasError ? classes.incorrect : "";

  return (
    <div className={classes["uploadPetImage-inner"]}>
      <div className={classes["title-space"]}>
        <h1>Upload pet image</h1>
      </div>
      <form onSubmit={photoFormSubmitHandler} className={classes["form-space"]}>
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
        <div>
          <div>
            <label htmlFor="photo">Attach a photo</label>
            <input
              type="file"
              name="photo"
              accept="image/png, image/jpeg, image/jpg"
              id="photo"
              value={enteredFile}
              onChange={fileChangeHandler}
              onBlur={fileBlurHandler}
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="message">Message</label>
            <input
              type="text"
              id="message"
              value={enteredAdditionalMetaData}
              onChange={additionalMetaDataChangeHandler}
              onBlur={additionalMetaDataBlurHandler}
            />
          </div>
        </div>
        <div className={classes["button-space"]}>
          <Button type="submit" disabled={!formValid}>
            Upload
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UploadPetImage;

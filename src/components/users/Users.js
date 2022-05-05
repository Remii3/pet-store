import useAuthVerification from "../../hooks/useAuthVerification";
import { lettersAndNumbersCheck } from "../../lib/inputCheckTemplates";

import Button from "../UI/Button";

import classes from "./Users.module.css";

function Users(props) {
  const { sendRequest, fetchedData } = props;

  const {
    enteredValue: enteredUserName,
    isValid: userNameIsValid,
    hasError: userNameHasError,
    changeValueHandler: userNameChangeHandler,
    blurHandler: userNameBlurHandler,
    reset: userNameReset,
  } = useAuthVerification(lettersAndNumbersCheck);

  let formValid = false;

  if (userNameIsValid) formValid = true;

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!formValid) return;

    sendRequest({ username: enteredUserName });

    userNameReset();
  };

  const userNameClasses =
    (fetchedData == null || fetchedData.code === 1) && userNameHasError
      ? classes.incorrect
      : "";

  return (
    <div className={classes["user-inner"]}>
      <div className={classes["title-space"]}>
        <h1>Find user</h1>
      </div>
      <form onSubmit={formSubmitHandler} className={classes["form-space"]}>
        <div>
          <div>
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              id="userName"
              className={userNameClasses}
              value={enteredUserName}
              onChange={userNameChangeHandler}
              onBlur={userNameBlurHandler}
            />
          </div>
          {(fetchedData == null || fetchedData.code === 1) &&
            userNameHasError && (
              <p className={classes.invalidInput}>Invalid username</p>
            )}
        </div>
        <div className={classes["button-space"]}>
          <Button type="submit" disabled={!formValid}>
            Find
          </Button>
        </div>
      </form>

      {fetchedData != null && fetchedData.username !== undefined && (
        <div className={classes.infoSpace}>
          <div className={classes.infoTitleSpace}>
            <h3>Username: {fetchedData.username || "Not provided"}</h3>
          </div>
          <div>
            <p>
              <span>User id:</span>
              <span>{fetchedData.id || "Not provided"}</span>
            </p>
            <p>
              <span>Email:</span>
              <span>{fetchedData.email || "Not provided"}</span>
            </p>
            <p>
              <span>Password:</span>
              <span>{fetchedData.password || "Not provided"}</span>
            </p>
          </div>
          <div>
            <p>
              <span>First name: </span>
              <span>{fetchedData.firstName || "Not provided"}</span>
            </p>
            <p>
              <span>Last name: </span>
              <span>{fetchedData.lastName || "Not provided"}</span>
            </p>
            <p>
              <span>Telephone: </span>
              <span>{fetchedData.phone || "Not provided"}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;

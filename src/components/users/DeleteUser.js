import { useContext } from "react";

import { UserContext } from "../../context/UserContext";

import useAuthVerification from "../../hooks/useAuthVerification";
import { fetchLogoutUser } from "../../lib/fetchUserApi";
import { lettersAndNumbersCheck } from "../../lib/inputCheckTemplates";

import Button from "../UI/Button";

import classes from "./DeleteUser.module.css";

function DeleteUser(props) {
  const { sendRequest } = props;
  const { setIsLogged } = useContext(UserContext);

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
    const user = localStorage.getItem("username");

    sendRequest({ username: enteredUserName });

    if (enteredUserName === user) {
      fetchLogoutUser();
      setIsLogged(false);
      localStorage.removeItem("session");
      localStorage.removeItem("username");
    }
    userNameReset();
  };

  const userNameClasses = userNameHasError ? classes.incorrect : "";

  return (
    <div className={classes["deleteUser-inner"]}>
      <div className={classes["title-space"]}>
        <h1>Delete user</h1>
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
          {userNameHasError && (
            <p className={classes.invalidInput}>Invalid username</p>
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

export default DeleteUser;

import useAuthVerification from "../../hooks/useAuthVerification";
import {
  emailCheck,
  lettersAndNumbersCheck,
  lettersOnlyCheck,
  passwordCheck,
  telephoneCheck,
} from "../../lib/inputCheckTemplates";

import Button from "../UI/Button";

import classes from "./UpdateUsers.module.css";

function UpdateUser(props) {
  const { sendRequest } = props;

  const {
    enteredValue: enteredOldUsername,
    isValid: odlUserNameIsValid,
    hasError: oldUserNameHasError,
    changeValueHandler: oldUserNameChangeHandler,
    blurHandler: oldUserNameBlurHandler,
    reset: odlUserNameReset,
  } = useAuthVerification(lettersAndNumbersCheck);

  const {
    enteredValue: enteredUserName,
    isValid: userNameIsValid,
    hasError: userNameHasError,
    changeValueHandler: userNameChangeHandler,
    blurHandler: userNameBlurHandler,
    reset: userNameReset,
  } = useAuthVerification(lettersAndNumbersCheck);

  const {
    enteredValue: enteredFirstName,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    changeValueHandler: firstNameChangeHandler,
    blurHandler: firstNameBlurHandler,
    reset: firstNameReset,
  } = useAuthVerification(lettersOnlyCheck);

  const {
    enteredValue: enteredLastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    changeValueHandler: lastNameChangeHandler,
    blurHandler: lastNameBlurHandler,
    reset: lastNameReset,
  } = useAuthVerification(lettersOnlyCheck);

  const {
    enteredValue: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    changeValueHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
    reset: emailReset,
  } = useAuthVerification(emailCheck);

  const {
    enteredValue: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    changeValueHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useAuthVerification(passwordCheck);

  const {
    enteredValue: enteredPhone,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    changeValueHandler: phoneChangeHandler,
    blurHandler: phoneBlurHandler,
    reset: phoneReset,
  } = useAuthVerification(telephoneCheck);

  let formValid = false;

  if (
    odlUserNameIsValid &&
    userNameIsValid &&
    firstNameIsValid &&
    lastNameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    phoneIsValid
  ) {
    formValid = true;
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!formValid) return;

    let id = Math.floor(Math.random() * 100);

    sendRequest({
      enteredOldUsername,
      id,
      enteredUserName,
      enteredFirstName,
      enteredLastName,
      enteredEmail,
      enteredPassword,
      enteredPhone,
      userStatus: 0,
    });

    odlUserNameReset();
    userNameReset();
    firstNameReset();
    lastNameReset();
    emailReset();
    passwordReset();
    phoneReset();
  };

  const oldUserNameClasses = oldUserNameHasError ? classes.incorrect : "";
  const userNameClasses = userNameHasError ? classes.incorrect : "";
  const firstNameClasses = firstNameHasError ? classes.incorrect : "";
  const lastNameClasses = lastNameHasError ? classes.incorrect : "";
  const emailClasses = emailHasError ? classes.incorrect : "";
  const passwordClasses = passwordHasError ? classes.incorrect : "";
  const phoneClasses = phoneHasError ? classes.incorrect : "";

  return (
    <div className={classes["updateUser-inner"]}>
      <div className={classes.titleSpace}>
        <h1>Update user</h1>
      </div>
      <form onSubmit={formSubmitHandler} className={classes["form-space"]}>
        <div>
          <div>
            <label htmlFor="oldUsername">Old username</label>
            <input
              type="text"
              id="oldUsername"
              className={oldUserNameClasses}
              value={enteredOldUsername}
              onChange={oldUserNameChangeHandler}
              onBlur={oldUserNameBlurHandler}
            />
          </div>
          {oldUserNameHasError && (
            <p className={classes.invalidInput}>Invalid old username</p>
          )}
        </div>
        <div>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
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
        <div>
          <div>
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              id="firstName"
              className={firstNameClasses}
              value={enteredFirstName}
              onChange={firstNameChangeHandler}
              onBlur={firstNameBlurHandler}
            />
          </div>
          {firstNameHasError && (
            <p className={classes.invalidInput}>Invalid first name</p>
          )}
        </div>
        <div>
          <div>
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              id="lastName"
              className={lastNameClasses}
              value={enteredLastName}
              onChange={lastNameChangeHandler}
              onBlur={lastNameBlurHandler}
            />
          </div>
          {lastNameHasError && (
            <p className={classes.invalidInput}>Invalid last name</p>
          )}
        </div>
        <div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className={emailClasses}
              value={enteredEmail}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            />
          </div>
          {emailHasError && (
            <p className={classes.invalidInput}>
              Invalid email, it has to include @ and .
            </p>
          )}
        </div>
        <div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              autoComplete="on"
              className={passwordClasses}
              value={enteredPassword}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
            />
          </div>
          {passwordHasError && (
            <p className={classes.invalidInput}>
              Invalid password, it has to have at least 3 signs
            </p>
          )}
        </div>
        <div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input
              type="number"
              id="phone"
              className={phoneClasses}
              value={enteredPhone}
              onChange={phoneChangeHandler}
              onBlur={phoneBlurHandler}
            />
          </div>
          {phoneHasError && (
            <p className={classes.invalidInput}>
              Invalid phone, it has to have 9 digits
            </p>
          )}
        </div>
        <div className={classes["button-space"]}>
          <Button type={"submit"} disabled={!formValid}>
            Update!
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUser;

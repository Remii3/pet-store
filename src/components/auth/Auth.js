import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

import useAuthVerification from "../../hooks/useAuthVerification";
import { fetchCreateUser, fetchLogInUser } from "../../lib/fetchUserApi";
import {
  emailCheck,
  lettersAndNumbersCheck,
  lettersOnlyCheck,
  passwordCheck,
  telephoneCheck,
} from "../../lib/inputCheckTemplates";

import Button from "../UI/Button";
import Modal from "../UI/Modal";

import classes from "./Auth.module.css";

function Auth() {
  const [logIn, setLogIn] = useState(false);
  const { setIsLogged, setAuthShown } = useContext(UserContext);

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
    userNameIsValid &&
    firstNameIsValid &&
    lastNameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    phoneIsValid
  ) {
    formValid = true;
  } else if (logIn && userNameIsValid && passwordIsValid) {
    formValid = true;
  }

  const obtainLocalStorageKey = async () => {
    const response = await fetchLogInUser({ enteredUserName, enteredPassword });
    localStorage.setItem("session", response.message.slice(23));
    localStorage.setItem("username", enteredUserName);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (formValid && !logIn) {
      const idNumber = Math.floor(Math.random() * 100);

      fetchCreateUser({
        id: idNumber,
        enteredUserName,
        enteredFirstName,
        enteredLastName,
        enteredEmail,
        enteredPassword,
        enteredPhone,
        userStatus: 0,
      });
      setLogIn(true);
    } else if (formValid && logIn) {
      obtainLocalStorageKey();
      setIsLogged(true);
      setAuthShown(false);
    }

    userNameReset();
    firstNameReset();
    lastNameReset();
    emailReset();
    passwordReset();
    phoneReset();
  };

  const changeAuthMethodHandler = () => {
    setLogIn(!logIn);

    userNameReset();
    firstNameReset();
    lastNameReset();
    emailReset();
    passwordReset();
    phoneReset();
  };

  const userNameClasses = userNameHasError ? classes.incorrect : "";
  const firstNameClasses = firstNameHasError ? classes.incorrect : "";
  const lastNameClasses = lastNameHasError ? classes.incorrect : "";
  const emailClasses = emailHasError ? classes.incorrect : "";
  const passwordClasses = passwordHasError ? classes.incorrect : "";
  const phoneClasses = phoneHasError ? classes.incorrect : "";

  const logInClass = logIn ? "form-spaceLogin" : "form-spaceRegister";

  return (
    <Modal newClass={"modal"} hideModal={() => setAuthShown(false)}>
      <div className={classes["auth-outer"]}>
        <h3>{!logIn ? "Register" : "Sign In"}</h3>
        <form onSubmit={formSubmitHandler} className={classes[logInClass]}>
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
          {!logIn && (
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
                <p className={classes.invalidInput}>
                  Invalid first name, only letters allowed
                </p>
              )}
            </div>
          )}
          {!logIn && (
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
                <p className={classes.invalidInput}>
                  Invalid last name, only letters allowed
                </p>
              )}
            </div>
          )}
          {!logIn && (
            <div>
              <div>
                <label htmlFor="email">E-mail</label>
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
          )}
          <div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type={"password"}
                id="password"
                className={passwordClasses}
                value={enteredPassword}
                autoComplete="on"
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
          {!logIn && (
            <div>
              <div>
                <label htmlFor="phone">Phone </label>
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
          )}
          <div className={classes["button-space"]}>
            <Button type="submit" disabled={!formValid}>
              {!logIn ? "Register" : "Log in"}
            </Button>
          </div>
        </form>
        <div className={classes["switchAccount-space"]}>
          <p
            className={classes.changeAuthMethod}
            onClick={changeAuthMethodHandler}
          >
            {!logIn ? "Sign in" : "Register"}
          </p>
          <p>
            {!logIn ? "Already have an account?" : "You don't have an account?"}
          </p>
        </div>
      </div>
    </Modal>
  );
}

export default Auth;

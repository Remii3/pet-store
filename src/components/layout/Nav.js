import { useContext } from "react";
import { NavLink, Link, Routes, Route } from "react-router-dom";

import { UserContext } from "../../context/UserContext";
import { fetchLogoutUser } from "../../lib/fetchUserApi";

import Modal from "../UI/Modal";

import classes from "./Nav.module.css";

function Nav() {
  const { isLogged, setIsLogged, setAuthShown, showMenu, setShowMenu } =
    useContext(UserContext);

  const logoutHandler = () => {
    fetchLogoutUser();
    setIsLogged(false);
    localStorage.removeItem("session");
    localStorage.removeItem("username");
  };

  const showMenuHandler = () => {
    setShowMenu(true);
  };

  const closeMenuHandler = () => {
    setShowMenu(false);
  };

  return (
    <nav className={classes["navBar-main"]}>
      <Routes>
        <Route
          path="/*"
          element={
            <div className={classes["links-outerSpace"]}>
              <button className={classes.burger} onClick={showMenuHandler}>
                <span></span>
                <span></span>
                <span></span>
              </button>
              {showMenu && (
                <Modal
                  newClass={"modal-menu"}
                  hideModal={() => setShowMenu(false)}
                >
                  <div className={classes["links-modal"]}>
                    <Link
                      className={classes.menuLinks}
                      to="/"
                      onClick={closeMenuHandler}
                    >
                      Home
                    </Link>
                    <Link
                      className={classes.menuLinks}
                      to="/Pets"
                      onClick={closeMenuHandler}
                    >
                      Pets
                    </Link>
                    <Link
                      className={classes.menuLinks}
                      to="/Store"
                      onClick={closeMenuHandler}
                    >
                      Store
                    </Link>
                    <Link
                      className={classes.menuLinks}
                      to="/Users"
                      onClick={closeMenuHandler}
                    >
                      Users
                    </Link>
                    {isLogged && (
                      <Link
                        className={classes.menuLinks}
                        to="/Profile"
                        onClick={closeMenuHandler}
                      >
                        Profile
                      </Link>
                    )}

                    {isLogged && (
                      <div className={classes["links-logout"]}>
                        <span onClick={logoutHandler}>Logout</span>
                      </div>
                    )}
                  </div>
                </Modal>
              )}

              <div className={classes["links-leftSide"]}>
                <NavLink className={classes.links} to="/">
                  Home
                </NavLink>
                <NavLink className={classes.links} to="/Pets">
                  Pets
                </NavLink>
                <NavLink className={classes.links} to="/Store">
                  Store
                </NavLink>
                <NavLink className={classes.links} to="/Users">
                  Users
                </NavLink>
                {isLogged && (
                  <NavLink className={classes.links} to="/Profile">
                    Profile
                  </NavLink>
                )}
              </div>
              {isLogged === false ? (
                <div
                  className={classes["links-rightSide"]}
                  onClick={() => setAuthShown(true)}
                >
                  <i className="fas fa-user-circle"></i>
                  <span>Sign in / Register</span>
                </div>
              ) : (
                <div className={classes["links-rightSide"]}>
                  <i className="fas fa-sign-out-alt"></i>
                  <span onClick={logoutHandler}>Logout</span>
                </div>
              )}
            </div>
          }
        />
      </Routes>
    </nav>
  );
}

export default Nav;

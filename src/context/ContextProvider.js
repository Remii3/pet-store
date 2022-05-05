import { useState } from "react";

import { UserContext } from "./UserContext";

import Auth from "../components/auth/Auth";

function ContextProvider(props) {
  let token = localStorage.getItem("session");
  const [isLogged, setIsLogged] = useState(token ? token : false);
  const [authShown, setAuthShown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <UserContext.Provider
      value={{
        isLogged,
        setIsLogged,
        authShown,
        setAuthShown,
        showMenu,
        setShowMenu,
      }}
    >
      {authShown && <Auth />}

      {props.children}
    </UserContext.Provider>
  );
}

export default ContextProvider;

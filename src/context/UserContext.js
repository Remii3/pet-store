import { createContext } from "react";

export const UserContext = createContext({
  isLogged: false,
  authShown: false,
  showMenu: false,
});

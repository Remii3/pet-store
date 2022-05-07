import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter basename="/pet-store">
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

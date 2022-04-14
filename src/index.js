import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

import "./scss/main.scss";

try {
  ReactDOM.render(<App />, document.querySelector("#entrypoint"));
} catch (e) {
  ReactDOM.render(
    <p>The site crashed. The reason was due to an Error: {e} </p>,
    document.querySelector("#entrypoint")
  );
}

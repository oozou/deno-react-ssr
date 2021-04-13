import React from "https://esm.sh/react?dts";
import ReactDOM from "https://esm.sh/react-dom?dts";

// initial code
declare global {
  var __INITIAL_STATE__: any; // TODO: Remove any
}

import App from "./app.tsx";
const { todos } = window.__INITIAL_STATE__ || { todos: [] };

ReactDOM.hydrate(<App todos={todos} />, document.getElementById("root"));

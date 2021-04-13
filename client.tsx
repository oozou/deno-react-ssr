import React from "https://esm.sh/react?dts";
import ReactDOM from "https://esm.sh/react-dom?dts";

import { TodoItems } from "./todos.ts";

// initial code
declare global {
  var __INITIAL_STATE__: TodoItems;
}

import App from "./app.tsx";
const { todos }: TodoItems = window.__INITIAL_STATE__ || { todos: [] };

ReactDOM.hydrate(<App todos={todos} />, document.getElementById("root"));

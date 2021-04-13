import React from "https://esm.sh/react?dts";

import { Todo, TodoItems } from "./todos.ts";

function App({ todos = [] }: TodoItems) {
  return (
    <div>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4">Todo App</h1>
          <p className="lead">This is our simple todo app.</p>
          <ListTodos todos={Array.from(todos.values())} />
        </div>
      </div>
    </div>
  );
}

function ListTodos({ todos = [] }: TodoItems) {
  const [deletedIdxs, setDeletedIdxs] = React.useState<number[]>([]);
  return (
    <>
      <ul className="list-group">
        {todos.map((todo: Todo, index: number) => {
          const deleted = deletedIdxs.indexOf(index) !== -1;
          return (
            <li
              key={index}
              className="list-group-item"
              style={{ color: deleted ? "red" : "black" }}
            >
              {todo.task}
              <button
                type="button"
                className="btn ml-2 mb-1 close"
                aria-label="Close"
                onClick={() => setDeletedIdxs([...deletedIdxs, index])}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;

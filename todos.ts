export type Todo = { id: number; task: string };
export let todos: Map<number, Todo> = new Map();

export function init() {
  todos.set(todos.size + 1, { id: Date.now(), task: "build an ssr deno app" });
  todos.set(todos.size + 1, {
    id: Date.now(),
    task: "write blogs on deno ssr",
  });
}

// React imports
import React from "https://esm.sh/react?dts";
import { renderToString } from "https://esm.sh/react-dom/server?dts";

// Oak imports
import {
  Application,
  Router,
  send,
  RouterContext,
} from "https://deno.land/x/oak/mod.ts";

// Internal imports
import App from "./app.tsx";
import { init, todos } from "./todos.ts";

init();

const app = new Application();

const router = new Router();
router.get("/", handlePage);

router
  .get("/todos", (context) => {
    context.response.body = Array.from(todos.values());
  })
  .get("/todos/:id", (context) => {
    if (
      context.params &&
      context.params.id &&
      todos.has(Number(context.params.id))
    ) {
      context.response.body = todos.get(Number(context.params.id));
    } else {
      context.response.status = 404;
    }
  })
  .post("/todos", async (context) => {
    const body = context.request.body();
    if (body.type === "json") {
      const todo = await body.value;
      todos.set(Date.now(), todo);
    }
    context.response.body = { status: "OK" };
  });

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}`,
  });
});

console.log("server is running on http://localhost:8000/");
await app.listen({ port: 8000 });

function handlePage(ctx: RouterContext) {
  try {
    const body = renderToString(<App todos={Array.from(todos.values())} />);
    ctx.response.body = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Favicon -->
    <link href="data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAA/4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAERERERERERERAAAAAAAAERAQAAAAAAEBEAEAAAAAEAEQABAAAAEAARAAAQAAEAABEAAAEAEAAAEQAAABEAAAARAAAAEQAAABEAAAEAEAAAEQAAEAABAAARAAEAAAAQABEAEAAAAAEAEQEAAAAAABAREAAAAAAAAREREREREREREAAAAAP/wAAF/6AABv9gAAd+4AAHveAAB9vgAAfn4AAH5+AAB9vgAAe94AAHfuAABv9gAAX/oAAD/8AAAAAAAA"
      rel="icon" type="image/x-icon" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css"
      rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6"
      crossorigin="anonymous" />
    <title>Todo App</title>
    <script>
      window.__INITIAL_STATE__ = {"todos": ${JSON.stringify(
        Array.from(todos.values())
      )}};
    </script>
  </head>
  <body >
    <div id="root">${body}</div>
    <script src="/client.js" defer></script>
  </body>
  </html>`;
  } catch (error) {
    console.error(error);
  }
}

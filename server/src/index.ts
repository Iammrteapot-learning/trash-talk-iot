import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";

const app = new Elysia()
  .use(
    swagger({
      documentation: {
        info: {
          title: "Trash Talk Documentation",
          version: "0.1.0",
        },
      },
    })
  )
  .use(cors())
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

console.log(
  `
  Try this:
  
  \x1b]8;;http://${app.server?.hostname}:${app.server?.port}/swagger/\x1b\\${app.server?.hostname}:${app.server?.port}/swagger\x1b]8;;\x1b\\`
);

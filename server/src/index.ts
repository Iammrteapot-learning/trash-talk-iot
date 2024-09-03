import { Elysia } from "elysia";

const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

console.log(
  `
  Try this:
  
  \x1b]8;;${app.server?.hostname}:${app.server?.port}/swagger/\x1b\\${app.server?.hostname}:${app.server?.port}/swagger\x1b]8;;\x1b\\`
);

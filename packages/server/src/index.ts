import { Hono } from "hono";
import { env } from "hono/adapter";
import { auth } from "./lib/auth";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

type Bindings = {
  FOO: string;
};

const app = new Hono<{
  Bindings: Bindings;
}>();

app.use(logger());

app.use(
  "/*",
  cors({
    origin: ["http://localhost:3001", "exp://localhost:19000"],
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

app.get("/healthCheck", (c) => {
  return c.text("OK");
});

export default app;

import { defineConfig } from "drizzle-kit";

console.log(process.env.TURSO_CONNECTION_URL);
export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./migrations",
  dialect: "turso",
  dbCredentials: {
    url: "http://127.0.0.1:8080",
    // authToken: process.env.TURSO_AUTH_TOKEN!,
  },
});

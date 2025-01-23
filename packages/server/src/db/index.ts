import { drizzle } from "drizzle-orm/libsql";

export const db = drizzle({
  connection: {
    url: "http://127.0.0.1:8080",
    // authToken: process.env.TURSO_AUTH_TOKEN!,
  },
  // logger: true,
});

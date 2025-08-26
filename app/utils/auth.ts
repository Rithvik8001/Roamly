import { betterAuth } from "better-auth";
import { Pool } from "pg"; // Import the pg library for database connection

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
});

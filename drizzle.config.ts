import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './lib/db/schema.ts', // Path to your schema file(s)
  out: './drizzle', // Output directory for generated migrations
  dialect: 'postgresql', // Specify your database dialect
  dbCredentials: {
    url: process.env.DATABASE_URL!, // Connection string from .env
  },
  verbose: true,
  strict: true,
});

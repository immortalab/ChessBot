import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import pg from 'pg';

import * as schema from './schema';

const { Pool } = pg;

// Используем напрямую DATABASE_URL из настроек Render
const config : any = {
  connectionString: process.env.DATABASE_URL,
}

// Включаем SSL, так как Neon требует защищенного соединения
config.ssl = {
  rejectUnauthorized: false
};
 
const client = new Pool(config);

const db = drizzle(client, { schema });

console.log('Connecting to database using DATABASE_URL...');

/* Мы временно отключаем миграции, чтобы избежать ошибки AggregateError на Render
  console.log("Run migrations...");
  migrate(db, { migrationsFolder: "migrations" }).then(() =>{
    console.log("Migrations applied!")
  });
*/
export default db;

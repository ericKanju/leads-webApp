// import pkg from 'pg';
// const { Pool } = pkg;

// export const pool = new Pool({
//   connectionString: 'postgres://postgres.iyovhgezlapavfaufxyt:QCgkjbR6Qd5VrSdM@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require&supa=base-pooler.x',
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });


const { Pool } = require('pg');

// Vercel and Supabase Postgres URLs often include ?sslmode=require etc.
// The `pg` library has a known quirk where query params from the connection 
// string can overwrite the `ssl` object we provide in the constructor.
let connectionString = process.env.leadsDb_POSTGRES_URL || process.env.POSTGRES_URL;

if (connectionString && connectionString.includes('?')) {
  connectionString = connectionString.split('?')[0]; // Strip query params to avoid overriding ssl config
}

const pool = new Pool({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false }
});

module.exports = { pool };
// import pkg from 'pg';
// const { Pool } = pkg;

// export const pool = new Pool({
//   connectionString: 'postgres://postgres.iyovhgezlapavfaufxyt:QCgkjbR6Qd5VrSdM@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require&supa=base-pooler.x',
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });


const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgres://postgres.iyovhgezlapavfaufxyt:QCgkjbR6Qd5VrSdM@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require&supa=base-pooler.x',
  ssl: { rejectUnauthorized: true }
});

module.exports = { pool };
import { VercelRequest, VercelResponse } from '@vercel/node';


import { pool } from './_db';

module.exports = async function handler(req: VercelRequest, res: VercelResponse) {

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method Not Allowed' });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { firstName, lastName, email, phone, propertyAddress } = body || {};

    if (!firstName || !lastName || !email || !phone || !propertyAddress) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    if (!email.includes('@')) {
      return res.status(400).json({ success: false, error: 'Invalid email format' });
    }

    // Ensure table exists (creates only once)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        property_address TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // Insert lead
    const result = await pool.query(
      `INSERT INTO leads (first_name, last_name, email, phone, property_address)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [firstName, lastName, email, phone, propertyAddress]
    );

    return res.status(200).json({
      success: true,
      message: 'Lead stored successfully',
      data: result.rows,
    });

  } catch (err: any) {
    console.error('Postgres error:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'Internal Server Error',
    });
  }
}
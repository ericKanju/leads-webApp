import { VercelRequest, VercelResponse } from '@vercel/node';
import { pool } from './_db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ success: false, error: 'Method Not Allowed' });

  try {
    const result = await pool.query('SELECT * FROM leads ORDER BY created_at DESC');

    return res.status(200).json({
      success: true,
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

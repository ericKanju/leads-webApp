import { sql } from '@vercel/postgres';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // CORS
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    // Ensure table exists
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        property_address TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const { firstName, lastName, email, phone, propertyAddress } = request.body;

    if (!firstName || !lastName || !email || !phone || !propertyAddress) {
      return response.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    if (!email.includes('@')) {
      return response.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    const result = await sql`
      INSERT INTO leads (first_name, last_name, email, phone, property_address)
      VALUES (${firstName}, ${lastName}, ${email}, ${phone}, ${propertyAddress})
      RETURNING *;
    `;

    return response.status(200).json({
      success: true,
      message: 'Lead stored successfully',
      data: result.rows[0]
    });

  } catch (error: any) {
    console.error('Postgres error:', error);
    return response.status(500).json({
      success: false,
      error: error.message || 'Internal Server Error'
    });
  }
}
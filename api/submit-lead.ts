import { sql } from '@vercel/postgres';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  const { firstName, lastName, email, phone, propertyAddress } = request.body;

  if (!firstName || !lastName || !email || !phone || !propertyAddress) {
    return response.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Ensure table exists (for initial setup)
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        property_address TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Insert lead record
    await sql`
      INSERT INTO leads (first_name, last_name, email, phone, property_address)
      VALUES (${firstName}, ${lastName}, ${email}, ${phone}, ${propertyAddress});
    `;

    return response.status(200).json({ message: 'Lead stored successfully' });
  } catch (error: any) {
    console.error('Database error:', error);
    return response.status(500).json({ error: error.message });
  }
}

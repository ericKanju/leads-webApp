import { createClient } from '@supabase/supabase-js';
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

  const supabaseUrl = 'https://iyovhgezlapavfaufxyt.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5b3ZoZ2V6bGFwYXZmYXVmeHl0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzgzMzY4OSwiZXhwIjoyMDg5NDA5Njg5fQ.qQtvlAV_FvU2wB84w3HSxY-Mk46B1yiG5ZrlFYbEwTI';

  if (!supabaseUrl || !supabaseKey) {
    return response.status(500).json({
      success: false,
      error: 'Missing environment variables'
    });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

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

  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          property_address: propertyAddress
        }
      ]);

    if (error) throw error;

    return response.status(200).json({
      success: true,
      message: 'Lead stored successfully',
      data
    });

  } catch (error: any) {
    return response.status(500).json({
      success: false,
      error: error.message
    });
  }
}
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Mock database (replace with your real DB later)
const leadsDB: any[] = [];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    console.log("🔥 Lead API called");

    // Only allow POST requests
    if (req.method !== 'POST') {
      return res.status(405).json({
        success: false,
        error: 'Method not allowed. Use POST.'
      });
    }

    // Get data from request body
    const { firstName, lastName, email, phone, address } = req.body;

    // Basic validation
    if (!firstName || !email || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: firstName, email, or phone'
      });
    }

    // Create new lead object
    const newLead = {
      id: leadsDB.length + 1,
      firstName,
      lastName: lastName || '',
      email,
      phone,
      address: address || '',
      createdAt: new Date().toISOString(),
    };

    // Save to "DB"
    leadsDB.push(newLead);
    console.log("💾 Lead saved:", newLead);

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Lead saved successfully!',
      data: newLead
    });

  } catch (err) {
    console.error("❌ Crash:", err);
    return res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : 'An unknown error occurred'
    });
  }
}
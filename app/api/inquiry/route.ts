import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend (requires environment variable RESEND_API_KEY)
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, whatsapp, product, quantity, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email and message are required' },
        { status: 400 }
      );
    }

    // Send email notification to admin
    const adminEmail = process.env.ADMIN_EMAIL || 'sales@houseplusgroup.com';
    await resend.emails.send({
      from: 'HousePlus Inquiry <onboarding@resend.dev>', // Default Resend sender, can be customized later
      to: [adminEmail],
      subject: `New Inquiry from ${name}`,
      html: `
        <h2>New Inquiry Details</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>WhatsApp:</strong> ${whatsapp || 'N/A'}</p>
        <p><strong>Product:</strong> ${product || 'N/A'}</p>
        <p><strong>Quantity:</strong> ${quantity || 'N/A'}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    // Optional: Send confirmation email to customer
    await resend.emails.send({
      from: 'HousePlus <onboarding@resend.dev>',
      to: [email],
      subject: 'We received your inquiry',
      html: `
        <p>Dear ${name},</p>
        <p>Thank you for contacting HousePlus. Our sales team will reply within 24 hours.</p>
        <p>Best regards,<br/>HousePlus Team</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Inquiry API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

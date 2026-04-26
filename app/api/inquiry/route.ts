import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend (requires environment variable RESEND_API_KEY)
const resend = new Resend(process.env.RESEND_API_KEY || 're_temporary_key_for_build');

/**
 * HTML 转义函数 - 防止 XSS 攻击
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char] || char);
}

/**
 * 验证邮箱格式
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 速率限制（基于内存存储，生产环境建议使用 Redis）
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 分钟
const RATE_LIMIT_MAX = 5; // 每窗口最多 5 次请求

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: Request) {
  try {
    // 速率限制检查
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests, please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, company, whatsapp, product, quantity, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate field lengths (prevent abuse)
    if (name.length > 100 || email.length > 200 || message.length > 2000) {
      return NextResponse.json(
        { error: 'Field length exceeds limit' },
        { status: 400 }
      );
    }

    // Sanitize inputs (prevent XSS)
    const sanitizedName = escapeHtml(name);
    const sanitizedEmail = escapeHtml(email);
    const sanitizedCompany = company ? escapeHtml(company) : 'N/A';
    const sanitizedWhatsapp = whatsapp ? escapeHtml(whatsapp) : 'N/A';
    const sanitizedProduct = product ? escapeHtml(product) : 'N/A';
    const sanitizedQuantity = quantity ? escapeHtml(String(quantity)) : 'N/A';
    const sanitizedMessage = escapeHtml(message);

    // Send email notification to admin
    const adminEmail = process.env.ADMIN_EMAIL || 'sales@houseplusgroup.com';
    await resend.emails.send({
      from: 'HousePlus <jack@houseplus-ch.com>',
      to: [adminEmail],
      subject: `New Inquiry from ${sanitizedName}`,
      html: `
        <h2>New Inquiry Details</h2>
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p><strong>Company:</strong> ${sanitizedCompany}</p>
        <p><strong>WhatsApp:</strong> ${sanitizedWhatsapp}</p>
        <p><strong>Product:</strong> ${sanitizedProduct}</p>
        <p><strong>Quantity:</strong> ${sanitizedQuantity}</p>
        <p><strong>Message:</strong> ${sanitizedMessage}</p>
      `,
    });

    // Send confirmation email to customer
    await resend.emails.send({
      from: 'HousePlus <jack@houseplus-ch.com>',
      to: [sanitizedEmail],
      subject: 'We received your inquiry',
      html: `
        <p>Dear ${sanitizedName},</p>
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

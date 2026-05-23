import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend (if API key is available)
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// 速率限制（简单内存存储，生产环境建议使用 Redis）
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5; // 每个 IP 每小时最多 5 次请求

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  return forwarded?.split(',')[0] || realIP || 'unknown';
}

function buildEmailTemplate(data: any) {
  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; }
          .header { background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; padding: 30px; border-radius: 8px; text-align: center; }
          .logo { font-size: 28px; font-weight: bold; }
          .content { background: #f8fafc; padding: 30px; border-radius: 8px; margin-top: 20px; }
          .field { margin-bottom: 20px; }
          .label { font-weight: bold; color: #64748b; margin-bottom: 5px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
          .value { color: #1e293b; font-size: 16px; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; color: #64748b; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">🏭 HousePlus Inquiry</div>
        </div>
        <div class="content">
          <h2 style="color: #1e293b; margin-top: 0;">New Inquiry Received!</h2>
          <div class="field">
            <div class="label">Full Name</div>
            <div class="value">${data.name}</div>
          </div>
          <div class="field">
            <div class="label">Email</div>
            <div class="value">${data.email}</div>
          </div>
          ${data.company ? `
          <div class="field">
            <div class="label">Company</div>
            <div class="value">${data.company}</div>
          </div>` : ''}
          ${data.whatsapp ? `
          <div class="field">
            <div class="label">WhatsApp</div>
            <div class="value">${data.whatsapp}</div>
          </div>` : ''}
          ${data.product ? `
          <div class="field">
            <div class="label">Product Interest</div>
            <div class="value">${data.product}</div>
          </div>` : ''}
          ${data.quantity ? `
          <div class="field">
            <div class="label">Estimated Quantity</div>
            <div class="value">${data.quantity}</div>
          </div>` : ''}
          <div class="field">
            <div class="label">Message</div>
            <div class="value" style="white-space: pre-wrap;">${data.message}</div>
          </div>
        </div>
        <div class="footer">
          <p>© 2026 HousePlus Group. All rights reserved.</p>
        </div>
      </body>
    </html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    // 速率限制检查
    const clientIP = getClientIP(request);
    const now = Date.now();
    const clientData = rateLimit.get(clientIP);

    if (clientData) {
      if (now > clientData.resetTime) {
        // 重置窗口
        rateLimit.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
      } else if (clientData.count >= MAX_REQUESTS) {
        return NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          { status: 429 }
        );
      } else {
        clientData.count++;
      }
    } else {
      rateLimit.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    }

    // 解析请求体
    const body = await request.json();
    const { name, email, company, phone, message, product, quantity, whatsapp } = body;

    // 验证必填字段
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format.' },
        { status: 400 }
      );
    }

    // 清理输入（防止 XSS）
    const sanitize = (str: string) => str?.replace(/<[^>]*>?/gm, '');
    const sanitizedData = {
      name: sanitize(name)?.slice(0, 100),
      email: sanitize(email)?.slice(0, 100),
      company: sanitize(company || '')?.slice(0, 100),
      phone: sanitize(phone || '')?.slice(0, 20),
      product: sanitize(product || '')?.slice(0, 200),
      quantity: sanitize(quantity || '')?.slice(0, 100),
      whatsapp: sanitize(whatsapp || '')?.slice(0, 100),
      message: sanitize(message)?.slice(0, 2000),
    };

    // 记录日志
    console.log('Inquiry received from:', sanitizedData.email);

    // 如果 Resend 已配置，发送邮件
    let emailSent = false;
    if (resend) {
      try {
        const { data, error } = await resend.emails.send({
          from: 'HousePlus Inquiry <inquiry@houseplus-ch.com>',
          to: ['sales@houseplus-ch.com'],
          reply_to: sanitizedData.email,
          subject: `New Inquiry from ${sanitizedData.name}`,
          html: buildEmailTemplate(sanitizedData),
        });

        if (error) {
          console.error('Failed to send email:', error);
        } else {
          emailSent = true;
          console.log('Email sent successfully:', data);
        }
      } catch (emailError) {
        console.error('Email sending error:', emailError);
      }
    } else {
      console.log('Resend API key not configured, email notification skipped');
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Inquiry submitted successfully.',
        emailSent 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}

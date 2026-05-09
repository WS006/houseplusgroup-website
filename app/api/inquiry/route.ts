import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@houseplus-ch.com';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://houseplus-ch.com';

// 速率限制（简单内存存储，生产环境建议使用 Redis）
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5; // 每个 IP 每小时最多 5 次请求

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  return forwarded?.split(',')[0] || realIP || 'unknown';
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
    const { name, email, company, phone, message } = body;

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
    const sanitize = (str: string) => str.replace(/<[^>]*>?/gm, '');
    const sanitizedData = {
      name: sanitize(name).slice(0, 100),
      email: sanitize(email).slice(0, 100),
      company: sanitize(company || '').slice(0, 100),
      phone: sanitize(phone || '').slice(0, 20),
      message: sanitize(message).slice(0, 1000),
    };

    // TODO: 这里添加实际业务逻辑
    // 例如：发送邮件、保存到数据库、发送到 Slack 等
    console.log('Inquiry received:', sanitizedData);

    // Send email notification to admin via Resend
    try {
      await resend.emails.send({
        from: 'HousePlus Website <noreply@houseplus-ch.com>',
        to: [ADMIN_EMAIL],
        subject: `[New Inquiry] from ${sanitizedData.name}${sanitizedData.company ? ` (${sanitizedData.company})` : ''}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #1a56db; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
              <h2 style="margin: 0;">New Inquiry Received</h2>
            </div>
            <div style="border: 1px solid #e5e7eb; padding: 20px; border-radius: 0 0 8px 8px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td><td>${sanitizedData.name}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td><a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a></td></tr>
                ${sanitizedData.company ? `<tr><td style="padding: 8px 0; font-weight: bold;">Company:</td><td>${sanitizedData.company}</td></tr>` : ''}
                ${sanitizedData.phone ? `<tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td>${sanitizedData.phone}</td></tr>` : ''}
                <tr><td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Message:</td><td style="white-space: pre-wrap;">${sanitizedData.message}</td></tr>
              </table>
              <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
                Received at ${new Date().toISOString()} | IP: ${clientIP}
              </div>
            </div>
          </div>
        `,
      });

      // Auto-reply to customer
      await resend.emails.send({
        from: 'HousePlus <noreply@houseplus-ch.com>',
        to: [sanitizedData.email],
        subject: 'Thank you for your inquiry - HousePlus',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #1a56db; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
              <h2 style="margin: 0;">HousePlus</h2>
              <p style="margin: 4px 0 0; opacity: 0.9;">Your Trusted Global Trade Partner</p>
            </div>
            <div style="border: 1px solid #e5e7eb; padding: 20px; border-radius: 0 0 8px 8px;">
              <p>Dear ${sanitizedData.name},</p>
              <p>Thank you for reaching out to HousePlus. We have received your inquiry and our team will review it within <strong>24 hours</strong>.</p>
              <p>In the meantime, feel free to explore our product catalog at <a href="${SITE_URL}/en/products">${SITE_URL}/en/products</a>.</p>
              <p>Best regards,<br><strong>HousePlus Team</strong></p>
              <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
                Email: info@houseplus-ch.com<br>
                Website: <a href="${SITE_URL}">${SITE_URL}</a>
              </div>
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send email via Resend:', emailError);
      // Still return success to user — email failure shouldn't block inquiry
    }

    return NextResponse.json(
      { success: true, message: 'Inquiry submitted successfully.' },
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

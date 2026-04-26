import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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

    // 模拟异步操作
    await new Promise(resolve => setTimeout(resolve, 500));

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

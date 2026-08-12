import { NextRequest, NextResponse } from 'next/server';
import { clearSubmissionHistory, getSubmissionHistory, getSubmissionStats } from '@/lib/submission-history';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function json(body: unknown, status = 200) {
  return new NextResponse(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get('action') || 'history';
  const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '50', 10) || 50, 1), 1000);

  try {
    if (action === 'stats') return json(await getSubmissionStats());
    if (action !== 'history') return json({ success: false, error: 'Unsupported history action' }, 400);

    const history = await getSubmissionHistory(limit);
    return json({ success: true, data: history, total: history.length });
  } catch (error) {
    console.error('Error fetching persistent IndexNow history:', error);
    return json({ success: false, error: 'Failed to fetch history' }, 500);
  }
}

export async function DELETE() {
  try {
    await clearSubmissionHistory();
    return json({ success: true, message: 'Persistent history cleared' });
  } catch (error) {
    console.error('Error clearing persistent IndexNow history:', error);
    return json({ success: false, error: 'Failed to clear history' }, 500);
  }
}

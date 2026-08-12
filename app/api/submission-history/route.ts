import { NextRequest, NextResponse } from 'next/server';
import { clearSubmissionHistory, getSubmissionHistory, getSubmissionStats } from '@/lib/submission-history';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get('action') || 'history';
  const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '50', 10) || 50, 1), 1000);

  try {
    if (action === 'stats') return NextResponse.json(await getSubmissionStats());
    if (action !== 'history') return NextResponse.json({ success: false, error: 'Unsupported history action' }, { status: 400 });

    const history = await getSubmissionHistory(limit);
    return NextResponse.json({ success: true, data: history, total: history.length });
  } catch (error) {
    console.error('Error fetching persistent IndexNow history:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch history' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await clearSubmissionHistory();
    return NextResponse.json({ success: true, message: 'Persistent history cleared' });
  } catch (error) {
    console.error('Error clearing persistent IndexNow history:', error);
    return NextResponse.json({ success: false, error: 'Failed to clear history' }, { status: 500 });
  }
}

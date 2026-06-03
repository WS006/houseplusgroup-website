import { NextRequest, NextResponse } from 'next/server';
import { getSubmissionHistory, getSubmissionStats, clearSubmissionHistory, addSubmissionHistory, SubmissionHistory } from '@/lib/submission-history';

// GET - 获取提交历史和统计
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get('action') || 'history';
  const limit = parseInt(searchParams.get('limit') || '50', 10);

  try {
    if (action === 'stats') {
      const stats = await getSubmissionStats();
      return NextResponse.json(stats);
    }

    if (action === 'clear') {
      await clearSubmissionHistory();
      return NextResponse.json({ success: true, message: 'History cleared' });
    }

    // 默认返回历史记录
    const history = await getSubmissionHistory(limit);
    return NextResponse.json({
      success: true,
      data: history,
      total: history.length,
    });
  } catch (error) {
    console.error('Error fetching submission history:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch history' },
      { status: 500 }
    );
  }
}

// POST - 添加新提交记录（由提交服务自动调用）
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { addRecord, ...recordData } = body;

    if (addRecord) {
      // 添加新记录
      const record = await addSubmissionHistory(
        recordData.urls,
        recordData.engines,
        recordData.results,
        recordData.triggeredBy
      );
      return NextResponse.json({ success: true, record });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error saving submission record:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save record' },
      { status: 500 }
    );
  }
}

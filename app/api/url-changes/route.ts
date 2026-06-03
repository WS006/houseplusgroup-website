import { NextRequest, NextResponse } from 'next/server';
import { detectUrlChanges, getChangeStats, getCachedUrls, updateUrlCache } from '@/lib/url-change-detector';
import { generateAllUrls } from '@/lib/urls';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get('action') || 'detect';
    
    if (action === 'stats') {
      // 获取缓存统计
      const cached = await getCachedUrls();
      return NextResponse.json({
        success: true,
        data: cached ? {
          urlCount: cached.urls.length,
          timestamp: cached.timestamp,
        } : null,
        message: cached ? 'Cache exists' : 'No cache found',
      });
    }
    
    if (action === 'update') {
      // 更新缓存并返回变更
      const currentUrls = generateAllUrls();
      const changes = await updateUrlCache(currentUrls);
      const stats = getChangeStats(changes);
      
      return NextResponse.json({
        success: true,
        changes,
        stats,
      });
    }
    
    // 默认：检测变更
    const currentUrls = generateAllUrls();
    const changes = await detectUrlChanges(currentUrls);
    const stats = getChangeStats(changes);
    
    return NextResponse.json({
      success: true,
      changes,
      stats,
      currentUrlCount: currentUrls.length,
    });
  } catch (error) {
    console.error('Error in URL change detection:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to detect URL changes' },
      { status: 500 }
    );
  }
}

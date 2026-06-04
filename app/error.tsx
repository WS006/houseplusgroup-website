'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 记录错误到错误报告服务
    console.error('Application error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-red-50 to-gray-100">
          <div className="max-w-md">
            {/* 错误图标 */}
            <div className="mb-8">
              <div className="text-9xl font-bold text-red-200">500</div>
            </div>

            {/* 标题 */}
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Something Went Wrong
            </h1>

            {/* 描述 */}
            <p className="text-lg text-gray-600 mb-8">
              We apologize for the inconvenience. An unexpected error has occurred.
            </p>

            {/* 错误详情（开发环境） */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mb-8 p-4 bg-red-100 rounded-lg text-left">
                <p className="text-sm font-mono text-red-800 break-all">
                  {error.message}
                </p>
              </div>
            )}

            {/* 操作按钮 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={reset}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                🔄 Try Again
              </button>
              <Link
                href="/"
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                🏠 Go to Homepage
              </Link>
            </div>

            {/* 帮助信息 */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                If this problem persists, please{' '}
                <Link href="/en/contact" className="text-blue-600 hover:underline">
                  contact our support team
                </Link>
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

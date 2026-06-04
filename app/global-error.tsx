'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-red-100 to-gray-200">
          <div className="max-w-md">
            {/* 严重错误图标 */}
            <div className="mb-8">
              <div className="text-8xl">⚠️</div>
            </div>

            {/* 标题 */}
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Critical Error
            </h1>

            {/* 描述 */}
            <p className="text-lg text-gray-600 mb-8">
              A critical error has occurred. The application needs to be restarted.
            </p>

            {/* 操作按钮 */}
            <button
              onClick={reset}
              className="px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-lg"
            >
              🔄 Restart Application
            </button>

            {/* 技术信息 */}
            <div className="mt-12 pt-8 border-t border-gray-300">
              <p className="text-xs text-gray-500">
                Error ID: {error.digest || 'Unknown'}
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

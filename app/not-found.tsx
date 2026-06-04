import Link from 'next/link';

export default function RootNotFound() {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-gray-50 to-gray-100">
          <div className="max-w-md">
            {/* 404 图标 */}
            <div className="mb-8">
              <div className="text-9xl font-bold text-gray-200">404</div>
            </div>

            {/* 标题 */}
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Page Not Found
            </h1>

            {/* 描述 */}
            <p className="text-lg text-gray-600 mb-8">
              Sorry, the page you are looking for doesn&apos;t exist or has been moved.
            </p>

            {/* 操作按钮 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                🏠 Go to Homepage
              </Link>
              <Link
                href="/en"
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                🌐 English Site
              </Link>
            </div>

            {/* 常用链接 */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">Popular pages:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Link href="/en/products" className="text-blue-600 hover:underline text-sm">Products</Link>
                <span className="text-gray-300">|</span>
                <Link href="/en/about-us" className="text-blue-600 hover:underline text-sm">About Us</Link>
                <span className="text-gray-300">|</span>
                <Link href="/en/contact" className="text-blue-600 hover:underline text-sm">Contact</Link>
                <span className="text-gray-300">|</span>
                <Link href="/en/news" className="text-blue-600 hover:underline text-sm">News</Link>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

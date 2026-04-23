import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 text-center">
      <h1 className="text-6xl font-bold text-gray-800">404 - Page Not Found</h1>
      <p className="mt-4 text-xl text-gray-600">Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className="mt-6 text-blue-600 hover:underline">
        Return to Home
      </Link>
    </div>
  );
}

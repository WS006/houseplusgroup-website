import { redirect } from 'next/navigation';

// Permanent redirect from / to /en
export default function RootPage() {
  redirect('/en');
}

export const dynamic = 'force-dynamic';

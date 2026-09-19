'use client';

import { useSearchParams } from 'next/navigation';
import InquiryForm from './InquiryForm';

/**
 * Reads the `?product=` prefill on the CLIENT so the contact route can stay
 * statically rendered. Reading `searchParams` on the server would opt the whole
 * route into dynamic rendering, which pushes <title>/canonical/hreflang out of
 * <head> and into the streamed body (see P0-1 / P1-1).
 *
 * Must be rendered inside a <Suspense> boundary.
 */
export default function InquiryFormWithQueryPrefill({ lang }: { lang: string }) {
  const searchParams = useSearchParams();
  const product = searchParams?.get('product') ?? '';
  return <InquiryForm lang={lang} initialProduct={product.slice(0, 200)} />;
}

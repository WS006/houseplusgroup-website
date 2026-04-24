'use client';

import { ReactNode } from 'react';

interface SchemaRendererProps {
  schemas: Record<string, any> | Record<string, any>[];
  children?: ReactNode;
}

/**
 * SchemaRenderer Component
 * Safely injects JSON-LD structured data into the page
 * Supports single schema or array of schemas
 */
export default function SchemaRenderer({ schemas, children }: SchemaRendererProps) {
  // Ensure schemas is always an array
  const schemaArray = Array.isArray(schemas) ? schemas : [schemas];

  // Filter out null/undefined schemas
  const validSchemas = schemaArray.filter(schema => schema && Object.keys(schema).length > 0);

  if (validSchemas.length === 0) {
    return children || null;
  }

  // If multiple schemas, wrap in @graph
  const finalSchema = validSchemas.length === 1 
    ? validSchemas[0]
    : {
        '@context': 'https://schema.org',
        '@graph': validSchemas,
      };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(finalSchema, null, 2),
        }}
        suppressHydrationWarning
      />
      {children}
    </>
  );
}

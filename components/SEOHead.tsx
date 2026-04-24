'use client';

import { useEffect } from 'react';

interface SEOHeadProps {
  schemas?: any[];
}

export default function SEOHead({ schemas = [] }: SEOHeadProps) {
  useEffect(() => {
    // Inject JSON-LD schemas into the document head
    schemas.forEach((schema) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      // Cleanup is not necessary as the scripts are part of the page lifecycle
    };
  }, [schemas]);

  return null;
}

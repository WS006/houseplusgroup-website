'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';

interface Region {
  code: string;
  name: string;
  flag: string;
}

const regions: Region[] = [
  { code: 'global', name: 'Global', flag: '🌍' },
  { code: 'ng', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'eu', name: 'Europe', flag: '🇪🇺' },
];

interface RegionSwitcherProps {
  lang: string;
}

export default function RegionSwitcher({ lang }: RegionSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentRegion = searchParams.get('region') || 'global';

  const currentRegionData = regions.find((r) => r.code === currentRegion) || regions[0];

  // Build URL with region parameter
  const buildRegionUrl = (regionCode: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (regionCode === 'global') {
      params.delete('region');
    } else {
      params.set('region', regionCode);
    }
    const queryString = params.toString();
    return queryString ? `${pathname}?${queryString}` : pathname;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors rounded-lg hover:bg-slate-100"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-lg">{currentRegionData.flag}</span>
        <span className="hidden sm:inline">{currentRegionData.name}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 z-50 overflow-hidden">
            <div className="py-1">
              <p className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                Select Region
              </p>
              {regions.map((region) => (
                <Link
                  key={region.code}
                  href={buildRegionUrl(region.code)}
                  className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                    currentRegion === region.code
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-lg">{region.flag}</span>
                  <span>{region.name}</span>
                  {currentRegion === region.code && (
                    <svg className="w-4 h-4 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </Link>
              ))}
            </div>
            <div className="border-t border-slate-100 px-4 py-2">
              <p className="text-xs text-slate-400">
                Prices and availability may vary by region
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

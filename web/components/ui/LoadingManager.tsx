'use client';

import { useEffect } from 'react';
import { useLoading } from '@/contexts/LoadingContext';
import GlobalLoader from './GlobalLoader';
import { useRouteChangeLoader } from '@/hooks/useRouteChangeLoader';

export default function LoadingManager() {
  const { isLoading, setLoading } = useLoading();

  // Handle route changes
  useRouteChangeLoader();

  // Handle initial page load
  useEffect(() => {
    // Show loader initially
    setLoading(true);

    // Hide loader after page is fully loaded
    const handleLoad = () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [setLoading]);

  return <GlobalLoader isLoading={isLoading} />;
}

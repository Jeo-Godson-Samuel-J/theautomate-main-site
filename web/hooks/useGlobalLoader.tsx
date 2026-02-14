'use client';

import { useLoading } from '@/contexts/LoadingContext';

export function useGlobalLoader() {
  const { isLoading, setLoading } = useLoading();

  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  return {
    isLoading,
    showLoader,
    hideLoader,
    setLoading
  };
}

# Global Loader Usage Guide

This document explains how to use the global custom loader system in your Next.js application.

## Overview

The global loader system consists of:
- **LoadingContext**: React context for managing loading state
- **GlobalLoader**: Custom animated loader component
- **LoadingManager**: Manages initial load and route change detection
- **useGlobalLoader**: Hook for manual loader control

## Automatic Behavior

The loader automatically appears during:
1. **Initial page load**: Shows when the page first loads
2. **Route changes**: Shows when navigating between pages

## Manual Control

Use the `useGlobalLoader` hook in any component to manually control the loader:

```tsx
'use client';

import { useGlobalLoader } from '@/hooks/useGlobalLoader';

export default function MyComponent() {
  const { isLoading, showLoader, hideLoader } = useGlobalLoader();

  const handleAsyncOperation = async () => {
    showLoader();
    try {
      await someAsyncOperation();
    } finally {
      hideLoader();
    }
  };

  return (
    <div>
      <button onClick={handleAsyncOperation}>
        {isLoading ? 'Loading...' : 'Start Operation'}
      </button>
    </div>
  );
}
```

## Available Methods

- `isLoading`: Boolean indicating if loader is currently shown
- `showLoader()`: Function to show the loader
- `hideLoader()`: Function to hide the loader
- `setLoading(boolean)`: Function to directly set loading state

## Customization

The loader appearance can be customized in `components/ui/GlobalLoader.tsx`:
- Modify colors, animations, and sizing
- Adjust loading text
- Change animation duration and effects

## Integration

The loader is already integrated into the root layout (`app/layout.tsx`) and will work automatically throughout your application.

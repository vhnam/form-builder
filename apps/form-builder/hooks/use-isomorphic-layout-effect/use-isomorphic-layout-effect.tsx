import { useEffect, useLayoutEffect } from 'react';

/**
 * A hook that uses useLayoutEffect on the client and useEffect on the server
 * to avoid hydration mismatches
 */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

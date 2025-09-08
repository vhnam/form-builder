import { useEffect, useState } from 'react';

/**
 * A hook that returns true only after the component has mounted on the client
 * This helps prevent hydration mismatches by ensuring certain components
 * only render after hydration is complete
 */
export function useClientOnly(): boolean {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
}

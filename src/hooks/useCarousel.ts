import { useCallback, useEffect, useState } from 'react';

interface UseCarouselOptions {
  itemCount: number;
  autoplayDelayMs: number;
  autoplayEnabled: boolean;
}

export function useCarousel({
  itemCount,
  autoplayDelayMs,
  autoplayEnabled,
}: UseCarouselOptions) {
  const [index, setIndex] = useState(0);

  const goTo = useCallback(
    (nextIndex: number) => {
      if (itemCount === 0) {
        setIndex(0);
        return;
      }

      setIndex(((nextIndex % itemCount) + itemCount) % itemCount);
    },
    [itemCount],
  );

  useEffect(() => {
    if (index >= itemCount) {
      goTo(0);
    }
  }, [goTo, index, itemCount]);

  useEffect(() => {
    if (!autoplayEnabled || itemCount < 2) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % itemCount);
    }, autoplayDelayMs);

    return () => window.clearInterval(timer);
  }, [autoplayDelayMs, autoplayEnabled, itemCount]);

  return { index, goTo };
}

import { type TouchEvent, useRef, useState } from 'react';
import { useCarousel } from '../hooks/useCarousel';
import type { GalleryItem } from '../types/content';
import styles from './Carousel.module.css';

export function Carousel({ items }: { items: GalleryItem[] }) {
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  const { index, goTo } = useCarousel({
    itemCount: items.length,
    autoplayDelayMs: 6000,
    autoplayEnabled: !isPaused && !reducedMotion,
  });

  if (!items.length) return null;
  const selectImage = (nextIndex: number) => {
    goTo(nextIndex);
    setIsPaused(true);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;

    const distance = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(distance) > 45) {
      selectImage(index + (distance < 0 ? 1 : -1));
    }
    touchStartX.current = null;
  };

  return (
    <div
      className={styles.carousel}
      aria-roledescription="carrossel"
      aria-label="Registros das ações"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0].clientX;
        setIsPaused(true);
      }}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.viewport} aria-live="polite">
        {items.map((item, itemIndex) => (
          <figure key={item.src} hidden={itemIndex !== index}>
            <img src={item.src} alt={item.alt} width={item.width} height={item.height} loading="lazy" />
            {item.caption && <figcaption>{item.caption}</figcaption>}
          </figure>
        ))}
      </div>
      {items.length > 1 && (
        <div className={styles.controls}>
          <button type="button" onClick={() => selectImage(index - 1)} aria-label="Imagem anterior">
            <ArrowIcon direction="previous" />
          </button>
          <span>{index + 1} / {items.length}</span>
          <button type="button" onClick={() => selectImage(index + 1)} aria-label="Próxima imagem">
            <ArrowIcon direction="next" />
          </button>
        </div>
      )}
      {items.length > 1 && (
        <div className={styles.dots}>
          {items.map((item, itemIndex) => (
            <button
              key={`${item.src}-${itemIndex}`}
              type="button"
              aria-label={`Ir para imagem ${itemIndex + 1}`}
              aria-current={index === itemIndex}
              onClick={() => selectImage(itemIndex)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ArrowIcon({ direction }: { direction: 'previous' | 'next' }) {
  const path = direction === 'previous' ? 'M15 18 9 12l6-6' : 'm9 18 6-6-6-6';
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

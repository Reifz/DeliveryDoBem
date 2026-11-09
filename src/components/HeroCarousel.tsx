import { useCarousel } from '../hooks/useCarousel';
import type { GalleryItem } from '../types/content';
import styles from './HeroCarousel.module.css';

const AUTOPLAY_DELAY = 6000;

export function HeroCarousel({ items }: { items: GalleryItem[] }) {
  const { index } = useCarousel({
    itemCount: items.length,
    autoplayDelayMs: AUTOPLAY_DELAY,
    autoplayEnabled: true,
  });

  if (!items.length) return null;

  return (
    <div
      className={styles.carousel}
      role="group"
      aria-roledescription="carrossel"
      aria-label="Destaques das ações"
    >
      <div className={styles.viewport} aria-live="polite">
        {items.map((item, itemIndex) => (
          <figure key={item.src} hidden={itemIndex !== index}>
            <img src={item.src} alt={item.alt} width={item.width} height={item.height} fetchPriority={itemIndex === 0 ? 'high' : 'auto'} />
          </figure>
        ))}
      </div>
    </div>
  );
}

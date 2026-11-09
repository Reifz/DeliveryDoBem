import { useEffect, useRef, useState } from 'react';
import type { GalleryItem } from '../types/content';
import styles from './Gallery.module.css';

export function Gallery({ items }: { items: GalleryItem[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const triggerButton = useRef<HTMLButtonElement | null>(null);
  const dialog = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selectedIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current?.querySelector<HTMLButtonElement>('button')?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedIndex(null);
      if (event.key === 'Tab' && dialog.current) {
        const focusable = [...dialog.current.querySelectorAll<HTMLElement>('button')];
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      triggerButton.current?.focus();
    };
  }, [selectedIndex]);

  if (!items.length) return null;

  const selectedItem = selectedIndex === null ? null : items[selectedIndex];

  return (
    <>
      <div className={styles.grid}>
        {items.map((item, index) => (
          <button
            key={`${item.src}-${index}`}
            type="button"
            onClick={(event) => {
              triggerButton.current = event.currentTarget;
              setSelectedIndex(index);
            }}
            aria-label={`Ampliar: ${item.alt}`}
          >
            <img src={item.src} alt={item.alt} width={item.width} height={item.height} loading="lazy" />
          </button>
        ))}
      </div>
      {selectedItem && (
        <div
          className={styles.overlay}
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedIndex(null);
          }}
        >
          <div className={styles.dialog} ref={dialog} role="dialog" aria-modal="true" aria-label="Visualização ampliada">
            <button type="button" onClick={() => setSelectedIndex(null)} aria-label="Fechar visualização">×</button>
            <figure>
              <img src={selectedItem.src} alt={selectedItem.alt} width={selectedItem.width} height={selectedItem.height} />
              {selectedItem.caption && <figcaption>{selectedItem.caption}</figcaption>}
            </figure>
          </div>
        </div>
      )}
    </>
  );
}

import { useEffect, useState } from 'react';
import styles from './Header.module.css';

export interface NavItem {
  id: string;
  label: string;
}

export function Header({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(items[0]?.id ?? 'inicio');

  useEffect(() => {
    const sections = items
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-20% 0px -65%', threshold: [0, 0.2, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a className={styles.brand} href="#inicio" aria-label="Delivery do Bem - início">
          <span>Delivery do Bem</span>
        </a>
        <button
          className={styles.menuButton}
          type="button"
          aria-expanded={open}
          aria-controls="menu-principal"
          onClick={() => setOpen((current) => !current)}
        >
          <span className={styles.menuIcon} aria-hidden="true"><i /><i /><i /></span>
          <span>{open ? 'Fechar' : 'Menu'}</span>
        </button>
        <nav id="menu-principal" className={`${styles.nav} ${open ? styles.open : ''}`} aria-label="Navegação principal">
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'location' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

import styles from './SectionHeading.module.css';

export function SectionHeading({ eyebrow, title, intro, align = 'left' }: { eyebrow: string; title: string; intro?: string; align?: 'left' | 'center' }) {
  return (
    <header className={`${styles.heading} ${align === 'center' ? styles.center : ''}`}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2>{title}</h2>
      {intro && <p className={styles.intro}>{intro}</p>}
    </header>
  );
}

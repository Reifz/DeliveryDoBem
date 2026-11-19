import type { ExternalDonationMethod } from '../types/content';
import styles from './DonationMethods.module.css';

export function isDonationMethodActive(method: ExternalDonationMethod) {
  return method.url.status === 'confirmed' && /^https:\/\//.test(method.url.value.trim());
}

export function DonationMethods({ methods }: { methods: ExternalDonationMethod[] }) {
  const activeMethods = methods.filter(isDonationMethodActive);
  if (activeMethods.length === 0) return null;

  return (
    <div className={styles.methods} aria-label="Outras formas de doar">
      {activeMethods.map((method) => (
        <article className={styles[method.provider]} key={`${method.provider}-${method.url.value}`}>
          <div className={styles.brand} aria-hidden="true"><i /><i /><i /><strong>PagBank</strong></div>
          <div><h3>{method.label}</h3><p>{method.description}</p></div>
          <a className="button" href={method.url.value} target="_blank" rel="noreferrer">Acessar PagBank</a>
        </article>
      ))}
    </div>
  );
}

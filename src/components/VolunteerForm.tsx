import type { VolunteerFormConfig } from '../types/content';
import styles from './VolunteerForm.module.css';

export function isFormEnabled(config: VolunteerFormConfig) {
  return config.url.status === 'confirmed' && /^https:\/\/docs\.google\.com\/forms\//.test(config.url.value.trim());
}

function getEmbedUrl(url: string) {
  const embedUrl = new URL(url);
  embedUrl.search = '';
  embedUrl.searchParams.set('embedded', 'true');
  return embedUrl.toString();
}

export function VolunteerForm({ config }: { config: VolunteerFormConfig }) {
  if (!isFormEnabled(config)) return null;

  return (
    <div className={styles.form}>
      <iframe src={getEmbedUrl(config.url.value)} title="Formulário de voluntariado do Delivery do Bem" loading="lazy">
        Carregando formulário de voluntariado...
      </iframe>
      <p>Se o formulário não abrir, <a href={config.url.value} target="_blank" rel="noreferrer">acesse o Google Forms em uma nova aba</a>.</p>
    </div>
  );
}

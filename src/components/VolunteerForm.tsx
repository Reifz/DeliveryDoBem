import { type FormEvent, type ReactNode, useState } from 'react';
import type { VolunteerFormConfig } from '../types/content';
import styles from './VolunteerForm.module.css';

type Fields = 'name' | 'email' | 'whatsapp' | 'city' | 'availability' | 'collaboration' | 'message' | 'consent';
type Errors = Partial<Record<Fields, string>>;

export function isFormEnabled(config: VolunteerFormConfig) {
  if (config.mode === 'demo') return true;
  return Boolean(config.endpoint && /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(config.endpoint) && config.privacyPolicy.status === 'confirmed' && /^https?:\/\//.test(config.privacyPolicy.value));
}

export function VolunteerForm({ config }: { config: VolunteerFormConfig }) {
  const enabled = isFormEnabled(config);
  const isDemo = config.mode === 'demo';
  const [errors, setErrors] = useState<Errors>({});
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  if (!enabled) return null;

  const validate = (data: FormData) => {
    const next: Errors = {};
    const required: Array<[Fields, string]> = [
      ['name', 'Informe seu nome completo.'], ['email', 'Informe seu e-mail.'],
      ['whatsapp', 'Informe seu WhatsApp.'], ['city', 'Informe sua cidade.'],
      ['availability', 'Conte quando você pode participar.'], ['collaboration', 'Escolha uma forma de colaboração.'],
    ];
    required.forEach(([field, message]) => { if (!String(data.get(field) ?? '').trim()) next[field] = message; });
    const email = String(data.get('email') ?? '');
    if (email && !/^\S+@\S+\.\S+$/.test(email)) next.email = 'Use um e-mail válido.';
    const phone = String(data.get('whatsapp') ?? '').replace(/\D/g, '');
    if (phone && phone.length < 10) next.whatsapp = 'Use um número com DDD.';
    if (data.get('consent') !== 'on') next.consent = 'Você precisa concordar para enviar.';
    return next;
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get('_gotcha')) return;
    const nextErrors = validate(data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(nextErrors)[0]}"]`)?.focus();
      return;
    }
    setSubmissionStatus('sending');
    if (isDemo) {
      setSubmissionStatus('success');
      form.reset();
      return;
    }
    try {
      const response = await fetch(config.endpoint!, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      if (!response.ok) throw new Error('Falha no envio');
      setSubmissionStatus('success');
      form.reset();
    } catch {
      setSubmissionStatus('error');
    }
  };

  const errorProps = (field: Fields) => ({
    'aria-invalid': Boolean(errors[field]),
    'aria-describedby': errors[field] ? `${field}-error` : undefined,
  });

  return (
    <form className={styles.form} onSubmit={submit} noValidate aria-busy={submissionStatus === 'sending'}>
      <div className={styles.honeypot} aria-hidden="true"><label>Não preencha <input name="_gotcha" tabIndex={-1} autoComplete="off" /></label></div>
      <Field label="Nome completo" name="name" error={errors.name}><input id="name" name="name" autoComplete="name" {...errorProps('name')} /></Field>
      <Field label="E-mail" name="email" error={errors.email}><input id="email" name="email" type="email" autoComplete="email" {...errorProps('email')} /></Field>
      <Field label="WhatsApp" name="whatsapp" error={errors.whatsapp}><input id="whatsapp" name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" {...errorProps('whatsapp')} /></Field>
      <Field label="Cidade" name="city" error={errors.city}><input id="city" name="city" autoComplete="address-level2" {...errorProps('city')} /></Field>
      <Field label="Disponibilidade" name="availability" error={errors.availability} full><input id="availability" name="availability" placeholder="Ex.: uma quinta-feira por mês" {...errorProps('availability')} /></Field>
      <Field label="Como quer colaborar?" name="collaboration" error={errors.collaboration} full><select id="collaboration" name="collaboration" defaultValue="" {...errorProps('collaboration')}><option value="" disabled>Selecione uma opção</option><option>Participar das entregas</option><option>Ajudar na organização</option><option>Doar itens</option><option>Outra forma</option></select></Field>
      <Field label="Mensagem (opcional)" name="message" full><textarea id="message" name="message" rows={4} /></Field>
      <div className={`${styles.field} ${styles.full} ${styles.consent}`}>
        <label><input name="consent" type="checkbox" {...errorProps('consent')} /> <span>{isDemo ? 'Concordo em participar desta ação voluntária.' : <>Li e concordo com a <a href={config.privacyPolicy.value} target="_blank" rel="noreferrer">política de privacidade</a>.</>}</span></label>
        {errors.consent && <span className={styles.error} id="consent-error">{errors.consent}</span>}
      </div>
      <div className={`${styles.actions} ${styles.full}`}>
        <button className="button buttonPrimary" type="submit" disabled={submissionStatus === 'sending'}>{submissionStatus === 'sending' ? 'Enviando...' : 'Quero ser voluntário'}</button>
        <p role="status" aria-live="polite">{submissionStatus === 'success' && (isDemo ? 'Inscrição concluída localmente. Nenhum dado foi transmitido.' : 'Recebemos seus dados. Obrigado por chegar junto!')}{submissionStatus === 'error' && 'Não foi possível enviar agora. Seus dados continuam preenchidos; tente novamente.'}</p>
      </div>
    </form>
  );
}

function Field({ label, name, error, full, children }: { label: string; name: string; error?: string; full?: boolean; children: ReactNode }) {
  return <div className={`${styles.field} ${full ? styles.full : ''}`}><label htmlFor={name}>{label}</label><div>{children}</div>{error && <span className={styles.error} id={`${name}-error`}>{error}</span>}</div>;
}

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import type { PixConfig } from '../types/content';
import { createPixPayload } from '../utils/pixPayload';
import styles from './PixModule.module.css';

export function isPixConfirmed(config: PixConfig) {
  const expectedStatus = config.mode === 'demo' ? 'demo' : 'confirmed';
  return [config.key, config.beneficiary, config.city].every((field) => field.status === expectedStatus && field.value.trim());
}

export function PixModule({ config }: { config: PixConfig }) {
  const [copied, setCopied] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const hasConfirmedData = isPixConfirmed(config);
  const isDemo = config.mode === 'demo';

  useEffect(() => {
    if (!hasConfirmedData) return;

    const payload = createPixPayload(config.key.value, config.beneficiary.value, config.city.value);
    QRCode.toDataURL(payload, {
      width: 240,
      margin: 2,
      color: { dark: '#203f46', light: '#ffffff' },
    })
      .then(setQrCode)
      .catch(() => setQrCode(''));
  }, [config, hasConfirmedData]);

  if (!hasConfirmedData) return null;

  const copyPixKey = async () => {
    await navigator.clipboard.writeText(config.key.value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  };

  return (
    <aside className={`${styles.module} ${isDemo ? styles.demo : ''}`} id="pix" aria-labelledby="pix-title">
      {isDemo && <p className={styles.demoBanner} role="note">Demonstração - não realize pagamentos</p>}
      <div>
        <p className={styles.kicker}>{isDemo ? 'Interação demonstrativa' : 'Doação direta'}</p>
        <h3 id="pix-title">{isDemo ? 'Pix de demonstração' : 'Pix seguro, sem intermediários'}</h3>
        <p>{isDemo ? 'A chave e o QR Code abaixo são inválidos para pagamentos e servem apenas para testar esta prévia.' : 'Confira os dados no aplicativo do seu banco antes de concluir.'}</p>
        <dl>
          <div><dt>Chave</dt><dd>{config.key.value}</dd></div>
          <div><dt>Beneficiário</dt><dd>{config.beneficiary.value}</dd></div>
          <div><dt>Cidade</dt><dd>{config.city.value}</dd></div>
        </dl>
        <button className="button buttonPrimary" type="button" onClick={copyPixKey}>{isDemo ? 'Copiar chave de teste' : 'Copiar chave'}</button>
        <p className={styles.status} role="status" aria-live="polite">{copied ? (isDemo ? 'Chave de teste copiada.' : 'Chave Pix copiada.') : ''}</p>
      </div>
      {qrCode && <div className={styles.qrWrap}><img src={qrCode} width="240" height="240" alt={`QR Code Pix de ${config.beneficiary.value}`} />{isDemo && <span>DEMO</span>}</div>}
    </aside>
  );
}

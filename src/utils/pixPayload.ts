const field = (id: string, value: string) => `${id}${String(value.length).padStart(2, '0')}${value}`;

function normalize(value: string, maxLength: number) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z0-9 ]/g, '')
    .trim()
    .toUpperCase()
    .slice(0, maxLength);
}

function crc16(value: string) {
  let crc = 0xffff;
  for (let index = 0; index < value.length; index += 1) {
    crc ^= value.charCodeAt(index) << 8;
    for (let bit = 0; bit < 8; bit += 1) crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) : crc << 1;
    crc &= 0xffff;
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

export function createPixPayload(key: string, beneficiary: string, city: string) {
  const merchantAccount = field('00', 'BR.GOV.BCB.PIX') + field('01', key.trim());
  const additionalData = field('05', '***');
  const partial = [
    field('00', '01'),
    field('26', merchantAccount),
    field('52', '0000'),
    field('53', '986'),
    field('58', 'BR'),
    field('59', normalize(beneficiary, 25)),
    field('60', normalize(city, 15)),
    field('62', additionalData),
    '6304',
  ].join('');
  return `${partial}${crc16(partial)}`;
}

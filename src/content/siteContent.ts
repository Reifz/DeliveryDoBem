import type { SiteContent } from '../types/content';

const confirmed = <T,>(value: T) => ({ status: 'confirmed' as const, value });
const pending = <T,>(value: T) => ({ status: 'pending' as const, value });
const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const actionPhotoOne = {
  src: assetUrl('media/acao-noturna-1.avif'),
  alt: 'Duas pessoas sorrindo juntas durante uma ação noturna; uma segura um copo e um lanche.',
  caption: 'Encontro durante uma ação noturna.',
  width: 800,
  height: 600,
};
const actionPhotoTwo = {
  src: assetUrl('media/acao-noturna-2.avif'),
  alt: 'Duas pessoas conversam e sorriem durante uma ação noturna; uma segura um copo.',
  caption: 'Conversa e presença durante a ação.',
  width: 800,
  height: 600,
};

export const siteContent: SiteContent = {
  action: {
    frequency: 'Uma vez por mês',
    day: confirmed('Última quinta-feira do mês'),
    time: confirmed('21h'),
    address: confirmed('Avenida Washington Luís, 1277 - São Paulo, SP'),
  },
  pix: {
    mode: 'live',
    key: confirmed('56263259000180'),
    beneficiary: confirmed('DELIVERY DO BEM'),
    city: confirmed('SAO PAULO'),
  },
  volunteerForm: {
    url: confirmed('https://docs.google.com/forms/d/e/1FAIpQLSecneEcA89wUhNVLhGloKV0VgewCbzqWfYjkV8rHk8U2-IM-A/viewform?usp=dialog'),
  },
  donationMethods: [
    {
      provider: 'pagbank',
      label: 'Doar com PagBank',
      description: 'Abra o ambiente do PagBank para escolher a forma de pagamento.',
      url: pending(''),
    },
  ],
  gallery: [actionPhotoOne, actionPhotoTwo, actionPhotoOne, actionPhotoTwo, actionPhotoOne, actionPhotoTwo, actionPhotoOne, actionPhotoTwo, actionPhotoOne],
  carousel: [actionPhotoOne, actionPhotoTwo],
  videos: [
    { kind: 'local', src: assetUrl('media/video-demonstrativo.mp4'), title: 'Ação em movimento - parte 1', width: 1280, height: 720 },
    { kind: 'local', src: assetUrl('media/video-demonstrativo.mp4'), title: 'Ação em movimento - parte 2', width: 1280, height: 720 },
    { kind: 'local', src: assetUrl('media/video-demonstrativo.mp4'), title: 'Ação em movimento - parte 3', width: 1280, height: 720 },
  ],
  guide: {
    summary: 'Com base na experiência de nossas ações desde 2015, esta cartilha traz sugestões para encorajar uma atuação responsável em favor de pessoas em situação de rua.',
    url: confirmed('https://f73a5e7d-3f9b-41c5-88d2-3624db8263a6.filesusr.com/ugd/79058f_a0d5e1ba4bc84add9ee3b6312abff358.pdf'),
  },
  contacts: [
    { label: 'Telefone', value: 'Vinícius - (11) 99288-6029', href: 'tel:+5511992886029', status: 'confirmed' },
    { label: 'E-mail', value: 'acaodeliverydobem@gmail.com', href: 'mailto:acaodeliverydobem@gmail.com', status: 'confirmed' },
    { label: 'Instagram', value: '@acaodeliverydobem', href: 'https://www.instagram.com/acaodeliverydobem/', status: 'confirmed', external: true },
    { label: 'Facebook', value: 'facebook.com/acaodeliverydobem', href: 'https://www.facebook.com/acaodeliverydobem', status: 'confirmed', external: true },
  ],
  heroVideo: {
    src: assetUrl('media/video-demonstrativo.mp4'),
    title: 'Apresentação da ação Delivery do Bem',
    poster: actionPhotoOne.src,
  },
};

import { Carousel } from './components/Carousel';
import { Gallery } from './components/Gallery';
import { Header, type NavItem } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { MediaAlbum, VideoAlbum } from './components/MediaAlbums';
import { PixModule } from './components/PixModule';
import { SectionHeading } from './components/SectionHeading';
import { VolunteerForm } from './components/VolunteerForm';
import { siteContent } from './content/siteContent';
import styles from './App.module.css';

const navigation: NavItem[] = [
  { id: 'inicio', label: 'Início' }, { id: 'proposito', label: 'Propósito' },
  { id: 'acao', label: 'Nossa ação' }, { id: 'ajudar', label: 'Como ajudar' },
  { id: 'galeria', label: 'Registros' }, { id: 'guia', label: 'Guia Seguro' }, { id: 'contato', label: 'Contato' },
];

function HeartHandsIcon() { return <svg viewBox="0 0 80 80" aria-hidden="true"><path d="M40 63C22 51 13 41 13 28c0-9 7-16 16-16 5 0 9 2 11 6 3-4 7-6 12-6 9 0 16 7 16 16 0 13-10 23-28 35Z" /><path d="M8 48c10-3 16 2 23 11M72 48c-10-3-16 2-23 11" /></svg>; }
function PackageIcon() { return <svg viewBox="0 0 80 80" aria-hidden="true"><path d="m13 26 27-13 27 13-27 14-27-14Zm0 0v29l27 13 27-13V26M40 40v28M27 19l27 14" /></svg>; }
function PresenceIcon() { return <svg viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="21" r="10"/><path d="M20 65c2-19 8-29 20-29s18 10 20 29M14 39c8 1 13 5 17 11M66 39c-8 1-13 5-17 11" /></svg>; }

export function App() {
  const contacts = siteContent.contacts.filter((contact) => contact.status === 'confirmed' || contact.status === 'demo');
  const actionDetails = [siteContent.action.day, siteContent.action.time, siteContent.action.address].filter((item) => item.status === 'confirmed' || item.status === 'demo');

  return <>
    <a className="skipLink" href="#conteudo">Pular para o conteúdo</a>
    <Header items={navigation} />
    <main id="conteudo" tabIndex={-1}>
      <section className={styles.hero} id="inicio" aria-labelledby="hero-title">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <div className={styles.heroLogoWrap}><img className={styles.heroLogo} src="/imagem_logo.avif" width="360" height="154" alt="Delivery do Bem" /></div>
            <h1 id="hero-title">Amor, cuidado e dignidade nas ruas</h1>
            <p className={styles.heroLead}>Uma vez por mês, voluntários entregam doações e conversam com pessoas em situação de rua em São Paulo.</p>
            <div className={styles.heroActions}><a className="button buttonPrimary" href="#voluntariado">Quero participar</a><a className="button buttonSecondary" href="#ajudar">Como posso ajudar</a></div>
          </div>
          <div className={styles.heroVisual}><HeroCarousel items={siteContent.heroSlides} /></div>
        </div>
        <a className={styles.scrollCue} href="#proposito">Conheça a causa</a>
      </section>

      <section className={`section ${styles.purpose}`} id="proposito"><div className="container">
        <div className={styles.purposeGrid}><SectionHeading eyebrow="Nosso propósito" title="Apoio material com respeito e presença" /><div className={styles.editorialText}><p className={styles.lead}>Na última quinta-feira de cada mês, a equipe distribui alimentos, roupas e itens de higiene a pessoas em situação de rua.</p><p>As entregas são acompanhadas de conversa e escuta. A continuidade mensal ajuda voluntários e participantes a manter contato ao longo do tempo.</p></div></div>
        <div className={styles.values} aria-label="Nossos valores"><article><strong>01</strong><h3>Presença</h3><p>Estar junto com escuta, tempo e atenção verdadeira.</p></article><article><strong>02</strong><h3>Dignidade</h3><p>Reconhecer cada pessoa para além de sua circunstância.</p></article><article><strong>03</strong><h3>Continuidade</h3><p>Construir vínculos por meio de encontros que se repetem.</p></article></div>
      </div></section>

      <section className={`section ${styles.action}`} id="acao"><div className="container"><div className={styles.actionGrid}>
        <div className={styles.actionVisual} aria-hidden="true"><div className={styles.monthCircle}><span>todo mês</span><span>um novo</span><span>encontro</span></div><span className={styles.routeLine} /><i className={styles.routeDotOne} /><i className={styles.routeDotTwo} /></div>
        <div><SectionHeading eyebrow="Nossa ação" title="Ação mensal em São Paulo" intro="A equipe se reúne na última quinta-feira do mês, às 21h, na Avenida Washington Luís, 1277 - São Paulo, SP." /><div className={styles.actionFacts}><div><p><small>Frequência</small><strong>{siteContent.action.frequency}</strong></p></div>{actionDetails.map((detail) => <div key={detail.value}><p><small>Informação da ação</small><strong>{detail.value}</strong></p></div>)}</div></div>
      </div></div></section>

      <section className={styles.mapSection} aria-labelledby="map-title"><div className="container"><div className={styles.mapCard}>
        <div className={styles.mapCopy}><p className={styles.mapEyebrow}>Ponto de encontro</p><h2 id="map-title">Local da saída</h2><p>Encontre a equipe na Avenida Washington Luís, 1277 - São Paulo, SP. Chegue alguns minutos antes para organizar as entregas.</p><dl><div><dt>Dia</dt><dd>{siteContent.action.day.value}</dd></div><div><dt>Horário</dt><dd>{siteContent.action.time.value}</dd></div><div><dt>Endereço</dt><dd>{siteContent.action.address.value}</dd></div></dl><a className="button buttonPrimary" href="https://www.google.com/maps/dir/?api=1&destination=Avenida+Washington+Luis%2C+1277%2C+Sao+Paulo%2C+SP" target="_blank" rel="noreferrer">Abrir rotas no Google Maps</a></div>
        <div className={styles.mapFrame}><iframe title="Mapa do ponto de encontro na Avenida Washington Luís, 1277" src="https://www.google.com/maps?q=Avenida+Washington+Luis,+1277,+Sao+Paulo,+SP&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div>
      </div></div></section>

      <section className="section" id="ajudar"><div className="container">
        <SectionHeading eyebrow="Faça parte" title="Como ajudar" intro="Você pode doar recursos ou itens essenciais e também participar da organização e das entregas." align="center" />
        <div className={styles.helpCards}>
          <article><span className={styles.cardNumber}>01</span><HeartHandsIcon /><h3>Contribua com recursos</h3><p>Faça uma doação direta pelo Pix. O QR Code não possui valor fixo.</p><a href="#pix">Ver dados do Pix</a></article>
          <article><span className={styles.cardNumber}>02</span><PackageIcon /><h3>Doe itens essenciais</h3><p><strong>Alimentos:</strong> água, suco, bolo, bolachas, café, leite e açúcar.<br/><strong>Vestuário:</strong> roupas, calçados, cobertores, meias e acessórios em bom estado.<br/><strong>Higiene:</strong> shampoo, condicionador, sabonete, pasta de dente, gilete, absorvente e pente.</p><a href="#contato">Falar com a equipe</a></article>
          <article><span className={styles.cardNumber}>03</span><PresenceIcon /><h3>Doe tempo e presença</h3><p>Voluntários podem ajudar na organização dos itens e participar das entregas mensais.</p><a href="#voluntariado">Quero ser voluntário</a></article>
        </div>
        <PixModule config={siteContent.pix} />
      </div></section>

      <section className={`section ${styles.volunteer}`} id="voluntariado"><div className="container"><div className={styles.volunteerGrid}><SectionHeading eyebrow="Voluntariado" title="Participe como voluntário" intro="Preencha o formulário para informar sua disponibilidade e como deseja colaborar com as próximas ações." /><VolunteerForm config={siteContent.volunteerForm} /></div></div></section>

      <section className={`section ${styles.media}`} id="galeria"><div className="container"><SectionHeading eyebrow="Registros" title="Registros das ações" intro="Veja fotos e vídeos feitos durante os encontros e as entregas." />
        <MediaAlbum eyebrow="Destaques" title="Um olhar sobre a ação" itemCount={siteContent.carousel.length} singular="foto" plural="fotos" titleId="destaques-title" featured><Carousel items={siteContent.carousel} /></MediaAlbum>
        <MediaAlbum eyebrow="Álbum de fotos" title="Encontros e presença" itemCount={siteContent.gallery.length} singular="foto" plural="fotos" titleId="fotos-title"><Gallery items={siteContent.gallery} /></MediaAlbum>
        {siteContent.videos.length > 0 && <VideoAlbum items={siteContent.videos} />}
      </div></section>

      <section className={`section ${styles.guide}`} id="guia"><div className="container"><div className={styles.guideCard}><div className={styles.guideMark} aria-hidden="true"><span>GUIA SEGURO</span></div><div><SectionHeading eyebrow="Conhecimento compartilhado" title="Orientações para ajudar com segurança" intro={siteContent.guide.summary} /><p className={styles.guideText}>O Guia Seguro apresenta orientações para conversar, oferecer ajuda e respeitar os limites de cada pessoa.</p><a className={`button ${styles.guideButton}`} href={siteContent.guide.url.value} target="_blank" rel="noreferrer">Abrir o Guia Seguro (PDF)</a></div></div></div></section>

      <section className={`section ${styles.contact}`} id="contato"><div className="container"><SectionHeading eyebrow="Contato" title="Fale com a equipe" intro="Use um dos canais abaixo para tirar dúvidas sobre doações, voluntariado e o ponto de encontro." align="center" /><ul className={styles.contactList}>{contacts.map((contact) => <li key={contact.label}><span>{contact.label}</span><a href={contact.href} target={contact.external ? '_blank' : undefined} rel={contact.external ? 'noreferrer' : undefined}>{contact.value}</a></li>)}</ul></div></section>
    </main>
    <footer className={styles.footer}><div className="container"><a href="#inicio" aria-label="Voltar ao início"><img src="/imagem_logo.avif" alt="Delivery do Bem" width="180" height="77" /></a><p>Cuidado, presença e dignidade.</p><p>© {new Date().getFullYear()} Delivery do Bem</p></div></footer>
  </>;
}

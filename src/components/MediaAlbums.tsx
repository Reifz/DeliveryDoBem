import { type ReactNode } from 'react';
import type { VideoItem } from '../types/content';
import styles from '../App.module.css';

interface AlbumProps {
  eyebrow: string;
  title: string;
  itemCount: number;
  singular: string;
  plural: string;
  titleId: string;
  featured?: boolean;
  children: ReactNode;
}

export function MediaAlbum({
  eyebrow,
  title,
  itemCount,
  singular,
  plural,
  titleId,
  featured = false,
  children,
}: AlbumProps) {
  const itemLabel = itemCount === 1 ? singular : plural;

  return (
    <article
      className={`${styles.mediaCard} ${featured ? styles.featuredAlbum : ''}`}
      aria-labelledby={titleId}
    >
      <div className={styles.albumHeading}>
        <div>
          <p>{eyebrow}</p>
          <h3 id={titleId}>{title}</h3>
        </div>
        <span>
          {itemCount} {itemLabel}
        </span>
      </div>
      {children}
    </article>
  );
}

export function VideoAlbum({ items }: { items: VideoItem[] }) {
  return (
    <MediaAlbum
      eyebrow="Álbum de vídeos"
      title="Ação em movimento"
      itemCount={items.length}
      singular="vídeo"
      plural="vídeos"
      titleId="videos-title"
    >
      <div className={styles.videos}>
        {items.map((video) => (
          <VideoFigure
            key={video.kind === 'local' ? `${video.src}-${video.title}` : video.url}
            video={video}
          />
        ))}
      </div>
    </MediaAlbum>
  );
}

function VideoFigure({ video }: { video: VideoItem }) {
  if (video.kind === 'embed') {
    return (
      <figure>
        <iframe
          src={video.url}
          title={video.title}
          width={video.width}
          height={video.height}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="fullscreen"
          allowFullScreen
        />
        <VideoCaption video={video} />
      </figure>
    );
  }

  return (
    <figure>
      <video
        controls
        preload="metadata"
        width={video.width}
        height={video.height}
        poster={video.poster}
        aria-label={video.title}
      >
        <source src={video.src} type="video/mp4" />
        Seu navegador não reproduz este vídeo.
      </video>
      <VideoCaption video={video} />
    </figure>
  );
}

function VideoCaption({ video }: { video: VideoItem }) {
  return (
    <figcaption>
      <strong>{video.title}</strong>
      {video.kind === 'embed' && video.caption && <span>{video.caption}</span>}
    </figcaption>
  );
}

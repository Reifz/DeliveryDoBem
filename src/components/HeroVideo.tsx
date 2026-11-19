import { useRef, useState } from 'react';
import type { HeroVideoConfig } from '../types/content';
import styles from './HeroVideo.module.css';

export function HeroVideo({ video }: { video: HeroVideoConfig }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);

  const toggleSound = () => {
    const element = videoRef.current;
    if (!element) return;
    const nextMuted = !muted;
    element.muted = nextMuted;
    setMuted(nextMuted);
  };

  return (
    <div className={styles.frame}>
      {failed ? (
        <img src={video.poster} alt="Voluntários durante uma ação do Delivery do Bem" />
      ) : (
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          aria-label={video.title}
          autoPlay
          muted={muted}
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          controlsList="nodownload noplaybackrate noremoteplayback"
          onError={() => setFailed(true)}
        />
      )}
      {!failed && (
        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? 'Ativar som' : 'Desativar som'}
          aria-pressed={!muted}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 9v6h4l5 4V5L8 9H4Z" />
            {muted ? <path d="m17 9 4 6m0-6-4 6" /> : <path d="M17 8c1.4 1.1 2 2.4 2 4s-.6 2.9-2 4" />}
          </svg>
        </button>
      )}
    </div>
  );
}

document.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('.hero-stage-video');
  if (!video) return;

  const tryPlay = () => {
    const p = video.play();
    if (p && typeof p.catch === 'function') {
      p.catch(() => {});
    }
  };

  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');

  tryPlay();
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) tryPlay();
  });
  window.addEventListener('focus', tryPlay);
  window.addEventListener('pageshow', tryPlay);
});

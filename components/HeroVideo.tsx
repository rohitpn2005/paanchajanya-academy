export default function HeroVideo({ page }: { page: string }) {
  return (
    <video
      className="hero-video"
      autoPlay
      muted
      loop
      playsInline
      poster={`/images/heroes/${page}.jpg`}
    >
      <source src={`/videos/${page}-hero.mp4`} type="video/mp4" />
    </video>
  );
}

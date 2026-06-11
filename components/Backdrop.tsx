// Decorative, non-interactive background graphics. Sits behind all content
// (see .backdrop in globals.css). Orbs drift slowly (CSS) and parallax on
// scroll (GSAP, in ScrollFX). Colour follows the per-page accent.
export default function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="orb o1"><i /></div>
      <div className="orb o2"><i /></div>
      <div className="orb o3"><i /></div>
      <div className="mesh" />
    </div>
  );
}

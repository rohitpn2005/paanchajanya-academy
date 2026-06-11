"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollFX() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // top scroll-progress bar tied to whole-page scroll
      gsap.fromTo(
        ".scroll-progress",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.3 },
        }
      );

      // hero parallax: slow zoom on the video, drift + fade on the content, glow drift
      const hero = document.querySelector<HTMLElement>(".hero");
      if (hero) {
        const st = { trigger: hero, start: "top top", end: "bottom top", scrub: true as const };
        const video = hero.querySelector(".hero-video");
        const inner = hero.querySelector(".hero-inner");
        const glows = hero.querySelectorAll(".hero-bg .glow");
        if (video) gsap.fromTo(video, { scale: 1 }, { scale: 1.12, ease: "none", scrollTrigger: st });
        if (inner) gsap.to(inner, { y: -64, opacity: 0.25, ease: "none", scrollTrigger: st });
        if (glows.length) gsap.to(glows, { yPercent: 24, ease: "none", scrollTrigger: st });
      }

      // gentle depth on feature glow + counters as they pass through
      gsap.utils.toArray<HTMLElement>(".feature .fglow").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -12 },
          { yPercent: 12, ease: "none", scrollTrigger: { trigger: el.closest(".feature"), start: "top bottom", end: "bottom top", scrub: true } }
        );
      });

      // backdrop orbs drift at different rates for parallax depth
      const pageScrub = { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 1 as const };
      gsap.to(".backdrop .o1", { yPercent: 16, ease: "none", scrollTrigger: pageScrub });
      gsap.to(".backdrop .o2", { yPercent: -22, ease: "none", scrollTrigger: pageScrub });
      gsap.to(".backdrop .o3", { yPercent: 12, ease: "none", scrollTrigger: pageScrub });
    });

    // settle triggers once media/layout is in place
    const r1 = setTimeout(() => ScrollTrigger.refresh(), 350);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      clearTimeout(r1);
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
  }, [pathname]);

  return <div className="scroll-progress" aria-hidden="true" />;
}

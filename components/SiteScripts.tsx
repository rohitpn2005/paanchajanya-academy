"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { THEME_BY_PATH } from "@/lib/site";

export default function SiteScripts() {
  const pathname = usePathname();

  useEffect(() => {
    // ---- per-route accent theme on <body> ----
    document.body.className = THEME_BY_PATH[pathname] || "theme-yoga";

    // small delay so the freshly navigated DOM is in place
    const t = setTimeout(setup, 30);
    let cleanups: Array<() => void> = [];

    function setup() {
      // reveal-on-scroll
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver(
          (ents) => ents.forEach((e) => {
            if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
          }),
          { threshold: 0.16 }
        );
        document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
        cleanups.push(() => io.disconnect());

        // count-up numbers
        const seen = new WeakSet<Element>();
        const cio = new IntersectionObserver(
          (ents) => ents.forEach((e) => {
            if (!e.isIntersecting || seen.has(e.target)) return;
            seen.add(e.target);
            const el = e.target as HTMLElement;
            const end = +(el.dataset.count || "0");
            const suf = el.dataset.suf || "";
            let t0: number | null = null;
            const dur = 1600;
            const step = (t: number) => {
              if (t0 === null) t0 = t;
              const p = Math.min((t - t0) / dur, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              el.textContent = Math.floor(eased * end).toLocaleString("en-IN") + suf;
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }),
          { threshold: 0.5 }
        );
        document.querySelectorAll("[data-count]").forEach((el) => cio.observe(el));
        cleanups.push(() => cio.disconnect());

        // rating bars
        const bio = new IntersectionObserver(
          (ents) => ents.forEach((e) => {
            if (e.isIntersecting) {
              const el = e.target as HTMLElement;
              el.style.width = (el.dataset.fill || "0") + "%";
              bio.unobserve(el);
            }
          }),
          { threshold: 0.5 }
        );
        document.querySelectorAll<HTMLElement>(".fill[data-fill]").forEach((el) => bio.observe(el));
        cleanups.push(() => bio.disconnect());
      } else {
        document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
      }

      // gallery filters
      document.querySelectorAll<HTMLElement>("[data-gallery]").forEach((g) => {
        const bar = g.querySelector(".filters");
        if (!bar) return;
        const handler = (ev: Event) => {
          const b = (ev.target as HTMLElement).closest("button");
          if (!b) return;
          bar.querySelectorAll("button").forEach((x) => x.classList.remove("active"));
          b.classList.add("active");
          const f = (b as HTMLElement).dataset.filter;
          g.querySelectorAll<HTMLElement>("[data-cat]").forEach((it) => {
            it.classList.toggle("hide", !(f === "all" || it.dataset.cat === f));
          });
        };
        bar.addEventListener("click", handler);
        cleanups.push(() => bar.removeEventListener("click", handler));
      });
    }

    return () => { clearTimeout(t); cleanups.forEach((c) => c()); };
  }, [pathname]);

  return null;
}

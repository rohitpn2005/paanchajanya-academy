"use client";

import { Fragment, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

type Word = { t: string; accent?: boolean };

export default function Hero({
  page,
  variant = "tall",
  id,
  eyebrow,
  breadcrumb,
  title,
  sub,
  children,
  video = true,
  brand,
}: {
  page: string;
  variant?: "full" | "tall";
  id?: string;
  eyebrow?: ReactNode;
  breadcrumb?: ReactNode;
  title: Word[];
  sub: ReactNode;
  children?: ReactNode;
  video?: boolean;
  brand?: string;
}) {
  const reduce = useReducedMotion();
  const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.05 } },
  };
  const up: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
  };
  const word: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 42 },
    show: { opacity: 1, y: 0, transition: { duration: 0.85, ease } },
  };

  return (
    <section className={`hero ${variant} motion-hero`} id={id}>
      {video ? (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video className="hero-video" autoPlay muted loop playsInline poster={`/images/heroes/${page}.jpg`}>
          <source src={`/videos/${page}-hero.mp4`} type="video/mp4" />
        </video>
      ) : null}
      <div className="hero-bg" aria-hidden="true">
        <div className="glow g1" /><div className="glow g2" /><div className="grain" /><div className="hero-vignette" />
      </div>

      <motion.div className="wrap hero-inner" variants={container} initial="hidden" animate="show">
        {brand ? (
          // eslint-disable-next-line @next/next/no-img-element
          <motion.img className="hero-brand" src={brand} alt="" variants={up} />
        ) : null}
        {breadcrumb ? <motion.div className="breadcrumb" variants={up}>{breadcrumb}</motion.div> : null}
        {eyebrow ? <motion.div className="eyebrow" variants={up}>{eyebrow}</motion.div> : null}
        <h1 className="display">
          {title.map((w, i) => (
            <Fragment key={i}>
              <motion.span
                variants={word}
                style={{ display: "inline-block", color: w.accent ? "var(--accent)" : undefined }}
              >
                {w.t}
              </motion.span>
              {i < title.length - 1 ? " " : null}
            </Fragment>
          ))}
        </h1>
        <motion.p className="hero-sub" variants={up}>{sub}</motion.p>
        {children ? <motion.div className="hero-cta" variants={up}>{children}</motion.div> : null}
      </motion.div>
    </section>
  );
}

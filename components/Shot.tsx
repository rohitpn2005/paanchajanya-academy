type ShotProps = {
  disc: "yoga" | "champ" | "tt" | "kids" | "gen";
  img: string;
  cap?: string;
  variant?: 2 | 3 | 4;
  extra?: string; // e.g. "tall" | "wide"
  cat?: string;   // for gallery filtering
  style?: React.CSSProperties;
};

export default function Shot({ disc, img, cap, variant, extra, cat, style }: ShotProps) {
  const cls = ["shot", disc, variant ? "v" + variant : "", extra || ""]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cls} data-cat={cat} style={style}>
      {/* Replace this image by overwriting the file at {img} in /public */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img} alt={cap || "Paanchajanya Academy"} />
      {cap ? <div className="cap">{cap}</div> : null}
    </div>
  );
}

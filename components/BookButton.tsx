"use client";

import { useLead } from "./LeadProvider";

export default function BookButton({
  program = "",
  plan = "",
  className = "btn btn-primary",
  children,
  style,
}: {
  program?: string;
  plan?: string;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const { open } = useLead();
  return (
    <button
      type="button"
      className={className}
      style={style}
      onClick={() => open(program, plan)}
    >
      {children}
    </button>
  );
}

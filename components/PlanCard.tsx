import BookButton from "@/components/BookButton";
import type { Plan } from "@/lib/types";

export default function PlanCard({ plan, program }: { plan: Plan; program: string }) {
  return (
    <div className={"plan" + (plan.popular ? " best" : "")}>
      {plan.popular ? <span className="best-tag">Most popular</span> : null}
      <div className="dur">{plan.name}</div>
      <div className="price">{plan.price}</div>
      <div className="note">{plan.note || "\u00A0"}</div>
      {plan.features.length ? (
        <ul>{plan.features.map((f, i) => <li key={i}>{f}</li>)}</ul>
      ) : null}
      <BookButton
        program={program}
        plan={plan.name}
        className={plan.popular ? "btn btn-primary" : "btn btn-ghost"}
      >
        Book {plan.name.toLowerCase()}
      </BookButton>
    </div>
  );
}

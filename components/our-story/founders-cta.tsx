import Link from "next/link";
import { FOUNDERS_CTA } from "./founders-content";

// Our Story — contextual CTA directly after the founder profiles (Revision 6, 23 Nov 2026).
// A quiet invitation, not a banner: same cream field as Section 3, separated by whitespace and a
// short hairline, using the site's existing primary button style and Clarity Check destination.
export function FoundersCta() {
  return (
    <section className="os3cta" aria-labelledby="os3cta-title">
      <div className="os3cta-inner">
        <h2 id="os3cta-title">{FOUNDERS_CTA.headline}</h2>
        <p>{FOUNDERS_CTA.text}</p>
        <Link className="button button-primary" href={FOUNDERS_CTA.href}>
          {FOUNDERS_CTA.button}
        </Link>
      </div>
    </section>
  );
}

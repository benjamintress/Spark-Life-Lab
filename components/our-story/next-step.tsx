import Link from "next/link";
import { SECTION_5 } from "./content";

// Our Story — Section 5 "Your next step" (Revision 12, 24 Nov 2026; R13: mid-navy field, two-line text): the page's closing invitation.
// Full-width brand navy, centred; the standard Ember CTA to the same Clarity Check destination as the
// main navigation CTA. No imagery, cards or further CTAs. Copy: SECTION_5 (verbatim).
export function NextStep() {
  return (
    <section className="os5" aria-labelledby="os5-title">
      <div className="os5-inner">
        <p className="eyebrow-center">{SECTION_5.eyebrow}</p>
        <h2 id="os5-title">{SECTION_5.headline}</h2>
        <p className="os5-text">
          {SECTION_5.lines.map((line) => (
            <span className="os5-line" key={line}>
              {line}{" "}
            </span>
          ))}
        </p>
        <Link className="button os5-button" href={SECTION_5.href}>
          {SECTION_5.button}
        </Link>
      </div>
    </section>
  );
}

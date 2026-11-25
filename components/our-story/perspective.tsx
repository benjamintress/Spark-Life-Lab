import { SECTION_4 } from "./content";

// Our Story — Section 4 "What we believe about midlife" (Revision 8 / preview r11, 24 Nov 2026).
// A statement of philosophy, not a marketing block: three equal beliefs in an open editorial row
// (stacked on smaller screens) and an italic serif conclusion marked by the genuine brand spark.
// No CTA here — the approved CTA follows the founder profiles in Section 3. Copy: SECTION_4 (verbatim).
export function Perspective() {
  return (
    <section className="osp" aria-labelledby="osp-title">
      <div className="osp-inner">
        <header className="osp-head">
          <p className="eyebrow">{SECTION_4.eyebrow}</p>
          <h2 id="osp-title">{SECTION_4.headline}</h2>
        </header>
        <ul className="osp-beliefs">
          {SECTION_4.beliefs.map((belief) => (
            <li className="osp-belief" key={belief.statement}>
              <h3 className="osp-statement">{belief.statement}</h3>
              <p>{belief.text}</p>
            </li>
          ))}
        </ul>
        <div className="osp-closing">
          <span className="brand-spark osp-spark" aria-hidden="true" />
          <p className="osp-conclusion">{SECTION_4.conclusion}</p>
        </div>
      </div>
    </section>
  );
}

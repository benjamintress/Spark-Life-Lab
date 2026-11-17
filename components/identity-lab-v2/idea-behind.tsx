import Image from "next/image";
import Link from "next/link";

// Identity Lab V2 — Section 6 "The idea behind the Identity Lab" (approved design).
// Copy: approved and locked (Revision Notes, Section 6) — not rewritten; US spelling.
// Photos: TEMPORARY — the three existing founder portraits. To replace them later, change the
// `FOUNDERS` array (keep the order and keep objectPosition/alt in step with the new images).

const FOUNDERS = [
  { src: "/images/founder_barbel_v2.jpg", alt: "Bärbel Tress", objectPosition: "center 30%" },
  { src: "/images/founder_gunther_v2.jpg", alt: "Gunther Tress", objectPosition: "center 30%" },
  { src: "/images/founder_scott_v3.jpg", alt: "Scott E. Burton", objectPosition: "center 30%" },
];

export function IdeaBehind() {
  return (
    <section className="s6" aria-labelledby="s6-heading">
      <div className="s6-inner">
        <div className="s6-top">
          <div className="s6-story">
            <p className="eyebrow">The idea behind the Identity Lab</p>
            <h2 id="s6-heading">The breakthrough came when we connected the dots.</h2>
            <p>
              We had each explored our strengths, personalities, values, and what makes us come alive. We learned a lot about
              ourselves. But the real breakthrough came when we brought all those discoveries together.
            </p>
            <p>
              What had seemed like separate pieces suddenly formed a bigger picture. We recognized connections we’d never seen
              before — and possibilities for our lives we’d never seriously considered.
            </p>
          </div>

          <figure className="s6-collage">
            <div className="s6-stage">
              {FOUNDERS.map((f, i) => (
                <div className={`s6-photo s6-photo--${i + 1}`} key={f.src}>
                  <Image src={f.src} alt={f.alt} width={400} height={400} sizes="(max-width: 860px) 40vw, 18vw" style={{ objectPosition: f.objectPosition }} />
                </div>
              ))}
            </div>
            <figcaption className="s6-caption">Bärbel, Gunther and Scott</figcaption>
          </figure>
        </div>

        <div className="s6-end">
          <p className="s6-star">It was like discovering our own North Star.</p>
          <p className="s6-end-text">
            That experience became the inspiration for the Identity Lab. We wanted others to experience what happens when you see
            yourself as a whole — and discover where that understanding could take you.
          </p>
          <p className="s6-close-line">We don’t have the answers to your future. We help you discover your own.</p>
          <p className="s6-link">
            <Link className="button-text" href="/about/">
              Get to know us →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";

// Identity Lab V2 — Section 6 "The idea behind the Identity Lab" (approved design).
// Copy: approved and locked (Revision Notes, Section 6) — not rewritten; US spelling.
//
// Founder photos (revised 23 Nov 2026): three equal 4:3 landscape photographs in one aligned row,
// cropped (never extended) from the camera originals to show upper body and surroundings:
//   Bärbel  — IMG_0994_Baerbel_portrait_extended_with_IMG_0995.jpg (concrete-wall portrait, 24 Nov 2026; 4:3 crop)
//   Gunther — IMG_1251.JPG (6000 × 4000 camera original of the Monterey portrait)
//   Scott   — Scott--2026.jpg (1254 px square original; temporary, to be replaced)
// To replace a photo later, swap the file and, if needed, adjust objectPosition. Other pages are unaffected.

const FOUNDERS = [
  {
    src: "/images/identity-lab-v2/founder-barbel-concrete.jpg",
    alt: "Bärbel Tress",
    width: 1440,
    height: 1080,
    objectPosition: "50% 50%",
  },
  {
    src: "/images/identity-lab-v2/founder-gunther-wide.jpg",
    alt: "Gunther Tress",
    width: 1440,
    height: 1080,
    objectPosition: "50% 50%",
  },
  {
    src: "/images/identity-lab-v2/founder-scott-wide.jpg",
    alt: "Scott E. Burton",
    width: 1254,
    height: 940,
    objectPosition: "50% 50%",
  },
];

export function IdeaBehind() {
  return (
    <section className="s6" aria-labelledby="s6-heading">
      <div className="s6-inner">
        <div className="s6-top">
          <div className="s6-head">
            <p className="eyebrow">The idea behind the Identity Lab</p>
            <h2 id="s6-heading">The breakthrough came when we connected the dots.</h2>
          </div>
          <div className="s6-story">
            <p>
              We had each explored our strengths, personalities, values, and what makes us come alive. We learned a lot about
              ourselves. But the real breakthrough came when we brought all those discoveries together.
            </p>
            <p>
              What had seemed like separate pieces suddenly formed a bigger picture. We recognized connections we’d never seen
              before — and possibilities for our lives we’d never seriously considered.
            </p>
          </div>
        </div>

        <figure className="s6-trio">
          <ul className="s6-trio-row">
            {FOUNDERS.map((f) => (
              <li className="s6-trio-photo" key={f.src}>
                <Image
                  src={f.src}
                  alt={f.alt}
                  width={f.width}
                  height={f.height}
                  sizes="(max-width: 520px) 92vw, (max-width: 1200px) 30vw, 360px"
                  style={{ objectPosition: f.objectPosition }}
                />
              </li>
            ))}
          </ul>
          <figcaption className="s6-caption">Bärbel, Gunther and Scott</figcaption>
        </figure>

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

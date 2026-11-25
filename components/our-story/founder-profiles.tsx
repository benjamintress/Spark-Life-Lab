import Image from "next/image";
import { FOUNDER_PROFILES, FOUNDERS_SECTION } from "./founders-content";

// Our Story — Section 3 "Meet the founders" (revision 5, 23 Nov 2026).
// Three editorial profiles, alternating photo/text (Bärbel: photo left · Gunther: photo right ·
// Scott: photo left). Full three-paragraph biographies are always visible; no tabs, accordions or
// carousels. Structure comes from photographs, typography and whitespace — no cards or borders.
// Content and photo paths live in ./founders-content.ts.

export function FounderProfiles({ variant = "r5" }: { variant?: "r5" | "r6" }) {
  return (
    <section className={`os3f${variant === "r6" ? " os3f--r6" : ""}`} aria-labelledby="os3f-title">
      <div className="os3f-inner">
        <header className="os3f-head">
          <p className="eyebrow">{FOUNDERS_SECTION.eyebrow}</p>
          <h2 id="os3f-title">{FOUNDERS_SECTION.headline}</h2>
        </header>

        <div className="os3f-list">
          {FOUNDER_PROFILES.map((founder, index) => (
            <article
              key={founder.id}
              className={`os3f-profile os3f-profile--${founder.id}${index % 2 === 1 ? " os3f-profile--reverse" : ""}`}
              aria-labelledby={`os3f-name-${founder.id}`}
            >
              <figure className="os3f-photo">
                <div className="os3f-frame">
                  <Image
                    src={founder.photo.src}
                    alt={founder.photo.alt}
                    width={founder.photo.width}
                    height={founder.photo.height}
                    sizes="(max-width: 820px) 92vw, 440px"
                    style={{ objectPosition: founder.photo.focus }}
                  />
                </div>
                {founder.photo.temporary ? (
                  <figcaption className="os3f-temp">Temporary photo · final portrait to follow</figcaption>
                ) : null}
              </figure>

              <div className="os3f-text">
                <h3 id={`os3f-name-${founder.id}`}>{founder.name}</h3>
                <p className="os3f-role">{founder.role}</p>
                <div className="os3f-bio">
                  {founder.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <a
                  className="os3f-linkedin"
                  href={founder.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={founder.linkedinLabel}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.77 2.5 4.77 5.75v5.7h-4v-5.05c0-1.2-.02-2.75-1.75-2.75-1.75 0-2.02 1.3-2.02 2.66v5.14h-4v-11Z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

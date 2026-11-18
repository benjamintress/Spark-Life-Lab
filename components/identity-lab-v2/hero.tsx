import Image from "next/image";
import Link from "next/link";
import { IDENTITY_LAB_ACTION_HREF, IDENTITY_LAB_CTA_LABEL } from "@/lib/identity-lab-config";

// Identity Lab V2 — Section 1 hero (approved V2 Draft 1). Rendered inside a `.ilv2` wrapper by the page because
// its styles (app/identity-lab/identity-lab-v2.css) are scoped under that class.

const HERO_IMAGE = {
  src: "/images/identity-lab-hero-v2.jpg",
  width: 1122,
  height: 1402,
  alt: "Woman seated at a desk at home, looking thoughtfully toward a window.",
};

export function Hero() {
  return (
    <section className="hero ilv2-hero">
      <div className="il-hero-grid section-inner">
        <div>
          <p className="eyebrow">The Identity Lab Program</p>
          <h1>
            Discover who you truly are.{" "}
            <span className="ilv2-hero-h1-second">And what you want from life now.</span>
          </h1>
          <p className="hero-copy">
            You&rsquo;ve achieved a great deal in life. But what do you want from
            the years ahead?
          </p>
          <p className="hero-copy">
            <strong>The Identity Lab</strong> is a guided four-week program that
            helps you take stock of your strengths, values and interests, see what
            still fulfills you, and decide which directions to explore next.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={IDENTITY_LAB_ACTION_HREF}>
              {IDENTITY_LAB_CTA_LABEL}
            </a>
            <Link className="button-text" href="/#clarity-check">
              Take the Midlife Clarity Check →
            </Link>
          </div>
        </div>

        <div className="il-hero-image-wrap">
          <Image
            src={HERO_IMAGE.src}
            alt={HERO_IMAGE.alt}
            width={HERO_IMAGE.width}
            height={HERO_IMAGE.height}
            priority
            className="il-hero-img"
            sizes="(max-width: 900px) 100vw, 40vw"
          />
        </div>
      </div>
    </section>
  );
}

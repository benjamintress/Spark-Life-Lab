import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { HeroAudio } from "@/components/hero-audio";
import { HeroVideo } from "@/components/hero-video";
import { ClarityCheckCard } from "@/components/clarity-check-card";
import { pageMetadata } from "@/lib/seo";

// ─── Metadata ────────────────────────────────────────────────────────────────
// The homepage sits in the root segment, so the layout title template does not
// apply to it — this title renders verbatim.

export const metadata: Metadata = pageMetadata({
  title: "SparkLifeLab — Midlife Clarity & Guided Transformation",
  description:
    "A calm, guided space for people in midlife who sense something has shifted. Take the free Midlife Clarity Check or explore the Identity Lab.",
  path: "/",
  ogTitle: "SparkLifeLab — Find Your Way Through Midlife",
  ogDescription:
    "A calm, guided space for people in midlife who sense something has shifted. Free Midlife Clarity Check and Identity Lab.",
});

// ─── Static founder data (approved V1.3 copy — text and photos are hardcoded) ────

const founders = [
  {
    id: "founder-barbel",
    name: "Bärbel Tress, PhD",
    role: "Co-founder",
    bio: "A scientist and consultant with decades of experience developing researchers and leaders. Her own midlife journey led her to discover her genius and purpose. At SparkLifeLab, she helps people envision who they could become and find the courage to make it happen.",
    linkedinUrl: "https://www.linkedin.com/in/baerbeltress/",
    linkedinAriaLabel: "Bärbel Tress on LinkedIn (opens in new tab)",
    photo: "/images/founder_barbel_v2.jpg",
    photoAlt: "Bärbel Tress, Co-founder of SparkLifeLab",
  },
  {
    id: "founder-gunther",
    name: "Gunther Tress, PhD",
    role: "Co-founder",
    bio: "A scientist and storyteller who has helped academics develop and communicate their ideas for two decades. His own midlife journey rekindled his creativity. At SparkLifeLab, he brings warmth, humor, and a lighter perspective to life's serious questions.",
    linkedinUrl: "https://www.linkedin.com/in/gunthertress/",
    linkedinAriaLabel: "Gunther Tress on LinkedIn (opens in new tab)",
    photo: "/images/founder_gunther_v2.jpg",
    photoAlt: "Gunther Tress, Co-founder of SparkLifeLab",
  },
  {
    id: "founder-scott",
    name: "Scott E. Burton",
    role: "Co-founder",
    bio: "An experienced business leader who has helped people navigate change throughout his career. His own midlife journey deepened his understanding of what matters in life. At SparkLifeLab, he brings thoughtful questions, practical wisdom, and a talent for helping others find their direction.",
    linkedinUrl: "https://www.linkedin.com/in/scotteburton/",
    linkedinAriaLabel: "Scott E. Burton on LinkedIn (opens in new tab)",
    photo: "/images/founder_scott_v3.jpg",
    photoAlt: "Scott E. Burton, Co-founder of SparkLifeLab",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  // ── Image alt text for the local /public/images assets ──
  const guidanceImageAlt =
    "A small group in warm, unhurried conversation — the feeling of being heard and accompanied.";
  const travelersImageAlt =
    "Two people sharing a reflective conversation at an outdoor table against a coastal sunset — the warmth of shared understanding.";
  const identityMapImageAlt =
    "A person reviewing their personal Identity Map and reflection materials at a sunlit table";
  const stakesImageAlt =
    "Three people walking together along a coastal path at sunset — fellow travelers moving forward with intention.";

  return (
    <main>

      {/* ─── SECTION 1 — HERO ─── */}
      <section id="hero" className="hero">
        <div className="hero-grid section-inner">
          <div>
            <p className="eyebrow">When midlife raises new questions</p>
            <h1>
              What do you want from life{" "}
              <em style={{ color: "var(--ember)" }}>now?</em>
            </h1>
            <p className="hero-copy">
              You&rsquo;ve achieved a lot — in your career and in life. But is this how you want
              to spend the next 10–15 years?
            </p>
            <p className="hero-copy hero-copy-promise">
              We help you understand what matters most to you, explore new possibilities and
              find your own direction.
            </p>
            <div className="hero-actions">
              <div className="hero-cta-group">
                <p className="hero-cta-intro">Start here for free:</p>
                <Link className="button button-primary" href="#clarity-check">
                  Take the Midlife Clarity Check →
                </Link>
                <HeroAudio
                  label="Get to know us — listen to our 5-minute audio"
                  src="/audio/sll-get-to-know-us.m4a"
                  title="Get to know us"
                  subtitle="SparkLifeLab"
                />
              </div>
            </div>
          </div>

          <HeroVideo
            src="/videos/sll-hero-sunrise.mp4"
            poster="/images/sll-hero-sunrise-start-poster.png"
            finalPoster="/images/sll-hero-sunrise-poster.jpeg"
            alt="A lone figure standing on a mountain ridge above the clouds at sunrise — a sense of quiet orientation and possibility."
          />
        </div>
      </section>

      {/* ─── SECTION 2 — THE PROBLEM / MIDLIFE FOG ─── */}
      <Reveal as="section" id="problem" className="section-problem">
        <div className="section-inner narrow">
          <p className="eyebrow-white">What you&rsquo;re experiencing has a name.</p>
          <h2>The Midlife Fog</h2>
          <p>
            Perhaps you&rsquo;ve been feeling restless or dissatisfied lately. Work that once
            excited you has become routine. Achievements that used to bring satisfaction no
            longer mean quite as much. Yet something doesn&rsquo;t feel right, and you can&rsquo;t
            quite put your finger on it.
          </p>
          <p>
            Or perhaps you know you don&rsquo;t want the next 10–15 years to look like the last.
            You want something more rewarding or meaningful, but you&rsquo;re unsure what that
            might be. And you don&rsquo;t want to risk the good life you&rsquo;ve worked hard to
            build.
          </p>
          <p>
            At SparkLifeLab, we call this the <em>Midlife Fog</em>. What comes next is still
            unclear.
          </p>
          <blockquote className="pull-quote">
            <p>It may feel like a crisis.</p>
            <p>It could also be the beginning of a more fulfilling chapter of your life.</p>
          </blockquote>
        </div>
      </Reveal>

      {/* ─── SECTION 3A — A CALM GUIDED SPACE ─── */}
      <Reveal as="section" id="about" className="section-guidance">
        <div className="guidance-inner">
          <div className="guidance-text">
            <p className="eyebrow">A calm, guided space to find your direction</p>
            <h2>You don&rsquo;t have to figure this out alone.</h2>
            <p className="lead founders-lead">
              You&rsquo;ve spent years making decisions and helping others move forward. But
              finding answers about your own future isn&rsquo;t always so easy.
            </p>
            <p className="lead founders-lead" style={{ marginTop: "1rem" }}>
              At SparkLifeLab, we help you step back and take a fresh look at your life. What
              still gives you energy? What interests have you put aside? Exploring these
              questions can open up new possibilities.
            </p>
            <p className="lead founders-lead" style={{ marginTop: "1rem" }}>
              We bring decades of experience in professional development and navigating
              change. Through thoughtful questions, practical exercises and honest
              conversations, we help you find a direction that feels right for you.
            </p>
          </div>
          <Reveal delay={150} className="guidance-image-reveal">
            <Image
              src="/images/sll-people-07.jpg"
              alt={guidanceImageAlt}
              width={1200}
              height={490}
              className="guidance-image"
              sizes="(max-width: 1024px) 100vw, 820px"
              priority
            />
          </Reveal>
        </div>
      </Reveal>

      {/* ─── SECTION 3B — FELLOW TRAVELERS ─── */}
      <Reveal as="section" id="travelers" className="section-travelers">
        <div className="travelers-grid section-inner" style={{ maxWidth: "var(--max)", margin: "0 auto" }}>

          <div>
            <Image
              src="/images/sll-sunrise-05.jpg"
              alt={travelersImageAlt}
              width={700}
              height={480}
              className="travelers-image"
              sizes="(max-width: 768px) 100vw, 560px"
            />
          </div>

          <div>
            <p className="eyebrow">Our story</p>
            <h2>Why we built SparkLifeLab</h2>
            <p>
              When we, Bärbel and Gunther, met Scott in 2023, we discovered that we were asking
              similar questions about our lives. We had achieved a great deal, but were
              wondering what we wanted from the years ahead.
            </p>
            <p>
              Our conversations turned into a shared exploration of what might come next.
              Through honest discussions and thoughtful questions, we began to see
              possibilities we hadn&rsquo;t considered before. We discovered how much easier it
              can be to find direction when you explore these questions with others.
            </p>
            <p>
              Between us, we bring decades of experience in education, professional
              development, and business transformation. We realized that combining this
              experience with what we had learned from our own journeys could help others
              facing similar questions. That conviction led us to create SparkLifeLab.
            </p>
            <p style={{ marginTop: "1.5rem" }}>
              <Link className="button-text" href="/about/">
                Read our full story →
              </Link>
            </p>
          </div>
        </div>

        {/* Founder cards */}
        <div className="section-inner" style={{ marginTop: "4rem", borderTop: "1px solid var(--line)", paddingTop: "3.5rem" }}>
          <div className="founder-grid">
            {founders.map((founder) => (
              <article className="founder-card" key={founder.id}>
                <Image
                  src={founder.photo}
                  alt={founder.photoAlt}
                  width={100}
                  height={100}
                  className="founder-photo"
                />
                <h3>{founder.name}</h3>
                <p className="founder-role">{founder.role}</p>
                <p>{founder.bio}</p>
                {founder.linkedinUrl && (
                  <a
                    className="founder-linkedin"
                    href={founder.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={founder.linkedinAriaLabel}
                  >
                    <LinkedInIcon />
                    <span>LinkedIn</span>
                  </a>
                )}
              </article>
            ))}
          </div>

          <p className="founders-closing">Co-founders. Fellow travelers. Still becoming.</p>
        </div>
      </Reveal>

      {/* ─── SECTION 4 — HOW IT WORKS ─── */}
      <Reveal as="section" id="plan" className="section-plan">
        <div className="section-inner">
          <p className="eyebrow">A clear path forward</p>
          <h2>How SparkLifeLab works</h2>

          <div className="steps">
            <article className="step-card step-card-default">
              <div className="step-number"><span className="step-label">Step</span> 1</div>
              <h3>Understand where you are</h3>
              <p>
                Start with our Midlife Clarity Check. Discover what still feels fulfilling,
                what no longer does and where you might want change.
              </p>
            </article>

            <article className="step-card step-card-default">
              <div className="step-number"><span className="step-label">Step</span> 2</div>
              <h3>Explore what matters now</h3>
              <p>
                In our Identity Lab, explore your interests, strengths and aspirations through
                guided reflection and conversation. Discover new possibilities for your next
                chapter.
              </p>
            </article>

            <article className="step-card step-card-default">
              <div className="step-number"><span className="step-label">Step</span> 3</div>
              <h3>Find your direction</h3>
              <p>
                Get a clearer picture of what you want from life and identify realistic first
                steps toward making it happen.
              </p>
            </article>
          </div>

          <div className="plan-cta">
            <Link className="button button-primary" href="#clarity-check">
              Take the Midlife Clarity Check →
            </Link>
          </div>
        </div>
      </Reveal>

      {/* ─── SECTION 5 — MIDLIFE CLARITY CHECK ─── */}
      <Reveal as="section" id="clarity-check" className="section-lead">
        <div className="lead-grid">
          {/* Left — content */}
          <div>
            <p className="eyebrow-white">A free first step</p>
            <h2 style={{ color: "var(--white)" }}>The Midlife Clarity Check</h2>
            <p className="lead-white" style={{ marginBottom: "1.25rem" }}>
              A short self-reflection to help you understand where you are and what you might
              want to change.
            </p>
            <p style={{ color: "rgba(255,255,255,0.78)", lineHeight: 1.72, marginBottom: "1.5rem" }}>
              Answer six questions about your priorities, motivation and sense of direction.
              Take 20–30 minutes to reflect at your own pace.
            </p>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              What you&rsquo;ll discover:
            </p>
            <ol className="lead-benefits-numbered">
              <li>What still feels right in your life and what no longer does</li>
              <li>Which area of your life needs the most attention</li>
              <li>What to explore next</li>
            </ol>
          </div>

          {/* Right — Kit form */}
          <ClarityCheckCard />
        </div>
      </Reveal>

      {/* ─── SECTION 6 — SPARKLIFE IDENTITY LAB ─── */}
      <Reveal as="section" id="identity-lab" className="section-lab">
        <div className="section-inner">
          <div className="lab-grid">
            {/* Text + CTA */}
            <div>
              <p className="eyebrow">When you&rsquo;re ready for the next step</p>
              <h2>The Identity Lab Program</h2>
              <p style={{ maxWidth: "680px", marginTop: "1.25rem" }}>
                You&rsquo;ve built a successful career. But who are you beyond your professional
                roles, and what do you want from life now?
              </p>
              <p style={{ maxWidth: "680px" }}>
                The Identity Lab helps you discover more about yourself and explore what could
                make your next chapter fulfilling.
              </p>

              <p className="lab-benefits-label">What you&rsquo;ll gain</p>
              <ol className="lab-benefits">
                <li>
                  <strong>Understand yourself more deeply.</strong> Explore your values,
                  strengths, motivations and what makes you feel alive.
                </li>
                <li>
                  <strong>Discover what fits your life now.</strong> Recognize what to keep,
                  what to let go of and what excites you.
                </li>
                <li>
                  <strong>Find a clearer sense of direction.</strong> Explore your future
                  possibilities and bring your insights together in your personal{" "}
                  <strong>Identity Map</strong>.
                </li>
              </ol>

              <div style={{ marginTop: "2rem" }}>
                <Link className="button button-secondary" href="/identity-lab/">
                  Explore the Identity Lab →
                </Link>
              </div>
            </div>

            {/* Identity Map visual */}
            <div className="lab-map-wrap">
              <Image
                src="/images/ID-Lab-section-on-Home-001.jpg"
                alt={identityMapImageAlt}
                width={1024}
                height={1536}
                className="lab-map-image"
                sizes="(max-width: 768px) 100vw, 560px"
              />
            </div>
          </div>
        </div>
      </Reveal>

      {/* ─── SECTION 7 — A QUIET TRUTH WORTH NAMING ─── */}
      <Reveal as="section" id="stakes" className="section-stakes">
        <div className="stakes-grid">
          <div>
            <p className="eyebrow">A question worth asking</p>
            <h2 style={{ color: "var(--navy)" }}>
              What if the next 10–15 years look just like the last?
            </h2>
            <p style={{ color: "rgba(32,43,65,0.82)" }}>
              It&rsquo;s easy to carry on with familiar routines, especially when you&rsquo;ve
              worked hard to build a good life.
            </p>
            <p style={{ color: "rgba(32,43,65,0.82)" }}>
              But if those routines no longer bring the same fulfillment, another five or ten
              years could pass without you exploring what you really want.
            </p>
            <p className="stakes-key">
              You don&rsquo;t need to change everything. But perhaps it&rsquo;s time to give those
              questions some attention.
            </p>
          </div>
          <div>
            <Image
              src="/images/sll-sunrise-04.jpg"
              alt={stakesImageAlt}
              width={640}
              height={420}
              className="stakes-image"
              sizes="(max-width: 768px) 100vw, 560px"
            />
          </div>
        </div>
      </Reveal>

      {/* ─── SECTION 8 — CLOSING CTA ─── */}
      <Reveal as="section" id="closing-cta" className="section-closing">
        <div className="section-inner narrow">
          <p className="eyebrow-center">Your next chapter</p>
          <h2 className="closing-heading">The years ahead can be different.</h2>
          <p className="closing-body">
            Imagine looking forward to the next chapter of your life with renewed enthusiasm.
            Making room for interests you&rsquo;ve neglected, exploring new possibilities and
            spending more time on what truly matters to you.
          </p>
          <p className="closing-body">
            You don&rsquo;t have to reinvent your life. You can begin by discovering what you want
            from it now.
          </p>
          <Link className="button button-primary closing-cta" href="#clarity-check">
            Take the Midlife Clarity Check →
          </Link>
        </div>
      </Reveal>

    </main>
  );
}

/* Inline LinkedIn SVG icon — no external dependency */
function LinkedInIcon() {
  return (
    <svg
      className="founder-linkedin-icon"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

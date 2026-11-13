import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import { pageMetadata } from "@/lib/seo";

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = pageMetadata({
  title: "Our Story",
  description:
    "SparkLifeLab began with a quiet question many people reach in midlife. Meet the three co-founders — Bärbel, Gunther, and Scott — and why they built the kind of space they themselves needed.",
  path: "/about/",
  ogTitle: "Our Story — SparkLifeLab",
  ogDescription:
    "Three fellow travellers who built SparkLifeLab because something like it didn't exist when they needed it.",
});

// ─── Founder data — copy-controlled, approved V1.0 ───────────────────────────

const founders = [
  {
    id: "barbel",
    name: "Bärbel Tress, PhD",
    role: "Co-founder",
    photo: "/images/founder_barbel.png",
    photoAlt: "Bärbel Tress, Co-founder of SparkLifeLab",
    linkedinUrl: "https://www.linkedin.com/in/baerbeltress",
    linkedinLabel: "Bärbel Tress on LinkedIn (opens in new tab)",
    background:
      "Bärbel is a scientist, strategist, and transformation thinker. For more than two decades, she has guided thousands of researchers and academic leaders to develop their potential, navigate change, and achieve ambitious goals.",
    quote:
      "\u201cThrough my own journey of self-discovery, I came to understand what had always driven me from within. I realised that my genius is envisioning better future states\u2014for people, organisations, and ideas\u2014and helping bring them to life. I instinctively see what people could become long before they do themselves\u2014and I love helping bring that possibility to life.\u201d",
    sllRole:
      "Today, she brings that same gift to SparkLifeLab. Drawing on scientific insight, decades of experience, and her own transformational journey, she helps people reconnect with who they truly are, discover possibilities they had never imagined, and create lives of greater purpose, fulfilment, and joy.",
  },
  {
    id: "gunther",
    name: "Gunther Tress, PhD",
    role: "Co-founder",
    photo: "/images/founder_gunther.png",
    photoAlt: "Gunther Tress, Co-founder of SparkLifeLab",
    linkedinUrl: "https://www.linkedin.com/in/gunthertress",
    linkedinLabel: "Gunther Tress on LinkedIn (opens in new tab)",
    background:
      "Gunther is a scientist, educator, communicator, writer, and entrepreneur. For more than two decades, he has helped researchers and academics move forward with greater clarity, confidence, and direction. His work combines analytical depth with warmth, humor, and a strong instinct for making complex ideas understandable and alive.",
    quote:
      "\u201cWhat changed for me in midlife was the realization that I could keep doing work that was useful, respected, and genuinely helpful to others, yet still feel that an important part of me was missing from it. I had built a professional life around skills I was very good at, but not enough around the creative and expressive side of myself that gave me the most energy. That part of me was always present in how I worked and connected with people — but it remained secondary. It could enrich what I was doing, but it was never really recognized, trusted, or allowed to shape the life and work I was building. Midlife made that harder to ignore. It brought me back to something that had always been there: the desire to create, to tell stories, and to bring lightness, energy, and meaning into the lives of others.\u201d",
    sllRole:
      "At SparkLifeLab, Gunther is especially drawn to helping people reconnect with parts of themselves that may have been overlooked, postponed, or kept in the background while building a life that worked on the surface. He helps them find language for what they are sensing, reconnect with what feels most alive, and shape a life that feels more honest, creative, and fully their own.",
  },
  {
    id: "scott",
    name: "Scott E. Burton",
    role: "Co-founder",
    photo: "/images/founder_scott_v3.jpg",
    photoAlt: "Scott E. Burton, Co-founder of SparkLifeLab",
    linkedinUrl: "https://www.linkedin.com/in/scotteburton",
    linkedinLabel: "Scott E. Burton on LinkedIn (opens in new tab)",
    background:
      "Scott is an experienced change guide, business leader, entrepreneur, and trusted advisor with decades of work in personal and business transformation, change management, performance improvement, and leadership. He brings a strong sense of purpose, practical planning, collaborative problem-solving, and human understanding to moments when people, teams, and organizations are in transition.",
    quote:
      "\u201cWhat changed for me in midlife was that the harder I worked, the less alive I felt, despite greater achievements. After decades of striving for success, I was burned out, my relationships were strained, and old beliefs and identities no longer fit. I felt as if my internal compass no longer pointed to my true north. Over time, I realized that my map was no longer the territory\u2014that the assumptions and identities I had relied on no longer matched the life I was actually living. I began asking deeper questions about what it really means to live a good life and slowly realized that growth at this stage is less about proving something and more about living in a way that feels authentic and true. That was the beginning of my journey back to the values, people, dreams, and desires that mattered most to me.\u201d",
    sllRole:
      "At SparkLifeLab, Scott is especially drawn to the resilience of the human spirit and the meeting point between inner desire and outward change — helping people move forward with more curiosity, clarity, courage, compassion, and grounded action.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const heroImageAlt =
    "Two people in warm, reflective conversation at an outdoor coastal setting — the feeling of being accompanied and understood.";
  const storyImageAlt =
    "A small group in unhurried conversation outdoors — the warmth of shared understanding and companionship.";
  const closingImageAlt =
    "People walking together along a coastal path at sunset — fellow travellers moving forward with intention.";

  return (
    <>
      <BreadcrumbJsonLd page="Our Story" href="/about/" />
      <main>

        {/* ─── SECTION 1 — HERO ─── */}
        <section className="hero">
          <div className="hero-grid section-inner">
            <div>
              <p className="eyebrow">Our Story</p>
              <h1>Why SparkLifeLab exists</h1>
              <p className="hero-copy">
                SparkLifeLab began with a quiet question many people reach in midlife: Is this
                really it — or is something else trying to emerge? Maybe you have asked
                yourself: Who am I now? What do I want from this next chapter? From personal
                experience, we know how deeply unsettling this can feel.
              </p>
              <p className="hero-copy">
                We created SparkLifeLab because we know what it is like when life still works
                on the surface, but something inside no longer fits and is asking for change.
                We wanted to build the kind of space we ourselves needed then: calm,
                thoughtful, and human — a space to reflect, reconnect, and move toward a life
                that feels more fully your own.
              </p>
              <div className="hero-actions">
                <Link className="button button-primary" href="/#clarity-check">
                  Take the Midlife Clarity Check →
                </Link>
                <Link className="button-text" href="/identity-lab/">
                  Explore the Identity Lab →
                </Link>
              </div>
            </div>

            <div className="hero-image-wrap">
              <Image
                src="/images/our-story-hero-sunrise-09.jpg"
                alt={heroImageAlt}
                width={800}
                height={600}
                priority
                sizes="(max-width: 900px) 100vw, 480px"
              />
            </div>
          </div>
        </section>

        {/* ─── SECTION 2 — HOW THIS BEGAN ─── */}
        <section
          className="section about-story-section"
          style={{ background: "var(--page-bg)", paddingLeft: "5vw", paddingRight: "5vw" }}
        >
          <div className="about-story-grid section-inner">
            <div className="about-story-img-wrap">
              <Image
                src="/images/our-story-story-sunrise-12.jpg"
                alt={storyImageAlt}
                width={700}
                height={520}
                sizes="(max-width: 900px) 100vw, 480px"
              />
            </div>

            <div>
              <p className="eyebrow">The Story Behind It</p>
              <h2>How this began</h2>
              <p>
                The three of us — Bärbel, Gunther, and Scott — met in 2023, each of us
                searching for more meaning. From the outside, our lives looked solid and
                successful. Yet each of us felt that the stories we were living no longer
                fit. Something had shifted. What once felt clear no longer did,
                while something new was beginning to stir — not yet visible, but
                impossible to ignore.
              </p>
              <p>
                What helped us most was not quick advice or ready-made answers. It was the
                chance to slow down together. Space, time, and a sense of trust and shared
                understanding. Conversations that did not rush us toward solutions, but
                helped us listen more closely to
                what mattered. Gradually, clarity emerged. Not all at once, but step by
                step.
              </p>
              <p>
                Over time, we came to understand that what we were navigating was not a
                personal failure. It was a meaningful midlife passage — one many people move
                through alone, often without the kind of shared experience, structure, and
                support that would help. That realization changed how we saw this phase of
                life, and it became the seed of SparkLifeLab.
              </p>
              <p>
                We did not create SparkLifeLab to fix people. We created it as a calm, human
                space for reflection, honesty, and change — a place where people can understand themselves more deeply and move toward what comes next. We are
                still on that path ourselves, and we are glad to walk it with others now.
              </p>
              <p style={{ marginTop: "1.5rem" }}>
                <Link className="button-text" href="/#clarity-check">
                  Start with the Midlife Clarity Check →
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3 — MEET THE FOUNDERS ─── */}
        <section
          className="section"
          style={{ background: "var(--sand)", paddingLeft: "5vw", paddingRight: "5vw" }}
        >
          <div className="section-inner">
            <p className="eyebrow">The people behind SparkLifeLab</p>
            <h2>Meet the founders</h2>
            <p className="about-founders-intro">
              We each came to this work from a different place in life. What we share is a
              deep respect for midlife as a meaningful passage — and a belief that people
              deserve thoughtful support as they move through it. This work is personal to
              all three of us. We know what it means when life looks solid on the outside,
              but something deeper asks for change. We know, too, how much it matters to
              feel guided and supported as a new story begins to take shape. That is part
              of why we created SparkLifeLab.
            </p>

            <div className="about-founder-list">
              {founders.map((founder) => (
                <article className="about-founder-profile" key={founder.id}>
                  <div className="about-founder-portrait-col">
                    <Image
                      src={founder.photo}
                      alt={founder.photoAlt}
                      width={120}
                      height={120}
                      className="about-founder-portrait"
                    />
                    <h3 className="about-founder-name">{founder.name}</h3>
                    <p className="founder-role">{founder.role}</p>
                  </div>
                  <div className="about-founder-content">
                    <p>{founder.background}</p>
                    <blockquote className="about-founder-quote">
                      {founder.quote}
                    </blockquote>
                    <p>{founder.sllRole}</p>
                    <a
                      className="founder-linkedin"
                      href={founder.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={founder.linkedinLabel}
                    >
                      <LinkedInIcon />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <p className="founders-closing">Three co-founders. Fellow travellers. Still becoming.</p>

            <p style={{ textAlign: "center", marginTop: "2.5rem" }}>
              <Link className="button button-primary" href="/#clarity-check">
                Take the Midlife Clarity Check →
              </Link>
            </p>
          </div>
        </section>

        {/* ─── SECTION 4 — WHAT WE BELIEVE ABOUT MIDLIFE ─── */}
        <section
          className="section about-beliefs"
          style={{ paddingLeft: "5vw", paddingRight: "5vw" }}
        >
          <div className="section-inner mid">
            <p className="eyebrow">Our perspective</p>
            <h2>What we believe about midlife</h2>

            <blockquote className="about-beliefs-highlight">
              Midlife is not a crisis. It is a passage.
            </blockquote>

            <p>
              We do not see midlife as a crisis. We see it as a passage — a time when lived
              experience, longing, and new possibilities begin to meet. Feeling stuck,
              restless, or unsure is not a flaw. It is often a natural signal that change
              and growth are asking for attention.
            </p>
            <p>
              We also believe that midlife has been framed too narrowly for too long. Too
              often, the cultural story is one of decline, quiet settling, and growing
              urgency — as if relevance, renewal, and becoming were already behind us. We do
              not accept that story.
            </p>
            <p>
              In many ways, this is the phase when a more honest and aligned life begins to
              ask for shape. It can be a time to reflect, to reframe, and to move toward
              what feels more true now. What makes SparkLifeLab different is the kind of support we
              offer. We are not here to push people into dramatic reinvention or to diagnose,
              fix, or override anyone&rsquo;s lived experience. We walk alongside people as
              experienced guides — offering structure, reflection, and a calm, trusted space
              as clarity unfolds in small, intentional steps.
            </p>
            <p>
              That is why the idea of a midlife passage matters to us. A passage is not a
              breakdown. It is a real part of life — one that asks for attention, courage,
              and the right kind of support.
            </p>

            <div className="about-cta-group">
              <Link className="button button-primary" href="/#clarity-check">
                Take the Midlife Clarity Check →
              </Link>
            </div>
          </div>
        </section>

        {/* ─── SECTION 5 — STILL BECOMING ─── */}
        <section
          className="section about-closing-section"
          style={{ background: "var(--page-bg)", paddingLeft: "5vw", paddingRight: "5vw" }}
        >
          <div className="about-closing-grid section-inner">
            <div className="about-closing-img-wrap">
              <Image
                src="/images/our-story-closing-sunrise-14.jpg"
                alt={closingImageAlt}
                width={700}
                height={520}
                sizes="(max-width: 900px) 100vw, 480px"
              />
            </div>

            <div>
              <p className="eyebrow">Still on the path</p>
              <h2>Still becoming</h2>
              <p className="about-closing-lead">
                We built SparkLifeLab from lived experience, shared reflection, and a deep
                belief that midlife deserves better language and better support. We are not
                standing outside this terrain. We know it from the inside.
              </p>
              <p>
                We are still learning. Still becoming. And we are glad to walk this stretch
                with others — with more clarity, more honesty, and a stronger sense of what
                may now be possible, as they begin shaping a life that feels more fully
                their own.
              </p>

              <div className="about-cta-group" style={{ marginTop: "2rem" }}>
                <Link className="button button-primary" href="/#clarity-check">
                  Take the Midlife Clarity Check →
                </Link>
              </div>
              <p className="about-cta-support">Free. Thoughtful. A good place to begin.</p>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}

// ─── Inline LinkedIn SVG — no external dependency ────────────────────────────

function LinkedInIcon() {
  return (
    <svg
      className="founder-linkedin-icon"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

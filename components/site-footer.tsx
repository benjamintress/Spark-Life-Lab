"use client";

import Link from "next/link";
import Image from "next/image";
import { site, legalItems } from "@/data/site";

const DESCRIPTOR =
  "For people who want the next chapter of their lives to be more fulfilling.";
const SUBSTACK_URL = "https://sparklifelab.substack.com/";
const LINKEDIN_URL = "https://www.linkedin.com/company/sparklifelab/";

export function SiteFooter() {
  function openCookiePreferences() {
    window.dispatchEvent(new Event("sparklifelab:open-cookie-preferences"));
  }

  const descriptor = DESCRIPTOR;
  const email = site.email;
  const substackHref = SUBSTACK_URL;
  const linkedinHref = LINKEDIN_URL;
  const resolvedLegalLinks = legalItems;

  return (
    <footer className="site-footer">
      <div className="footer-grid">

        {/* Brand column */}
        <div>
          <Link className="footer-wordmark" href="/" aria-label="SparkLifeLab home">
            <Image
              src="/images/sparklifelab-wordmark.png"
              alt="SparkLifeLab"
              width={1070}
              height={221}
              className="footer-wordmark-image"
            />
          </Link>
          <p className="footer-tagline">Ignite your best life — on purpose</p>
          <p className="footer-descriptor">{descriptor}</p>
          <div className="footer-contact">
            <a href={`mailto:${email}`}>{email}</a>
          </div>
          <div className="footer-contact footer-editorial-links">
            <a href={substackHref} target="_blank" rel="noopener noreferrer">
              Read our essays on Substack →
            </a>
            <a href={linkedinHref} target="_blank" rel="noopener noreferrer">
              Follow us on LinkedIn →
            </a>
          </div>
        </div>

        {/* Navigate column */}
        <div>
          <p className="footer-heading">Explore</p>
          <ul className="footer-links">
            <li><Link href="/#clarity-check">Clarity Check</Link></li>
            <li><Link href="/identity-lab/">Identity Lab</Link></li>
            <li><Link href="/about/">Our Story</Link></li>
          </ul>
        </div>

        {/* Legal column */}
        <div>
          <p className="footer-heading">Legal</p>
          <ul className="footer-links">
            {resolvedLegalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                className="footer-text-button"
                onClick={openCookiePreferences}
              >
                Cookie preferences
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {site.year} SparkLifeLab. All rights reserved.</p>
        <p>{site.domain}</p>
      </div>
    </footer>
  );
}

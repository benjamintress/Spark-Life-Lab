import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Legal Notice",
  description: "Legal Notice for SparkLifeLab Inc., a Delaware corporation.",
  path: "/legal-note/",
  noindex: true,
});

export default function LegalNotePage() {
  return (
    <main>
      <section className="legal-shell">
        <div className="legal-shell-inner">
          <p className="brand-context">SparkLifeLab · Legal</p>
          <h1>LEGAL NOTICE</h1>

          <div className="legal-notice-block">
            <h2>Website operator</h2>
            <p>
              SparkLifeLab Inc.<br />
              A Delaware corporation
            </p>
          </div>

          <div className="legal-notice-block">
            <h2>Registered office / registered agent address</h2>
            <p>
              CSC<br />
              251 Little Falls Drive<br />
              Wilmington, DE 19808<br />
              United States
            </p>
          </div>

          <div className="legal-notice-block">
            <h2>Business and mailing address</h2>
            <p>
              SparkLifeLab Inc.<br />
              1217 Golden Star Way<br />
              Wake Forest, NC 27587-3934<br />
              United States
            </p>
          </div>

          <div className="legal-notice-block">
            <h2>Contact</h2>
            <p>
              Email:{" "}
              <a href="mailto:hello@spark-life-lab.com">
                hello@spark-life-lab.com
              </a>
              <br />
              Website:{" "}
              <a
                href="https://sparklifelab.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://sparklifelab.com
              </a>
            </p>
          </div>

          <div className="legal-notice-block">
            <h2>Authorized representatives</h2>
            <p>
              Gunther Tress, Authorized Representative<br />
              Bärbel Tress, Authorized Representative<br />
              Scott Burton, Authorized Representative
            </p>
          </div>

          <div className="legal-notice-block">
            <h2>Registration information</h2>
            <p>
              Registered jurisdiction: Delaware, United States<br />
              Registration authority: Delaware Division of Corporations<br />
              Delaware file number: 10605487
            </p>
          </div>

          <div className="legal-notice-block">
            <h2>VAT identification number</h2>
            <p>Not currently applicable.</p>
          </div>

          <div className="legal-notice-block">
            <h2>Responsible for website content</h2>
            <p>
              SparkLifeLab Inc.<br />
              1217 Golden Star Way<br />
              Wake Forest, NC 27587-3934<br />
              United States<br />
              Email:{" "}
              <a href="mailto:hello@spark-life-lab.com">
                hello@spark-life-lab.com
              </a>
            </p>
          </div>

          <div className="legal-notice-block">
            <h2>Website development</h2>
            <p>
              Website design and development by{" "}
              <a
                href="https://www.linkedin.com/in/benjamin-tress/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Benjamin Tress
              </a>
              .
            </p>
          </div>

          <p className="legal-footer-nav">
            <Link href="/">← Return to homepage</Link>
            {" · "}
            <Link href="/contact/">Contact us</Link>
          </p>

        </div>
      </section>
    </main>
  );
}

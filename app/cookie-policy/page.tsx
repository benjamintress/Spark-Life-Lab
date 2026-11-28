import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Cookie Policy",
  description:
    "How SparkLifeLab uses browser storage, Kit form technologies, Cloudflare security cookies, and cookieless Vercel Web Analytics.",
  path: "/cookie-policy/",
});

const technologyColumns = ["Name", "Provider", "Type", "Purpose", "Duration"];

export default function CookiePolicyPage() {
  return (
    <LegalPage title="COOKIE POLICY" intro="">
      <p className="legal-last-updated">Last updated: July 19, 2026</p>

      <div className="cookie-policy-content">
        <section className="legal-section">
          <h2>About this Cookie Policy</h2>
          <p>
            This Cookie Policy explains how Spark Life Lab Inc. (“SparkLifeLab,” “we,” “us,” or
            “our”) uses cookies, browser storage, and similar technologies when you visit:
          </p>
          <p>
            <a href="https://sparklifelab.com">https://sparklifelab.com</a>
          </p>
          <p>
            We use only a limited number of technologies needed to operate the website, remember
            privacy choices, protect embedded forms, and understand website performance in an
            aggregated, privacy-friendly way.
          </p>
          <p>
            We do not currently use advertising cookies, behavioral tracking pixels, or cookies
            for targeted advertising.
          </p>
        </section>

        <section className="legal-section">
          <h2>What are cookies and similar technologies?</h2>
          <p>
            Cookies are small text files that a website or third-party service may store in your
            browser. Websites may also use browser technologies such as local storage to save
            limited information on your device.
          </p>
          <p>
            Some technologies are strictly necessary for a website or a requested service to
            function. Other technologies may be used for analytics, personalization, or marketing.
            Technologies that are not strictly necessary are activated only where an appropriate
            legal basis exists and, when required, after you have given consent.
          </p>
        </section>

        <section className="legal-section">
          <h2>Technologies currently used on this website</h2>

          <section className="legal-subsection">
            <h3>Essential browser storage</h3>
            <p>We use essential browser storage to:</p>
            <ul>
              <li>remember your privacy preferences;</li>
              <li>maintain the functioning of the cookie-preference interface;</li>
              <li>support the secure operation of website features and embedded forms.</li>
            </ul>
            <p>
              This storage is required for the website to remember the choices you make and cannot
              be disabled through the preference center.
            </p>

            <div className="legal-table-wrap" role="region" aria-labelledby="sll-storage-caption" tabIndex={0}>
              <table className="technology-table">
                <caption id="sll-storage-caption">SparkLifeLab preference storage</caption>
                <thead>
                  <tr>
                    {technologyColumns.map((column) => (
                      <th scope="col" key={column}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row"><code translate="no">sll_cookie_preferences</code></th>
                    <td>SparkLifeLab</td>
                    <td>Local storage</td>
                    <td>
                      Stores the visitor’s website privacy preferences, including the preference
                      schema version and the date of the most recent choice. It is not used for
                      behavioral profiling, marketing, or cross-site tracking.
                    </td>
                    <td>
                      Six months, unless deleted earlier through browser settings or replaced when
                      the preference schema changes.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="legal-subsection">
            <h3>Kit embedded-form storage and security technologies</h3>
            <p>
              The website contains embedded signup forms provided by Kit, formerly known as
              ConvertKit. Kit’s embedded-form runtime may create browser storage and security
              technologies when its forms load.
            </p>

            <div className="legal-table-wrap" role="region" aria-labelledby="kit-storage-caption" tabIndex={0}>
              <table className="technology-table">
                <caption id="kit-storage-caption">Kit form storage and security technologies</caption>
                <thead>
                  <tr>
                    {technologyColumns.map((column) => (
                      <th scope="col" key={column}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row"><code translate="no">ckid</code></th>
                    <td>Kit / ConvertKit</td>
                    <td>Local storage</td>
                    <td>
                      Stores a persistent random identifier used by Kit’s embedded-form
                      infrastructure. Kit may transmit this identifier with form-visit and
                      form-submission data, including technical context such as the current page
                      URL, referrer, and query string.
                    </td>
                    <td>
                      Persistent until browser site data is cleared or Kit changes or removes the
                      entry.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><code translate="no">cksubscribed-&lt;form-id&gt;</code></th>
                    <td>Kit / ConvertKit</td>
                    <td>Local storage</td>
                    <td>Records a timestamp indicating that a specific embedded Kit form was successfully submitted.</td>
                    <td>
                      Persistent until browser site data is cleared or Kit changes or removes the
                      entry.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><code translate="no">__cf_bm</code></th>
                    <td><code translate="no">.kit.com</code></td>
                    <td>Cookie</td>
                    <td>
                      Supports Cloudflare Bot Management and helps distinguish legitimate visitors
                      from automated traffic.
                    </td>
                    <td>Approximately 30 minutes</td>
                  </tr>
                  <tr>
                    <th scope="row"><code translate="no">__cf_bm</code></th>
                    <td><code translate="no">.convertkit.com</code></td>
                    <td>Cookie</td>
                    <td>
                      Supports Cloudflare Bot Management and helps distinguish legitimate visitors
                      from automated traffic.
                    </td>
                    <td>Approximately 30 minutes</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              These cookies are used for security and fraud-prevention purposes connected with the
              embedded forms.
            </p>
            <p>
              Kit processes embedded-form interactions using its own technical infrastructure.
              Consent to receive emails and choices about browser storage are separate matters.
            </p>
          </section>

          <section className="legal-subsection">
            <h3>Vercel Web Analytics</h3>
            <p>
              We use Vercel Web Analytics to understand aggregated website usage, such as page views
              and general traffic patterns.
            </p>
            <p>
              Vercel Web Analytics does not use cookies and is not intended to identify individual
              visitors. Because it does not use cookies, it does not appear in the cookie table
              above.
            </p>
          </section>
        </section>

        <section className="legal-section">
          <h2>Marketing and advertising technologies</h2>
          <p>We do not currently use:</p>
          <ul>
            <li>Google Analytics;</li>
            <li>Meta Pixel;</li>
            <li>LinkedIn Insight Tag;</li>
            <li>behavioral advertising cookies;</li>
            <li>cross-site tracking cookies;</li>
            <li>retargeting or profiling technologies.</li>
          </ul>
          <p>
            If we introduce non-essential analytics or marketing technologies in the future, we
            will update this Cookie Policy and, where required, ask for consent before those
            technologies are activated.
          </p>
        </section>

        <section className="legal-section">
          <h2>Managing your preferences</h2>
          <p>
            You can review or change your privacy preferences at any time by selecting Cookie
            preferences in the website footer.
          </p>
          <p>
            Essential technologies cannot be disabled through the preference center because they
            are required to provide the website or a service requested by you.
          </p>
          <p>
            You can also delete cookies and local-storage entries through your browser settings.
            Doing so may reset your saved privacy preferences, and the website may ask you to select
            them again.
          </p>
        </section>

        <section className="legal-section">
          <h2>Third-party services</h2>
          <p>
            Embedded Kit forms are provided by a third-party service. When you enter information in
            a form, Kit processes the submitted information as described in our{" "}
            <Link href="/privacy-policy/">Privacy Policy</Link> and under Kit’s own privacy
            documentation.
          </p>
          <p>
            Links to external websites are governed by the privacy and cookie practices of those
            external providers.
          </p>
        </section>

        <section className="legal-section">
          <h2>Changes to this Cookie Policy</h2>
          <p>We may update this Cookie Policy when:</p>
          <ul>
            <li>we change the technologies used on the website;</li>
            <li>we introduce new analytics, marketing, or embedded services;</li>
            <li>a service provider changes its technology;</li>
            <li>legal or regulatory requirements change.</li>
          </ul>
          <p>
            The “Last updated” date at the top shows when the policy was most recently revised.
          </p>
        </section>

        <section className="legal-section">
          <h2>Contact</h2>
          <p>For questions about this Cookie Policy or our use of website technologies, contact:</p>
          <address>
            Spark Life Lab Inc.<br />
            1217 Golden Star Way<br />
            Wake Forest, NC 27587<br />
            United States
          </address>
          <p>
            Email: <a href="mailto:hello@spark-life-lab.com">hello@spark-life-lab.com</a>
          </p>
        </section>
      </div>
    </LegalPage>
  );
}

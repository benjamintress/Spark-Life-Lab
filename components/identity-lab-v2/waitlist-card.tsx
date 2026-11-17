import { IdentityWaitlistKitForm } from "@/components/identity-waitlist-kit-form";

// Identity Lab V2 — Section 7 card content (approved copy). The form is the existing, unchanged Kit embed
// (UID fed36a3d05, Kit form 9632607) shared with the standalone /identity-lab/waitlist/ page: same fields,
// validation, double opt-in, confirmation redirect, tags and automation.
// The Kit button label and field labels are configured in Kit, not here.

export function IdentityLabV2Waitlist() {
  return (
    <div className="s7-body">
      <p className="eyebrow">Take the next step</p>
      <h2 className="s7-title">Ready to discover what comes next?</h2>

      <p>The next Identity Lab is planned for 2027.</p>
      <p>
        Join our waitlist to hear when registration opens and receive the details you need to decide whether it&rsquo;s right for
        you.
      </p>
      <p className="s7-reassure">Joining the waitlist is free, with no obligation.</p>

      <IdentityWaitlistKitForm />

      <p className="s7-privacy">
        We&rsquo;ll only email you about the Identity Lab and related SparkLifeLab updates. You can unsubscribe at any time.
      </p>
      <p className="s7-contact">
        Questions? Contact us at <a href="mailto:hello@spark-life-lab.com">hello@spark-life-lab.com</a>.
      </p>
    </div>
  );
}

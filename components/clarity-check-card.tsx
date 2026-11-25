/**
 * ClarityCheckCard — live Kit form + final Midlife Clarity Check cover.
 */

import Image from "next/image";
import { MidlifeClarityKitForm } from "@/components/midlife-clarity-kit-form";

export function ClarityCheckCard() {
  return (
    <div className="clarity-card-v2">
      {/* Final cover visual with soft depth shadow */}
      <div className="clarity-cover-wrap">
        <Image
          src="/images/Midlife-Clarity-Check-cover-V3.jpg"
          alt="The Midlife Clarity Check — a free personal self-assessment"
          width={1218}
          height={1578}
          className="clarity-cover-img"
          priority
        />
      </div>

      <div className="clarity-form-placeholder">
        <p className="clarity-form-label">Get your free Midlife Clarity Check</p>

        <MidlifeClarityKitForm />

        <p className="clarity-form-reassurance">
          Free. No spam. Delivered to your inbox. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}

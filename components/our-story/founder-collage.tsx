import Image from "next/image";

// Our Story — Section 1 compact founder collage.
// Three genuine, SEPARATE photographs arranged as a small coordinated cluster. Each image keeps its
// own frame, gap and caption so the composition never reads as one group photograph.
// Brief: no AI-generated or composited group portrait; keep this smaller than the Section 3 portraits.
//
// PROVISIONAL images: 4:5 crops (800 × 1000 px) of the approved 2026 founder headshot series — the same
// photographs as the current 400 px site headshots, prepared from the higher-resolution originals
// (Desktop › BGT-headshots-2026: BT-Cal-09-2026-002.jpg, GT-CAL-09-2026-003.jpg; Desktop › Scott: Scott--2026.jpg).
// To swap in new candid photographs later, replace `src` (and, if needed, `focus`) — nothing else has to change.

type CollagePhoto = {
  id: "barbel" | "gunther" | "scott";
  name: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  /** CSS object-position for the 4:5 crop. */
  focus: string;
};

export const FOUNDER_COLLAGE_PHOTOS: readonly CollagePhoto[] = [
  {
    id: "barbel",
    name: "Bärbel",
    src: "/images/our-story/founder-barbel-collage.jpg",
    width: 800,
    height: 1000,
    alt: "Portrait of Bärbel Tress, co-founder of SparkLifeLab, in a navy blouse in front of a light blue wall.",
    focus: "50% 35%",
  },
  {
    id: "gunther",
    name: "Gunther",
    src: "/images/our-story/founder-gunther-collage.jpg",
    width: 800,
    height: 1000,
    alt: "Portrait of Gunther Tress, co-founder of SparkLifeLab, laughing in a striped shirt in front of a light blue wall.",
    focus: "50% 35%",
  },
  {
    id: "scott",
    name: "Scott",
    src: "/images/our-story/founder-scott-collage.jpg",
    width: 800,
    height: 1000,
    alt: "Portrait of Scott E. Burton, co-founder of SparkLifeLab, smiling in glasses and a blue shirt in front of a light blue wall.",
    focus: "50% 35%",
  },
];

// Arrangement (revision 4): three separate, larger rectangular portraits in an asymmetric editorial
// cluster around an open centre. Three short Ember lines lead from the portraits to the genuine
// SparkLifeLab brand spark (/images/sparklifelab-spark.png) — three people meeting, something new
// beginning. Straight, non-overlapping frames: deliberately unlike the tilted, overlapping photo
// cluster on the Identity Lab page. Coordinates are in a 500 × 660 stage (CSS uses the same numbers).
export function FounderCollage() {
  return (
    <div className="os1-cluster">
      <svg className="os1-links" viewBox="0 0 500 660" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <line x1="196" y1="243" x2="235" y2="302" />
        <line x1="294" y1="316" x2="259" y2="316" />
        <line x1="245" y1="389" x2="245" y2="333" />
      </svg>
      <span className="os1-spark brand-spark" aria-hidden="true" />
      <ul className="os1-collage" aria-label="The three SparkLifeLab founders, in three separate portraits">
        {FOUNDER_COLLAGE_PHOTOS.map((photo) => (
          <li className={`os1-tile os1-tile--${photo.id}`} key={photo.id}>
            <figure>
              <div className="os1-frame">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width: 900px) 45vw, 230px"
                  style={{ objectPosition: photo.focus }}
                />
              </div>
              <figcaption>{photo.name}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Arrangement (revision 3): three separate round portraits, each linked by a fine Ember line to a small
// spark between them — three people meeting, and something new beginning. Deliberately unlike the
// tilted, overlapping photo cluster on the Identity Lab page. Positions are % of the stage (see CSS).
export function FounderCollageR3() {
  return (
    <div className="os1-constellation">
      <svg className="os1-links" viewBox="0 0 100 118" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <line x1="21" y1="19" x2="50" y2="52" />
        <line x1="80" y1="40" x2="50" y2="52" />
        <line x1="40" y1="94" x2="50" y2="52" />
      </svg>
      <svg className="os1-spark" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 0 C 12.9 7.2, 16.8 11.1, 24 12 C 16.8 12.9, 12.9 16.8, 12 24 C 11.1 16.8, 7.2 12.9, 0 12 C 7.2 11.1, 11.1 7.2, 12 0 Z" />
      </svg>
      <ul className="os1-collage" aria-label="The three SparkLifeLab founders, in three separate portraits">
        {FOUNDER_COLLAGE_PHOTOS.map((photo) => (
          <li className={`os1-tile os1-tile--${photo.id}`} key={photo.id}>
            <figure>
              <div className="os1-frame">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width: 900px) 40vw, 180px"
                  style={{ objectPosition: photo.focus }}
                />
              </div>
              <figcaption>{photo.name}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Revision 13 (25 Nov 2026): "People beyond their professional roles" ─────────────────────────────
// Three equally important vertical photographs side by side — personal settings, ideally outdoors or doing
// something meaningful to each founder; deliberately not headshots. A slight stagger (middle photo lower) keeps
// the row editorial. No connecting lines, circles or central spark.
//
// Revision 15 (25 Nov 2026): narrow full-length frames (1:2). Order since 28 Nov 2026: Gunther · Bärbel · Scott;
// the middle frame (whoever it is) sits slightly lower. Bärbel and Gunther are in; Scott follows.
// Each crop shows the whole person, who fills about 83 % of the frame height with matching headroom.
// To add Scott: a 1:2 crop, 640 × 1280 px, saved as /images/our-story/founder-scott-personal.jpg; set `src`
// and `alt` below. While `src` is null the frame shows a labelled placeholder of the same size.
type PersonalPhoto = {
  id: "barbel" | "gunther" | "scott";
  name: string;
  src: string | null;
  width: number;
  height: number;
  alt: string;
  /** CSS object-position for the 2:3 crop. */
  focus: string;
};

export const FOUNDER_PERSONAL_PHOTOS: readonly PersonalPhoto[] = [
  {
    id: "gunther",
    name: "Gunther",
    src: "/images/our-story/founder-gunther-personal.jpg",
    width: 640,
    height: 1280,
    alt: "Gunther Tress, smiling, holding a book outside a bookshop with a blue door, a sweater over his shoulders.",
    focus: "50% 50%",
  },
  {
    id: "barbel",
    name: "Bärbel",
    src: "/images/our-story/founder-barbel-personal-v2.jpg", // 28 Nov 2026: corrected photo (IMG_0854_siebter_Schritt_final_C), same crop proportions
    width: 640,
    height: 1280,
    alt: "Bärbel Tress, smiling, in a white shirt and white jeans in front of a softly lit golden glass facade.",
    focus: "50% 50%",
  },
  {
    id: "scott",
    name: "Scott",
    src: "/images/our-story/founder-scott-personal.jpg", // 28 Nov 2026: PRELIMINARY (from a 944 px screenshot); replace with a larger file
    width: 640,
    height: 1280,
    alt: "Scott E. Burton, holding a folded umbrella, under an arch of holiday lights with the word joy behind him.",
    focus: "50% 50%",
  },
];

export function FounderPhotoRow() {
  return (
    <ul className="os1-row" aria-label="The three SparkLifeLab founders">
      {FOUNDER_PERSONAL_PHOTOS.map((photo) => (
        <li className={`os1-row-item os1-row-item--${photo.id}`} key={photo.id}>
          <figure>
            <div className={photo.src ? "os1-row-frame" : "os1-row-frame os1-row-frame--placeholder"}>
              {photo.src ? (
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width: 900px) 31vw, 230px"
                  style={{ objectPosition: photo.focus }}
                />
              ) : (
                <span className="os1-row-placeholder">Photo to follow</span>
              )}
            </div>
            <figcaption>{photo.name}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

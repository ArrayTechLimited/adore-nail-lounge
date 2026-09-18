import ImageSlot from "@/components/ui/ImageSlot";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { copy, galleryPhotos } from "@/content/site";
import styles from "./Gallery.module.css";

/** Desktop staggers six tiles at .08s + .09s each; mobile four at .10/.22/.34/.46s. */
const MOBILE_DELAYS = [0.1, 0.22, 0.34, 0.46];

/**
 * The same tile carries both stagger values — the mobile subset uses the mobile
 * cadence, and the tiles hidden below 1024px keep the desktop one.
 */
const tileDelays = (() => {
  let mobileIndex = 0;
  return galleryPhotos.map((photo, index) =>
    photo.onMobile
      ? (MOBILE_DELAYS[mobileIndex++] ?? 0.08 + index * 0.09)
      : 0.08 + index * 0.09,
  );
})();

export default function Gallery() {
  return (
    <>
      <section
        className={styles.gallery}
        data-reveal-frame
        id="gallery"
        aria-labelledby="gallery-heading"
      >
        <div className={styles.head}>
          <div>
            <Reveal delay={0.04} className={styles.eyebrow}>
              {copy.gallery.eyebrow}
            </Reveal>
            <Reveal as="h2" id="gallery-heading" delay={0.12} className={styles.heading}>
              {copy.gallery.heading}
            </Reveal>
          </div>
          <Reveal as="a" href="#gallery" delay={0.2} className={styles.fullLink}>
            {copy.gallery.link} <span aria-hidden="true">↗</span>
          </Reveal>
        </div>

        <div className={styles.grid}>
          {galleryPhotos.map((photo, index) => {
            return (
              <Reveal
                key={photo.id}
                kind="tile"
                delay={tileDelays[index]}
                className={`${styles.tile} ${photo.onMobile ? "" : styles.desktopOnlyTile}`}
              >
                <ImageSlot
                  photo={photo}
                  fit="natural"
                  zoom
                  sizes="(min-width: 1024px) 30vw, 48vw"
                />
              </Reveal>
            );
          })}
        </div>

        <div className={styles.more}>
          <Button href="#gallery" variant="outline" ground="light" glyph="→" block>
            {copy.gallery.more}
          </Button>
        </div>
      </section>
      <div className={styles.divider} />
    </>
  );
}

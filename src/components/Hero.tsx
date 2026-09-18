import ImageSlot from "@/components/ui/ImageSlot";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { BOOKING_URL, copy, heroPhoto, salon } from "@/content/site";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <>
      <section className={`${styles.hero} dark-ground`} data-reveal-frame aria-label="Introduction">
        <div className={styles.copy}>
          <Reveal delay={0.05} className={styles.reviewRow}>
            <span className={styles.stars} aria-hidden="true">
              ★★★★★
            </span>
            <span className={styles.rating} aria-hidden="true">
              {salon.reviews.rating}
            </span>
            <span className={styles.reviewCount} aria-hidden="true">
              {salon.reviews.summaryShort}
            </span>
            <span className="visually-hidden">{salon.reviews.a11yLabel}</span>
          </Reveal>

          <Reveal as="h1" delay={0.16} className={styles.headline}>
            {copy.hero.headline[0]}
            <br />
            <em>{copy.hero.headline[1]}</em>
            <br />
            {copy.hero.headline[2]}
          </Reveal>

          <Reveal kind="bar" delay={0.42} className={styles.rule} aria-hidden="true" />

          <Reveal as="p" delay={0.3} className={styles.lede}>
            {copy.hero.ledeMobile}
          </Reveal>
          <Reveal as="p" delay={0.3} className={styles.ledeDesktop}>
            {copy.hero.ledeDesktop}
          </Reveal>

          <Reveal delay={0.52} className={styles.ctas}>
            <Button
              href={BOOKING_URL}
              variant="filled"
              ground="dark"
              glyph="↗"
              external
              lift
              block
              className={styles.heroCta}
            >
              <span className="only-mobile">Booking</span>
              <span className="only-desktop">Book online</span>
            </Button>
            <Button
              href={salon.phone.href}
              variant="outline"
              ground="dark"
              glyph="☎"
              block
              className={styles.heroCta}
            >
              <span className="only-mobile">Call {salon.phone.display}</span>
              <span className="only-desktop">Call the lounge</span>
            </Button>
          </Reveal>

          <Reveal delay={0.64} className={styles.openRow}>
            <span className={`${styles.dot} pulse-dot`} aria-hidden="true" />
            <span className={styles.openLabel}>Open now</span>
            <span className={styles.openUntil}>{salon.hours.openNowUntil}</span>
          </Reveal>
        </div>

        <div className={styles.media}>
          <Reveal kind="tile" delay={0.2} style={{ height: "100%" }}>
            <ImageSlot
              photo={heroPhoto}
              fit="cover"
              minHeight={600}
              onDark
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
          </Reveal>
        </div>
      </section>
      <div className={styles.divider} />
    </>
  );
}

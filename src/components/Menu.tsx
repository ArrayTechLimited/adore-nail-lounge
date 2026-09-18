import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { BOOKING_URL, copy, salon, services } from "@/content/site";
import styles from "./Menu.module.css";

/**
 * The menu and the review sit side by side on desktop and stack on mobile,
 * where the review drops to the light ground (the rose never touches light).
 */
export default function Menu() {
  return (
    <div className={styles.row}>
      <section
        className={styles.menu}
        data-reveal-frame
        id="services"
        aria-labelledby="menu-heading"
      >
        <Reveal delay={0.04} className={styles.eyebrow}>
          {copy.menu.eyebrow}
        </Reveal>
        <Reveal as="h2" id="menu-heading" delay={0.12} className={styles.heading}>
          {copy.menu.heading}
        </Reveal>

        <table className={styles.table}>
          <caption className="visually-hidden">Services and pricing</caption>
          <tbody>
            {services.map((service) => (
              <tr key={service.name} className={service.onMobile ? "" : styles.desktopOnlyRow}>
                <td>
                  <div className={styles.serviceName}>{service.name}</div>
                  <div className={styles.serviceDetail}>
                    {service.mobileDetail ? (
                      <>
                        <span className="only-mobile">{service.mobileDetail}</span>
                        <span className="only-desktop">{service.detail}</span>
                      </>
                    ) : (
                      service.detail
                    )}
                  </div>
                </td>
                <td className={styles.price}>{service.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.menuCtas}>
          <Button href="#services" variant="outline" ground="light" glyph="→" block>
            {copy.menu.more}
          </Button>
          <Button
            href={BOOKING_URL}
            variant="filled"
            ground="light"
            glyph="↗"
            external
            block
            className={styles.desktopOnlyCta}
          >
            {copy.menu.book}
          </Button>
        </div>
      </section>

      <section
        className={`${styles.review} dark-ground`}
        data-reveal-frame
        aria-label="Customer review"
      >
        <Reveal delay={0.06} className={styles.reviewEyebrow}>
          {copy.review.eyebrow}
        </Reveal>
        <div className={styles.quoteMark} aria-hidden="true">
          &ldquo;
        </div>
        <Reveal as="blockquote" delay={0.16} className={styles.quote}>
          <p>{salon.reviews.quote}</p>
        </Reveal>
        <Reveal delay={0.26} className={styles.byline}>
          {salon.reviews.byline}
        </Reveal>

        <div className={styles.stats}>
          <Reveal delay={0.38}>
            <div className={styles.statValue}>{salon.reviews.rating}</div>
            <div className={styles.statCaption}>Rating</div>
          </Reveal>
          <Reveal delay={0.46}>
            <div className={styles.statValue}>{salon.reviews.count}</div>
            <div className={styles.statCaption}>Reviews</div>
          </Reveal>
        </div>

        <Button
          href={salon.reviews.url}
          variant="outline"
          ground="dark"
          glyph="↗"
          external
          className={styles.readAll}
        >
          {copy.review.readAll}
        </Button>
      </section>
    </div>
  );
}

import Button from "@/components/ui/Button";
import { BOOKING_URL, copy, navLinks, salon, socialLinks } from "@/content/site";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={`${styles.footer} dark-ground`}>
      <div className={styles.upper}>
        <div className={styles.brand}>
          {/* Light variant of the mark, so no filter: invert() hack. Decorative —
              the header already announces the salon name. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.logo}
            src="/adore-logo-light.png"
            alt=""
            width={536}
            height={159}
          />
          <p className={styles.tagline}>
            <span className="only-mobile">{salon.tagline}</span>
            <span className="only-desktop">{salon.taglineLong}</span>
          </p>
          <div className={styles.ctas}>
            <Button href={BOOKING_URL} variant="filled" ground="dark" glyph="↗" external block>
              <span className="only-mobile">Booking</span>
              <span className="only-desktop">Book online</span>
            </Button>
            <Button href={salon.phone.href} variant="outline" ground="dark" glyph="☎" block>
              <span className="only-mobile">Call the lounge</span>
              <span className="only-desktop">{salon.phone.display}</span>
            </Button>
          </div>
        </div>

        <div className={styles.columns}>
          <nav className={styles.column} aria-label="Footer">
            <span className={styles.columnHead}>Explore</span>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`${styles.columnLink} ${
                  link.label === "Home" ? styles.desktopOnly : ""
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile carries Visit here in place of the desktop Visit section. */}
          <div className={`${styles.column} ${styles.mobileOnlyColumn}`}>
            <span className={styles.columnHead}>Visit</span>
            <span className={styles.columnText}>
              {salon.address.line1.replace(", Ste 103", "")}
              <br />
              Ste 103, Austin TX
            </span>
            <span className={styles.columnText}>{salon.hours.mobileCompact}</span>
          </div>

          <div className={`${styles.column} ${styles.desktopOnly}`}>
            <span className={styles.columnHead}>Hours</span>
            {salon.hours.compact.map((line) => (
              <span key={line} className={styles.columnText}>
                {line}
              </span>
            ))}
          </div>

          <div className={`${styles.column} ${styles.desktopOnly}`}>
            <span className={styles.columnHead}>Follow</span>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={styles.columnLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.legal}>
        <span>{copy.footer.legal}</span>
        <span>{copy.footer.policies}</span>
      </div>
    </footer>
  );
}

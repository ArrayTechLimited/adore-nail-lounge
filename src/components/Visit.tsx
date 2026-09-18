import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { copy, directionsUrl, mapEmbedUrl, salon } from "@/content/site";
import styles from "./Visit.module.css";

export default function Visit() {
  return (
    <>
      <section className={styles.visit} data-reveal-frame id="visit" aria-labelledby="visit-heading">
        <div className={styles.copy}>
          <Reveal delay={0.04} className={styles.eyebrow}>
            {copy.visit.eyebrow}
          </Reveal>
          <Reveal as="h2" id="visit-heading" delay={0.12} className={styles.heading}>
            {copy.visit.heading}
          </Reveal>
          <Reveal as="address" delay={0.22} className={styles.address} style={{ fontStyle: "normal" }}>
            {salon.address.line1}
            <br />
            {salon.address.line2}
          </Reveal>

          <table className={styles.hours}>
            <caption className="visually-hidden">Opening hours</caption>
            <tbody>
              {salon.hours.rows.map((row) => (
                <tr key={row.label}>
                  <td className={styles.hoursLabel}>{row.label}</td>
                  <td className={styles.hoursValue}>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.ctas}>
            <Button href={directionsUrl} variant="outline" ground="light" glyph="↗" external>
              {copy.visit.directions}
            </Button>
            <Button href={salon.phone.href} variant="filled" ground="light" glyph="☎">
              Call
            </Button>
          </div>
        </div>

        <div className={styles.media}>
          <Reveal kind="tile" delay={0.12} style={{ height: "100%" }}>
            <div className={styles.mapFrame}>
              <div className={styles.mapFallback} aria-hidden="true">
                <span>{salon.address.line1}</span>
                <span>{salon.address.line2}</span>
              </div>
              <iframe
                title={`Map showing ${salon.name} at ${salon.address.legal}`}
                src={mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>
      <div className={styles.divider} />
    </>
  );
}

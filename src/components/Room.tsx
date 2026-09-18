import ImageSlot from "@/components/ui/ImageSlot";
import Reveal from "@/components/ui/Reveal";
import { copy, roomPhoto, roomStats } from "@/content/site";
import styles from "./Room.module.css";

/**
 * "The room" — the attention-to-detail section. Desktop only; the copy is
 * deliberately process-led rather than generic spa language.
 */
export default function Room() {
  return (
    <section className={styles.room} data-reveal-frame id="about" aria-labelledby="room-heading">
      <div className={styles.media}>
        <Reveal kind="tile" delay={0.08} style={{ height: "100%" }}>
          <ImageSlot
            photo={roomPhoto}
            fit="cover"
            minHeight={460}
            sizes="(min-width: 1024px) 46vw, 100vw"
          />
        </Reveal>
      </div>

      <div className={styles.copy}>
        <Reveal delay={0.12} className={styles.eyebrow}>
          {copy.room.eyebrow}
        </Reveal>
        <Reveal as="h2" id="room-heading" delay={0.2} className={styles.heading}>
          {copy.room.heading}
        </Reveal>
        <Reveal kind="bar" delay={0.36} className={styles.rule} aria-hidden="true" />
        <Reveal as="p" delay={0.34} className={styles.body}>
          {copy.room.body}
        </Reveal>

        <div className={styles.stats}>
          {roomStats.map((stat, index) => (
            <Reveal key={stat.caption} delay={0.46 + index * 0.08}>
              <div className={styles.statValue}>
                {stat.value}
                {stat.unit ? <span className={styles.statUnit}>{stat.unit}</span> : null}
              </div>
              <div className={styles.statCaption}>{stat.caption}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

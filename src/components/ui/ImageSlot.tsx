"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import type { Photo } from "@/content/site";
import styles from "./ImageSlot.module.css";

type Props = {
  photo: Photo;
  /**
   * `cover` keeps the designed box and crops — used by the full-bleed frames in
   * side-by-side rows (hero, the room, the map), where letting a wide image
   * dictate the width would break the two-column layout.
   *
   * `natural` makes the box adopt the photo's own aspect ratio, so every
   * gallery photo fills its tile edge to edge with no crop and no letterbox and
   * the masonry columns absorb the varying heights.
   */
  fit?: "cover" | "natural";
  /** Starting ratio while the slot is empty. */
  ratio?: string;
  minHeight?: number;
  onDark?: boolean;
  /** Gallery tiles scale 1.04 on hover inside their fixed frame. */
  zoom?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
};

export default function ImageSlot({
  photo,
  fit = "cover",
  ratio = "4 / 3",
  minHeight,
  onDark = false,
  zoom = false,
  sizes = "100vw",
  priority = false,
  className,
  style,
}: Props) {
  // Natural-fit tiles take their ratio from the photo itself: declared in the
  // content module when known, otherwise measured once the file loads.
  const declaredRatio =
    photo.width && photo.height ? `${photo.width} / ${photo.height}` : null;
  const [measuredRatio, setMeasuredRatio] = useState<string | null>(null);

  const isNatural = fit === "natural";
  const activeRatio = isNatural ? (declaredRatio ?? measuredRatio ?? ratio) : ratio;

  const boxStyle: CSSProperties = minHeight
    ? { minHeight: `${minHeight}px`, height: "100%", ...style }
    : { aspectRatio: activeRatio, ...style };

  const classes = [
    styles.frame,
    isNatural ? styles.natural : styles.cover,
    onDark ? styles.onDark : null,
    zoom ? styles.zoom : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} style={boxStyle}>
      {photo.src ? (
        <Image
          className={styles.media}
          src={photo.src}
          alt={photo.alt ?? ""}
          fill
          sizes={sizes}
          priority={priority}
          onLoad={(event) => {
            if (!isNatural || declaredRatio) return;
            const img = event.currentTarget;
            if (img.naturalWidth && img.naturalHeight) {
              setMeasuredRatio(`${img.naturalWidth} / ${img.naturalHeight}`);
            }
          }}
        />
      ) : (
        <div className={styles.placeholder} aria-hidden="true">
          <span className={styles.placeholderMark}>◇</span>
          <span>{photo.label}</span>
        </div>
      )}
    </div>
  );
}

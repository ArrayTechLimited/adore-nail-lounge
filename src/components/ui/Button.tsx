import type { CSSProperties, ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "filled" | "outline";
type Ground = "dark" | "light";

type Props = {
  href: string;
  children: ReactNode;
  /** Trailing glyph: ↗ for outbound, ☎ for call, → for internal routes. */
  glyph?: "↗" | "☎" | "→";
  variant?: Variant;
  ground?: Ground;
  /** Full-width with the label left and the glyph right. */
  block?: boolean;
  /** Outbound links open in a new tab. */
  external?: boolean;
  /** Adds the -2px hover lift used by the desktop hero pair. */
  lift?: boolean;
  minHeight?: number;
  className?: string;
  style?: CSSProperties;
  "aria-label"?: string;
};

const variantClass: Record<`${Variant}-${Ground}`, string> = {
  "filled-dark": styles.filledDark,
  "filled-light": styles.filledLight,
  "outline-dark": styles.outlineDark,
  "outline-light": styles.outlineLight,
};

export default function Button({
  href,
  children,
  glyph,
  variant = "outline",
  ground = "light",
  block = false,
  external = false,
  lift = false,
  minHeight,
  className,
  style,
  ...rest
}: Props) {
  const classes = [
    styles.btn,
    variantClass[`${variant}-${ground}`],
    block ? styles.block : null,
    lift ? styles.lift : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      href={href}
      className={classes}
      style={{ ...(minHeight ? { minHeight: `${minHeight}px` } : null), ...style }}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : null)}
      {...rest}
    >
      <span>{children}</span>
      {glyph ? (
        <span className={styles.glyph} aria-hidden="true">
          {glyph}
        </span>
      ) : null}
    </a>
  );
}

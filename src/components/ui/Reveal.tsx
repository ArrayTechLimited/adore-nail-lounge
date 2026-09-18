import type { CSSProperties, ElementType, ReactNode } from "react";

type RevealKind = "rise" | "bar" | "tile";

type Props = {
  as?: ElementType;
  kind?: RevealKind;
  /** Stagger delay in seconds. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
} & Record<string, unknown>;

/**
 * Tags an element for the entrance animation. Purely declarative — all state
 * lives in CSS, driven by the `data-in` attribute MotionRoot sets on the
 * enclosing [data-reveal-frame].
 */
export default function Reveal({
  as: Tag = "div",
  kind = "rise",
  delay = 0,
  className,
  style,
  children,
  ...rest
}: Props) {
  return (
    <Tag
      data-reveal={kind}
      className={className}
      style={{ ...(delay ? { ["--d" as string]: `${delay}s` } : null), ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

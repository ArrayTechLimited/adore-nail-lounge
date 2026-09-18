"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { BOOKING_URL, navLinks, salon } from "@/content/site";
import styles from "./Header.module.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Escape to close, focus trapped inside the drawer, background scroll locked.
  useEffect(() => {
    if (!menuOpen) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(
        drawerRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        ) ?? [],
      );

    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  // Return focus to the control that opened the drawer.
  useEffect(() => {
    if (!menuOpen) hamburgerRef.current?.focus({ preventScroll: true });
  }, [menuOpen]);

  return (
    <>
      <div className={styles.utilityBar}>
        <span className={styles.utilityItem}>{salon.address.short}</span>
        <span className={styles.utilityCenter}>{salon.hours.walkIns}</span>
        <span className={styles.utilityItem}>{salon.hours.todayNotice}</span>
      </div>

      <header className={styles.header}>
        <div className={styles.bar}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.logo}
            src="/adore-logo-trimmed.png"
            alt={salon.name}
            width={536}
            height={159}
          />

          <nav className={styles.desktopNav} aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`${styles.navLink} ${
                  "current" in link && link.current ? styles.navLinkCurrent : ""
                }`}
                {...("current" in link && link.current ? { "aria-current": "page" as const } : null)}
              >
                {link.label}
              </a>
            ))}

            <div className={styles.headerCtas}>
              <Button
                href={salon.phone.href}
                variant="outline"
                ground="light"
                className={styles.headerBtn}
                aria-label={`Call the lounge on ${salon.phone.display}`}
              >
                <span aria-hidden="true">☎ </span>
                {salon.phone.display}
              </Button>
              <Button
                href={BOOKING_URL}
                variant="filled"
                ground="light"
                glyph="↗"
                external
                className={styles.headerBtn}
              >
                Booking
              </Button>
            </div>
          </nav>

          <div className={styles.mobileActions}>
            <a
              className={styles.iconButton}
              href={salon.phone.href}
              aria-label={`Call the lounge on ${salon.phone.display}`}
            >
              <span aria-hidden="true">☎</span>
            </a>
            <button
              ref={hamburgerRef}
              type="button"
              className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <div
          id="mobile-menu"
          ref={drawerRef}
          className={`${styles.drawer} dark-ground`}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className={styles.drawerTop}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.drawerLogo}
              src="/adore-logo-light.png"
              alt=""
              width={536}
              height={159}
            />
            <button
              type="button"
              className={styles.drawerClose}
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <span aria-hidden="true">✕</span>
            </button>
          </div>

          <nav className={styles.drawerNav} aria-label="Mobile">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`${styles.drawerLink} ${
                  "current" in link && link.current ? styles.drawerLinkCurrent : ""
                }`}
                onClick={() => setMenuOpen(false)}
                {...("current" in link && link.current ? { "aria-current": "page" as const } : null)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className={styles.drawerCtas}>
            <Button href={BOOKING_URL} variant="filled" ground="dark" glyph="↗" external block minHeight={54}>
              Booking
            </Button>
            <Button href={salon.phone.href} variant="outline" ground="dark" glyph="☎" block minHeight={54}>
              Call {salon.phone.display}
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  loadCookiePreferences,
  saveCookiePreferences,
} from "@/lib/cookie-preferences.mjs";

const OPEN_PREFERENCES_EVENT = "sparklifelab:open-cookie-preferences";
const ACTIVE_OPTIONAL_COOKIE_CATEGORIES: string[] = [];
const SAVE_CONFIRMATION =
  "Your privacy preferences have been saved. You can change them at any time using the “Cookie preferences” link in the footer.";

export function CookieConsent() {
  const [bannerVisible, setBannerVisible] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const bannerRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const confirmationTimerRef = useRef<number | null>(null);
  const hasOptionalCookieCategories = ACTIVE_OPTIONAL_COOKIE_CATEGORIES.length > 0;

  useEffect(() => {
    const initializationTimer = window.setTimeout(() => {
      try {
        const preference = loadCookiePreferences(window.localStorage);
        setBannerVisible(preference === null);
      } catch {
        setBannerVisible(true);
        setStorageError(true);
      }
    }, 0);

    const openPreferences = () => {
      returnFocusRef.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setStorageError(false);
      setPreferencesOpen(true);
    };

    window.addEventListener(OPEN_PREFERENCES_EVENT, openPreferences);
    return () => {
      window.clearTimeout(initializationTimer);
      window.removeEventListener(OPEN_PREFERENCES_EVENT, openPreferences);
      if (confirmationTimerRef.current !== null) {
        window.clearTimeout(confirmationTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const banner = bannerRef.current;
    if (!bannerVisible || !banner) {
      return;
    }

    const root = document.documentElement;
    const applyHeight = () => {
      root.style.setProperty("--cookie-banner-h", `${banner.offsetHeight}px`);
    };

    applyHeight();
    document.body.classList.add("has-cookie-banner");
    const resizeObserver = new ResizeObserver(applyHeight);
    resizeObserver.observe(banner);

    return () => {
      resizeObserver.disconnect();
      document.body.classList.remove("has-cookie-banner");
      root.style.removeProperty("--cookie-banner-h");
    };
  }, [bannerVisible]);

  useEffect(() => {
    if (!preferencesOpen) {
      return;
    }

    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setPreferencesOpen(false);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
        )
      );
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (returnFocusRef.current?.isConnected) {
        returnFocusRef.current.focus();
      }
    };
  }, [preferencesOpen]);

  function showConfirmation() {
    setConfirmationVisible(true);
    if (confirmationTimerRef.current !== null) {
      window.clearTimeout(confirmationTimerRef.current);
    }
    confirmationTimerRef.current = window.setTimeout(() => {
      setConfirmationVisible(false);
    }, 9000);
  }

  function savePreferences() {
    try {
      saveCookiePreferences(window.localStorage);
      setStorageError(false);
      setPreferencesOpen(false);
      setBannerVisible(false);
      showConfirmation();
    } catch {
      setStorageError(true);
    }
  }

  function openPreferences(trigger: HTMLElement) {
    returnFocusRef.current = trigger;
    setStorageError(false);
    setPreferencesOpen(true);
  }

  return (
    <>
      {bannerVisible ? (
        <section
          ref={bannerRef}
          className="cookie-panel"
          aria-labelledby="cookie-banner-title"
        >
          <div className="cookie-copy">
            <p className="cookie-title" id="cookie-banner-title">
              Cookie preferences
            </p>
            <p>
              We use essential browser storage to remember your privacy choices and to support
              website functions such as our Kit signup forms. We also use privacy-friendly Vercel
              analytics that do not use cookies or identify individual visitors.
            </p>
            <p>
              No advertising or marketing cookies are currently active. You can review or update
              your preferences at any time.
            </p>
            <Link className="cookie-policy-link" href="/cookie-policy/">
              Read our Cookie Policy
            </Link>
            {storageError ? (
              <p className="cookie-storage-error" role="alert">
                We could not save your preference. Please check that browser storage is available
                and try again.
              </p>
            ) : null}
          </div>

          <div className="cookie-actions">
            <button type="button" className="cookie-primary" onClick={savePreferences}>
              OK, got it
            </button>
            <button
              type="button"
              onClick={(event) => openPreferences(event.currentTarget)}
            >
              Privacy details
            </button>
            {hasOptionalCookieCategories ? (
              <button type="button" onClick={savePreferences}>
                Accept optional cookies
              </button>
            ) : null}
          </div>
        </section>
      ) : null}

      {preferencesOpen ? (
        <div className="cookie-preferences-backdrop">
          <div
            ref={dialogRef}
            className="cookie-preferences-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-preferences-title"
            aria-describedby="cookie-preferences-summary"
          >
            <div className="cookie-preferences-header">
              <div>
                <p className="cookie-preferences-eyebrow">Privacy controls</p>
                <h2 id="cookie-preferences-title">Cookie preferences</h2>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                className="cookie-preferences-close"
                onClick={() => setPreferencesOpen(false)}
                aria-label="Close cookie preferences without saving"
              >
                Close
              </button>
            </div>

            <p id="cookie-preferences-summary" className="cookie-preferences-summary">
              Review the technologies currently used on this website. Opening or closing this
              panel does not change your saved preference.
            </p>

            <div className="cookie-category-list">
              <section className="cookie-category" aria-labelledby="essential-storage-title">
                <div className="cookie-category-heading">
                  <h3 id="essential-storage-title">Essential storage</h3>
                  <span className="cookie-category-status">Always active</span>
                </div>
                <p>
                  Essential browser storage and security technologies help the website function,
                  remember your privacy preferences, and protect embedded Kit forms against
                  automated abuse. These technologies cannot be switched off through the
                  preference center.
                </p>
              </section>

              <section className="cookie-category" aria-labelledby="website-analytics-title">
                <div className="cookie-category-heading">
                  <h3 id="website-analytics-title">Privacy-friendly website analytics</h3>
                  <span className="cookie-category-status cookie-category-status-info">
                    Cookieless
                  </span>
                </div>
                <p>
                  We use Vercel Web Analytics to understand page views and basic website usage in
                  aggregated form. Vercel Web Analytics does not use cookies and is not intended to
                  identify individual visitors.
                </p>
              </section>
            </div>

            {storageError ? (
              <p className="cookie-modal-error" role="alert">
                We could not save your preference. Please check that browser storage is available
                and try again.
              </p>
            ) : null}

            <div className="cookie-preferences-footer">
              <Link href="/cookie-policy/">Read our Cookie Policy</Link>
              <button type="button" className="cookie-save-button" onClick={savePreferences}>
                Save choices
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div
        className={`cookie-confirmation${confirmationVisible ? " is-visible" : ""}`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {confirmationVisible ? SAVE_CONFIRMATION : ""}
      </div>
    </>
  );
}

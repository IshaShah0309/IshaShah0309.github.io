"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Browser-only facts (media queries, scroll position, stored preferences) read
 * through useSyncExternalStore rather than an effect, so the first client render
 * already agrees with the DOM and nothing cascades.
 */

const noop = () => () => {};

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  const get = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, get, () => false);
}

/** True once the page has scrolled past `threshold` pixels. */
export function useScrolledPast(threshold: number): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    window.addEventListener("scroll", onChange, { passive: true });
    return () => window.removeEventListener("scroll", onChange);
  }, []);

  const get = useCallback(() => window.scrollY > threshold, [threshold]);

  return useSyncExternalStore(subscribe, get, () => false);
}

/** True only after hydration, for anything that must not render on the server. */
export function useMounted(): boolean {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}

/** A small deterministic generator, so particle fields are stable and pure. */
export function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

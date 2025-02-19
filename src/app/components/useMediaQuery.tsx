import { useEffect, useMemo, useState } from "react";

/**
 * React hook to use media queries in components.
 * @param mediaQuery The media query to use.
 * @returns True if the media query matches, false otherwise.
 */
export function useMediaQuery(mediaQuery: string): boolean {
  // Remove any '@media' text from the query.
  const mediaQueryWithoutAtMedia = useMemo(
    () => mediaQuery.replace(/@media\s*/, ""),
    [mediaQuery]
  );

  // Set initial state safely (if window is undefined, default to false)
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(mediaQueryWithoutAtMedia).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined") return; // exit if on server

    const media = window.matchMedia(mediaQueryWithoutAtMedia);
    const listener = () => setMatches(media.matches);
    // Listen for changes in the media query
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [mediaQueryWithoutAtMedia]);

  return matches;
}

import { useEffect, useMemo, useState } from "react";

/**
 * React hook to use media queries in components.
 * @param mediaQuery The media query to use.
 * @returns True if the media query matches, false otherwise.
 */
export function useMediaQuery(mediaQuery: string): boolean {
  const mediaQueryWithoutAtMedia = useMemo(
    () => mediaQuery.replace(/@media( ?)/, ""),
    [mediaQuery]
  );
  const media = useMemo(
    () => window.matchMedia(mediaQueryWithoutAtMedia),
    [mediaQueryWithoutAtMedia]
  );
  const [matches, setMatches] = useState(media.matches);

  useEffect(() => {
    const listener = (): void => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [media]);

  return matches;
}

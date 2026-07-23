import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

// Place this once inside <BrowserRouter>, above your <Routes>.
// Every time the route (pathname) changes, it snaps the window to the top
// BEFORE the new page paints — so clicking a Footer link (e.g. "Contact")
// always lands you on that page's hero section, not wherever you last scrolled.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
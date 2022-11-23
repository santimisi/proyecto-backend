import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ children }: any) {
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);
  return <>{children}</>;
}

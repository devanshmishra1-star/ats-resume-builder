"use client";

import { useEffect, useState } from "react";

const storageKey = "ats-cookie-preference";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!window.localStorage.getItem(storageKey));
  }, []);

  function choosePreference(value: "accepted" | "declined") {
    window.localStorage.setItem(storageKey, value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside className="cookie-banner" aria-label="Cookie consent">
      <strong>Cookie preferences</strong>
      <p>
        We use local browser storage to remember this choice. Analytics or ad
        services can be added behind this preference when enabled.
      </p>
      <div className="cookie-actions">
        <button type="button" onClick={() => choosePreference("declined")}>
          Decline
        </button>
        <button type="button" className="button-dark" onClick={() => choosePreference("accepted")}>
          Accept
        </button>
      </div>
    </aside>
  );
}

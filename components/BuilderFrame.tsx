'use client';

import { LoaderCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type BuilderFrameProps = {
  src: string;
  title: string;
};

export function BuilderFrame({ src, title }: BuilderFrameProps) {
  const iframeSrc = useMemo(() => {
    if (typeof window === "undefined") {
      return src;
    }

    const url = new URL(src, window.location.origin);
    return `${url.pathname}${url.search}`;
  }, [src]);

  return (
    <div className="builder-route">
      <iframe
        title={title}
        src={iframeSrc}
        allow="clipboard-write"
      />
    </div>
  );
}

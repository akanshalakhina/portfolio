"use client";

import { createContext, useContext, useMemo, useState, type PropsWithChildren } from "react";

type SiteState = {
  booted: boolean;
  setBooted: (v: boolean) => void;
  paletteOpen: boolean;
  setPaletteOpen: (v: boolean) => void;
  aiOpen: boolean;
  setAiOpen: (v: boolean) => void;
};

const SiteContext = createContext<SiteState | null>(null);

export function SiteProvider({ children }: PropsWithChildren) {
  const [booted, setBooted] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  const value = useMemo(
    () => ({ booted, setBooted, paletteOpen, setPaletteOpen, aiOpen, setAiOpen }),
    [booted, paletteOpen, aiOpen],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside <SiteProvider>");
  return ctx;
}

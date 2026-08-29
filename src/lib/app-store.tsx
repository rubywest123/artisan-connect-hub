import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { PRODUCTS, type Product } from "@/data/mock";

export type Mode = "artisan" | "buyer";

export type ArtisanProfile = {
  name: string;
  craft: string;
  village: string;
  state: string;
  experience: string;
  languages: string[];
  onboarded: boolean;
};

export type DraftProduct = {
  photo?: string;
  enhanced?: string;
  preset?: string;
  edits: string[];
  transcript?: string;
  language?: string;
  translation?: string;
  hindi?: string;
  catalog?: {
    title: string;
    short: string;
    full: string;
    story: string;
    materials: string;
    dimensions: string;
    care: string;
    category: string;
    tags: string[];
  };
  price?: { retail: number; wholesale: number; bulk: number };
};

export type PublishedProduct = Product & { isMine: true; publishedAt: string };

type Store = {
  mode: Mode;
  setMode: (m: Mode) => void;
  profile: ArtisanProfile;
  setProfile: (p: Partial<ArtisanProfile>) => void;
  draft: DraftProduct;
  setDraft: (d: Partial<DraftProduct>) => void;
  resetDraft: () => void;
  published: PublishedProduct[];
  publish: (p: PublishedProduct) => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  cart: string[];
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  a11y: { largeText: boolean; contrast: boolean; reduceMotion: boolean };
  setA11y: (k: keyof Store["a11y"], v: boolean) => void;
  uiLanguage: string;
  setUiLanguage: (l: string) => void;
};

const emptyDraft: DraftProduct = { edits: [] };

const defaultProfile: ArtisanProfile = {
  name: "Sunita Gaikwad",
  craft: "Bamboo",
  village: "Wada",
  state: "Maharashtra",
  experience: "10–20 years",
  languages: ["Marathi", "Hindi"],
  onboarded: false,
};

const AppContext = createContext<Store | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("artisan");
  const [profile, setProfileState] = useState<ArtisanProfile>(defaultProfile);
  const [draft, setDraftState] = useState<DraftProduct>(emptyDraft);
  const [published, setPublished] = useState<PublishedProduct[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(["p1", "p19"]);
  const [cart, setCart] = useState<string[]>([]);
  const [a11y, setA11yState] = useState({ largeText: false, contrast: false, reduceMotion: false });
  const [uiLanguage, setUiLanguage] = useState("Marathi");

  useEffect(() => {
    const el = document.documentElement;
    el.classList.toggle("a11y-large-text", a11y.largeText);
    el.classList.toggle("a11y-contrast", a11y.contrast);
    el.classList.toggle("a11y-reduce-motion", a11y.reduceMotion);
  }, [a11y]);

  const value = useMemo<Store>(
    () => ({
      mode,
      setMode,
      profile,
      setProfile: (p) => setProfileState((prev) => ({ ...prev, ...p })),
      draft,
      setDraft: (d) => setDraftState((prev) => ({ ...prev, ...d })),
      resetDraft: () => setDraftState(emptyDraft),
      published,
      publish: (p) => setPublished((prev) => [p, ...prev]),
      wishlist,
      toggleWishlist: (id) =>
        setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
      cart,
      addToCart: (id) => setCart((prev) => (prev.includes(id) ? prev : [...prev, id])),
      removeFromCart: (id) => setCart((prev) => prev.filter((x) => x !== id)),
      a11y,
      setA11y: (k, v) => setA11yState((prev) => ({ ...prev, [k]: v })),
      uiLanguage,
      setUiLanguage,
    }),
    [mode, profile, draft, published, wishlist, cart, a11y, uiLanguage],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}

/** My catalog = published demo products + a slice of seeded products owned by the demo artisan. */
export function useMyCatalog() {
  const { published } = useApp();
  const seeded = PRODUCTS.filter((p) => p.artisanId === "a1");
  return [...published, ...seeded];
}

import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { useLocalDemo } from "@/hooks/use-local-demo";

import { translate, type Language } from "./translations";
export { translate, bengali, type Language } from "./translations";
type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (text: string) => string;
};
const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  setLanguage: () => {},
  t: (text) => text,
});
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [storedLanguage, setLanguage] = useLocalDemo<Language>("sholok-language", "en");
  const language: Language = storedLanguage === "bn" ? "bn" : "en";
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
  const value = useMemo<LanguageContextValue>(
    () => ({ language, setLanguage, t: (text: string) => translate(text, language) }),
    [language, setLanguage],
  );
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
export const useLanguage = () => useContext(LanguageContext);

/** Both translations participate in intrinsic sizing; only the selected one is exposed. */
export function LocalizedText({ text, bengaliText }: { text: string; bengaliText?: string }) {
  const { language } = useLanguage();
  const bn = bengaliText ?? translate(text, "bn");
  if (text === bn) return <>{text}</>;
  return (
    <span className="localized-text">
      <span lang="en" aria-hidden={language !== "en"} className={language !== "en" ? "localized-text-reserve" : undefined}>{text}</span>
      <span lang="bn" aria-hidden={language !== "bn"} className={language !== "bn" ? "localized-text-reserve" : undefined}>{bn}</span>
    </span>
  );
}

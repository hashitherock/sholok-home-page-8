import { useLanguage } from "@/lib/language";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Menu,
  Bell,
  ShoppingBag,
  UserRound,
  Search,
  Mic,
  X,
  ArrowUpRight,
  ArrowUp,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useLocalDemo } from "@/hooks/use-local-demo";
import { services, searchContent } from "@/lib/portal-data";
import { ServiceMenu } from "./service-menu";
const accountCopy: Record<string, { intro: string; submit: string; success: string }> = {
  "Sign In": {
    intro:
      "Welcome back. Sign in to pick up where you left off — your saved products, quick notes and recently visited services are waiting for you.",
    submit: "Sign in",
    success: "",
  },
  "Create Account": {
    intro:
      "One account for everything SHOLOK. Save products to your wishlist, follow your favourite topics, publish on Blog and join conversations in Cafe.",
    submit: "Create account",
    success: "",
  },
  "Find ID": {
    intro:
      "Enter the email address you used when you joined SHOLOK. We will send your account ID to that inbox within a few minutes.",
    submit: "Email my ID",
    success:
      "If an account exists for that address, your SHOLOK ID is on its way to your inbox. Please check your spam folder if it does not arrive shortly.",
  },
  "Forgot Password": {
    intro:
      "Enter your account email and we will send you a secure link to choose a new password. For your safety, the link stays valid for 30 minutes.",
    submit: "Send reset link",
    success:
      "If an account exists for that address, a password reset link is on its way. The link expires in 30 minutes, so please use it promptly.",
  },
};
export function AccountDialog({
  open,
  onClose,
  initial = "Sign In",
}: {
  open: boolean;
  onClose: () => void;
  initial?: string;
}) {
  const { t } = useLanguage();
  const [mode, setMode] = useState(initial);
  const [user, setUser] = useLocalDemo("sholok-user", "");
  const [saved] = useLocalDemo<number[]>("sholok-saved", []);
  const [recent] = useLocalDemo<string[]>("sholok-recent-services", []);
  const [notice, setNotice] = useState("");
  const copy = accountCopy[mode] ??
    accountCopy["Sign In"] ?? { intro: "", submit: "Sign in", success: "" };
  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <DialogContent>
        <DialogTitle>
          <span className="brand text-2xl">{t("SHOLOK")}</span>{" "}
          <span className="text-base">{t(user ? "My Account" : mode)}</span>
        </DialogTitle>
        <DialogDescription>
          {t("Your SHOLOK account · Sign in to sync your saved items, notes and preferences.")}
        </DialogDescription>
        {user ? (
          <div className="form-stack">
            <h3 className="text-lg font-semibold">
              {t("Hello, ")}
              {user}
            </h3>
            <p className="text-sm text-muted-foreground">
              <Heart className="inline size-4" /> {saved.length}
              {t(" saved products")}
            </p>
            <p className="text-sm text-muted-foreground">
              {t("Recently visited: ")}
              {recent.join(", ") || "No services yet"}
            </p>
            <label className="text-sm">
              {t("Display name")}
              <input
                className="mt-2 w-full"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </label>
            <Button
              variant="outline"
              onClick={() => setNotice("Your preferences have been saved.")}
            >
              {t("Save settings")}
            </Button>
            <Button
              onClick={() => {
                setUser("");
                setNotice("");
              }}
            >
              {t("Logout")}
            </Button>
          </div>
        ) : (
          <form
            className="form-stack"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              if (mode === "Sign In" || mode === "Create Account") {
                setUser(String(data.get("name") || "Explorer"));
                onClose();
              } else setNotice(copy.success);
            }}
          >
            <p className="text-sm text-muted-foreground">{t(copy.intro)}</p>
            {mode === "Create Account" && (
              <input
                name="name"
                aria-label={t("Full name")}
                placeholder={t("Full name")}
                required
              />
            )}
            <input
              name="email"
              type="email"
              aria-label={t("Email address")}
              placeholder={t("Email address")}
              required
            />
            {(mode === "Sign In" || mode === "Create Account") && (
              <input
                name="password"
                type="password"
                aria-label={t("Password")}
                placeholder={t(
                  mode === "Create Account"
                    ? "Choose a password (at least 8 characters)"
                    : "Password",
                )}
                minLength={mode === "Create Account" ? 8 : 4}
                required
              />
            )}
            {mode === "Create Account" && (
              <p className="text-xs text-muted-foreground">
                {t(
                  "By creating an account you agree to the SHOLOK Terms of Use and Privacy Policy.",
                )}
              </p>
            )}
            <Button type="submit">{t(copy.submit)}</Button>
            <div className="flex justify-center flex-wrap gap-2">
              {["Sign In", "Create Account", "Find ID", "Forgot Password"]
                .filter((x) => x !== mode)
                .map((x) => (
                  <Button
                    key={x}
                    variant="link"
                    size="sm"
                    onClick={() => {
                      setMode(x);
                      setNotice("");
                    }}
                  >
                    {x}
                  </Button>
                ))}
            </div>
          </form>
        )}
        {notice && (
          <p role="status" className="text-sm text-primary">
            {t(notice)}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
export function Header() {
  const { t, language, setLanguage } = useLanguage();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [panel, setPanel] = useState("");
  const [account, setAccount] = useState(false);
  const [menu, setMenu] = useState(false);
  const [recent, setRecent] = useLocalDemo<string[]>("sholok-searches", []);
  const [saved] = useLocalDemo<number[]>("sholok-saved", []);
  const results = searchContent(query).slice(0, 7);
  function search() {
    if (query.trim()) {
      setRecent([query.trim(), ...recent.filter((x) => x !== query.trim())].slice(0, 5));
      setPanel("Search results");
      setFocused(false);
    }
  }
  return (
    <>
      <header className="portal-header">
        <div className="portal-container">
          <div className="topline">
            <Button
              variant="ghost"
              size="icon"
              aria-label={t("Open service menu")}
              title={t("All services")}
              aria-expanded={menu}
              onClick={() => setMenu(true)}
            >
              <Menu />
            </Button>
            <Link to="/" className="brand header-brand">
              {t("SHOLOK")}
            </Link>
            <div className="top-actions">
              <div className="language-switch" role="group" aria-label="Language">
                <Button
                  type="button"
                  variant="ghost"
                  lang="bn"
                  aria-pressed={language === "bn"}
                  onClick={() => setLanguage("bn")}
                >
                  বাংলা
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  lang="en"
                  aria-pressed={language === "en"}
                  onClick={() => setLanguage("en")}
                >
                  English
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                aria-label={t("Notifications")}
                title={t("Notifications")}
                onClick={() => setPanel("Notifications")}
              >
                <Bell />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label={t("Saved shopping")}
                title={t("Saved shopping")}
                onClick={() => setPanel("Saved shopping")}
              >
                <ShoppingBag />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label={t("My Account")}
                title={t("My Account")}
                onClick={() => setAccount(true)}
              >
                <UserRound />
              </Button>
            </div>
          </div>
          <div className="search-area">
            <form
              className="search-box"
              onSubmit={(e) => {
                e.preventDefault();
                search();
              }}
            >
              <span className="brand">{t("S")}</span>
              <input
                aria-label={t("Search SHOLOK")}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 180)}
                placeholder={t("What are you looking for?")}
              />
              {query && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={t("Clear search")}
                  onClick={() => setQuery("")}
                >
                  <X />
                </Button>
              )}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={t("Voice search")}
                onClick={() => setPanel("Voice search")}
              >
                <Mic className="text-muted-foreground" />
              </Button>
              <Button type="submit" variant="ghost" size="icon" aria-label={t("Search")}>
                <Search className="text-primary" />
              </Button>
            </form>
            {focused && (query || recent.length > 0) && (
              <div className="search-suggestions">
                <p className="text-xs text-muted-foreground">
                  {t(query ? "Suggestions" : "Recent searches")}
                </p>
                {query ? (
                  results.length ? (
                    results.map((r, i) => (
                      <Link key={i} to="/service/$slug" params={{ slug: r.slug }}>
                        <Search className="size-4 text-primary" />
                        <span className="text-sm">{t(r.title)}</span>
                        <span className="ml-auto text-xs text-muted-foreground">{t(r.type)}</span>
                      </Link>
                    ))
                  ) : (
                    <p className="p-3 text-sm">{t("No results found. Try another keyword.")}</p>
                  )
                ) : (
                  recent.map((r) => (
                    <Button
                      key={r}
                      variant="ghost"
                      className="w-full justify-start"
                      onMouseDown={() => setQuery(r)}
                    >
                      {t(r)}
                    </Button>
                  ))
                )}
              </div>
            )}
          </div>
          <p className="header-caption">
            {t("Your everyday, connected. ")}
            <span className="text-primary">
              {t("Discover the world of SHOLOK ")}
              <ArrowUpRight className="inline size-3" />
            </span>
          </p>
          <nav className="service-nav" aria-label={t("Core services")}>
            {services.map((s) => (
              <Link key={s.slug} to="/service/$slug" params={{ slug: s.slug }}>
                <span className="service-icon" data-service={s.slug}>
                  <s.icon />
                </span>
                <span>{t(s.name)}</span>
              </Link>
            ))}
            <Button
              variant="ghost"
              className="browse-services"
              onClick={() => setMenu(true)}
              aria-label={t("Browse all services")}
            >
              <span className="service-icon">
                <Menu />
              </span>
              <span>{t("All services")}</span>
            </Button>
          </nav>
        </div>
      </header>
      <ServiceMenu open={menu} onOpenChange={setMenu} />
      <AccountDialog key={String(account)} open={account} onClose={() => setAccount(false)} />
      <Dialog
        open={!!panel}
        onOpenChange={(v) => {
          if (!v) setPanel("");
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogTitle>{t(panel)}</DialogTitle>
          <DialogDescription>{t("SHOLOK")}</DialogDescription>
          <div className="dialog-body">
            {panel === "All services" ? (
              <>
                <Link to="/services" className="text-sm text-primary">
                  {t("Browse the service directory →")}
                </Link>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      to="/service/$slug"
                      params={{ slug: s.slug }}
                      onClick={() => setPanel("")}
                      className="flex items-center gap-2 p-3 rounded-md bg-secondary text-sm"
                    >
                      <s.icon className="size-5 text-primary" />
                      {t(s.name)}
                    </Link>
                  ))}
                </div>
              </>
            ) : panel === "Search results" ? (
              <>
                <p className="mb-3 text-sm text-muted-foreground">
                  {t("Results for “")}
                  {query}”
                </p>
                {searchContent(query).length ? (
                  searchContent(query).map((r, i) => (
                    <Link
                      key={i}
                      to="/service/$slug"
                      params={{ slug: r.slug }}
                      onClick={() => setPanel("")}
                      className="block border-b border-border py-3"
                    >
                      <strong className="text-sm">{t(r.title)}</strong>
                      <p className="text-xs text-muted-foreground">
                        {t(r.type)} · {t(r.description)}
                      </p>
                    </Link>
                  ))
                ) : (
                  <p>{t("No results found. Try another keyword.")}</p>
                )}
              </>
            ) : panel === "Saved shopping" ? (
              <>
                <p className="text-sm mb-4">
                  {saved.length}
                  {t(" products on your wishlist.")}
                </p>
                <Link
                  to="/service/$slug"
                  params={{ slug: "shopping" }}
                  onClick={() => setPanel("")}
                  className="text-primary"
                >
                  {t("View your shopping collection →")}
                </Link>
              </>
            ) : panel === "Voice search" ? (
              <p className="text-sm">
                {t(
                  "Voice search isn’t available in your browser yet. Please type your search in the search box.",
                )}
              </p>
            ) : (
              <div className="space-y-4 text-sm">
                <p>
                  <strong>{t("Welcome to SHOLOK")}</strong>
                  <br />
                  {t("Your daily discoveries are ready.")}
                </p>
                <p>
                  <strong>{t("A little inspiration for your weekend")}</strong>
                  <br />
                  {t("Explore new stories and editor’s picks.")}
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
const footerGroups = [
  { title: "Partners", items: ["Business Partners", "Smart Store Center", "Partner Programs"] },
  { title: "Developers", items: ["Developer Center", "API Documentation", "Open Source"] },
  { title: "Company", items: ["About SHOLOK", "Contact", "Careers"] },
  { title: "Legal", items: ["Terms of Use", "Privacy Policy", "Cookie Policy"] },
];
export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="footer">
      <div className="portal-container">
        <div className="footer-announcement">
          <span>
            <strong className="mr-4">{t("Announcements")}</strong>
            {t(" Welcome to your new everyday. Meet SHOLOK.")}
          </span>
          <Link to="/info/$page" params={{ page: "announcements" }} className="shrink-0">
            {t("View all ")}
            <ArrowUpRight className="inline size-3" />
          </Link>
        </div>
        <div className="footer-grid">
          <div>
            <Link to="/" className="brand text-2xl">
              {t("SHOLOK")}
            </Link>
            <p className="text-xs text-muted-foreground mt-3">{t("Your everyday, connected.")}</p>
            <Link to="/services">{t("Explore all services →")}</Link>
          </div>
          {footerGroups.map((g) => (
            <div key={g.title}>
              <h3>{t(g.title)}</h3>
              {g.items.map((item) => (
                <Link
                  key={item}
                  to="/info/$page"
                  params={{ page: item.toLowerCase().replaceAll(" ", "-") }}
                >
                  {t(item)}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()}
            {t(" SHOLOK. All rights reserved.")}
          </span>
          <span>
            {t("Made for a more connected world. ")}
            <span className="text-primary">বাংলাদেশ</span>
          </span>
          <span>{t("© 2026 SHOLOK. All rights reserved.")}</span>
        </div>
      </div>
      <Button
        className="fixed bottom-5 right-5 z-30 rounded-full shadow-md"
        size="icon"
        aria-label={t("Back to top")}
        title={t("Back to top")}
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
              ? "instant"
              : "smooth",
          })
        }
      >
        <ArrowUp />
      </Button>
    </footer>
  );
}
export function Shell({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

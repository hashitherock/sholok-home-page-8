import { LocalizedText, useLanguage } from "@/lib/language";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/portal/shell";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/portal-data";
export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "All 17 Services — SHOLOK" },
      {
        name: "description",
        content:
          "Discover the complete SHOLOK service directory, from community and shopping to entertainment and everyday utilities.",
      },
      { property: "og:title", content: "All 17 Services — SHOLOK" },
      { property: "og:description", content: "Find your next favorite SHOLOK service." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Directory,
});
function Directory() {
  const { t } = useLanguage();
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  return (
    <Shell>
      <main className="portal-container destination">
        <p className="text-xs text-primary"><LocalizedText text={"YOUR WORLD, TOGETHER"} /></p>
        <h1 className="font-semibold mt-3"><LocalizedText text={"Explore SHOLOK"} /></h1>
        <p className="text-sm text-muted-foreground mt-2">
          <LocalizedText text={"17 services. Endless possibilities."} />
        </p>
        <input
          aria-label={t("Search services")}
          placeholder={t("Find a service…")}
          className="w-full max-w-md rounded-md border border-input bg-card p-3 text-sm mt-6"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="flex flex-wrap gap-2 my-5">
          {["All", ...new Set(services.map((s) => s.category))].map((c) => (
            <Button
              key={c}
              variant={c === category ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setCategory(c)}
            >
              <LocalizedText text={c} />
            </Button>
          ))}
        </div>
        <div className="directory-grid">
          {services
            .filter(
              (s) =>
                (category === "All" || s.category === category) &&
                `${s.name} ${s.description} ${t(s.name)} ${t(s.description)}`
                  .toLowerCase()
                  .includes(query.toLowerCase()),
            )
            .map((s) => (
              <Link
                to="/service/$slug"
                params={{ slug: s.slug }}
                className="directory-card"
                key={s.slug}
              >
                <span className="service-icon" data-service={s.slug}>
                  <s.icon />
                </span>
                <h3><LocalizedText text={s.name} /></h3>
                <p><LocalizedText text={s.description} /></p>
                <span className="text-[10px] text-primary">{s.url.replace("https://", "")} →</span>
              </Link>
            ))}
        </div>
      </main>
    </Shell>
  );
}

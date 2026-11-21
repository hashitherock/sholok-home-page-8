import { useLanguage } from "@/lib/language";
import { createFileRoute } from "@tanstack/react-router";
import { CloudSun, ArrowUpRight } from "lucide-react";
import { Shell } from "@/components/portal/shell";
import {
  FeaturedNews,
  MediaOutlets,
  Shopping,
  Discovery,
  Sponsored,
  Videos,
} from "@/components/portal/content";
import {
  LoginWidget,
  Promotion,
  FeaturedProduct,
  Weather,
  Finance,
  Calendar,
  Shipping,
} from "@/components/portal/widgets";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SHOLOK — Your everyday, connected" },
      {
        name: "description",
        content:
          "Explore 17 services, inspiring stories, thoughtful shopping and your everyday essentials on the SHOLOK digital portal.",
      },
      { property: "og:title", content: "SHOLOK — Your everyday, connected" },
      {
        property: "og:description",
        content: "News, shopping, communities and everyday inspiration, all together.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});
function Index() {
  const { t, language } = useLanguage();
  return (
    <Shell>
      <main className="portal-container">
        <div className="dayline">
          <span>
            <strong className="text-foreground">
              {new Date().toLocaleDateString(language === "bn" ? "bn-BD" : "en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </strong>{" "}
            <span className="ml-3">{t("A fresh day. A world to discover.")}</span>
          </span>
          <span className="day-extra">
            <CloudSun className="inline size-4 text-destructive mr-1" />
            {t(" Dhaka 28° · Partly cloudy ")}
            <span className="mx-3">|</span>{" "}
            <span className="text-primary">
              {t("Make SHOLOK yours ")}
              <ArrowUpRight className="inline size-3" />
            </span>
          </span>
        </div>
        <div className="portal-columns">
          <div className="content-column">
            <FeaturedNews />
            <MediaOutlets />
            <Shopping />
            <Discovery />
            <Sponsored />
            <Videos />
          </div>
          <aside className="sidebar" aria-label={t("Your everyday widgets")}>
            <LoginWidget />
            <Promotion />
            <FeaturedProduct />
            <Weather />
            <Finance />
            <Calendar />
            <Shipping />
          </aside>
        </div>
      </main>
    </Shell>
  );
}

import { LocalizedText, useLanguage } from "@/lib/language";
import { createFileRoute } from "@tanstack/react-router";
import { CloudSun, ArrowUpRight } from "lucide-react";
import { Shell } from "@/components/portal/shell";
import {
  FeaturedNews,
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
              <LocalizedText text={new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })} bengaliText={new Date().toLocaleDateString("bn-BD", { weekday: "long", month: "long", day: "numeric", year: "numeric" })} />
            </strong>{" "}
            <span className="ml-3"><LocalizedText text={"A fresh day. A world to discover."} /></span>
          </span>
          <span className="day-extra">
            <CloudSun className="inline size-4 text-destructive mr-1" />
            <LocalizedText text={" Dhaka 28° · Partly cloudy "} />
            <span className="mx-3">|</span>{" "}
            <span className="text-primary">
              <LocalizedText text={"Make SHOLOK yours "} />
              <ArrowUpRight className="inline size-3" />
            </span>
          </span>
        </div>
        <div className="portal-columns">
          <div className="content-column">
            <FeaturedNews />
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

import { useLanguage } from "@/lib/language";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/portal/shell";
const titleFor = (page: string) =>
  page
    .split("-")
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .join(" ");
const copy: Record<string, string> = {
  about:
    "SHOLOK was founded in Dhaka with a simple idea: everything you need every day should live in one trusted place. Today our 17 services help millions of people read, shop, learn and connect.",
  contact:
    "Our support team is available Saturday to Thursday, 9 AM to 9 PM (BST). Email support@sholok.com or use live chat in the SHOLOK app.",
  careers:
    "We are hiring engineers, designers, editors and community specialists in Dhaka and Chattogram. Send your CV and portfolio to careers@sholok.com.",
  "api-documentation":
    "The SHOLOK Developer Platform offers APIs for search, maps, translation and commerce. Register at developers.sholok.com to request an API key.",
  "developer-center":
    "Build with SHOLOK: guides, SDKs and ready-made integrations for search, maps, translation and commerce are available to registered partners.",
  "community-initiatives":
    "Through SHOLOK Green Cities and Digital Literacy for All, we partner with local organisations to plant trees and teach essential online skills across Bangladesh.",
};
export const Route = createFileRoute("/info/$page")({
  head: ({ params }) => ({
    meta: [
      { title: `${titleFor(params.page)} — SHOLOK` },
      {
        name: "description",
        content: `${titleFor(params.page)} — information about SHOLOK, Bangladesh’s connected everyday portal.`,
      },
      { property: "og:title", content: `${titleFor(params.page)} — SHOLOK` },
      { property: "og:description", content: "Learn about the SHOLOK portal and its community." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Information,
});
function Information() {
  const { t } = useLanguage();
  const { page } = Route.useParams();
  const legal = ["privacy-policy", "cookie-policy", "terms-of-use"].includes(page);
  return (
    <Shell>
      <main className="portal-container destination">
        <div className="max-w-2xl">
          <Link to="/" className="text-sm text-primary">
            {t("← SHOLOK home")}
          </Link>
          <h1 className="font-semibold mt-6">{t(titleFor(page))}</h1>
          <p className="text-xs text-primary mt-3">{t("Last updated: 1 November 2026")}</p>
          {legal ? (
            <>
              <h2 className="text-lg font-semibold mt-8">{t("Your data, your control")}</h2>
              <p className="text-sm leading-7 text-muted-foreground mt-3">
                {t(
                  "SHOLOK stores your preferences, notes, recent searches and saved products on your device so your experience stays personal. You can clear this information at any time from your browser settings.",
                )}
              </p>
              <h2 className="text-lg font-semibold mt-6">{t("How we use information")}</h2>
              <p className="text-sm leading-7 text-muted-foreground mt-3">
                {t(
                  "We use information only to provide and improve our services. We never sell your personal data. For questions about this policy, contact privacy@sholok.com.",
                )}
              </p>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold mt-8">{t("A more connected everyday")}</h2>
              <p className="text-sm leading-7 text-muted-foreground mt-3">
                {t(
                  "SHOLOK brings communities, discovery, shopping, stories and everyday utilities together in one welcoming place.",
                )}
              </p>
              <p className="text-sm leading-7 text-muted-foreground mt-4">
                {t(
                  copy[page] ??
                    "SHOLOK partners with creators, sellers and organisations across Bangladesh. For partnership enquiries, contact partners@sholok.com.",
                )}
              </p>
            </>
          )}
          <Link to="/services" className="text-primary inline-block mt-7 text-sm">
            {t("Explore all services →")}
          </Link>
        </div>
      </main>
    </Shell>
  );
}

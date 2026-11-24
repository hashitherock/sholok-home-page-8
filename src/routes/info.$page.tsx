import { LocalizedText, useLanguage } from "@/lib/language";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/portal/shell";
import { helpDestinations, helpQuestions } from "@/lib/portal-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const titleFor = (page: string) =>
  helpDestinations.find((destination) => destination.page === page)?.title ??
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
  const help = helpDestinations.some((destination) => destination.page === page);
  return (
    <Shell>
      <main className="portal-container destination">
        <div className="max-w-2xl">
          <Link to="/" className="text-sm text-primary">
            <LocalizedText text={"← SHOLOK home"} />
          </Link>
          <h1 className="font-semibold mt-6"><LocalizedText text={titleFor(page)} /></h1>
          <p className="text-xs text-primary mt-3"><LocalizedText text={"Last updated: 1 November 2026"} /></p>
          {page === "about" ? (
            <>
              <h2 className="text-xl font-semibold mt-8"><LocalizedText text={"Introduction"} /></h2>
              <p className="text-sm leading-7 text-muted-foreground mt-3">
                <LocalizedText text={"SHOLOK brings communities, discovery, shopping, stories and everyday utilities together in one welcoming place."} />
              </p>
              <h2 id="overview" className="text-xl font-semibold mt-8">
                <LocalizedText text={"Overview"} />
              </h2>
              <p className="text-sm leading-7 text-muted-foreground mt-3">
                <LocalizedText text={"Browse communities, shopping, news, entertainment and everyday tools across the SHOLOK network."} />
              </p>
              <h2 id="purpose" className="text-xl font-semibold mt-8">
                <LocalizedText text={"Our purpose"} />
              </h2>
              <p className="text-sm leading-7 text-muted-foreground mt-3">
                <LocalizedText text={"Our purpose is to make discovery and everyday connections simpler, bringing useful services together in one accessible portal."} />
              </p>
            </>
          ) : help ? (
            <>
              <nav
                aria-label={t("Help")}
                className="flex flex-wrap gap-x-6 gap-y-3 mt-6 text-sm text-primary"
              >
                {helpDestinations
                  .filter((destination) => destination.page !== page)
                  .map((destination) => (
                    <Link
                      key={destination.page}
                      to="/info/$page"
                      params={{ page: destination.page }}
                    >
                      <LocalizedText text={destination.title} />
                    </Link>
                  ))}
              </nav>
              {(page === "help-center" || page === "faq") && (
                <section className="mt-8">
                  <h2 className="text-xl font-semibold"><LocalizedText text={"Frequently asked questions"} /></h2>
                  <Accordion type="single" collapsible className="mt-3">
                    {helpQuestions.map(({ question, answer }, index) => (
                      <AccordionItem key={question} value={String(index)}>
                        <AccordionTrigger><LocalizedText text={question} /></AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-7">
                          <LocalizedText text={answer} />
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </section>
              )}
              {page === "support" && (
                <>
                  <h2 className="text-xl font-semibold mt-8"><LocalizedText text={"Help & support"} /></h2>
                  <p className="text-sm leading-7 text-muted-foreground mt-3">
                    <LocalizedText text={"Use the header search or open Services to browse the complete directory."} />
                  </p>
                </>
              )}
              {(page === "contact" || page === "support" || page === "help-center") && (
                <section className="mt-8">
                  <h2 className="text-xl font-semibold"><LocalizedText text={"Contact options"} /></h2>
                  <p className="text-sm leading-7 text-muted-foreground mt-3">
                    <LocalizedText text={"Verified support contact details have not been supplied. Do not send passwords, payment details or private documents through this website."} />
                  </p>
                </section>
              )}
            </>
          ) : legal ? (
            <>
              <h2 className="text-lg font-semibold mt-8"><LocalizedText text={"Your data, your control"} /></h2>
              <p className="text-sm leading-7 text-muted-foreground mt-3">
                <LocalizedText text={"SHOLOK stores your preferences, notes, recent searches and saved products on your device so your experience stays personal. You can clear this information at any time from your browser settings."} />
              </p>
              <h2 className="text-lg font-semibold mt-6"><LocalizedText text={"How we use information"} /></h2>
              <p className="text-sm leading-7 text-muted-foreground mt-3">
                <LocalizedText text={"We use information only to provide and improve our services. We never sell your personal data. For questions about this policy, contact privacy@sholok.com."} />
              </p>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold mt-8"><LocalizedText text={"A more connected everyday"} /></h2>
              <p className="text-sm leading-7 text-muted-foreground mt-3">
                <LocalizedText text={"SHOLOK brings communities, discovery, shopping, stories and everyday utilities together in one welcoming place."} />
              </p>
              <p className="text-sm leading-7 text-muted-foreground mt-4">
                <LocalizedText text={copy[page] ??
                    "SHOLOK partners with creators, sellers and organisations across Bangladesh. For partnership enquiries, contact partners@sholok.com."} />
              </p>
            </>
          )}
          <Link to="/services" className="text-primary inline-block mt-7 text-sm">
            <LocalizedText text={"Explore all services →"} />
          </Link>
        </div>
      </main>
    </Shell>
  );
}

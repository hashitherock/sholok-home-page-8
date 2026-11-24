import { LocalizedText, useLanguage } from "@/lib/language";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Shell } from "@/components/portal/shell";
import { Shopping, Discovery, Videos } from "@/components/portal/content";
import { Weather, Finance } from "@/components/portal/widgets";
import { Button } from "@/components/ui/button";
import { services, stories, images } from "@/lib/portal-data";
import { useLocalDemo } from "@/hooks/use-local-demo";
export const Route = createFileRoute("/service/$slug")({
  head: ({ params }) => {
    const s = services.find((s) => s.slug === params.slug);
    return {
      meta: [
        { title: `${s?.name || "Service"} — SHOLOK` },
        { name: "description", content: s?.description || "Explore SHOLOK services." },
        { property: "og:title", content: `${s?.name || "Service"} — SHOLOK` },
        {
          property: "og:description",
          content: s?.description || "Your everyday services on SHOLOK.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: Service,
});
function Service() {
  const { t } = useLanguage();
  const { slug } = Route.useParams();
  const s = services.find((x) => x.slug === slug);
  const [, setRecent] = useLocalDemo<string[]>("sholok-recent-services", []);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [seller, setSeller] = useState("");
  useEffect(() => {
    if (s) setRecent((prev) => [s.slug, ...prev.filter((x) => x !== s.slug)].slice(0, 6));
  }, [s?.slug, setRecent]);
  if (!s)
    return (
      <Shell>
        <main className="portal-container destination">
          <h1><LocalizedText text={"Service not found"} /></h1>
          <Link to="/services"><LocalizedText text={"Explore all services →"} /></Link>
        </main>
      </Shell>
    );
  return (
    <Shell>
      <main className="portal-container destination">
        <Link to="/services" className="text-xs text-primary">
          <LocalizedText text={"← All services"} />
        </Link>
        <div className="flex items-center gap-4 mt-6">
          <span className="service-icon" data-service={s.slug}>
            <s.icon />
          </span>
          <div>
            <h1 className="font-semibold"><LocalizedText text={s.name} /></h1>
            <p className="text-sm text-muted-foreground mt-1"><LocalizedText text={s.description} /></p>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-3 mt-5 mb-6 border-y border-border py-4">
          <span className="text-xs text-muted-foreground"><LocalizedText text={"Part of the SHOLOK network"} /></span>
          <span className="text-xs text-primary">
            <LocalizedText text={"Destination: "} />
            {s.url}
          </span>
        </div>
        {slug === "shopping" ? (
          <Shopping full />
        ) : slug === "weather" ? (
          <div className="max-w-md">
            <Weather />
          </div>
        ) : slug === "finance" ? (
          <div className="max-w-md">
            <Finance />
          </div>
        ) : slug === "tv" || slug === "music" ? (
          <Videos />
        ) : slug === "translate" || slug === "dictionary" ? (
          <section className="max-w-xl form-stack">
            <label className="text-sm font-semibold">
              <LocalizedText text={slug === "translate" ? "English → Bengali" : "Look up a word"} />
            </label>
            <textarea
              aria-label={t("Enter text")}
              placeholder={t(
                slug === "translate"
                  ? "Try hello, thank you, or good morning"
                  : "Try community, portal, or discovery",
              )}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              onClick={() => {
                const words: Record<string, string> =
                  slug === "translate"
                    ? { hello: "হ্যালো", "thank you": "ধন্যবাদ", "good morning": "সুপ্রভাত" }
                    : {
                        community: "A group of people sharing interests, connections, or a place.",
                        portal: "A central place to discover information and services.",
                        discovery: "The act of finding or learning something new.",
                      };
                setOutput(
                  words[input.trim().toLowerCase()] ||
                    "No result found. Try hello, thank you, or good morning — or check the spelling.",
                );
              }}
            >
              <LocalizedText text={slug === "translate" ? "Translate" : "Look up"} />
            </Button>
            {output && (
              <p role="status" className="bg-secondary rounded-md p-5">
                <LocalizedText text={output} />
              </p>
            )}
          </section>
        ) : slug === "smartstore" ? (
          <>
            <h2 className="text-xl font-semibold mb-5"><LocalizedText text={"Featured sellers"} /></h2>
            <div className="directory-grid">
              {["abc-fashion", "nike", "apple"].map((name) => (
                <div key={name} className="directory-card">
                  <img
                    src={name === "apple" ? images.headphones : images.essentials}
                    alt={t(`${name} storefront`)}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <h3 className="capitalize">{name}</h3>
                  <p><LocalizedText text={"Verified seller · Fast dispatch from Dhaka"} /></p>
                  <Button variant="outline" onClick={() => setSeller(name)}>
                    <LocalizedText text={"Preview storefront"} />
                  </Button>
                  <p className="break-all text-[10px]">
                    <LocalizedText text={"smartstore.sholok.com/"} />
                    {name}
                  </p>
                </div>
              ))}
            </div>
            {seller && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4 capitalize">
                  {seller}
                  <LocalizedText text={" · Store preview"} />
                </h2>
                <Shopping full />
              </div>
            )}
          </>
        ) : slug === "map" ? (
          <section>
            <h2 className="text-xl font-semibold mb-4"><LocalizedText text={"Discover Dhaka"} /></h2>
            <img
              src={images.city}
              alt={t("Dhaka city skyline")}
              className="w-full max-h-96 object-cover rounded-md"
            />
            <div className="directory-grid mt-5">
              {["Lakeside Walk", "City Gardens", "Downtown District"].map((p) => (
                <div key={p} className="directory-card">
                  <h3><LocalizedText text={p} /></h3>
                  <p><LocalizedText text={"Popular destination · Dhaka"} /></p>
                  <Button variant="outline" onClick={() => setOutput(`${p} saved to your places.`)}>
                    <LocalizedText text={"Save place"} />
                  </Button>
                </div>
              ))}
            </div>
            {output && (
              <p role="status" className="mt-4 text-primary">
                <LocalizedText text={output} />
              </p>
            )}
          </section>
        ) : slug === "cafe" || slug === "knowledge" ? (
          <>
            <h2 className="text-xl font-semibold mb-4">
              <LocalizedText text={slug === "cafe" ? "Join the conversation" : "A little curiosity goes a long way"} />
            </h2>
            <div className="directory-grid">
              {[
                "What makes a city feel like home?",
                "Share your favorite everyday ritual",
                "What are you learning this week?",
              ].map((title, i) => (
                <div className="directory-card" key={title}>
                  <h3><LocalizedText text={title} /></h3>
                  <p>
                    {12 + i * 7}
                    <LocalizedText text={" discussions · Community"} />
                  </p>
                  <Button variant="outline" onClick={() => setOutput(title)}>
                    <LocalizedText text={"Open discussion"} />
                  </Button>
                </div>
              ))}
            </div>
            {output && (
              <div className="mt-6 form-stack max-w-xl">
                <h3 className="font-semibold"><LocalizedText text={output} /></h3>
                <p className="text-sm text-muted-foreground">
                  <LocalizedText text={"SHOLOK Explorer: “It’s the little connections that make the difference.”"} />
                </p>
                <input
                  aria-label={t("Write a reply")}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t("Write your reply…")}
                />
                <Button
                  onClick={() => {
                    if (input.trim()) setOutput(`${output} — Your reply: ${input}`);
                    setInput("");
                  }}
                >
                  <LocalizedText text={"Post reply"} />
                </Button>
              </div>
            )}
          </>
        ) : slug === "realestate" ? (
          <>
            <h2 className="text-xl font-semibold mb-5"><LocalizedText text={"Find a place to call yours"} /></h2>
            <div className="directory-grid">
              {["Light-filled city apartment", "A home by the green", "Modern family living"].map(
                (title, i) => (
                  <div className="directory-card" key={title}>
                    <img
                      src={images.living}
                      alt={t(title)}
                      className="w-full h-40 object-cover rounded-md"
                    />
                    <h3><LocalizedText text={title} /></h3>
                    <p>
                      <LocalizedText text={"Dhaka · "} />
                      {i + 2}
                      <LocalizedText text={" bedrooms · Available now"} />
                    </p>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setOutput(
                          `${title}: Viewing request sent. The agent will contact you within 24 hours.`,
                        )
                      }
                    >
                      <LocalizedText text={"Request a viewing"} />
                    </Button>
                  </div>
                ),
              )}
            </div>
            {output && (
              <p role="status" className="mt-5 text-sm text-primary">
                <LocalizedText text={output} />
              </p>
            )}
          </>
        ) : slug === "news" || slug === "sports" ? (
          <>
            <h2 className="text-xl font-semibold mb-5">
              <LocalizedText text={slug === "sports" ? "Around the sporting world" : "Today’s perspectives"} />
            </h2>
            <div className="discovery-grid px-0">
              {stories.map((story) => (
                <article className="article-card" key={story.id}>
                  <img
                    src={story.image}
                    alt={t(story.title)}
                    loading="lazy"
                    width={1536}
                    height={1024}
                  />
                  <h3><LocalizedText text={story.title} /></h3>
                  <p className="text-xs text-muted-foreground mb-2"><LocalizedText text={story.description} /></p>
                  <Button
                    variant="link"
                    className="p-0 text-xs"
                    onClick={() => setOutput(story.title)}
                  >
                    <LocalizedText text={"Read story →"} />
                  </Button>
                </article>
              ))}
            </div>
            {output && (
              <section className="border-t border-border pt-6">
                <h2 className="text-xl font-semibold"><LocalizedText text={output} /></h2>
                <p className="text-sm mt-4 leading-7 text-muted-foreground">
                  <LocalizedText text={"This story explores the people, places and ideas making everyday life more connected. Across the city, communities are creating thoughtful spaces, sharing knowledge and finding inspiration in small moments. From urban gardens to neighbourhood libraries, these everyday efforts are quietly reshaping how we live together."} />
                </p>
              </section>
            )}
          </>
        ) : (
          <Discovery />
        )}
      </main>
    </Shell>
  );
}

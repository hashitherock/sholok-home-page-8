import { LocalizedText, translate, useLanguage } from "@/lib/language";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Search } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { services, helpDestinations } from "@/lib/portal-data";

export function ServiceMenu({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const filtered = services.filter((service) =>
    `${service.name} ${service.description} ${translate(service.name, "bn")} ${translate(service.description, "bn")}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="service-menu">
        <SheetHeader className="text-left">
          <SheetTitle>
            <span className="brand text-3xl"><LocalizedText text={"SHOLOK"} /></span>
          </SheetTitle>
          <SheetDescription><LocalizedText text={"Your everyday, connected."} /></SheetDescription>
        </SheetHeader>
        <div className="menu-scroll">
          <nav aria-label={t("Main navigation")}>
            <Accordion type="multiple" defaultValue={["services"]} className="main-menu-sections">
              <AccordionItem value="about">
                <AccordionTrigger><LocalizedText text={"About Sholok"} /></AccordionTrigger>
                <AccordionContent>
                  <div className="menu-destinations">
                    <Link
                      to="/info/$page"
                      params={{ page: "about" }}
                      onClick={() => onOpenChange(false)}
                    >
                      <LocalizedText text={"Introduction"} /> <ArrowUpRight className="size-4" />
                    </Link>
                    <Link
                      to="/info/$page"
                      params={{ page: "about" }}
                      hash="overview"
                      onClick={() => onOpenChange(false)}
                    >
                      <LocalizedText text={"Overview"} /> <ArrowUpRight className="size-4" />
                    </Link>
                    <Link
                      to="/info/$page"
                      params={{ page: "about" }}
                      hash="purpose"
                      onClick={() => onOpenChange(false)}
                    >
                      <LocalizedText text={"Our purpose"} /> <ArrowUpRight className="size-4" />
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="services">
                <AccordionTrigger><LocalizedText text={"Services"} /></AccordionTrigger>
                <AccordionContent>
                  <label className="menu-search">
                    <Search className="size-4 shrink-0" />
                    <input
                      aria-label={t("Find a service in menu")}
                      placeholder={t("Find a service…")}
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                  </label>
                  <nav aria-label={t("All SHOLOK services")}>
                    {[...new Set(services.map((service) => service.category))].map((category) => {
                      const group = filtered.filter((service) => service.category === category);
                      if (!group.length) return null;
                      return (
                        <section className="menu-group" key={category}>
                          <h2><LocalizedText text={category} /></h2>
                          <div className="menu-service-grid">
                            {group.map((service) => (
                              <Link
                                key={service.slug}
                                to="/service/$slug"
                                params={{ slug: service.slug }}
                                onClick={() => onOpenChange(false)}
                              >
                                <span className="service-icon" data-service={service.slug}>
                                  <service.icon />
                                </span>
                                <span className="min-w-0"><LocalizedText text={service.name} /></span>
                                <ArrowUpRight className="size-3 shrink-0 menu-arrow" />
                              </Link>
                            ))}
                          </div>
                        </section>
                      );
                    })}
                    {!filtered.length && (
                      <p className="py-8 text-sm text-muted-foreground">
                        <LocalizedText text={"No matching services."} />
                      </p>
                    )}
                  </nav>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="help">
                <AccordionTrigger><LocalizedText text={"Help"} /></AccordionTrigger>
                <AccordionContent>
                  <div className="menu-destinations">
                    {helpDestinations.map(({ title, page }) => (
                      <Link
                        key={page}
                        to="/info/$page"
                        params={{ page }}
                        onClick={() => onOpenChange(false)}
                      >
                        <LocalizedText text={title} /> <ArrowUpRight className="size-4" />
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </nav>
        </div>
        <Button asChild variant="outline" className="w-full shrink-0">
          <Link to="/services" onClick={() => onOpenChange(false)}>
            <LocalizedText text={"Explore all services "} />
            <ArrowUpRight />
          </Link>
        </Button>
      </SheetContent>
    </Sheet>
  );
}

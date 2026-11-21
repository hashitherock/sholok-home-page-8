import { useLanguage } from "@/lib/language";
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
    `${service.name} ${service.description} ${t(service.name)} ${t(service.description)}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="service-menu">
        <SheetHeader className="text-left">
          <SheetTitle>
            <span className="brand text-3xl">{t("SHOLOK")}</span>
          </SheetTitle>
          <SheetDescription>{t("Your everyday, connected.")}</SheetDescription>
        </SheetHeader>
        <div className="menu-scroll">
          <nav aria-label={t("Main navigation")}>
            <Accordion type="multiple" defaultValue={["services"]} className="main-menu-sections">
              <AccordionItem value="about">
                <AccordionTrigger>{t("About Sholok")}</AccordionTrigger>
                <AccordionContent>
                  <div className="menu-destinations">
                    <Link
                      to="/info/$page"
                      params={{ page: "about" }}
                      onClick={() => onOpenChange(false)}
                    >
                      {t("Introduction")} <ArrowUpRight className="size-4" />
                    </Link>
                    <Link
                      to="/info/$page"
                      params={{ page: "about" }}
                      hash="overview"
                      onClick={() => onOpenChange(false)}
                    >
                      {t("Overview")} <ArrowUpRight className="size-4" />
                    </Link>
                    <Link
                      to="/info/$page"
                      params={{ page: "about" }}
                      hash="purpose"
                      onClick={() => onOpenChange(false)}
                    >
                      {t("Our purpose")} <ArrowUpRight className="size-4" />
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="services">
                <AccordionTrigger>{t("Services")}</AccordionTrigger>
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
                          <h2>{t(category)}</h2>
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
                                <span className="min-w-0">{t(service.name)}</span>
                                <ArrowUpRight className="size-3 shrink-0 menu-arrow" />
                              </Link>
                            ))}
                          </div>
                        </section>
                      );
                    })}
                    {!filtered.length && (
                      <p className="py-8 text-sm text-muted-foreground">
                        {t("No matching services.")}
                      </p>
                    )}
                  </nav>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="help">
                <AccordionTrigger>{t("Help")}</AccordionTrigger>
                <AccordionContent>
                  <div className="menu-destinations">
                    {helpDestinations.map(({ title, page }) => (
                      <Link
                        key={page}
                        to="/info/$page"
                        params={{ page }}
                        onClick={() => onOpenChange(false)}
                      >
                        {t(title)} <ArrowUpRight className="size-4" />
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
            {t("Explore all services ")}
            <ArrowUpRight />
          </Link>
        </Button>
      </SheetContent>
    </Sheet>
  );
}

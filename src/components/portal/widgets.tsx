import { LocalizedText, useLanguage } from "@/lib/language";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Sun,
  CloudSun,
  Cloud,
  MapPin,
  ArrowUpRight,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  LockKeyhole,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AccountDialog } from "./shell";
import { SectionHeading } from "./content";
import { images, money } from "@/lib/portal-data";
import { useLocalDemo } from "@/hooks/use-local-demo";
export function LoginWidget() {
  const { t } = useLanguage();
  const [mode, setMode] = useState("");
  const [user] = useLocalDemo("sholok-user", "");
  return (
    <section className="panel account-panel">
      <p><LocalizedText text={user ? `Welcome back, ${user}` : "A little more you. A lot more possibilities."} /></p>
      <Button className="login" onClick={() => setMode("Sign In")}>
        <LockKeyhole className="size-3" />
        <span className="brand text-primary-foreground text-base"><LocalizedText text={"SHOLOK"} /></span>{" "}
        <LocalizedText text={user ? "My Account" : "Sign in"} />
      </Button>
      <div className="account-links">
        {["Find ID", "Forgot Password", "Create Account"].map((m) => (
          <Button key={m} variant="ghost" onClick={() => setMode(m)}>
            <LocalizedText text={m} />
          </Button>
        ))}
      </div>
      <p className="demo-tag mt-3 mb-0"><LocalizedText text={"Sign in to sync your saved items and notes"} /></p>
      <AccountDialog
        key={mode}
        initial={mode || "Sign In"}
        open={!!mode}
        onClose={() => setMode("")}
      />
    </section>
  );
}
export function Promotion() {
  const { t } = useLanguage();
  return (
    <section className="panel promo-panel">
      <img
        src={images.essentials}
        alt={t("Thoughtful everyday essentials")}
        width={1536}
        height={1024}
      />
      <div className="promo-copy">
        <span className="eyebrow"><LocalizedText text={"THE EVERYDAY EDIT"} /></span>
        <h2>
          <LocalizedText text={"Little things."} />
          <br />
          <LocalizedText text={"Better living."} />
        </h2>
        <p><LocalizedText text={"Thoughtfully picked. Just for you."} /></p>
        <Link
          to="/service/$slug"
          params={{ slug: "shopping" }}
          className="text-[11px] font-bold inline-flex items-center gap-1"
        >
          <LocalizedText text={"Explore the collection "} />
          <ArrowUpRight className="size-3" />
        </Link>
      </div>
      <span className="absolute right-2 bottom-2 text-[8px] bg-card/80 px-1 text-muted-foreground">
        <LocalizedText text={"Sponsored"} />
      </span>
    </section>
  );
}
export function FeaturedProduct() {
  const { t } = useLanguage();
  return (
    <section className="panel">
      <SectionHeading title="Today’s good find">
        <span className="text-[9px] text-destructive font-semibold"><LocalizedText text={"30% OFF"} /></span>
      </SectionHeading>
      <div className="sidebar-product">
        <img
          src={images.headphones}
          alt={t("Studio Wireless Headphones")}
          loading="lazy"
          width={1024}
          height={1024}
        />
        <div>
          <span className="text-[9px] text-muted-foreground"><LocalizedText text={"SOUND, REIMAGINED"} /></span>
          <h3>
            <LocalizedText text={"Studio Wireless"} />
            <br />
            <LocalizedText text={"Headphones"} />
          </h3>
          <p className="price">
            {money(3490)}{" "}
            <span className="text-[10px] text-muted-foreground font-normal line-through">
              ৳4,990
            </span>
          </p>
          <Button asChild variant="link" className="h-auto p-0 mt-2 text-[11px]">
            <Link to="/service/$slug" params={{ slug: "shopping" }}>
              <LocalizedText text={"Shop now "} />
              <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
export function Weather() {
  const { t } = useLanguage();
  return (
    <section className="panel">
      <SectionHeading title="Weather">
        <span className="text-[10px] text-muted-foreground">
          <MapPin className="inline size-3" />
          <LocalizedText text={" Dhaka"} />
        </span>
      </SectionHeading>
      <div className="weather-main">
        <CloudSun />
        <div>
          <span className="weather-temp">28°</span>
          <p>
            <LocalizedText text={"Mostly sunny "} />
            <span className="ml-3 text-muted-foreground">31° / 24°</span>
          </p>
        </div>
      </div>
      <div className="weather-extra">
        <span>
          <LocalizedText text={"Humidity "} />
          <strong className="text-foreground">64%</strong>
        </span>
        <span>
          <LocalizedText text={"Wind "} />
          <strong className="text-foreground"><LocalizedText text={"12 km/h"} /></strong>
        </span>
        <span className="text-success"><LocalizedText text={"Air: Good"} /></span>
      </div>
      <div className="forecast">
        {["Now", "12 PM", "3 PM", "6 PM", "9 PM"].map((label, i) => (
          <div key={label}>
            <span className="text-muted-foreground"><LocalizedText text={label} /></span>
            {i === 4 ? <Cloud /> : i === 2 ? <CloudSun /> : <Sun />}
            <strong>{[28, 30, 31, 27, 25][i]}°</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
export function Finance() {
  const { t } = useLanguage();
  return (
    <section className="panel">
      <SectionHeading title="Market at a glance">
        <span className="demo-tag"><LocalizedText text={"Updated 15:00 BST"} /></span>
      </SectionHeading>
      <div className="market">
        <p className="text-[10px] text-muted-foreground mb-2"><LocalizedText text={"SHOLOK COMPOSITE INDEX"} /></p>
        <strong>5,248.62</strong>
        <span className="change">↗ 42.18 (+0.81%)</span>
        <svg
          className="market-chart"
          viewBox="0 0 300 65"
          preserveAspectRatio="none"
          aria-label={t("DSEX index trend today")}
        >
          <path
            d="M0 52 L15 45 L28 48 L40 33 L55 40 L68 24 L78 35 L95 30 L106 43 L120 30 L132 38 L145 25 L159 29 L171 20 L185 22 L194 12 L209 19 L223 12 L233 17 L245 9 L257 15 L272 6 L289 10 L300 2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        {[
          ["NovaTech", "৳142.50", "+1.24%"],
          ["Green Energy", "৳86.20", "+0.68%"],
        ].map(([name, value, change]) => (
          <div className="stock-row" key={name}>
            <span>{name}</span>
            <span>{value}</span>
            <span className="text-success">{change}</span>
          </div>
        ))}
        <Link
          to="/service/$slug"
          params={{ slug: "finance" }}
          className="text-[10px] text-primary block pt-3"
        >
          <LocalizedText text={"Explore market insights "} />
          <ArrowUpRight className="inline size-3" />
        </Link>
      </div>
    </section>
  );
}
export function Calendar() {
  const { t, language } = useLanguage();
  const [month, setMonth] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );
  const [selected, setSelected] = useState(new Date().getDate());
  const [notes, setNotes] = useLocalDemo<{ id: number; text: string }[]>("sholok-notes", []);
  const [text, setText] = useState("");
  const [edit, setEdit] = useState<number | null>(null);
  const [recent] = useLocalDemo<string[]>("sholok-recent-services", []);
  const start = month.getDay(),
    days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const today = new Date();
  return (
    <section className="panel">
      <SectionHeading title="Your widget board">
        <span className="text-[10px] text-primary"><LocalizedText text={"A little organized"} /></span>
      </SectionHeading>
      <div className="widget-board">
        <div className="calendar-title">
          <strong>
            <LocalizedText text={month.toLocaleDateString("en-US", { month: "long", year: "numeric" })} bengaliText={month.toLocaleDateString("bn-BD", { month: "long", year: "numeric" })} />
          </strong>
          <div className="flex">
            <Button
              variant="ghost"
              className="size-6"
              size="icon"
              aria-label={t("Previous month")}
              onClick={() => {
                setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1));
                setSelected(0);
              }}
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="ghost"
              className="size-6"
              size="icon"
              aria-label={t("Next month")}
              onClick={() => {
                setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1));
                setSelected(0);
              }}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
        <div className="calendar-grid">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <span key={i}><LocalizedText text={d} bengaliText={["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহ", "শুক্র", "শনি"][i] ?? d} /></span>
          ))}
          {Array.from({ length: start }, (_, i) => (
            <span key={`blank${i}`} />
          ))}
          {Array.from({ length: days }, (_, i) => {
            const day = i + 1,
              isToday =
                day === today.getDate() &&
                month.getMonth() === today.getMonth() &&
                month.getFullYear() === today.getFullYear();
            return (
              <Button
                variant={selected === day ? "default" : isToday ? "secondary" : "ghost"}
                key={day}
                aria-label={t(
                  `Select ${month.toLocaleDateString(language === "bn" ? "bn-BD" : "en-US", { month: "long" })} ${day}`,
                )}
                aria-pressed={selected === day}
                onClick={() => setSelected(day)}
              >
                {day}
              </Button>
            );
          })}
        </div>
        <div className="notes-area">
          <h3 className="text-xs font-semibold mb-3">
            <LocalizedText text={"Quick notes "} />
            <span className="text-[9px] text-muted-foreground font-normal ml-2">
              <LocalizedText text={"Saved on this device"} />
            </span>
          </h3>
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!text.trim()) return;
              setNotes(
                edit === null
                  ? [...notes, { id: Date.now(), text: text.trim() }]
                  : notes.map((n) => (n.id === edit ? { ...n, text: text.trim() } : n)),
              );
              setText("");
              setEdit(null);
            }}
          >
            <input
              aria-label={t("Quick note")}
              placeholder={t(edit ? "Edit your note…" : "Something to remember…")}
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
            <Button
              variant="secondary"
              size="icon"
              type="submit"
              aria-label={t(edit ? "Save edited note" : "Add note")}
            >
              <Plus />
            </Button>
          </form>
          {notes.map((n) => (
            <div className="note-row" key={n.id}>
              <span className="min-w-0 break-words">{n.text}</span>
              <div className="flex shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-6"
                  aria-label={t("Edit note")}
                  onClick={() => {
                    setEdit(n.id);
                    setText(n.text);
                  }}
                >
                  <Pencil className="size-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-6"
                  aria-label={t("Delete note")}
                  onClick={() => setNotes(notes.filter((x) => x.id !== n.id))}
                >
                  <Trash2 className="size-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="notes-area">
          <h3 className="text-xs font-semibold mb-3"><LocalizedText text={"Quick links"} /></h3>
          <div className="flex flex-wrap gap-3">
            {(recent.length ? recent : ["cafe", "shopping", "news"]).slice(0, 4).map((s) => (
              <Link
                key={s}
                to="/service/$slug"
                params={{ slug: s }}
                className="text-[11px] capitalize text-primary"
              >
                {s} <ArrowUpRight className="inline size-3" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export function Shipping() {
  const { t } = useLanguage();
  return (
    <section className="panel">
      <div className="flex items-center gap-4 p-5 bg-secondary">
        <img
          src={images.essentials}
          alt={t("Everyday essentials")}
          width={70}
          height={70}
          className="size-16 object-cover rounded-md"
          loading="lazy"
        />
        <div>
          <span className="text-[9px] text-primary"><LocalizedText text={"WEEKEND SPECIAL · SPONSORED"} /></span>
          <h3 className="text-sm font-semibold my-1"><LocalizedText text={"A little treat. On us."} /></h3>
          <p className="text-[10px] text-muted-foreground">
            <LocalizedText text={"Free shipping on orders over ৳1,500."} />
          </p>
          <Link
            to="/service/$slug"
            params={{ slug: "shopping" }}
            className="text-[10px] text-primary"
          >
            <LocalizedText text={"Find your favorite →"} />
          </Link>
        </div>
      </div>
    </section>
  );
}

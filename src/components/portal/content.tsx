import { LocalizedText, useLanguage } from "@/lib/language";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Heart,
  Star,
  Play,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  stories,
  images,
  products,
  money,
  getProductPage,
  newsCategories,
  getNewsArticles,
  type NewsCategory,
  type Product,
} from "@/lib/portal-data";
import { useLocalDemo } from "@/hooks/use-local-demo";
export function SectionHeading({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  const { t } = useLanguage();
  return (
    <div className="panel-heading">
      <h2>
        <LocalizedText text={title} /> {subtitle && <span className="caption ml-2"><LocalizedText text={subtitle} /></span>}
      </h2>
      {children}
    </div>
  );
}
export function Pager({
  onPrev,
  onNext,
  label,
}: {
  onPrev: () => void;
  onNext: () => void;
  label?: string;
}) {
  const { t } = useLanguage();
  return (
    <div className="flex items-center gap-1">
      <Button
        size="icon"
        variant="ghost"
        className="size-6"
        title={t("Previous")}
        aria-label={t("Previous")}
        onClick={onPrev}
      >
        <ChevronLeft />
      </Button>
      {label && <span className="text-xs text-muted-foreground">{label}</span>}
      <Button
        size="icon"
        variant="ghost"
        className="size-6"
        title={t("Next")}
        aria-label={t("Next")}
        onClick={onNext}
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
export function FeaturedNews() {
  const { t, language } = useLanguage();
  const [tab, setTab] = useState<NewsCategory>("National");
  const [reading, setReading] = useState<ReturnType<typeof getNewsArticles>[number] | null>(null);
  const selected = getNewsArticles(tab);
  const headline = (story: (typeof selected)[number]) => language === "bn" ? story.titleBn : story.title;
  return (
    <section className="panel news-panel" aria-label={t("Featured news")}>
      <div className="tabs-line news-categories" role="group" aria-label={t("News")}>
        {newsCategories.map((label) => (
          <Button
            key={label}
            variant="tab"
            data-active={tab === label}
            aria-pressed={tab === label}
            onClick={() => setTab(label)}
          >
            <LocalizedText text={label} />
          </Button>
        ))}
      </div>
      <div className="news-grid">
        {selected.map((story, i) => (
          <article key={story.id} className={`news-tile ${i === 0 ? "news-lead" : ""}`}>
            <Button variant="ghost" className="news-story" onClick={() => setReading(story)}>
              <img src={story.image} alt={headline(story)} width={1536} height={1024} />
              <div className="news-tile-copy">
                <span className="news-category">
                  <LocalizedText text={story.category} />
                </span>
                <h2><LocalizedText text={story.title} bengaliText={story.titleBn} /></h2>
                {i === 0 && <p className="news-summary"><LocalizedText text={story.description} bengaliText={story.descriptionBn} /></p>}
                <p>
                  <LocalizedText text={story.time} bengaliText={story.timeBn} />
                </p>
              </div>
            </Button>
          </article>
        ))}
      </div>
      <Dialog open={reading !== null} onOpenChange={(open) => { if (!open) setReading(null); }}>
        <DialogContent className="max-w-2xl">
          <DialogTitle>{reading ? <LocalizedText text={reading.title} bengaliText={reading.titleBn} /> : <LocalizedText text="News" />}</DialogTitle>
          <DialogDescription>{reading ? <><LocalizedText text={reading.category} /> · <LocalizedText text={reading.time} bengaliText={reading.timeBn} /></> : <LocalizedText text="Read article" />}</DialogDescription>
          {reading && (
            <div className="dialog-body">
              <img className="w-full aspect-video object-cover rounded-md" src={reading.image} alt={headline(reading)} />
              <p className="mt-5 text-sm leading-7 text-foreground"><LocalizedText text={reading.description} bengaliText={reading.descriptionBn} /></p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
export function ProductCard({
  product,
  onOpen,
}: {
  product: Product;
  onOpen: (p: Product) => void;
}) {
  const { t } = useLanguage();
  const [saved, setSaved] = useLocalDemo<number[]>("sholok-saved", []);
  const active = saved.includes(product.id);
  return (
    <article className="product-card">
      <div className="product-image">
        <a
          href="#product"
          onClick={(e) => {
            e.preventDefault();
            onOpen(product);
          }}
        >
          <img
            src={product.image}
            alt={t(product.name)}
            loading="lazy"
            width={1024}
            height={1024}
          />
        </a>
        <span className="discount">
          {product.discount}
          <LocalizedText text={"% OFF"} />
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="save"
          aria-label={t(`${active ? "Remove" : "Save"} ${product.name}`)}
          title={t(active ? "Remove from wishlist" : "Save to wishlist")}
          onClick={() =>
            setSaved(active ? saved.filter((id) => id !== product.id) : [...saved, product.id])
          }
        >
          <Heart
            className={active ? "fill-destructive text-destructive" : "text-muted-foreground"}
          />
        </Button>
      </div>
      <a
        href="#product"
        onClick={(e) => {
          e.preventDefault();
          onOpen(product);
        }}
      >
        <h3><LocalizedText text={product.name} /></h3>
      </a>
      <span className="price">{money(product.price)}</span>
      <span className="old-price">{money(product.original)}</span>
      <div className="rating">
        <Star className="size-3 fill-destructive text-destructive" /> {product.rating}{" "}
        <span>({product.reviews})</span>
      </div>
    </article>
  );
}
export function Shopping({ full = false }: { full?: boolean }) {
  const { t } = useLanguage();
  const [tab, setTab] = useState("Category Picks");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Recommended");
  const [page, setPage] = useState(0);
  const [more, setMore] = useState(full);
  const [selected, setSelected] = useState<Product | null>(null);
  const [cart, setCart] = useState(false);
  const [saved] = useLocalDemo<number[]>("sholok-saved", []);
  let filtered = products.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      (tab !== "Benefits" || p.discount >= 28) &&
      (tab !== "Saved" || saved.includes(p.id)),
  );
  filtered = [...filtered].sort((a, b) =>
    sort === "Price: low to high"
      ? a.price - b.price
      : sort === "Top rated"
        ? b.rating - a.rating
        : tab === "Trending Now"
          ? b.reviews - a.reviews
          : 0,
  );
  const shown = more ? filtered : getProductPage(filtered, page);
  const pageCount = Math.max(1, Math.ceil(filtered.length / 4));
  return (
    <section className="panel" aria-label={t("Shopping products")}>
      <div className="tabs-line">
        {[
          "Category Picks",
          "Trending Now",
          "Shopping",
          "Benefits",
          "Shopping Live",
          ...(full ? ["Saved"] : []),
        ].map((label) => (
          <Button
            key={label}
            variant="tab"
            data-active={tab === label}
            onClick={() => {
              setTab(label);
              setPage(0);
            }}
          >
            <LocalizedText text={label} />
          </Button>
        ))}
      </div>
      <div className="filter-line">
        {["All", "Electronics", "Fashion", "Home & Living"].map((c) => (
          <Button
            key={c}
            variant={category === c ? "secondary" : "ghost"}
            size="sm"
            onClick={() => {
              setCategory(c);
              setPage(0);
            }}
          >
            <LocalizedText text={c} />
          </Button>
        ))}
        <select
          aria-label={t("Sort products")}
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="Recommended">{t("Recommended")}</option>
          <option value="Price: low to high">{t("Price: low to high")}</option>
          <option value="Top rated">{t("Top rated")}</option>
        </select>
      </div>
      {tab === "Shopping Live" && (
        <p className="mx-5 mb-4 text-xs text-primary">
          <LocalizedText text={"Next live showcase: Everyday essentials · Saturday, 6 PM"} />
        </p>
      )}
      <div className="product-grid">
        {shown.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onOpen={(p) => {
              setSelected(p);
              setCart(false);
            }}
          />
        ))}
      </div>
      {!shown.length && (
        <p className="p-5 text-sm text-muted-foreground">
          <LocalizedText text={"Your collection is empty. Save a product to see it here."} />
        </p>
      )}
      <div className="section-foot">
        <span className="text-primary font-semibold"><LocalizedText text={"Discover your next favorite"} /></span>
        <Pager
          onPrev={() => setPage((page + pageCount - 1) % pageCount)}
          onNext={() => setPage((page + 1) % pageCount)}
          label={`${page + 1} / ${pageCount}`}
        />
        <Button variant="link" size="sm" className="text-[10px]" onClick={() => setMore(!more)}>
          <LocalizedText text={more ? "Show less" : "View more"} />
        </Button>
      </div>
      <Dialog
        open={!!selected}
        onOpenChange={(v) => {
          if (!v) setSelected(null);
        }}
      >
        <DialogContent>
          <DialogTitle><LocalizedText text={selected?.name ?? ""} /></DialogTitle>
          <DialogDescription><LocalizedText text={"SHOLOK Shopping · Ships within 2–3 days"} /></DialogDescription>
          {selected && (
            <>
              <img
                src={selected.image}
                alt={t(selected.name)}
                className="w-full h-52 object-cover rounded-md"
              />
              <p className="text-xl font-semibold">
                {money(selected.price)}{" "}
                <span className="text-sm text-muted-foreground line-through">
                  {money(selected.original)}
                </span>
              </p>
              <p className="text-sm text-muted-foreground">
                <LocalizedText text={"Thoughtfully selected for your everyday. Rated "} />
                {selected.rating}
                <LocalizedText text={" by "} />
                {selected.reviews}
                <LocalizedText text={" verified buyers."} />
              </p>
              <Button onClick={() => setCart(true)}>
                <LocalizedText text={cart ? "Added to bag ✓" : "Add to bag"} />
              </Button>
              {cart && (
                <p role="status" className="text-xs text-muted-foreground">
                  <LocalizedText text={"Item added. Review your bag before checkout."} />
                </p>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
export function Discovery() {
  const { t } = useLanguage();
  const [category, setCategory] = useState("For You");
  const [more, setMore] = useState(false);
  const selected =
    category === "For You" ? stories : stories.filter((s) => s.category === category);
  return (
    <section className="panel">
      <SectionHeading title="Discover something good">
        <span className="text-[10px] text-primary"><LocalizedText text={"Curated for your everyday"} /></span>
      </SectionHeading>
      <div className="tabs-line mb-4">
        {[
          "For You",
          "Technology",
          "News",
          "Webtoon",
          "Fashion & Beauty",
          "Living",
          "Food",
          "Books",
          "Knowledge",
          "Health",
          "Home & Lifestyle",
        ].map((c) => (
          <Button variant="tab" key={c} data-active={category === c} onClick={() => setCategory(c)}>
            <LocalizedText text={c} />
          </Button>
        ))}
      </div>
      <div className="discovery-grid">
        {selected.slice(0, more ? 10 : 6).map((s) => (
          <article className="article-card" key={s.id}>
            <Link
              to="/service/$slug"
              params={{ slug: s.category === "Technology" ? "knowledge" : "blog" }}
            >
              <img src={s.image} alt={t(s.title)} width={1536} height={1024} loading="lazy" />
              <span className="category"><LocalizedText text={s.category} /></span>
              <h3><LocalizedText text={s.title} /></h3>
              <span className="source">
                <LocalizedText text={s.source} /> · <LocalizedText text={s.time} />
              </span>
            </Link>
          </article>
        ))}
      </div>
      <div className="section-foot">
        <Button variant="ghost" size="sm" onClick={() => setMore(!more)}>
          <LocalizedText text={more ? "Show Less" : "Expand More"} />
          <ChevronDown className={more ? "rotate-180" : ""} />
        </Button>
      </div>
    </section>
  );
}
export function Sponsored() {
  const { t } = useLanguage();
  return (
    <section className="panel">
      <SectionHeading
        title="Small actions. Real possibilities."
        subtitle="Together, we do more"
      />
      <div className="discovery-grid">
        {[
          {
            title: "A greener tomorrow starts with us",
            image: images.city,
            source: "Community initiative",
          },
          {
            title: "Give your everyday a fresh start",
            image: images.essentials,
            source: "The Everyday Project",
          },
          {
            title: "Help create a place to belong",
            image: images.living,
            source: "Homes for Hope",
          },
        ].map((s) => (
          <article className="article-card" key={s.title}>
            <Link to="/info/$page" params={{ page: "community-initiatives" }}>
              <img src={s.image} alt={t(s.title)} loading="lazy" width={1536} height={1024} />
              <span className="category"><LocalizedText text={"Sponsored"} /></span>
              <h3><LocalizedText text={s.title} /></h3>
              <span className="source"><LocalizedText text={s.source} /></span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
export function Videos() {
  const { t } = useLanguage();
  const [video, setVideo] = useState("");
  const [playing, setPlaying] = useState(false);
  return (
    <section className="panel">
      <SectionHeading title="Worth a little of your time">
        <Link to="/service/$slug" params={{ slug: "tv" }} className="heading-link">
          <LocalizedText text={"More videos "} />
          <ArrowUpRight className="inline size-3" />
        </Link>
      </SectionHeading>
      <div className="discovery-grid">
        {stories.slice(0, 3).map((s, i) => (
          <article className="article-card" key={s.id}>
            <div className="relative">
              <img src={s.image} alt={t(s.title)} width={1536} height={1024} loading="lazy" />
              <Button
                aria-label={t(`Preview ${s.title}`)}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                size="icon"
                onClick={() => {
                  setVideo(s.title);
                  setPlaying(false);
                }}
              >
                <Play />
              </Button>
              <span className="absolute right-2 bottom-2 text-[9px] px-1 bg-foreground/80 text-primary-foreground">
                0{3 + i}:24
              </span>
            </div>
            <h3><LocalizedText text={s.title} /></h3>
            <span className="source"><LocalizedText text={"SHOLOK Originals"} /></span>
          </article>
        ))}
      </div>
      <Dialog
        open={!!video}
        onOpenChange={(v) => {
          if (!v) setVideo("");
        }}
      >
        <DialogContent>
          <DialogTitle><LocalizedText text={video} /></DialogTitle>
          <DialogDescription><LocalizedText text={"SHOLOK TV · Editor’s pick"} /></DialogDescription>
          <div className="relative">
            <img
              src={images.city}
              alt={t("Video preview")}
              className="w-full h-52 object-cover rounded-md"
            />
            <Button
              className="absolute inset-0 m-auto rounded-full"
              size="icon"
              aria-label={t(playing ? "Pause preview" : "Play preview")}
              onClick={() => setPlaying(!playing)}
            >
              {playing ? "Ⅱ" : <Play />}
            </Button>
          </div>
          <p role="status" className="text-sm text-primary">
            <LocalizedText text={playing ? "Preview playing · Enjoy a moment of inspiration." : "Preview paused"} />
          </p>
        </DialogContent>
      </Dialog>
    </section>
  );
}

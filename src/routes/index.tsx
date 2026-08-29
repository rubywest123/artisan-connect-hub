import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Camera,
  Mic,
  Sparkles,
  Handshake,
  IndianRupee,
  Store,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { IMAGES, PRODUCTS } from "@/data/mock";
import { DemoTag, FadeIn, ProductCard, SectionTitle } from "@/components/karigar/bits";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KarigarSetu — Sell your craft with AI, in your language" },
      {
        name: "description",
        content:
          "A demo prototype where Indian artisans turn one phone photo and a voice note into a professional listing, fair price, and matched buyers.",
      },
      { property: "og:title", content: "KarigarSetu — Sell your craft with AI" },
      {
        property: "og:description",
        content: "Photo to listing to buyer, powered by AI. Built for Indian artisans.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Landing,
});

const STEPS = [
  { icon: Camera, title: "Click one photo", text: "AI cleans the background, fixes light and makes it catalog-ready." },
  { icon: Mic, title: "Speak your story", text: "Talk in Marathi, Hindi, Tamil — AI writes the listing for you." },
  { icon: IndianRupee, title: "Get a fair price", text: "Live market bands so you never undersell your work again." },
  { icon: Handshake, title: "Meet real buyers", text: "Retailers, hotels, exporters matched to your craft and capacity." },
];

function Landing() {
  const featured = PRODUCTS.filter((p) => p.trending).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-card/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-warm font-display text-lg font-bold text-primary-foreground">
            क
          </span>
          <span className="font-display text-lg font-semibold">KarigarSetu</span>
          <DemoTag className="hidden sm:inline-flex" label="Prototype" />
          <div className="ml-auto flex items-center gap-2">
            <Link to="/marketplace">
              <Button variant="ghost">Marketplace</Button>
            </Link>
            <Link to="/onboarding">
              <Button>Start free</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="block-print border-b border-border/60">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:py-20">
          <FadeIn>
            <DemoTag label="AI for Bharat's karigars" />
            <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
              Your craft deserves a better price than the middleman gives.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              KarigarSetu turns one phone photo and a voice note into a professional listing, a fair
              price, and a shortlist of buyers who actually want what you make.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/onboarding">
                <Button size="lg">
                  I am an artisan <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link to="/marketplace">
                <Button size="lg" variant="secondary">
                  I want to buy crafts
                </Button>
              </Link>
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="size-4 text-leaf" /> Works on any smartphone · 8 Indian languages ·
              No commission in this demo
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="relative overflow-hidden rounded-4xl border border-border/70 shadow-lift">
              <img
                src={IMAGES.hero}
                alt="An Indian artisan weaving a bamboo basket by hand"
                className="aspect-[4/3] w-full object-cover"
              />
              <Card className="absolute bottom-4 left-4 right-4 gap-1 bg-card/95 p-4 backdrop-blur">
                <p className="text-sm text-muted-foreground">AI suggested price</p>
                <p className="font-display text-2xl font-semibold">₹899 retail · ₹648 wholesale</p>
                <p className="text-xs text-leaf">+18% above what she charged last month</p>
              </Card>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionTitle title="Four steps, five minutes" subtitle="No typing, no computer, no English needed." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.06}>
              <Card className="h-full gap-2 p-5">
                <span className="grid size-11 place-items-center rounded-2xl bg-accent text-accent-foreground">
                  <s.icon className="size-5" />
                </span>
                <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.text}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="craft-weave border-y border-border/60">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-12 sm:grid-cols-3">
          {[
            ["7 million+", "artisans in India selling below fair value"],
            ["2.3x", "more enquiries after AI photos and stories (demo data)"],
            ["8 languages", "voice input built for low-literacy users"],
          ].map(([big, small]) => (
            <Card key={big} className="gap-1 bg-card/90 p-6 text-center">
              <p className="font-display text-3xl font-semibold text-primary">{big}</p>
              <p className="text-sm text-muted-foreground">{small}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionTitle
          title="Trending handmade"
          subtitle="Straight from artisan workshops across India."
          action={
            <Link to="/marketplace">
              <Button variant="ghost">
                See all <ArrowRight className="size-4" />
              </Button>
            </Link>
          }
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <Card className="items-center gap-3 bg-gradient-dusk p-10 text-center text-primary-foreground">
          <Store className="size-8" />
          <h2 className="font-display text-3xl font-semibold">Open your digital stall today</h2>
          <p className="max-w-xl text-primary-foreground/85">
            Your own shop link to share on WhatsApp — with your story, your photos and your prices.
          </p>
          <Link to="/onboarding">
            <Button size="lg" variant="secondary">
              Start free <Sparkles className="size-4" />
            </Button>
          </Link>
        </Card>
      </section>

      <footer className="border-t border-border/60 py-8 text-center text-sm text-muted-foreground">
        KarigarSetu · A frontend prototype. All AI results and data are simulated for demo purposes.
      </footer>
    </div>
  );
}

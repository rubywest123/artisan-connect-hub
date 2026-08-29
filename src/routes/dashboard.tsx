import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Eye,
  IndianRupee,
  Package,
  Handshake,
  PlusCircle,
  Sparkles,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { AppShell } from "@/components/karigar/AppShell";
import { DemoTag, FadeIn, ProductCard, SectionTitle, StatTile } from "@/components/karigar/bits";
import { BUYERS, NOTIFICATIONS, OPPORTUNITIES, PRODUCTS, REVENUE_SERIES } from "@/data/mock";
import { useApp, useMyCatalog } from "@/lib/app-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — KarigarSetu" },
      {
        name: "description",
        content: "Your daily view of views, orders, buyer matches and AI suggestions.",
      },
      { property: "og:title", content: "Dashboard — KarigarSetu" },
      { property: "og:description", content: "Views, orders, buyer matches and AI suggestions." },
      { property: "og:url", content: "/dashboard" },
    ],
    links: [{ rel: "canonical", href: "/dashboard" }],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { mode, profile } = useApp();
  const catalog = useMyCatalog();
  const last = REVENUE_SERIES[REVENUE_SERIES.length - 1]!;

  if (mode === "buyer") {
    return (
      <AppShell title="Buyer home">
        <FadeIn>
          <Card className="mb-6 gap-2 bg-gradient-dusk p-6 text-primary-foreground">
            <DemoTag className="bg-card/80" />
            <h1 className="font-display text-2xl font-semibold">Handmade, direct from the maker</h1>
            <p className="text-primary-foreground/85">
              Discover verified artisans, request bulk quotes and support craft clusters.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Link to="/marketplace">
                <Button variant="secondary">Browse marketplace</Button>
              </Link>
              <Link to="/recommendations">
                <Button variant="secondary">For you</Button>
              </Link>
            </div>
          </Card>
        </FadeIn>
        <SectionTitle title="Trending now" subtitle="Most viewed handmade pieces this week" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.filter((p) => p.trending)
            .slice(0, 8)
            .map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title="Artisan home">
      <FadeIn>
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div>
            <h1 className="font-display text-2xl font-semibold">
              Namaste, {profile.name.split(" ")[0]} 🙏
            </h1>
            <p className="text-sm text-muted-foreground">
              {profile.craft} artisan · {profile.village}, {profile.state}
            </p>
          </div>
          <Link to="/create" className="ml-auto">
            <Button size="lg">
              <PlusCircle className="size-5" /> Add new product
            </Button>
          </Link>
        </div>
      </FadeIn>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Views this month" value={last.views.toLocaleString("en-IN")} icon={<Eye className="size-4" />} hint="+34% vs last month" />
        <StatTile label="Orders" value={String(last.orders)} icon={<Package className="size-4" />} hint="+7 new this week" />
        <StatTile label="Revenue" value={`₹${last.revenue.toLocaleString("en-IN")}`} icon={<IndianRupee className="size-4" />} hint="Best month yet" />
        <StatTile label="Buyer matches" value={String(BUYERS.length)} icon={<Handshake className="size-4" />} hint="3 new today" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="gap-3 border-primary/30 bg-accent/40 p-5">
            <div className="flex items-center gap-2">
              <Sparkles className="size-5 text-primary" />
              <h2 className="font-display text-lg font-semibold">Today's AI suggestions</h2>
              <DemoTag className="ml-auto" label="Simulated AI" />
            </div>
            <ul className="space-y-2 text-sm">
              {[
                "Raise your fruit basket price to ₹949 — market average is ₹930.",
                "Heritage Home Stores viewed your catalog. Send them the 3-size set today.",
                "Add a story to 6 listings — story-led listings get 40% more enquiries.",
                "Diwali demand for bamboo lamps is up 18%. Make 2 new designs this week.",
              ].map((s) => (
                <li key={s} className="flex gap-2 rounded-xl bg-card p-3">
                  <TrendingUp className="mt-0.5 size-4 shrink-0 text-leaf" />
                  {s}
                </li>
              ))}
            </ul>
            <Link to="/studio">
              <Button variant="secondary" className="w-fit">
                Open AI Studio <ArrowRight className="size-4" />
              </Button>
            </Link>
          </Card>

          <div>
            <SectionTitle
              title="My catalog"
              subtitle={`${catalog.length} live products`}
              action={
                <Link to="/catalog">
                  <Button variant="ghost">See all</Button>
                </Link>
              }
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {catalog.slice(0, 3).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="gap-3 p-5">
            <h2 className="font-display text-lg font-semibold">Top buyer matches</h2>
            {BUYERS.slice(0, 3).map((b) => (
              <div key={b.id} className="rounded-xl border p-3">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{b.name}</p>
                  <Badge className="ml-auto bg-leaf text-leaf-foreground">{b.match}%</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {b.demand} · {b.quantity}
                </p>
              </div>
            ))}
            <Link to="/buyers">
              <Button variant="secondary" className="w-full">
                Find buyers
              </Button>
            </Link>
          </Card>

          <Card className="gap-3 p-5">
            <h2 className="font-display text-lg font-semibold">Live opportunities</h2>
            {OPPORTUNITIES.slice(0, 4).map((o) => (
              <div key={o.id} className="rounded-xl border p-3 text-sm">
                <p className="font-medium">{o.title}</p>
                <p className="text-xs text-muted-foreground">
                  {o.value} · closes {o.closes}
                </p>
              </div>
            ))}
          </Card>

          <Card className="gap-2 p-5">
            <h2 className="font-display text-lg font-semibold">Recent activity</h2>
            {NOTIFICATIONS.slice(0, 5).map((n) => (
              <p key={n.id} className="border-b py-2 text-sm last:border-0">
                {n.title}
                <span className="block text-xs text-muted-foreground">{n.time}</span>
              </p>
            ))}
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

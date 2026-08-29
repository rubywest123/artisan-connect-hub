import { Link, useRouterState } from "@tanstack/react-router";

const NavLink = Link as unknown as React.ComponentType<{
  to: string;
  className?: string;
  children?: ReactNode;
}>;
import {
  Home,
  Package,
  Sparkles,
  Handshake,
  BarChart3,
  Landmark,
  Megaphone,
  Store,
  MessageCircle,
  User,
  Heart,
  ShoppingCart,
  Bell,
  Settings2,
  PlusCircle,
  Users,
  Wand2,
  Compass,
} from "lucide-react";
import type { ReactNode } from "react";
import { NOTIFICATIONS } from "@/data/mock";
import { useApp } from "@/lib/app-store";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LANGUAGES } from "@/data/mock";
import { DemoTag } from "./bits";
import { Copilot } from "./Copilot";

type NavItem = { to: string; label: string; icon: ReactNode };

const artisanDesktop: NavItem[] = [
  { to: "/dashboard", label: "Home", icon: <Home className="size-5" /> },
  { to: "/catalog", label: "My Catalog", icon: <Package className="size-5" /> },
  { to: "/create", label: "Create Product", icon: <PlusCircle className="size-5" /> },
  { to: "/studio", label: "AI Studio", icon: <Wand2 className="size-5" /> },
  { to: "/buyers", label: "Find Buyers", icon: <Handshake className="size-5" /> },
  { to: "/schemes", label: "Schemes", icon: <Landmark className="size-5" /> },
  { to: "/analytics", label: "Analytics", icon: <BarChart3 className="size-5" /> },
  { to: "/marketing", label: "Marketing", icon: <Megaphone className="size-5" /> },
  { to: "/stall", label: "My Digital Stall", icon: <Store className="size-5" /> },
];

const artisanMobile: NavItem[] = [
  { to: "/dashboard", label: "Home", icon: <Home className="size-6" /> },
  { to: "/catalog", label: "Catalog", icon: <Package className="size-6" /> },
  { to: "/buyers", label: "Market", icon: <Handshake className="size-6" /> },
  { to: "/messages", label: "Messages", icon: <MessageCircle className="size-6" /> },
  { to: "/profile", label: "Profile", icon: <User className="size-6" /> },
];

const buyerNav: NavItem[] = [
  { to: "/dashboard", label: "Home", icon: <Home className="size-5" /> },
  { to: "/marketplace", label: "Marketplace", icon: <Compass className="size-5" /> },
  { to: "/artisans", label: "Artisans", icon: <Users className="size-5" /> },
  { to: "/recommendations", label: "For You", icon: <Sparkles className="size-5" /> },
  { to: "/wishlist", label: "Wishlist", icon: <Heart className="size-5" /> },
  { to: "/cart", label: "Cart", icon: <ShoppingCart className="size-5" /> },
  { to: "/messages", label: "Messages", icon: <MessageCircle className="size-5" /> },
];

export function AppShell({ children, title }: { children: ReactNode; title?: string }) {
  const { mode, setMode, cart, a11y, setA11y, uiLanguage, setUiLanguage } = useApp();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const desktopNav = mode === "artisan" ? artisanDesktop : buyerNav;
  const mobileNav = mode === "artisan" ? artisanMobile : buyerNav.slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-card/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-gradient-warm font-display text-lg font-bold text-primary-foreground">
              क
            </span>
            <span className="hidden font-display text-lg font-semibold sm:block">KarigarSetu</span>
          </Link>
          <DemoTag label="Demo Mode" className="hidden sm:inline-flex" />
          {title ? <span className="ml-2 truncate text-sm text-muted-foreground">{title}</span> : null}

          <div className="ml-auto flex items-center gap-1.5">
            <div className="hidden items-center rounded-full bg-secondary p-1 sm:flex">
              {(["artisan", "buyer"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm font-medium capitalize transition-colors",
                    mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                  )}
                >
                  {m} mode
                </button>
              ))}
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
                  <Bell className="size-5" />
                  <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-primary" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[92vw] sm:max-w-md">
                <SheetHeader>
                  <SheetTitle className="font-display">Notifications</SheetTitle>
                </SheetHeader>
                <div className="space-y-2 overflow-y-auto px-4 pb-8">
                  {NOTIFICATIONS.map((n) => (
                    <Card key={n.id} className="gap-1 p-3">
                      <p className="text-sm font-medium">{n.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {n.time} · {n.kind}
                      </p>
                    </Card>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Language and accessibility settings">
                  <Settings2 className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[92vw] sm:max-w-md">
                <SheetHeader>
                  <SheetTitle className="font-display">Language & Easy Use</SheetTitle>
                </SheetHeader>
                <div className="space-y-5 px-4 pb-8">
                  <div className="space-y-2">
                    <Label>App language</Label>
                    <Select value={uiLanguage} onValueChange={setUiLanguage}>
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {LANGUAGES.map((l) => (
                          <SelectItem key={l.code} value={l.english}>
                            {l.label} · {l.english}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Demo: labels stay in English, voice input follows your language.
                    </p>
                  </div>
                  {(
                    [
                      ["largeText", "Large text"],
                      ["contrast", "High contrast"],
                      ["reduceMotion", "Reduce motion"],
                    ] as const
                  ).map(([key, label]) => (
                    <div key={key} className="flex items-center justify-between rounded-xl border p-4">
                      <Label htmlFor={key} className="text-base">
                        {label}
                      </Label>
                      <Switch id={key} checked={a11y[key]} onCheckedChange={(v) => setA11y(key, v)} />
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            {mode === "buyer" ? (
              <Link to="/cart">
                <Button variant="ghost" size="icon" aria-label="Cart" className="relative">
                  <ShoppingCart className="size-5" />
                  {cart.length ? (
                    <Badge className="absolute -right-0.5 -top-0.5 size-5 justify-center rounded-full p-0 text-[10px]">
                      {cart.length}
                    </Badge>
                  ) : null}
                </Button>
              </Link>
            ) : null}
          </div>
        </div>
        <div className="flex items-center justify-center gap-1 border-t border-border/60 py-1.5 sm:hidden">
          {(["artisan", "buyer"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium capitalize",
                mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground",
              )}
            >
              {m} mode
            </button>
          ))}
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-border/70 bg-sidebar p-3 lg:block">
          <nav className="space-y-1">
            {desktopNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors",
                  pathname === item.to
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent/60",
                )}
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 px-4 pb-28 pt-5 lg:px-8 lg:pb-12">{children}</main>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/70 bg-card/95 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-lg items-stretch">
          {mobileNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium",
                pathname === item.to ? "text-primary" : "text-muted-foreground",
              )}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <Copilot />
    </div>
  );
}

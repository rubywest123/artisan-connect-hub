import { motion } from "motion/react";
import { Mic, Loader2, Sparkles, Volume2, Heart, Star, MapPin } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { artisanOf, type Product } from "@/data/mock";
import { useApp } from "@/lib/app-store";

export function DemoTag({ className, label = "Demo" }: { className?: string; label?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-saffron/25 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-saffron-foreground",
        className,
      )}
    >
      <Sparkles className="size-3" />
      {label}
    </span>
  );
}

export function SectionTitle({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <h2 className="font-display text-xl font-semibold sm:text-2xl">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Simulated voice capture. Records nothing — plays back a scripted transcript. */
export function VoiceButton({
  script,
  language = "Marathi",
  onResult,
  label = "Bolkar batayein",
  compact = false,
}: {
  script: string;
  language?: string;
  onResult: (text: string, language: string) => void;
  label?: string;
  compact?: boolean;
}) {
  const [state, setState] = useState<"idle" | "listening">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const start = () => {
    if (state === "listening") return;
    setState("listening");
    timer.current = setTimeout(() => {
      setState("idle");
      onResult(script, language);
      toast.success(`Voice captured (Demo) — ${language} detected`);
    }, 2200);
  };

  if (compact) {
    return (
      <Button
        type="button"
        size="icon"
        variant={state === "listening" ? "default" : "secondary"}
        aria-label="Speak instead of typing (Demo)"
        onClick={start}
        className="size-11 shrink-0 rounded-full"
      >
        {state === "listening" ? <Loader2 className="size-5 animate-spin" /> : <Mic className="size-5" />}
      </Button>
    );
  }

  return (
    <button
      type="button"
      onClick={start}
      className="flex w-full items-center gap-4 rounded-2xl border border-primary/25 bg-card p-4 text-left shadow-soft transition-transform active:scale-[0.99]"
    >
      <span
        className={cn(
          "relative grid size-14 place-items-center rounded-full bg-gradient-warm text-primary-foreground",
          state === "listening" && "animate-pulse",
        )}
      >
        <Mic className="size-6" />
        {state === "listening" ? (
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-primary"
            animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        ) : null}
      </span>
      <span className="min-w-0">
        <span className="block text-base font-semibold">
          {state === "listening" ? "Listening…" : label}
        </span>
        <span className="block truncate text-sm text-muted-foreground">
          {state === "listening" ? `Understanding ${language}` : "Tap and speak in your language"}
        </span>
      </span>
      <DemoTag className="ml-auto" />
    </button>
  );
}

export function ListenButton({ text }: { text: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <Button
      type="button"
      variant="secondary"
      onClick={() => {
        setPlaying(true);
        toast.info("Playing audio (Demo text-to-speech)");
        setTimeout(() => setPlaying(false), 1800);
      }}
      aria-label={`Listen: ${text.slice(0, 40)}`}
    >
      <Volume2 className={cn("size-4", playing && "animate-pulse")} />
      {playing ? "Playing…" : "Listen"}
    </Button>
  );
}

/** Simulated AI processing bar with step labels. */
export function useAiRun(steps: string[], duration = 2000) {
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const run = (onDone?: () => void) => {
    setRunning(true);
    setDone(false);
    setProgress(0);
    const tick = 60;
    let elapsed = 0;
    const id = setInterval(() => {
      elapsed += tick;
      setProgress(Math.min(100, (elapsed / duration) * 100));
      if (elapsed >= duration) {
        clearInterval(id);
        setRunning(false);
        setDone(true);
        onDone?.();
      }
    }, tick);
  };

  const stepIndex = Math.min(steps.length - 1, Math.floor((progress / 100) * steps.length));

  return { running, progress, done, run, currentStep: steps[stepIndex] ?? steps[0] ?? "" };
}

export function AiRunBar({
  running,
  progress,
  step,
}: {
  running: boolean;
  progress: number;
  step: string;
}) {
  if (!running) return null;
  return (
    <Card className="border-primary/30 bg-accent/40 p-4">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Sparkles className="size-4 animate-pulse text-primary" />
        {step}
        <DemoTag className="ml-auto" label="Simulated AI" />
      </div>
      <Progress value={progress} className="mt-3 h-2" />
    </Card>
  );
}

export function ProductCard({ product, href = true }: { product: Product; href?: boolean }) {
  const { wishlist, toggleWishlist } = useApp();
  const artisan = artisanOf(product);
  const liked = wishlist.includes(product.id);

  const body = (
    <Card className="group overflow-hidden border-border/70 p-0 shadow-soft transition-shadow hover:shadow-lift">
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {product.trending ? (
          <Badge className="absolute left-3 top-3 bg-saffron text-saffron-foreground">Trending</Badge>
        ) : null}
        <button
          type="button"
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-card/90 backdrop-blur"
        >
          <Heart className={cn("size-5", liked ? "fill-primary text-primary" : "text-muted-foreground")} />
        </button>
      </div>
      <div className="space-y-1.5 p-4">
        <p className="line-clamp-2 font-medium leading-snug">{product.title}</p>
        <p className="text-sm text-muted-foreground">{artisan.name}</p>
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="size-3" /> {product.location}
        </p>
        <div className="flex items-center justify-between pt-1">
          <span className="font-display text-lg font-semibold">₹{product.price.toLocaleString("en-IN")}</span>
          <span className="flex items-center gap-1 text-sm">
            <Star className="size-3.5 fill-saffron text-saffron" /> {product.rating}
          </span>
        </div>
      </div>
    </Card>
  );

  if (!href) return body;
  return (
    <Link to="/marketplace/$productId" params={{ productId: product.id }} className="block">
      {body}
    </Link>
  );
}

export function StatTile({
  label,
  value,
  icon,
  hint,
}: {
  label: string;
  value: string;
  icon: ReactNode;
  hint?: string;
}) {
  return (
    <Card className="gap-2 p-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="grid size-8 place-items-center rounded-full bg-accent text-accent-foreground">{icon}</span>
        {label}
      </div>
      <p className="font-display text-2xl font-semibold">{value}</p>
      {hint ? <p className="text-xs text-leaf">{hint}</p> : null}
    </Card>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <Card className="items-center gap-3 border-dashed p-8 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-accent text-accent-foreground">
        <Sparkles className="size-6" />
      </span>
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      {action}
    </Card>
  );
}

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Camera,
  Check,
  IndianRupee,
  Sparkles,
  Wand2,
  ArrowRight,
  ArrowLeft,
  Rocket,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/karigar/AppShell";
import {
  AiRunBar,
  DemoTag,
  FadeIn,
  ListenButton,
  VoiceButton,
  useAiRun,
} from "@/components/karigar/bits";
import { BUYERS, IMAGES, PRODUCTS } from "@/data/mock";
import { useApp } from "@/lib/app-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/create")({
  head: () => ({
    meta: [
      { title: "Create a product — KarigarSetu" },
      {
        name: "description",
        content:
          "Photo to AI enhancement to voice story to catalog, smart price, buyer match and publish — in one guided flow.",
      },
      { property: "og:title", content: "Create a product — KarigarSetu" },
      { property: "og:description", content: "One photo and your voice becomes a full listing." },
      { property: "og:url", content: "/create" },
    ],
    links: [{ rel: "canonical", href: "/create" }],
  }),
  component: CreateFlow,
});

const STEPS = ["Photo", "AI enhance", "Your voice", "Catalog", "Smart price", "Buyers", "Publish"];

const PRESETS = ["Clean white", "Wooden table", "Rustic cloth", "Festive backdrop"];

function CreateFlow() {
  const navigate = useNavigate();
  const { draft, setDraft, publish, resetDraft, profile, uiLanguage } = useApp();
  const [step, setStep] = useState(0);

  const go = (n: number) => setStep(Math.max(0, Math.min(STEPS.length - 1, n)));

  return (
    <AppShell title="Create product">
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 flex items-center gap-3">
          <h1 className="font-display text-2xl font-semibold">Add a new product</h1>
          <DemoTag className="ml-auto" label="Simulated AI" />
        </div>
        <Progress value={((step + 1) / STEPS.length) * 100} className="h-2" />
        <div className="mt-2 flex flex-wrap gap-1.5 text-xs text-muted-foreground">
          {STEPS.map((s, i) => (
            <span
              key={s}
              className={
                "rounded-full px-2 py-0.5 " +
                (i === step ? "bg-primary text-primary-foreground" : i < step ? "bg-leaf/20 text-leaf" : "bg-secondary")
              }
            >
              {i + 1}. {s}
            </span>
          ))}
        </div>

        <FadeIn key={step} className="mt-5 space-y-4">
          {step === 0 ? <StepPhoto onNext={() => go(1)} /> : null}
          {step === 1 ? <StepEnhance onNext={() => go(2)} /> : null}
          {step === 2 ? <StepVoice onNext={() => go(3)} /> : null}
          {step === 3 ? <StepCatalog onNext={() => go(4)} /> : null}
          {step === 4 ? <StepPrice onNext={() => go(5)} /> : null}
          {step === 5 ? <StepBuyers onNext={() => go(6)} /> : null}
          {step === 6 ? (
            <StepPublish
              onPublish={() => {
                const id = `mine-${Date.now()}`;
                publish({
                  id,
                  title: draft.catalog?.title ?? "Handwoven Bamboo Fruit Basket",
                  craft: (profile.craft as never) ?? "Bamboo",
                  artisanId: "a1",
                  price: draft.price?.retail ?? 899,
                  wholesale: draft.price?.wholesale ?? 648,
                  rating: 4.8,
                  reviews: 0,
                  materials: draft.catalog?.materials ?? "Bamboo cane, natural finish",
                  image: draft.enhanced ?? IMAGES.basketAfter,
                  location: `${profile.village}, ${profile.state}`,
                  wholesaleAvailable: true,
                  customizable: true,
                  views: 0,
                  orders: 0,
                  trending: true,
                  isMine: true,
                  publishedAt: "Just now",
                });
                resetDraft();
                toast.success("Published! Your product is live on your digital stall.");
                navigate({ to: "/catalog" });
              }}
            />
          ) : null}

          <div className="flex items-center justify-between pt-2">
            <Button variant="ghost" onClick={() => go(step - 1)} disabled={step === 0}>
              <ArrowLeft className="size-4" /> Back
            </Button>
            <span className="text-xs text-muted-foreground">
              Step {step + 1} of {STEPS.length}
            </span>
          </div>
        </FadeIn>
      </div>
    </AppShell>
  );

  function StepPhoto({ onNext }: { onNext: () => void }) {
    return (
      <Card className="gap-4 p-6">
        <h2 className="font-display text-xl font-semibold">Take one photo of your product</h2>
        <p className="text-sm text-muted-foreground">
          Any phone photo works. AI will clean it up in the next step.
        </p>
        <button
          type="button"
          onClick={() => {
            setDraft({ photo: IMAGES.basketBefore });
            toast.success("Photo captured (Demo)");
          }}
          className="grid aspect-video w-full place-items-center overflow-hidden rounded-2xl border-2 border-dashed border-primary/40 bg-secondary"
        >
          {draft.photo ? (
            <img src={draft.photo} alt="Captured product" className="size-full object-cover" />
          ) : (
            <span className="flex flex-col items-center gap-2 text-muted-foreground">
              <Camera className="size-10" />
              Tap to use camera (Demo)
            </span>
          )}
        </button>
        <Button className="h-12" disabled={!draft.photo} onClick={onNext}>
          Continue <ArrowRight className="size-4" />
        </Button>
      </Card>
    );
  }

  function StepEnhance({ onNext }: { onNext: () => void }) {
    const ai = useAiRun([
      "Removing background…",
      "Fixing lighting and shadows…",
      "Sharpening weave details…",
      "Creating catalog-ready image…",
    ]);
    return (
      <Card className="gap-4 p-6">
        <h2 className="font-display text-xl font-semibold">AI photo enhancement</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <p className="mb-1 text-xs text-muted-foreground">Before</p>
            <img
              src={draft.photo ?? IMAGES.basketBefore}
              alt="Original photo"
              className="aspect-square w-full rounded-2xl object-cover"
            />
          </div>
          <div>
            <p className="mb-1 text-xs text-muted-foreground">After (AI)</p>
            {draft.enhanced ? (
              <img src={draft.enhanced} alt="AI enhanced photo" className="aspect-square w-full rounded-2xl object-cover" />
            ) : (
              <div className="grid aspect-square w-full place-items-center rounded-2xl bg-secondary text-sm text-muted-foreground">
                Run AI to see the result
              </div>
            )}
          </div>
        </div>
        <AiRunBar running={ai.running} progress={ai.progress} step={ai.currentStep} />
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setDraft({ preset: p })}
              className={
                "rounded-full border px-3 py-1.5 text-sm " +
                (draft.preset === p ? "border-primary bg-accent" : "border-border")
              }
            >
              {p}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => ai.run(() => setDraft({ enhanced: IMAGES.basketAfter, preset: draft.preset ?? "Clean white" }))}
            disabled={ai.running}
          >
            <Wand2 className="size-4" /> Enhance with AI
          </Button>
          <Button variant="secondary" disabled={!draft.enhanced} onClick={onNext}>
            Use this photo <ArrowRight className="size-4" />
          </Button>
        </div>
      </Card>
    );
  }

  function StepVoice({ onNext }: { onNext: () => void }) {
    const ai = useAiRun(["Transcribing your voice…", "Detecting language…", "Translating to English…"], 1800);
    return (
      <Card className="gap-4 p-6">
        <h2 className="font-display text-xl font-semibold">Tell us about your product</h2>
        <p className="text-sm text-muted-foreground">
          Speak in {uiLanguage}. Say what it is, what it is made of, and how long it takes.
        </p>
        <VoiceButton
          language={uiLanguage}
          script="Hi tokri mi bamboo pasun hataane banavli aahe. Tila banavayla teen divas lagtat ani ti khup majboot aahe."
          onResult={(text, lang) => {
            setDraft({ transcript: text, language: lang });
            ai.run(() =>
              setDraft({
                translation:
                  "I made this basket by hand from bamboo. It takes three days to make and it is very strong.",
                hindi: "मैंने यह टोकरी हाथ से बाँस से बनाई है। इसे बनाने में तीन दिन लगते हैं और यह बहुत मज़बूत है।",
              }),
            );
          }}
        />
        <AiRunBar running={ai.running} progress={ai.progress} step={ai.currentStep} />
        {draft.transcript ? (
          <div className="space-y-3">
            <div className="rounded-2xl bg-secondary p-4 text-sm">
              <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
                {draft.language} transcript
              </p>
              {draft.transcript}
            </div>
            {draft.translation ? (
              <>
                <div className="rounded-2xl bg-accent/60 p-4 text-sm">
                  <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">English</p>
                  {draft.translation}
                  <p className="mt-2 text-muted-foreground">{draft.hindi}</p>
                </div>
                <ListenButton text={draft.translation} />
              </>
            ) : null}
          </div>
        ) : null}
        <Textarea
          placeholder="Or type it here…"
          value={draft.transcript ?? ""}
          onChange={(e) => setDraft({ transcript: e.target.value })}
        />
        <Button className="h-12" disabled={!draft.transcript} onClick={onNext}>
          Continue <ArrowRight className="size-4" />
        </Button>
      </Card>
    );
  }

  function StepCatalog({ onNext }: { onNext: () => void }) {
    const ai = useAiRun([
      "Understanding your craft…",
      "Writing product title…",
      "Writing description and story…",
      "Adding keywords buyers search for…",
    ]);
    const c = draft.catalog;
    return (
      <Card className="gap-4 p-6">
        <h2 className="font-display text-xl font-semibold">AI catalog writer</h2>
        <AiRunBar running={ai.running} progress={ai.progress} step={ai.currentStep} />
        {!c ? (
          <Button
            onClick={() =>
              ai.run(() =>
                setDraft({
                  catalog: {
                    title: "Handwoven Bamboo Fruit Basket — Natural Finish",
                    short: "Sturdy handwoven bamboo basket, made over three days by a Maharashtra artisan.",
                    full:
                      "This fruit basket is woven entirely by hand from locally sourced bamboo cane, using a tight double-weave that keeps its shape for years. The natural finish is food-safe and free of synthetic polish, so every piece carries the warm grain of real bamboo.",
                    story:
                      "Sunita learnt bamboo weaving from her grandmother in Wada. Each basket takes three days and supports a household of five.",
                    materials: "Bamboo cane, natural food-safe finish",
                    dimensions: "30 cm x 30 cm x 12 cm",
                    care: "Wipe with a dry cloth. Keep away from long water contact.",
                    category: "Home Décor · Storage",
                    tags: ["handwoven", "bamboo basket", "eco friendly", "fruit basket", "handmade India"],
                  },
                }),
              )
            }
            disabled={ai.running}
          >
            <Sparkles className="size-4" /> Generate catalog with AI
          </Button>
        ) : (
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>Title</Label>
              <Input
                value={c.title}
                onChange={(e) => setDraft({ catalog: { ...c, title: e.target.value } })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Textarea
                rows={4}
                value={c.full}
                onChange={(e) => setDraft({ catalog: { ...c, full: e.target.value } })}
              />
            </div>
            <div className="rounded-2xl bg-secondary p-4 text-sm">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Artisan story</p>
              <p className="mt-1">{c.story}</p>
            </div>
            <div className="grid gap-2 sm:grid-cols-3 text-sm">
              <p><span className="text-muted-foreground">Materials:</span> {c.materials}</p>
              <p><span className="text-muted-foreground">Size:</span> {c.dimensions}</p>
              <p><span className="text-muted-foreground">Care:</span> {c.care}</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {c.tags.map((t) => (
                <Badge key={t} variant="secondary">#{t}</Badge>
              ))}
            </div>
            <Button className="h-12" onClick={onNext}>
              Continue to pricing <ArrowRight className="size-4" />
            </Button>
          </div>
        )}
      </Card>
    );
  }

  function StepPrice({ onNext }: { onNext: () => void }) {
    const ai = useAiRun(["Reading market prices…", "Comparing 240 similar listings…", "Calculating fair bands…"], 1800);
    const [retail, setRetail] = useState(draft.price?.retail ?? 899);
    return (
      <Card className="gap-4 p-6">
        <h2 className="font-display text-xl font-semibold">Smart price suggestion</h2>
        <AiRunBar running={ai.running} progress={ai.progress} step={ai.currentStep} />
        {!draft.price ? (
          <Button onClick={() => ai.run(() => setDraft({ price: { retail: 899, wholesale: 648, bulk: 560 } }))} disabled={ai.running}>
            <IndianRupee className="size-4" /> Suggest a fair price
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["Retail", retail],
                ["Wholesale (50+)", Math.round(retail * 0.72)],
                ["Bulk (500+)", Math.round(retail * 0.62)],
              ].map(([label, v]) => (
                <Card key={String(label)} className="gap-1 bg-secondary p-4">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="font-display text-2xl font-semibold">₹{Number(v).toLocaleString("en-IN")}</p>
                </Card>
              ))}
            </div>
            <div className="space-y-2">
              <Label>Adjust your retail price</Label>
              <Slider value={[retail]} min={400} max={1600} step={10} onValueChange={([v]) => setRetail(v ?? 899)} />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>₹400</span>
                <span>Market average ₹930</span>
                <span>₹1,600</span>
              </div>
            </div>
            <div className="rounded-2xl bg-accent/60 p-4 text-sm">
              <p className="font-medium">Why this price?</p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-muted-foreground">
                <li>Similar handwoven baskets sell at ₹820–₹1,050 in your region.</li>
                <li>Your material cost and 3-day effort support a ₹380 margin.</li>
                <li>Festive demand raises willingness to pay by about 12%.</li>
              </ul>
            </div>
            <Button
              className="h-12"
              onClick={() => {
                setDraft({ price: { retail, wholesale: Math.round(retail * 0.72), bulk: Math.round(retail * 0.62) } });
                onNext();
              }}
            >
              Continue <ArrowRight className="size-4" />
            </Button>
          </div>
        )}
      </Card>
    );
  }

  function StepBuyers({ onNext }: { onNext: () => void }) {
    const ai = useAiRun(["Scanning 1,240 buyer profiles…", "Matching craft and capacity…", "Ranking by fit…"], 1900);
    const [matched, setMatched] = useState(false);
    return (
      <Card className="gap-4 p-6">
        <h2 className="font-display text-xl font-semibold">Buyers who want this</h2>
        <AiRunBar running={ai.running} progress={ai.progress} step={ai.currentStep} />
        {!matched ? (
          <Button onClick={() => ai.run(() => setMatched(true))} disabled={ai.running}>
            <Sparkles className="size-4" /> Find matching buyers
          </Button>
        ) : (
          <div className="space-y-3">
            {BUYERS.slice(0, 4).map((b) => (
              <div key={b.id} className="rounded-2xl border p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium">{b.name}</p>
                  <Badge variant="secondary">{b.type}</Badge>
                  <Badge className="ml-auto bg-leaf text-leaf-foreground">{b.match}% match</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {b.demand} · {b.quantity} · {b.budget}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {b.reasons.slice(0, 3).map((r) => (
                    <Badge key={r} variant="outline" className="text-xs">
                      <Check className="mr-1 size-3" /> {r}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
            <Button className="h-12" onClick={onNext}>
              Continue to publish <ArrowRight className="size-4" />
            </Button>
          </div>
        )}
      </Card>
    );
  }

  function StepPublish({ onPublish }: { onPublish: () => void }) {
    const c = draft.catalog;
    const similar = PRODUCTS.slice(0, 3);
    return (
      <Card className="gap-4 p-6">
        <h2 className="font-display text-xl font-semibold">Preview and publish</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <img
            src={draft.enhanced ?? IMAGES.basketAfter}
            alt="Final product"
            className="aspect-square w-full rounded-2xl object-cover"
          />
          <div className="space-y-2">
            <p className="font-display text-lg font-semibold">{c?.title ?? "Handwoven Bamboo Fruit Basket"}</p>
            <p className="text-sm text-muted-foreground">{c?.short ?? "Handmade with bamboo cane."}</p>
            <p className="font-display text-2xl font-semibold">
              ₹{(draft.price?.retail ?? 899).toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-muted-foreground">
              Wholesale ₹{(draft.price?.wholesale ?? 648).toLocaleString("en-IN")} · Bulk ₹
              {(draft.price?.bulk ?? 560).toLocaleString("en-IN")}
            </p>
          </div>
        </div>
        <div className="rounded-2xl bg-secondary p-4 text-sm">
          <p className="font-medium">Where it will appear</p>
          <p className="text-muted-foreground">
            Your digital stall, KarigarSetu marketplace, and 4 matched buyer feeds.
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          Similar live listings: {similar.map((s) => s.title).join(" · ")}
        </p>
        <Button className="h-12" onClick={onPublish}>
          <Rocket className="size-4" /> Publish my product
        </Button>
      </Card>
    );
  }
}

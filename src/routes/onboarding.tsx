import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { CRAFTS, EXPERIENCE_OPTIONS, LANGUAGES, STATES } from "@/data/mock";
import { useApp } from "@/lib/app-store";
import { DemoTag, FadeIn, VoiceButton } from "@/components/karigar/bits";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Get started — KarigarSetu" },
      {
        name: "description",
        content: "Set up your artisan profile in five simple steps using voice or taps.",
      },
      { property: "og:title", content: "Get started — KarigarSetu" },
      { property: "og:description", content: "Voice-first artisan onboarding in 5 steps." },
      { property: "og:url", content: "/onboarding" },
    ],
    links: [{ rel: "canonical", href: "/onboarding" }],
  }),
  component: Onboarding,
});

const TOTAL = 5;

function Onboarding() {
  const { profile, setProfile, uiLanguage, setUiLanguage } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const next = () => {
    if (step === TOTAL) {
      setProfile({ onboarded: true });
      toast.success("Profile ready! Welcome to KarigarSetu.");
      navigate({ to: "/dashboard" });
      return;
    }
    setStep((s) => s + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-ivory px-4 py-8">
      <div className="mx-auto max-w-xl">
        <div className="mb-6 flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-warm font-display text-lg font-bold text-primary-foreground">
            क
          </span>
          <span className="font-display text-lg font-semibold">KarigarSetu</span>
          <DemoTag className="ml-auto" />
        </div>

        <Progress value={(step / TOTAL) * 100} className="h-2" />
        <p className="mt-2 text-sm text-muted-foreground">
          Step {step} of {TOTAL}
        </p>

        <FadeIn key={step} className="mt-4">
          <Card className="gap-5 p-6">
            {step === 1 ? (
              <>
                <h1 className="font-display text-2xl font-semibold">Choose your language</h1>
                <p className="text-sm text-muted-foreground">आप किस भाषा में बात करना चाहेंगे?</p>
                <div className="grid grid-cols-2 gap-2">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => setUiLanguage(l.english)}
                      className={
                        "rounded-2xl border p-4 text-left " +
                        (uiLanguage === l.english
                          ? "border-primary bg-accent"
                          : "border-border bg-card")
                      }
                    >
                      <span className="block font-display text-lg">{l.label}</span>
                      <span className="text-xs text-muted-foreground">{l.english}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : null}

            {step === 2 ? (
              <>
                <h1 className="font-display text-2xl font-semibold">What is your name?</h1>
                <div className="flex items-center gap-2">
                  <Input
                    className="h-12"
                    value={profile.name}
                    onChange={(e) => setProfile({ name: e.target.value })}
                    placeholder="Your full name"
                  />
                  <VoiceButton
                    compact
                    script="Sunita Gaikwad"
                    language={uiLanguage}
                    onResult={(text) => setProfile({ name: text })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Village / town</Label>
                  <Input
                    className="h-12"
                    value={profile.village}
                    onChange={(e) => setProfile({ village: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>State</Label>
                  <Select value={profile.state} onValueChange={(v) => setProfile({ state: v })}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            ) : null}

            {step === 3 ? (
              <>
                <h1 className="font-display text-2xl font-semibold">What do you make?</h1>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {CRAFTS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setProfile({ craft: c })}
                      className={
                        "rounded-2xl border p-4 text-sm font-medium " +
                        (profile.craft === c ? "border-primary bg-accent" : "border-border bg-card")
                      }
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </>
            ) : null}

            {step === 4 ? (
              <>
                <h1 className="font-display text-2xl font-semibold">How long have you been doing this?</h1>
                <div className="space-y-2">
                  {EXPERIENCE_OPTIONS.map((e) => (
                    <button
                      key={e}
                      type="button"
                      onClick={() => setProfile({ experience: e })}
                      className={
                        "flex w-full items-center justify-between rounded-2xl border p-4 text-left " +
                        (profile.experience === e
                          ? "border-primary bg-accent"
                          : "border-border bg-card")
                      }
                    >
                      <span className="font-medium">{e}</span>
                      {profile.experience === e ? (
                        <CheckCircle2 className="size-5 text-primary" />
                      ) : null}
                    </button>
                  ))}
                </div>
                <VoiceButton
                  script="Main pandrah saal se bamboo ka kaam karti hoon."
                  language={uiLanguage}
                  label="Tell us in your voice"
                  onResult={() => setProfile({ experience: "10–20 years" })}
                />
              </>
            ) : null}

            {step === 5 ? (
              <>
                <h1 className="font-display text-2xl font-semibold">All set, {profile.name.split(" ")[0]}!</h1>
                <p className="text-sm text-muted-foreground">
                  Here is your artisan profile. You can change anything later.
                </p>
                <div className="space-y-2 rounded-2xl bg-secondary p-4 text-sm">
                  <p>
                    <span className="text-muted-foreground">Craft:</span> {profile.craft}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Place:</span> {profile.village},{" "}
                    {profile.state}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Experience:</span> {profile.experience}
                  </p>
                  <p className="flex flex-wrap items-center gap-1">
                    <span className="text-muted-foreground">Language:</span>
                    <Badge variant="secondary">{uiLanguage}</Badge>
                  </p>
                </div>
              </>
            ) : null}

            <div className="flex items-center gap-2 pt-2">
              {step > 1 ? (
                <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>
                  <ArrowLeft className="size-4" /> Back
                </Button>
              ) : null}
              <Button className="ml-auto h-12 px-6" onClick={next}>
                {step === TOTAL ? "Go to my dashboard" : "Continue"} <ArrowRight className="size-4" />
              </Button>
            </div>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}

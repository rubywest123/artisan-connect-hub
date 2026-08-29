import { useState } from "react";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { DemoTag } from "./bits";

type Msg = { id: number; role: "ai" | "me"; text: string };

const SUGGESTIONS = [
  "What should I make next month?",
  "Is my price too low?",
  "Which buyer should I reply to first?",
  "How do I get more orders this festive season?",
];

const SCRIPTED: Array<[RegExp, string]> = [
  [
    /price|pricing|low|rate/i,
    "Your Bamboo Fruit Basket sells at ₹899 while similar handmade baskets average ₹930 in Maharashtra. You can raise retail to ₹949 and still stay competitive — keep wholesale at ₹648 for orders above 200 units.",
  ],
  [
    /buyer|reply|lead|enquiry/i,
    "Reply to Heritage Home Stores first — 94% match, 500 units, and they already viewed your catalog today. Send them the 3-size basket set with your artisan story attached.",
  ],
  [
    /make|next|product|new/i,
    "Demand for bamboo lamp shades and cane planters is up 18% before Diwali. Make 2 new lamp designs in 12\" and 16\" — buyers in the hospitality segment are paying ₹1,100–₹1,400 per unit.",
  ],
  [
    /order|festive|sale|grow/i,
    "Three quick wins: publish 4 more products with AI photos, switch on bulk pricing for hotels, and post your Diwali collection to WhatsApp Status — artisans doing all three see ~2.3x enquiries.",
  ],
];

function answerFor(q: string) {
  const hit = SCRIPTED.find(([re]) => re.test(q));
  return (
    hit?.[1] ??
    "Here is what I see in your demo data: your catalog gets strong views on bamboo storage, but only 3 of 9 listings have a story. Adding stories usually lifts buyer enquiries by about 40%."
  );
}

export function Copilot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 0,
      role: "ai",
      text: "Namaste! I am your AI Business Copilot. Ask me about prices, buyers, or what to make next.",
    },
  ]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q || thinking) return;
    setMessages((prev) => [...prev, { id: Date.now(), role: "me", text: q }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: "ai", text: answerFor(q) }]);
      setThinking(false);
    }, 1200);
  };

  return (
    <>
      <Button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open AI Business Copilot"
        className="fixed bottom-20 right-4 z-50 size-14 rounded-full shadow-lift lg:bottom-6"
      >
        {open ? <X className="size-6" /> : <Bot className="size-6" />}
      </Button>

      {open ? (
        <Card className="fixed bottom-36 right-4 z-50 flex h-[26rem] w-[min(92vw,22rem)] flex-col gap-0 overflow-hidden p-0 shadow-lift lg:bottom-24">
          <div className="flex items-center gap-2 border-b bg-gradient-warm px-4 py-3 text-primary-foreground">
            <Sparkles className="size-4" />
            <span className="font-display text-base font-semibold">AI Business Copilot</span>
            <DemoTag className="ml-auto bg-card/80" label="Demo" />
          </div>

          <ScrollArea className="flex-1">
            <div className="space-y-3 p-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3 py-2 text-sm",
                    m.role === "ai"
                      ? "bg-secondary text-secondary-foreground"
                      : "ml-auto bg-primary text-primary-foreground",
                  )}
                >
                  {m.text}
                </div>
              ))}
              {thinking ? (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Sparkles className="size-3.5 animate-pulse text-primary" /> Copilot is thinking…
                </div>
              ) : null}
              {messages.length === 1 ? (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </ScrollArea>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t p-3"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about price, buyers, ideas…"
              aria-label="Ask the AI Business Copilot"
            />
            <Button type="submit" size="icon" aria-label="Send">
              <Send className="size-4" />
            </Button>
          </form>
        </Card>
      ) : null}
    </>
  );
}

export default Copilot;

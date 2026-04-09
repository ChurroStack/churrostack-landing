"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollAnimation } from "@/components/scroll-animation";
import { cn } from "@/lib/utils";

const PROVIDERS = ["HuggingFace", "OpenAI", "vLLM", "OpenRouter"];

export function LlmHub() {
  const t = useTranslations("llmHub");

  return (
    <section id="llm-hub" className="relative py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Diagram (left on desktop) */}
          <ScrollAnimation direction="left" delay={0.2}>
            <div className="rounded-xl border border-border bg-card p-8">
              <div className="flex flex-col items-center gap-6">
                {/* Provider nodes */}
                <div className="grid w-full grid-cols-2 gap-4">
                  {PROVIDERS.map((provider) => (
                    <div
                      key={provider}
                      className={cn(
                        "rounded-lg border border-border bg-muted/50 px-4 py-3 text-center",
                        "transition-colors hover:border-foreground/30"
                      )}
                    >
                      <p className="text-xs font-semibold">{provider}</p>
                    </div>
                  ))}
                </div>

                {/* Connector */}
                <div className="flex flex-col items-center gap-1">
                  <div className="h-6 w-px bg-border" />
                  <div className="h-2 w-2 rotate-45 border-b border-r border-border" />
                </div>

                {/* Router hub */}
                <div className="w-full max-w-[260px] rounded-xl border-2 border-foreground bg-foreground/5 px-6 py-5 text-center">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    Unified
                  </p>
                  <p className="text-sm font-bold mt-1">ChurroStack Router</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    OpenAI-compatible API
                  </p>
                </div>

                {/* Connector */}
                <div className="flex flex-col items-center gap-1">
                  <div className="h-2 w-2 rotate-45 border-b border-r border-border" />
                  <div className="h-6 w-px bg-border" />
                </div>

                {/* Consumers */}
                <div className="grid w-full grid-cols-3 gap-3">
                  {["Teams", "Clients", "Tools"].map((consumer) => (
                    <div
                      key={consumer}
                      className="rounded-lg border border-dashed border-border px-3 py-2 text-center"
                    >
                      <p className="text-[10px] font-medium text-muted-foreground">
                        {consumer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Text (right on desktop) */}
          <ScrollAnimation direction="right">
            <div>
              <Badge variant="outline" className="mb-4">
                {t("badge")}
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {t("title")}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {t("subtitle")}
              </p>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                {t("description")}
              </p>

              <ul className="mt-8 space-y-3">
                {Array.from({ length: 5 }, (_, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-foreground">
                      <Check className="h-3 w-3 text-background" />
                    </div>
                    <span className="text-sm">{t(`features.${i}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollAnimation } from "@/components/scroll-animation";
import { cn } from "@/lib/utils";

export function WorkspaceMode() {
  const t = useTranslations("workspaceMode");

  return (
    <section id="workspace-mode" className="relative py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Text */}
          <ScrollAnimation direction="left">
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
                {Array.from({ length: 4 }, (_, i) => (
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

          {/* Diagram */}
          <ScrollAnimation direction="right" delay={0.2}>
            <div className="rounded-xl border border-border bg-card p-8">
              <div className="flex flex-col items-center gap-6">
                {/* Config box */}
                <div className="w-full max-w-[240px] rounded-lg border-2 border-foreground bg-foreground/5 px-6 py-4 text-center">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    Single
                  </p>
                  <p className="text-sm font-bold mt-1">Configuration</p>
                </div>

                {/* Connector lines */}
                <div className="relative flex w-full items-center justify-center">
                  <div className="h-8 w-px bg-border" />
                  <div className="absolute bottom-0 left-1/4 h-8 w-px bg-border hidden sm:block" />
                  <div className="absolute bottom-0 right-1/4 h-8 w-px bg-border hidden sm:block" />
                  <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-border hidden sm:block" />
                </div>

                {/* User deployments */}
                <div className="grid w-full grid-cols-1 sm:grid-cols-3 gap-4">
                  {["User A", "User B", "User C"].map((user) => (
                    <div
                      key={user}
                      className={cn(
                        "rounded-lg border border-border bg-muted/50 p-4 text-center",
                        "transition-colors hover:border-foreground/30"
                      )}
                    >
                      <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-foreground/10 text-xs font-bold">
                        {user.split(" ")[1]}
                      </div>
                      <p className="text-xs font-semibold">{user}</p>
                      <p className="mt-1 text-[10px] text-muted-foreground">
                        Isolated Deployment
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}

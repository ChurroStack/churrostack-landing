"use client";

import { useTranslations } from "next-intl";
import { Cpu, Network, BarChart3, Bot } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollAnimation } from "@/components/scroll-animation";
import { cn } from "@/lib/utils";

const USE_CASE_CONFIG = [
  { Icon: Cpu, accent: "bg-violet-500/10 text-violet-600 dark:text-violet-400" },
  { Icon: Network, accent: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  { Icon: BarChart3, accent: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  { Icon: Bot, accent: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
];

export function UseCases() {
  const t = useTranslations("useCases");

  return (
    <section id="use-cases" className="relative py-24 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <ScrollAnimation>
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">
              {t("badge")}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>
        </ScrollAnimation>

        {/* Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {Array.from({ length: 4 }, (_, i) => {
            const { Icon, accent } = USE_CASE_CONFIG[i];
            return (
              <ScrollAnimation key={i} delay={i * 0.1}>
                <Card
                  className={cn(
                    "group transition-all duration-300",
                    "hover:-translate-y-1 hover:shadow-lg hover:border-foreground/20"
                  )}
                >
                  <CardHeader className="p-8">
                    <div
                      className={cn(
                        "mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110",
                        accent
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">
                      {t(`items.${i}.title`)}
                    </CardTitle>
                    <CardDescription className="mt-2 text-sm leading-relaxed">
                      {t(`items.${i}.description`)}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </ScrollAnimation>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useTranslations } from "next-intl";
import {
  Server,
  Rocket,
  Brain,
  Layout,
  Library,
  Shield,
  Layers,
  Monitor,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollAnimation } from "@/components/scroll-animation";
import { cn } from "@/lib/utils";

const ICONS = [Server, Rocket, Brain, Layout, Library, Shield, Layers, Monitor];

export function Features() {
  const t = useTranslations("features");

  return (
    <section id="features" className="relative py-24 px-4">
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
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }, (_, i) => {
            const Icon = ICONS[i];
            return (
              <ScrollAnimation key={i} delay={i * 0.05} className="h-full">
                <Card
                  className={cn(
                    "h-full group relative overflow-hidden transition-all duration-300",
                    "hover:-translate-y-1 hover:shadow-lg hover:border-foreground/20"
                  )}
                >
                  <CardHeader>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-foreground/5 transition-colors group-hover:bg-foreground/10">
                      <Icon className="h-5 w-5 text-foreground" />
                    </div>
                    <CardTitle className="text-base">
                      {t(`items.${i}.title`)}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
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

"use client";

import { useTranslations } from "next-intl";
import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ScrollAnimation } from "@/components/scroll-animation";
import { cn } from "@/lib/utils";

// Feature counts per plan (from the messages JSON)
const PLAN_FEATURE_COUNTS = [8, 8, 9, 10];

export function Pricing() {
  const t = useTranslations("pricing");

  function scrollToContact() {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="pricing" className="relative py-24 px-4">
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

        {/* Plans */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, i) => {
            const isPopular = i === 1;
            const featureCount = PLAN_FEATURE_COUNTS[i];
            return (
              <ScrollAnimation key={i} delay={i * 0.1} className="h-full">
                <Card
                  className={cn(
                    "h-full relative flex flex-col transition-all duration-300",
                    isPopular
                      ? "border-foreground shadow-xl scale-[1.02] lg:scale-105"
                      : "hover:-translate-y-1 hover:shadow-lg"
                  )}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-foreground text-background">
                        {t("currentPlan")}
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg">
                      {t(`plans.${i}.name`)}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {t(`plans.${i}.description`)}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <div className="mb-6">
                      {i === 3 && (
                        <span className="block text-xs font-medium text-muted-foreground mb-1">
                          {t("startingAt")}
                        </span>
                      )}
                      <span className="text-3xl font-bold">
                        {t(`plans.${i}.price`)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {t("monthly")}
                      </span>
                    </div>

                    <ul className="space-y-2.5">
                      {Array.from({ length: featureCount }, (_, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
                          <span>{t(`plans.${i}.features.${j}`)}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter>
                    <Button
                      className={cn(
                        "w-full",
                        isPopular
                          ? "bg-foreground text-background hover:bg-foreground/90"
                          : ""
                      )}
                      variant={isPopular ? "default" : "outline"}
                      onClick={scrollToContact}
                    >
                      {t("askDemo")}
                    </Button>
                  </CardFooter>
                </Card>
              </ScrollAnimation>
            );
          })}
        </div>

        {/* Bandwidth note */}
        <ScrollAnimation delay={0.4}>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            {t("bandwidthNote")}
          </p>
        </ScrollAnimation>
      </div>
    </section>
  );
}

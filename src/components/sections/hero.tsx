"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Sparkles, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  const t = useTranslations("hero");

  function scrollToContact() {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-16">
      {/* Spotlight overlay */}
      <div className="spotlight pointer-events-none absolute inset-0" />

      {/* Floating geometric shapes */}
      <motion.div
        className="pointer-events-none absolute top-1/4 left-[10%] h-64 w-64 rounded-full border border-border/30"
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute top-1/3 right-[15%] h-40 w-40 rounded-xl border border-border/20 rotate-45"
        animate={{ y: [0, 15, 0], rotate: [45, 50, 45] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-1/4 left-[20%] h-32 w-32 rounded-lg border border-border/20"
        animate={{ y: [0, 10, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge
            variant="outline"
            className="mb-6 gap-2 px-4 py-1.5 text-sm font-medium"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {t("badge")}
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t("title")}
          <br />
          <span className="bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
            {t("titleHighlight")}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t("subtitle")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/90 text-base px-8"
            onClick={scrollToContact}
          >
            {t("cta")}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="gap-2 text-base px-8"
            asChild
          >
            <a
              href="https://github.com/churrostack"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitBranch className="h-4 w-4" />
              {t("ctaSecondary")}
            </a>
          </Button>
        </motion.div>

        {/* Browser mockup */}
        <motion.div
          className="mt-16 w-full max-w-3xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="rounded-xl border border-border bg-card shadow-2xl overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-red-400/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
              <div className="h-3 w-3 rounded-full bg-green-400/80" />
              <div className="ml-4 flex-1 rounded-md bg-background/60 px-3 py-1 text-xs text-muted-foreground">
                app.churrostack.com
              </div>
            </div>
            {/* Screenshot area */}
            <div className="flex aspect-video items-center justify-center bg-muted/20 p-8">
              <div className="text-center">
                <p className="text-lg font-medium text-muted-foreground">
                  Platform Screenshot
                </p>
                <p className="mt-2 text-sm text-muted-foreground/60">
                  {t("screenshotAlt")}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

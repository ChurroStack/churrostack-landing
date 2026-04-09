"use client";

import { useTranslations } from "next-intl";
import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sparkles, GitBranch, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const SCREENSHOTS = [
  "/screenshot-01.png",
  "/screenshot-02.png",
  "/screenshot-03.png",
  "/screenshot-04.png",
];
const AUTO_ADVANCE_MS = 4000;

export function Hero() {
  const t = useTranslations("hero");
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setActiveIndex((i) => (i + 1) % SCREENSHOTS.length);
    }, AUTO_ADVANCE_MS);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [activeIndex, resetTimer]);

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + SCREENSHOTS.length) % SCREENSHOTS.length);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % SCREENSHOTS.length);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  useEffect(() => {
    if (!lightboxOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") setActiveIndex((i) => (i - 1 + SCREENSHOTS.length) % SCREENSHOTS.length);
      if (e.key === "ArrowRight") setActiveIndex((i) => (i + 1) % SCREENSHOTS.length);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen, closeLightbox]);

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
                https://portal.churrostack.com
              </div>
            </div>
            {/* Screenshot carousel */}
            <div className="relative aspect-video w-full bg-muted/20 overflow-hidden group">
              <AnimatePresence mode="wait">
                <motion.button
                  key={activeIndex}
                  type="button"
                  className="absolute inset-0 cursor-zoom-in"
                  onClick={() => setLightboxOpen(true)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src={SCREENSHOTS[activeIndex]}
                    alt={t("screenshotAlt")}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover object-top"
                    loading="eager"
                    priority={activeIndex === 0}
                  />
                </motion.button>
              </AnimatePresence>

              {/* Prev / Next arrows */}
              <button
                type="button"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/70 border border-border text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/70 border border-border text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                aria-label="Next screenshot"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-1.5 py-3 border-t border-border bg-muted/50">
              {SCREENSHOTS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? "w-5 bg-foreground" : "w-1.5 bg-foreground/40"}`}
                  onClick={(e) => { e.stopPropagation(); goTo(i); }}
                  aria-label={`Go to screenshot ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 cursor-zoom-out p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative max-h-[90vh] max-w-[90vw] w-full"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={SCREENSHOTS[activeIndex]}
                    alt={t("screenshotAlt")}
                    width={1920}
                    height={1080}
                    className="h-auto max-h-[90vh] w-auto max-w-full mx-auto rounded-lg"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Lightbox prev/next */}
              <button
                type="button"
                className="absolute left-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={() => setActiveIndex((i) => (i - 1 + SCREENSHOTS.length) % SCREENSHOTS.length)}
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={() => setActiveIndex((i) => (i + 1) % SCREENSHOTS.length)}
                aria-label="Next screenshot"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Lightbox dots */}
              <div className="mt-4 flex justify-center gap-2">
                {SCREENSHOTS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`h-2 rounded-full transition-all duration-300 ${i === activeIndex ? "w-6 bg-white" : "w-2 bg-white/40"}`}
                    onClick={() => goTo(i)}
                    aria-label={`Go to screenshot ${i + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

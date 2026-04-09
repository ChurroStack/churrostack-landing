"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Separator } from "@/components/ui/separator";

const FOOTER_SECTIONS = ["product", "company", "legal"] as const;
const LINK_COUNTS: Record<string, number> = {
  product: 4,
  company: 4,
  legal: 3,
};

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="ChurroStack"
                width={28}
                height={28}
                className="invert dark:invert-0"
              />
              <span className="text-lg font-bold">{t("brand")}</span>
            </div>
            <p className="mt-4 text-sm text-background/60 leading-relaxed">
              {t("tagline")}
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-background/80">
                {t(`sections.${section}.title`)}
              </h3>
              <ul className="mt-4 space-y-3">
                {Array.from({ length: LINK_COUNTS[section] }, (_, i) => (
                  <li key={i}>
                    <a
                      href={t(`sections.${section}.links.${i}.href`)}
                      className="text-sm text-background/50 transition-colors hover:text-background"
                    >
                      {t(`sections.${section}.links.${i}.label`)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-background/10" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-background/40">{t("copyright")}</p>
          <p className="text-xs text-background/40">{t("madeWith")}</p>
        </div>
      </div>
    </footer>
  );
}

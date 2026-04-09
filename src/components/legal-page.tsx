"use client";

import { useTranslations } from "next-intl";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { ScrollAnimation } from "@/components/scroll-animation";

interface LegalPageProps {
  translationKey: string;
  sectionCount: number;
}

export function LegalPage({ translationKey, sectionCount }: LegalPageProps) {
  const t = useTranslations(translationKey);

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen pt-32 pb-24 px-4">
        <div className="mx-auto max-w-3xl">
          <ScrollAnimation>
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              {t("title")}
            </h1>
            <p className="text-sm text-muted-foreground mb-12">
              {t("lastUpdated")}
            </p>
          </ScrollAnimation>

          {Array.from({ length: sectionCount }, (_, i) => (
            <ScrollAnimation key={i}>
              <div className="mb-10">
                <h2 className="text-xl font-semibold mb-4">
                  {t(`sections.${i}.title`)}
                </h2>
                <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {t(`sections.${i}.content`)}
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

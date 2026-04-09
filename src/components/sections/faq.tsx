"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ScrollAnimation } from "@/components/scroll-animation";

export function Faq() {
  const t = useTranslations("faq");

  return (
    <section id="faq" className="relative py-24 px-4">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <ScrollAnimation>
          <div className="text-center">
            <Badge variant="outline" className="mb-4">
              {t("badge")}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("title")}
            </h2>
          </div>
        </ScrollAnimation>

        {/* Accordion */}
        <ScrollAnimation delay={0.1}>
          <Accordion className="mt-12">
            {Array.from({ length: 10 }, (_, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger>
                  {t(`items.${i}.question`)}
                </AccordionTrigger>
                <AccordionContent>
                  {t(`items.${i}.answer`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollAnimation>
      </div>
    </section>
  );
}

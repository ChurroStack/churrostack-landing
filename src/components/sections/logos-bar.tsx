"use client";

import { useTranslations } from "next-intl";
import { ScrollAnimation } from "@/components/scroll-animation";
import { cn } from "@/lib/utils";

const TECHS = [
  "Kubernetes",
  "Docker",
  "NVIDIA",
  "Streamlit",
  "vLLM",
  "FastMCP",
  "Istio",
  "HuggingFace",
];

export function LogosBar() {
  const t = useTranslations("logosBar");

  return (
    <section className="relative py-16 px-4">
      <div className="mx-auto max-w-7xl">
        <ScrollAnimation>
          <p className="text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
            {t("title")}
          </p>
        </ScrollAnimation>

        <ScrollAnimation delay={0.1}>
          <div className="mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex animate-marquee gap-8">
              {[...TECHS, ...TECHS].map((tech, i) => (
                <div
                  key={`${tech}-${i}`}
                  className={cn(
                    "flex-none rounded-lg border border-border/50 bg-card/50 px-6 py-3",
                    "text-sm font-medium text-muted-foreground",
                    "transition-colors hover:text-foreground hover:border-border"
                  )}
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </ScrollAnimation>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}

"use client";

import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import * as CC from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const w = typeof window !== "undefined" ? (window as any) : null;

function syncGoogleConsent(categories: string[]) {
  if (!w?.gtag) return;
  w.gtag("consent", "update", {
    analytics_storage: categories.includes("analytics") ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

function loadGoogleAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id || !w || document.getElementById("ga-script")) return;

  w.dataLayer = w.dataLayer || [];
  if (!w.gtag) {
    w.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer.push(arguments);
    };
  }
  w.gtag("js", new Date());
  w.gtag("config", id, { anonymize_ip: true });

  const script = document.createElement("script");
  script.id = "ga-script";
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  script.async = true;
  document.head.appendChild(script);
}

export function CookieConsent() {
  const t = useTranslations("cookieBanner");
  const locale = useLocale();

  useEffect(() => {
    CC.run({
      onFirstConsent: ({ cookie }) => syncGoogleConsent(cookie.categories),
      onConsent: ({ cookie }) => syncGoogleConsent(cookie.categories),
      onChange: ({ cookie }) => syncGoogleConsent(cookie.categories),

      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
        analytics: {
          autoClear: {
            cookies: [
              { name: /^_ga/ },
              { name: "_gid" },
            ],
          },
          services: {
            ga: {
              label: "Google Analytics",
              onAccept: loadGoogleAnalytics,
            },
          },
        },
      },

      language: {
        default: locale,
        translations: {
          [locale]: {
            consentModal: {
              title: t("title"),
              description: t("description"),
              acceptAllBtn: t("acceptAll"),
              acceptNecessaryBtn: t("rejectAll"),
              showPreferencesBtn: t("managePreferences"),
            },
            preferencesModal: {
              title: t("preferences.title"),
              acceptAllBtn: t("acceptAll"),
              acceptNecessaryBtn: t("rejectAll"),
              savePreferencesBtn: t("preferences.save"),
              sections: [
                {
                  title: t("necessary.title"),
                  description: t("necessary.description"),
                  linkedCategory: "necessary",
                },
                {
                  title: t("analytics.title"),
                  description: t("analytics.description"),
                  linkedCategory: "analytics",
                  cookieTable: {
                    headers: {
                      name: "Cookie",
                      description: t("cookieTable.header"),
                    },
                    body: [
                      {
                        name: "_ga",
                        description: t("cookieTable.ga"),
                      },
                      {
                        name: "_gid",
                        description: t("cookieTable.gid"),
                      },
                    ],
                  },
                },
                {
                  title: t("moreInfo.title"),
                  description: t.raw("moreInfo.description") as string,
                },
              ],
            },
          },
        },
      },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export function CookiePreferencesButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => CC.showPreferences()}
    >
      {children}
    </button>
  );
}

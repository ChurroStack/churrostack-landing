"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollAnimation } from "@/components/scroll-animation";
import { CheckCircle2, Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(10),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const t = useTranslations("contact");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { name: "", email: "", company: "", message: "" },
  });

  async function onSubmit(_data: FormData) {
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <section id="contact" className="relative py-24 px-4">
      <div className="mx-auto max-w-lg">
        {/* Header */}
        <ScrollAnimation>
          <div className="text-center">
            <Badge variant="outline" className="mb-4">
              {t("badge")}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={0.1}>
          {submitted ? (
            <div className="mt-12 flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-8 text-center">
              <CheckCircle2 className="h-12 w-12 text-foreground" />
              <p className="text-lg font-medium">{t("form.success")}</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-12 space-y-6 rounded-xl border border-border bg-card p-8"
            >
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">{t("form.name")}</Label>
                <Input
                  id="name"
                  placeholder={t("form.namePlaceholder")}
                  {...register("name", { required: true })}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">Required</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">{t("form.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("form.emailPlaceholder")}
                  {...register("email", {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  })}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">Valid email required</p>
                )}
              </div>

              {/* Company */}
              <div className="space-y-2">
                <Label htmlFor="company">{t("form.company")}</Label>
                <Input
                  id="company"
                  placeholder={t("form.companyPlaceholder")}
                  {...register("company")}
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">{t("form.message")}</Label>
                <Textarea
                  id="message"
                  placeholder={t("form.messagePlaceholder")}
                  rows={4}
                  {...register("message", { required: true, minLength: 10 })}
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <p className="text-xs text-destructive">
                    At least 10 characters required
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-foreground text-background hover:bg-foreground/90"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  t("form.submit")
                )}
              </Button>
            </form>
          )}
        </ScrollAnimation>
      </div>
    </section>
  );
}

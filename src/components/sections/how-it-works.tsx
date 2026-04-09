"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Cable,
  Settings,
  Rocket,
  Cloud,
  Shield,
  Server,
  Monitor,
  Cpu,
  Container,
  Brain,
  Wrench,
  Lock,
  ArrowLeftRight,
  Layers,
  Users,
  BarChart3,
  Globe,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollAnimation } from "@/components/scroll-animation";
import { cn } from "@/lib/utils";

const STEP_ICONS = [Cable, Settings, Rocket];

/* ---- Animated dashed tunnel line ---- */
function TunnelLine({ vertical = false }: { vertical?: boolean }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        vertical ? "mx-auto h-10 w-px" : "my-auto h-px w-full"
      )}
    >
      <motion.div
        className={cn(
          "absolute",
          vertical
            ? "left-0 top-0 h-[200%] w-px border-l-2 border-dashed border-foreground/40"
            : "left-0 top-0 h-px w-[200%] border-t-2 border-dashed border-foreground/40"
        )}
        animate={vertical ? { y: [0, -12] } : { x: [0, -12] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

/* ---- Small icon chip ---- */
function Chip({
  icon: Icon,
  label,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 text-[10px] font-medium shadow-sm",
        className
      )}
    >
      <Icon className="h-3 w-3 shrink-0 text-muted-foreground" />
      <span className="truncate">{label}</span>
    </div>
  );
}

/* ---- Pulsing data dot ---- */
function DataDot({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="absolute h-1.5 w-1.5 rounded-full bg-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

export function HowItWorks() {
  const t = useTranslations("howItWorks");

  return (
    <section id="how-it-works" className="relative py-24 px-4">
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

        {/* Steps */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <ScrollAnimation key={i} delay={i * 0.15}>
                <div className="relative flex flex-col items-center text-center">
                  {i < 2 && (
                    <div className="absolute left-[calc(50%+40px)] top-8 hidden h-px w-[calc(100%-80px)] bg-border md:block" />
                  )}
                  <div
                    className={cn(
                      "relative z-10 flex h-16 w-16 items-center justify-center rounded-full",
                      "border-2 border-foreground bg-background text-foreground",
                      "transition-colors"
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="mt-1 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Step {i + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">
                    {t(`steps.${i}.title`)}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs">
                    {t(`steps.${i}.description`)}
                  </p>
                </div>
              </ScrollAnimation>
            );
          })}
        </div>

        {/* ================================================================
            ARCHITECTURE DIAGRAM — CSS/HTML
            Shows: Cloud Control Plane ↔ Reverse SSH Tunnel ↔ On-Premises
           ================================================================ */}
        <ScrollAnimation delay={0.3}>
          <div className="mt-20 mx-auto max-w-5xl">
            <div className="rounded-xl border border-border bg-card p-6 sm:p-10 shadow-sm overflow-hidden">
              {/* ---- Desktop layout (horizontal) ---- */}
              <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-0 md:items-stretch">
                {/* ===== CLOUD SIDE ===== */}
                <div className="rounded-xl border border-border bg-muted/30 p-5">
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground">
                      <Cloud className="h-4 w-4 text-background" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider">
                        Cloud
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        portal.churrostack.com
                      </p>
                    </div>
                  </div>

                  {/* Control Plane box */}
                  <div className="rounded-lg border border-foreground/20 bg-background p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-3">
                      Control Plane
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <Chip icon={Monitor} label="Web Dashboard" />
                      <Chip icon={Shield} label="Auth (OAuth/SSO)" />
                      <Chip icon={BarChart3} label="Metrics & Logs" />
                      <Chip icon={Globe} label="Reverse Proxy" />
                      <Chip icon={Users} label="RBAC Engine" />
                      <Chip icon={Layers} label="Orchestrator" />
                    </div>
                  </div>

                  {/* API label */}
                  <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
                    <div className="h-px flex-1 bg-border" />
                    <span className="font-medium">REST / WebSocket API</span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                </div>

                {/* ===== TUNNEL (center column) ===== */}
                <div className="flex flex-col items-center justify-center px-3 py-6 relative">
                  {/* Top arrow */}
                  <div className="relative h-full w-px flex flex-col items-center justify-center gap-2">
                    {/* Animated dashed lines */}
                    <div className="relative h-full w-8 flex items-center overflow-hidden">
                      <div className="relative w-full h-px">
                        <motion.div
                          className="absolute top-0 left-0 w-[200%] h-px border-t-2 border-dashed border-foreground/50"
                          animate={{ x: [0, -12] }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        {/* Data dots flowing */}
                        <motion.div
                          className="absolute top-[-2px] h-1.5 w-1.5 rounded-full bg-foreground"
                          animate={{ left: ["0%", "100%"] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        <motion.div
                          className="absolute top-[-2px] h-1.5 w-1.5 rounded-full bg-foreground/50"
                          animate={{ left: ["100%", "0%"] }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "linear",
                            delay: 0.5,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Tunnel label */}
                  <div className="absolute top-1/2 -translate-y-1/2 -rotate-0">
                    <div className="flex flex-col items-center gap-1 rounded-lg border border-foreground/30 bg-background px-3 py-2 shadow-md">
                      <Lock className="h-3.5 w-3.5 text-foreground" />
                      <span className="text-[9px] font-bold uppercase tracking-widest whitespace-nowrap">
                        SSH Tunnel
                      </span>
                      <span className="text-[8px] text-muted-foreground whitespace-nowrap">
                        Encrypted
                      </span>
                    </div>
                  </div>
                </div>

                {/* ===== ON-PREMISES SIDE ===== */}
                <div className="rounded-xl border border-border bg-muted/30 p-5">
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground">
                      <Server className="h-4 w-4 text-background" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider">
                        On-Premises
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        Your Private Network
                      </p>
                    </div>
                  </div>

                  {/* NAT / Firewall bar */}
                  <div className="mb-4 flex items-center gap-2 rounded-md border border-dashed border-foreground/20 bg-foreground/5 px-3 py-1.5">
                    <Shield className="h-3 w-3 text-muted-foreground" />
                    <span className="text-[10px] font-medium text-muted-foreground">
                      Behind NAT / Firewall — No public IP needed
                    </span>
                  </div>

                  {/* Kubernetes cluster */}
                  <div className="rounded-lg border border-foreground/20 bg-background p-4">
                    <div className="flex items-center gap-1.5 mb-3">
                      <Cpu className="h-3 w-3 text-muted-foreground" />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Kubernetes Cluster
                      </p>
                    </div>

                    {/* Environments */}
                    <div className="space-y-2">
                      {/* Env 1 */}
                      <div className="rounded-md border border-border bg-muted/40 p-2.5">
                        <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                          Environment: Production
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          <Chip icon={Container} label="Streamlit App" />
                          <Chip icon={Brain} label="vLLM Model" />
                          <Chip icon={Wrench} label="MCP Tool" />
                        </div>
                      </div>
                      {/* Env 2 */}
                      <div className="rounded-md border border-border bg-muted/40 p-2.5">
                        <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                          Environment: Development
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          <Chip icon={Monitor} label="VSCode" />
                          <Chip icon={Container} label="Docker App" />
                        </div>
                      </div>
                    </div>

                    {/* Resources bar */}
                    <div className="mt-3 flex items-center justify-between rounded-md bg-foreground/5 px-3 py-1.5">
                      <span className="text-[9px] text-muted-foreground font-medium">
                        Resources
                      </span>
                      <div className="flex gap-3 text-[9px] text-muted-foreground">
                        <span>64 CPU</span>
                        <span>256 GB RAM</span>
                        <span>4× GPU</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ---- Mobile layout (vertical) ---- */}
              <div className="md:hidden space-y-0">
                {/* Cloud */}
                <div className="rounded-xl border border-border bg-muted/30 p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground">
                      <Cloud className="h-4 w-4 text-background" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider">
                        Cloud
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        portal.churrostack.com
                      </p>
                    </div>
                  </div>
                  <div className="rounded-lg border border-foreground/20 bg-background p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                      Control Plane
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      <Chip icon={Monitor} label="Dashboard" />
                      <Chip icon={Shield} label="Auth" />
                      <Chip icon={BarChart3} label="Metrics" />
                      <Chip icon={Globe} label="Proxy" />
                      <Chip icon={Users} label="RBAC" />
                      <Chip icon={Layers} label="Orchestrator" />
                    </div>
                  </div>
                </div>

                {/* Tunnel (vertical) */}
                <div className="flex flex-col items-center py-2 relative">
                  <div className="relative h-12 w-px">
                    <motion.div
                      className="absolute left-0 top-0 h-[200%] w-px border-l-2 border-dashed border-foreground/50"
                      animate={{ y: [0, -12] }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <motion.div
                      className="absolute left-[-2px] h-1.5 w-1.5 rounded-full bg-foreground"
                      animate={{ top: ["0%", "100%"] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-lg border border-foreground/30 bg-background px-3 py-1.5 shadow-md">
                    <Lock className="h-3 w-3 text-foreground" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">
                      SSH Tunnel
                    </span>
                  </div>
                  <div className="relative h-12 w-px">
                    <motion.div
                      className="absolute left-0 top-0 h-[200%] w-px border-l-2 border-dashed border-foreground/50"
                      animate={{ y: [0, -12] }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </div>
                </div>

                {/* On-Premises */}
                <div className="rounded-xl border border-border bg-muted/30 p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground">
                      <Server className="h-4 w-4 text-background" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider">
                        On-Premises
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        Your Private Network
                      </p>
                    </div>
                  </div>
                  <div className="mb-3 flex items-center gap-2 rounded-md border border-dashed border-foreground/20 bg-foreground/5 px-3 py-1.5">
                    <Shield className="h-3 w-3 text-muted-foreground" />
                    <span className="text-[10px] font-medium text-muted-foreground">
                      Behind NAT / Firewall
                    </span>
                  </div>
                  <div className="rounded-lg border border-foreground/20 bg-background p-3">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Cpu className="h-3 w-3 text-muted-foreground" />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Kubernetes Cluster
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="rounded-md border border-border bg-muted/40 p-2">
                        <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                          Env: Production
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          <Chip icon={Container} label="Streamlit" />
                          <Chip icon={Brain} label="vLLM" />
                          <Chip icon={Wrench} label="MCP" />
                        </div>
                      </div>
                      <div className="rounded-md border border-border bg-muted/40 p-2">
                        <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                          Env: Development
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          <Chip icon={Monitor} label="VSCode" />
                          <Chip icon={Container} label="Docker" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between rounded-md bg-foreground/5 px-2.5 py-1.5">
                      <span className="text-[9px] text-muted-foreground font-medium">
                        Resources
                      </span>
                      <span className="text-[9px] text-muted-foreground">
                        64 CPU · 256 GB · 4× GPU
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Caption */}
              <p className="mt-6 text-center text-xs text-muted-foreground">
                {t("diagramCaption")}
              </p>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

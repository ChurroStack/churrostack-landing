import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { LogosBar } from "@/components/sections/logos-bar";
import { Features } from "@/components/sections/features";
import { HowItWorks } from "@/components/sections/how-it-works";
import { UseCases } from "@/components/sections/use-cases";
import { WorkspaceMode } from "@/components/sections/workspace-mode";
import { LlmHub } from "@/components/sections/llm-hub";
import { Pricing } from "@/components/sections/pricing";
import { Faq } from "@/components/sections/faq";
import { ContactForm } from "@/components/sections/contact-form";
import { Footer } from "@/components/sections/footer";

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      <LogosBar />
      <Features />
      <HowItWorks />
      <UseCases />
      <WorkspaceMode />
      <LlmHub />
      <Pricing />
      <Faq />
      <ContactForm />
      <Footer />
    </main>
  );
}

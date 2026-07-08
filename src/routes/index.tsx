import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { Nav } from "@/components/ktv/Nav";
import { Hero } from "@/components/ktv/Hero";
import { About } from "@/components/ktv/About";
import { VisionMission } from "@/components/ktv/VisionMission";
import { Problem } from "@/components/ktv/Problem";
import { Role } from "@/components/ktv/Role";
import { Ecosystem } from "@/components/ktv/Ecosystem";
import { Membership } from "@/components/ktv/Membership";
import { Programs } from "@/components/ktv/Programs";
import { PartnerCTA } from "@/components/ktv/PartnerCTA";
import { News } from "@/components/ktv/News";
import { Contact } from "@/components/ktv/Contact";
import { Footer } from "@/components/ktv/Footer";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <About />
        <VisionMission />
        <Problem />
        <Role />
        <Ecosystem />
        <Membership />
        <Programs />
        <PartnerCTA />
        <News />
        <Contact />
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
}

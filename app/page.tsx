import Header from "../components/Header";
import Hero from "../components/Hero";
import EducationCard from "../components/EducationCard";
import FocusAreaCard from "../components/FocusAreaCard";
import QuickLinks from "../components/QuickLinks";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div
      id="top"
      className="relative flex min-h-screen flex-col bg-[#09090b] text-zinc-100 selection:bg-zinc-100 selection:text-zinc-950"
    >
      {/* Background subtle ambient radial glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px] overflow-hidden opacity-30"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-0 h-[350px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-zinc-700/20 via-zinc-800/10 to-transparent blur-3xl" />
      </div>

      <Header />

      <main className="mx-auto w-full max-w-5xl flex-grow px-6 lg:px-8">
        <Hero />

        {/* Grid Section - 2 Columns */}
        <section className="grid gap-5 border-b border-zinc-800/80 py-16 md:grid-cols-2 lg:py-20">
          <EducationCard />
          <FocusAreaCard />
        </section>

        {/* Link Utili Section */}
        <QuickLinks />
      </main>

      <Footer />
    </div>
  );
}
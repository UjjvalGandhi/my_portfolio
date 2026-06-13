import Cursor         from "@/components/Cursor";
import ProgressBar    from "@/components/ProgressBar";
import Navbar         from "@/components/Navbar";
import Hero           from "@/components/Hero";
import MarqueeSection from "@/components/MarqueeSection";
import Skills         from "@/components/Skills";
import Experience     from "@/components/Experience";
import Projects       from "@/components/Projects";
import Contact        from "@/components/Contact";
import Footer         from "@/components/Footer";
import JsonLd         from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Cursor />
      <ProgressBar />
      <Navbar />
      <main>
        <Hero />
        <MarqueeSection />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

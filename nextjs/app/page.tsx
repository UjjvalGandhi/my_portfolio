import SmoothScroll from "@/components/SmoothScroll";
import GridRails   from "@/components/GridRails";
import ProgressBar from "@/components/ProgressBar";
import Navbar      from "@/components/Navbar";
import Hero        from "@/components/Hero";
import Marquee     from "@/components/Marquee";
import About       from "@/components/About";
import Skills      from "@/components/Skills";
import Experience  from "@/components/Experience";
import Projects    from "@/components/Projects";
import Packages    from "@/components/Packages";
import Contact     from "@/components/Contact";
import Footer      from "@/components/Footer";
import JsonLd      from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <SmoothScroll />
      <GridRails />
      <ProgressBar />
      <Navbar />

      <main>
        <div className="shell">
          <Hero />
        </div>

        {/* full-bleed band */}
        <Marquee />

        <div className="shell">
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Packages />
        </div>

        {/* full-bleed inverted block */}
        <Contact />
      </main>

      <Footer />
    </>
  );
}

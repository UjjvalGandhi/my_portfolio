import Aurora      from "@/components/Aurora";
import Cursor      from "@/components/Cursor";
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
      <Aurora />
      <Cursor />
      <ProgressBar />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Packages />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

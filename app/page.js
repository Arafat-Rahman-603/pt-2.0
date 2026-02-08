import Navbar from "@/componentes/Navbar";
import Hero from "@/componentes/Hero";
import Projects from "@/componentes/Projects";
import About from "@/componentes/About";
import Contact from "@/componentes/Contact";
import Skills from "@/componentes/Skills";
import Education from "@/componentes/Education";
import Resume from "@/componentes/Resume";
import Footer from "@/componentes/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Resume />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
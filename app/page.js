import Navbar from "@/componentes/Navbar";
import Hero from "@/componentes/Hero";
import Projects from "@/componentes/Projects";
import About from "@/componentes/About";
import Contact from "@/componentes/Contact";
import Skills from "@/componentes/Skills";
import Reviews from "@/componentes/Reviews";
import Education from "@/componentes/Education";
import Resume from "@/componentes/Resume";
import Footer from "@/componentes/Footer";
import CustomCursor from "@/componentes/CustomCursor ";
import Background3D from "@/componentes/Background3D";
import ScrollProgress from "@/componentes/ScrollProgress";

export default function Home() {
  return (
    <>
      <Background3D />
      <CustomCursor />
      <ScrollProgress />
      <div className="site-content">
        <Navbar />
        <main>
          <Hero />
          <Projects />
          <Reviews />
          <About />
          <Skills />
          <Resume />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

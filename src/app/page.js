import { getPage, navigation, socials, footer, site } from "@/lib/content";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackgroundCanvas from "@/components/three/BackgroundCanvas";
import CustomCursor from "@/components/effects/CustomCursor";
import ScrollProgress from "@/components/effects/ScrollProgress";

import Hero from "@/components/sections/Hero";
import TechMarquee from "@/components/sections/TechMarquee";
import Journey from "@/components/sections/Journey";
import Projects from "@/components/sections/Projects";
import Reviews from "@/components/sections/Reviews";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Resume from "@/components/sections/Resume";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  const home = getPage("home");

  return (
    <>
      <BackgroundCanvas />
      <CustomCursor />
      <ScrollProgress />

      <div className="site-content">
        <Navbar navigation={navigation} siteName={site.name} />
        <main id="main">
          <Hero data={home.hero} />
          <TechMarquee items={home.marquee} />
          <Journey data={home.journey} />
          <Projects data={home.projects} />
          <Reviews data={home.reviews} />
          <About data={home.about} />
          <Skills data={home.skills} />
          <Resume data={home.resume} />
          <Education data={home.education} />
          <Contact data={home.contact} socials={socials} />
        </main>
        <Footer data={footer} navigation={navigation} socials={socials} siteName={site.name} />
      </div>
    </>
  );
}

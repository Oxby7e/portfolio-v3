import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Section from "@/components/Section";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Footer from "@/components/Footer";
import Background from "@/components/Background";

export default function Home() {
  return (
    <main className="container">
      <Background />
      
      <Nav />
      
      <Hero />
      
      <About />
      
      <Experience />
      
      <Section id="skills">
        <Skills />
      </Section>
      
      {/* <Achievements /> */}

      <Section id="projects">
        <Projects />
      </Section>
      
      <Footer id="contact" />
    </main>
  );
}

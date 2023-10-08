import Contact from "@/components/Pages/Home/Contact";
import Hero from "@/components/Pages/Home/Hero";
import HowToContribute from "@/components/Pages/Home/HowToContribute";
import ProjectCard from "@/components/shared/Card/ProjectCard";
import ProjectList from "@/components/shared/List/ProjectList";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <ProjectList title="Some Projects: " type="open source project" limit={3}/>
      <ProjectList title="Open Science Projects: " type="open science project" limit={3} />
      <HowToContribute />
      <Contact />
    </main>
  );
}

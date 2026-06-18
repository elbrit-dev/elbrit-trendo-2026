import Scene3D from "@/components/Scene3D";
import ScrollReveals from "@/components/ScrollReveals";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Highlights from "@/components/Highlights";
import Countdown from "@/components/Countdown";
import Agenda from "@/components/Agenda";
import Register from "@/components/Register";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Scene3D />
      <ScrollReveals />
      <Nav />
      <main className="page">
        <Hero />
        <Stats />
        <Highlights />
        <Countdown />
        <Agenda />
        <Register />
      </main>
      <Footer />
    </>
  );
}

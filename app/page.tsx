import Scene3D from "@/components/Scene3D";
import ScrollReveals from "@/components/ScrollReveals";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import WhyVisit from "@/components/WhyVisit";
import VisitUs from "@/components/VisitUs";
import Agenda from "@/components/Agenda";
import RegistrationForm from "@/components/form/RegistrationForm";
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
        <WhyVisit />
        <VisitUs />
        <Agenda />
        <RegistrationForm />
      </main>
      <Footer />
    </>
  );
}

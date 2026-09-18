import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Room from "@/components/Room";
import Gallery from "@/components/Gallery";
import Menu from "@/components/Menu";
import Visit from "@/components/Visit";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Room />
        <Gallery />
        <Menu />
        <Visit />
      </main>
      <Footer />
    </>
  );
}

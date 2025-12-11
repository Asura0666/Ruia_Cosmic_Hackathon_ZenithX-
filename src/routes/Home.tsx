import About from "../components/base/About";
import Collections from "../components/base/Collections";
import Contact from "../components/base/Contact";
import Features from "../components/base/Features";
import Footer from "../components/base/Footer";
import Header from "../components/base/Header";
import NewsLetter from "../components/base/NewsLetter";
import { HoverBorderGradient } from "../components/ui/hover-border-gradient";

export const Home: React.FC = () => {
  return (
    <main className="relative w-full flex flex-col bg-white">
      {/* Hero Section with Video */}
      <section className="relative w-full min-h-screen flex flex-col bg-black">
        {/* Video Background */}
        <video
          src="/space_compressed.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

        {/* Header */}
        <Header />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center text-white px-6 pt-16">
          <p className="max-w-xl text-base font-bold md:text-lg text-white/80 drop-shadow mb-4">
            Visualizing global satellites, environmental patterns, and orbital
            activity — all in one cosmic dashboard.
          </p>

          <h1 className="text-3xl md:text-7xl font-extralight drop-shadow-xl mb-8 leading-tight">
            Humanity’s Footprint
            <br />
            <span className="text-yellow-500">.OrbitScope</span>
          </h1>

          <div className="flex items-center justify-center mt-6">
            <a href="/satellites">
              <HoverBorderGradient
                containerClassName="rounded-full w-fit"
                as="button"
                className="flex items-center space-x-2 backdrop-blur-md bg-white/5 px-6 py-2 text-white"
              >
                <span>Satellites</span>
              </HoverBorderGradient>
            </a>
          </div>
        </div>
      </section>

      <About />

      <Collections />

      <Features />

      <Contact />

      <NewsLetter />

      {/* Footer */}
      <Footer />
    </main>
  );
};

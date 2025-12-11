import {
  ArrowRight,
  Heart,
  Leaf,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

const About = () => {
  return (
    <section id="about" className="max-w-7xl mx-auto px-6 py-16 text-black">
      <div className="flex gap-3 items-center justify-center mb-12">
        <Star size={36} className="text-red-400" />
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-2 ">
          About Us
        </h2>
        <Star size={36} className="text-red-400" />
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold mb-4">
            Why Choose <span className="text-red-400">.OrbitScope</span>?
          </h3>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col items-center text-center space-y-2">
              <Sparkles className="text-red-400" size={34} />
              <p className="font-medium">Accurate Data</p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <ShieldCheck className="text-red-400" size={34} />
              <p className="font-medium">Global Coverage</p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <Heart className="text-red-400" size={34} />
              <p className="font-medium"> Secure & Reliable</p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <Leaf className="text-red-400" size={34} />
              <p className="font-medium">Educational & Insightful</p>
            </div>
          </div>

          <a
            href="#"
            className="flex items-center gap-2 text-red-400 font-medium hover:underline w-fit"
          >
            Learn more
            <ArrowRight size={16} className="mt-1" />
          </a>
        </div>

        <div className="text-black/70 leading-relaxed text-base md:text-lg">
          At <span className="text-indigo-400 font-medium">.OrbitScope</span>,
          we turn complex space data into clear, intuitive insights. Our goal is
          to help users explore how satellites shape communication, climate
          monitoring, navigation, and modern scientific discovery.
          <br />
          <br />
          We provide accurate visuals on
          <span className="text-indigo-400 font-medium">
            {" "}
            satellite distribution
          </span>
          ,
          <span className="text-indigo-400 font-medium"> orbital activity</span>
          , and
          <span className="text-indigo-400 font-medium">
            {" "}
            environmental patterns
          </span>
          detected through remote sensing.
          <br />
          <br />
          From design to performance, our commitment to
          <span className="text-indigo-400 font-medium">
            {" "}
            clarity, accuracy, and reliability
          </span>
          drives every feature we build.
        </div>
      </div>
    </section>
  );
};

export default About;

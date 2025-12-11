
import { ArrowRight, Flower2, Rocket, Star, Sun } from "lucide-react";

const featuresData = [
  {
    icon: <Flower2 size={36} className="text-indigo-500" />,
    title: "Environmental Insights",
    description:
      "Access temperature readings and other Earth-observation metrics captured by satellites to understand climate patterns and atmospheric behavior.",
    link: "#",
  },
  {
    icon: <Rocket size={36} className="text-green-500" />,
    title: "Fast & Optimized Performance",
    description:
      "Our platform is built with clean, efficient code to ensure lightning-fast loading, smooth navigation, and seamless data visualization.",
    link: "#",
  },
  {
    icon: <Sun size={36} className="text-yellow-400" />,
    title: "AI-Enhanced Analytics",
    description:
      "We use AI to simplify complex data, generate meaningful insights, and help users interpret satellite information with clarity.",
    link: "#",
  },
];

const Features = () => {
  return (
    <section id="features" className="max-w-7xl mx-auto px-6 py-16 text-black">
      <div className="flex gap-3 items-center justify-center mb-12">
        <Star size={36} className="text-red-400" />
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-2 ">
          Our Features
        </h2>
        <Star size={36} className="text-red-400" />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {featuresData.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-start p-6 bg-white/5 backdrop-blur-md rounded-2xl shadow hover:shadow-lg transition"
          >
            <div className="flex gap-2">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            </div>
            <p className="text-black/80 mb-4">{feature.description}</p>
            <a
              href={feature.link}
              className="text-indigo-400 font-medium hover:underline flex items-center gap-1"
            >
              <div className="flex items-center gap-2">
                <span>Learn more</span>
                <ArrowRight size={16} className="mt-1" />
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;

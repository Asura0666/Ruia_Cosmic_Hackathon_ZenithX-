const NewsLetter = () => {
  return (
    <section
      id="newsletter"
      className="w-full bg-gradient-to-br from-rose-200 via-indigo-200 to-yellow-200 py-24"
    >
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-sm md:text-base text-indigo-600 font-medium tracking-wide mb-2">
          Stay Connected with .OrbitScope
        </p>

        <h2 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-4">
          Don’t Miss Space & Satellite Insights
        </h2>

        <p className="text-gray-600 text-lg md:text-xl mb-10">
          Get updates on global satellite activity, orbital trends, space-data
          visualizations, and new features—delivered directly to your inbox.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full sm:w-96 px-5 py-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button className="px-8 py-3 rounded-full bg-indigo-600 text-white font-medium shadow-md hover:bg-indigo-700 transition">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;

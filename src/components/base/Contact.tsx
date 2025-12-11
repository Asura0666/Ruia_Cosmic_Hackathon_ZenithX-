import { ArrowRight, Flower, Mail, MapPin, Phone, Sun } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 py-16 text-black">
      <div className="flex gap-3 items-center justify-center mb-12">
        <Sun size={36} className="text-red-400" />
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-2 ">
          Contact Us
        </h2>
        <Sun size={36} className="text-red-400" />
      </div>

      <div className="p-10 bg-white/5 backdrop-blur-md rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
          <p className="text-black/80 mb-8">
            Feel free to contact us for support or inquiries. We&apos;re always here
            to help.
          </p>

          <div className="flex items-center gap-4 mb-4">
            <Phone className="text-indigo-500" />
            <span className="text-black/90 font-medium">+91 98765 43210</span>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <Mail className="text-green-600" />
            <span className="text-black/90 font-medium">
              support@roseking.com
            </span>
          </div>

          <div className="flex items-center gap-4">
            <MapPin className="text-red-500" />
            <span className="text-black/90 font-medium">
              Delhi, India — 110001
            </span>
          </div>
        </div>

        <form className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg border border-black/20 bg-white/60"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg border border-black/20 bg-white/60"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-lg border border-black/20 bg-white/60"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg border border-black/20 bg-white/60"
              placeholder="Type your subject"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              rows={4}
              className="w-full p-3 rounded-lg border border-black/20 bg-white/60"
              placeholder="Write your message..."
            />
          </div>

          <div className="md:col-span-1">
            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
            >
              Send Message <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;

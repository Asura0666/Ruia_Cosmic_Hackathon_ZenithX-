import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-black/10 bg-white backdrop-blur-md text-black py-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm font-semibold text-black/60">
          © {new Date().getFullYear()} OrbitScope. All rights reserved.
        </p>

        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-black/70">Follow us:</span>

          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-black/90 transition">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-black/90 transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-black/90 transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-black/90 transition">
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { HoverBorderGradient } from "../ui/hover-border-gradient";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) setScrolled(true);
      else setScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
      ${
        scrolled
          ? "bg-black/40 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between text-white">
        {/* Logo */}
        <div className="font-bold text-3xl">
          <a href="/">.OrbitScope</a>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-light">
          <li>
            <a href="/" className="hover:text-white/70">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-white/70">
              About
            </a>
          </li>
          <li>
            <a href="#features" className="hover:text-white/70">
              Features
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-white/70">
              Contact
            </a>
          </li>

          <a href="/satellites">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="flex items-center space-x-2 backdrop-blur-md bg-white/5"
            >
              <span>Satellites</span>
            </HoverBorderGradient>
          </a>
        </ul>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden bg-black/70 backdrop-blur-xl border-t border-white/10 text-white px-4 py-4 space-y-4">
          <div className="flex flex-col gap-4 text-base px-2">
            <a href="#" className="text-left hover:text-white/70">
              Home
            </a>
            <a href="#about" className="text-left hover:text-white/70">
              About
            </a>
            <a href="#features" className="text-left hover:text-white/70">
              Features
            </a>
            <a href="#contacts" className="text-left hover:text-white/70">
              Contact
            </a>
          </div>

          <a href="/satellites">
            <HoverBorderGradient
              containerClassName="rounded-full w-fit"
              as="button"
              className="flex items-center space-x-2 backdrop-blur-md bg-white/5"
            >
              <span>Satellites</span>
            </HoverBorderGradient>
          </a>
        </div>
      )}
    </header>
  );
}

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/pricing", label: "Pricing" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#000428]/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,4,40,0.5)] border-b border-white/5"
          : "bg-gradient-to-b from-[#000428]/80 to-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#004e92] to-[#000428] border border-white/10 flex items-center justify-center font-bold text-white text-lg shadow-[0_4px_14px_rgba(0,78,146,0.5)] group-hover:scale-105 transition-transform">
            M
          </span>
          <span className="font-bold text-lg tracking-tight text-white">
            MyCab<span className="text-[#4fa8e8]">Express</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`relative text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[#004e92] rounded ${
                pathname === l.to
                  ? "text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {l.label}
              {pathname === l.to && (
                <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#4fa8e8] rounded-full" />
              )}
            </Link>
          ))}
          <a
            href="tel:+911234567890"
            className="relative flex items-center gap-2 bg-white text-[#000428] font-bold text-sm px-5 py-2.5 rounded-full transition-all hover:shadow-[0_6px_20px_rgba(255,255,255,0.25)] hover:-translate-y-0.5"
          >
            <Phone size={16} strokeWidth={2.5} />
            Call Support
          </a>
        </div>

        <button
          className="lg:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-[#000428] border-t border-white/10 px-6 py-5 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-base ${
                pathname === l.to ? "text-[#4fa8e8] font-semibold" : "text-white/85"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="tel:+911234567890"
            className="flex items-center justify-center gap-2 bg-white text-[#000428] font-bold text-sm px-4 py-3 rounded-full mt-2"
          >
            <Phone size={16} /> Call Support
          </a>
        </div>
      )}
    </header>
  );
}
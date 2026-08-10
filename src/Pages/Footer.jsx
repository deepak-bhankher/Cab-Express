import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Share2,
  Send,
  Globe,
  MessageCircle,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const floatSlow = {
  animate: {
    y: [0, -16, 0],
    x: [0, 10, 0],
    transition: { duration: 12, repeat: Infinity, ease: "easeInOut" },
  },
};

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const cities = [
  { label: "Delhi NCR", href: "#" },
  { label: "Hisar", href: "#" },
  { label: "Chandigarh", href: "#" },
  { label: "Jaipur", href: "#" },
  { label: "Panipat", href: "#" },
];

const socials = [
  { icon: Share2, href: "#", label: "Facebook" },
  { icon: Globe, href: "#", label: "Instagram" },
  { icon: Send, href: "#", label: "Twitter" },
  { icon: MessageCircle, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#000428] to-[#000114] overflow-hidden">
      {/* subtle grid, matches hero */}
      <div
        className="absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,114,198,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,114,198,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <motion.div
        variants={floatSlow}
        animate="animate"
        className="absolute -bottom-32 -left-20 w-80 h-80 bg-[#004e92]/20 rounded-full blur-3xl"
      />
      <div className="absolute -top-16 right-0 w-72 h-72 bg-[#0072c6]/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="grid md:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-12 pb-14 border-b border-white/10"
        >
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 w-fit">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#004e92] to-[#0072c6] flex items-center justify-center">
                <MapPin size={18} className="text-white" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                MyCab<span className="text-[#66c2ff]">Express</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm mt-5 leading-relaxed max-w-xs">
              Upfront fares, verified drivers, and a booking that confirms in
              seconds — no calling, no haggling.
            </p>
            <div className="flex items-center gap-2 mt-6 text-[#66c2ff]">
              <ShieldCheck size={16} />
              <span className="text-xs font-mono tracking-wide uppercase">
                Verified & insured rides
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-white font-bold text-sm mb-5">Quick Links</p>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.href}
                    className="text-white/50 text-sm hover:text-[#66c2ff] hover:translate-x-1 transition-all inline-block"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <p className="text-white font-bold text-sm mb-5">Cities We Serve</p>
            <ul className="space-y-3">
              {cities.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    className="text-white/50 text-sm hover:text-[#66c2ff] hover:translate-x-1 transition-all inline-block"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white font-bold text-sm mb-5">Get in Touch</p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-[#0072c6] mt-0.5 shrink-0" />
                <a
                  href="tel:+911234567890"
                  className="text-white/50 text-sm hover:text-[#66c2ff] transition-colors"
                >
                 +91 96252 44217
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-[#0072c6] mt-0.5 shrink-0" />
                <a
                  href="mailto:support@ridenow.com"
                  className="text-white/50 text-sm hover:text-[#66c2ff] transition-colors"
                >
                  support@ridenow.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#0072c6] mt-0.5 shrink-0" />
                <span className="text-white/50 text-sm">
                  Hisar, Haryana, India
                </span>
              </li>
            </ul>

            <div className="flex items-center gap-3 mt-6">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  whileHover={{ y: -3, scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#66c2ff] hover:border-[#0072c6]/50 transition-colors"
                >
                  <s.icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
        >
          <p className="text-white/35 text-xs">
            © {new Date().getFullYear()} RideNow. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-white/35 text-xs hover:text-white/60 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-white/35 text-xs hover:text-white/60 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-white/35 text-xs hover:text-white/60 transition-colors"
            >
              Refund Policy
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Loader2,
  CheckCircle2,
  User,
  MessageSquare,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerGrid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const floatSlow = {
  animate: {
    y: [0, 20, 0],
    x: [0, 10, 0],
    transition: { duration: 11, repeat: Infinity, ease: "easeInOut" },
  },
};

const floatSlower = {
  animate: {
    y: [0, -18, 0],
    x: [0, -10, 0],
    transition: { duration: 14, repeat: Infinity, ease: "easeInOut" },
  },
};

const contactInfo = [
  {
    icon: Phone,
    title: "Call us",
    text: "+91 12345 67890",
    sub: "Mon - Sun, 24/7 support",
  },
  {
    icon: Mail,
    title: "Email us",
    text: "support@ridenow.com",
    sub: "We reply within a few hours",
  },
  {
    icon: MapPin,
    title: "Visit us",
    text: "Hisar, Haryana, India",
    sub: "Head office & operations",
  },
  {
    icon: Clock,
    title: "Working hours",
    text: "Always available",
    sub: "Bookings never sleep",
  },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!name.trim() || !/^\d{10}$/.test(phone.trim()) || !message.trim()) {
      setError("Fill your name, a valid 10-digit phone, and a message");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 600);
  }

  return (
    <section className="relative bg-gradient-to-br from-[#000428] via-[#001845] to-[#000428] py-24 pt-32 overflow-hidden">
      {/* grid + glow, matches hero */}
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
        className="absolute -top-24 -left-24 w-96 h-96 bg-[#004e92]/20 rounded-full blur-3xl"
      />
      <motion.div
        variants={floatSlower}
        animate="animate"
        className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#0072c6]/10 rounded-full blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="max-w-xl mb-16"
        >
          <span className="text-[#66c2ff] font-mono text-xs tracking-widest uppercase font-semibold">
            Get in touch
          </span>
          <h2 className="font-bold text-3xl sm:text-4xl text-white mt-3">
            We're here whenever you need a ride.
          </h2>
          <p className="text-white/50 mt-4 text-base">
            Questions, feedback, or a special booking request — drop us a
            message and our team will get back to you shortly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
          {/* Info cards */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerGrid}
            className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4"
          >
            {contactInfo.map((c) => (
              <motion.div
                key={c.title}
                variants={fadeUp}
                whileHover={{ y: -4, x: 2 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-[#0072c6]/40 hover:bg-white/[0.07] transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#004e92] to-[#0072c6] flex items-center justify-center shrink-0">
                  <c.icon size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{c.title}</p>
                  <p className="text-[#66c2ff] text-sm mt-1">{c.text}</p>
                  <p className="text-white/40 text-xs mt-0.5">{c.sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Form card */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_25px_70px_rgba(0,4,40,0.55)] border border-white/50 overflow-hidden"
          >
            <div className="h-1.5 bg-gradient-to-r from-[#004e92] via-[#0072c6] to-[#001845]" />
            <div className="p-7 sm:p-8">
              {!sent ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="font-bold text-[#000428] text-lg mb-1">
                    Send us a message
                  </p>

                  <div className="flex items-center gap-3 bg-[#F5F7FA] rounded-xl border border-[#000428]/10 px-4 py-3 focus-within:border-[#004e92] transition-colors">
                    <User size={18} className="text-[#004e92] shrink-0" />
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full bg-transparent outline-none text-sm text-[#000428] placeholder:text-[#000428]/40"
                    />
                  </div>

                  <div className="flex items-center gap-3 bg-[#F5F7FA] rounded-xl border border-[#000428]/10 px-4 py-3 focus-within:border-[#004e92] transition-colors">
                    <Phone size={18} className="text-[#004e92] shrink-0" />
                    <input
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                      }
                      placeholder="10-digit phone number"
                      inputMode="numeric"
                      className="w-full bg-transparent outline-none text-sm text-[#000428] placeholder:text-[#000428]/40"
                    />
                  </div>

                  <div className="flex items-start gap-3 bg-[#F5F7FA] rounded-xl border border-[#000428]/10 px-4 py-3 focus-within:border-[#004e92] transition-colors">
                    <MessageSquare size={18} className="text-[#004e92] shrink-0 mt-0.5" />
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us how we can help"
                      rows={4}
                      className="w-full bg-transparent outline-none text-sm text-[#000428] placeholder:text-[#000428]/40 resize-none"
                    />
                  </div>

                  {error && <p className="text-sm text-red-600">{error}</p>}

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ y: -2, boxShadow: "0 14px 34px rgba(0,78,146,0.5)" }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="w-full flex items-center cursor-pointer justify-center gap-2 bg-gradient-to-r from-[#004e92] to-[#000428] text-white font-bold text-sm py-3.5 rounded-xl disabled:opacity-60"
                  >
                    {loading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Send size={18} />
                    )}
                    Send Message
                  </motion.button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-3">
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
                  >
                    <CheckCircle2 size={44} className="text-[#004e92] mx-auto" />
                  </motion.div>
                  <p className="font-bold text-[#000428] text-lg">
                    Message sent!
                  </p>
                  <p className="text-sm text-[#000428]/60">
                    Thanks {name}, our team will reach out to you on {phone}{" "}
                    shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setName("");
                      setPhone("");
                      setMessage("");
                    }}
                    className="mt-2 text-sm font-bold text-[#004e92] underline underline-offset-4 hover:text-[#000428]"
                  >
                    Send another message
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
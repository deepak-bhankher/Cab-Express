import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Clock,
  Wallet,
  Star,
  MapPinned,
  Gauge,
  PhoneCall,
  MapPin,
  Navigation,
  Search,
  Phone,
  CheckCircle2,
  Loader2,
  ArrowLeft,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const steps = [
  {
    icon: MapPinned,
    title: "Drop your pin",
    text: "Tell us where you are and where you're going — no app-hunting for GPS.",
  },
  {
    icon: Gauge,
    title: "See the fare upfront",
    text: "One tap and the price is on screen. No meter surprises, no haggling.",
  },
  {
    icon: PhoneCall,
    title: "We call, you ride",
    text: "Your booking is saved instantly. Our team calls to confirm your driver.",
  },
];

const trust = [
  { icon: ShieldCheck, title: "Verified drivers", text: "Every driver on our network is background-checked." },
  { icon: Wallet, title: "Fixed, fair fares", text: "The price you see is the price you pay — every time." },
  { icon: Clock, title: "On-time pickups", text: "Real people confirming your ride, not a black-box algorithm." },
];

// ---- Inline booking card (placeholder fare, no backend call yet) ----
const STEPS = { SEARCH: "search", FARE: "fare", DONE: "done" };

function BookingCard() {
  const [step, setStep] = useState(STEPS.SEARCH);
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [fare, setFare] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    setError("");
    if (!pickup.trim() || !drop.trim()) {
      setError("Enter both pickup and drop location");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setFare(499);
      setStep(STEPS.FARE);
      setLoading(false);
    }, 500);
  }

  function handleBook(e) {
    e.preventDefault();
    setError("");
    if (!name.trim() || !/^\d{10}$/.test(phone.trim())) {
      setError("Enter your name and a valid 10-digit phone number");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setStep(STEPS.DONE);
      setLoading(false);
    }, 500);
  }

  function reset() {
    setStep(STEPS.SEARCH);
    setPickup("");
    setDrop("");
    setPhone("");
    setName("");
    setFare(null);
    setError("");
  }

  return (
    <div className="relative w-full max-w-md bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_25px_70px_rgba(0,4,40,0.55)] border border-white/50 overflow-hidden">
      <div className="h-1.5 bg-gradient-to-r from-[#004e92] via-[#0072c6] to-[#D4AF37]" />
      <div className="p-6 sm:p-7">
        <AnimatePresence mode="wait">
          {step === STEPS.SEARCH && (
            <motion.form
              key="search"
              onSubmit={handleSearch}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <p className="font-bold text-[#000428] text-lg">Where are you headed?</p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-[#F5F7FA] rounded-xl border border-[#000428]/10 px-4 py-3 focus-within:border-[#004e92] transition-colors">
                  <MapPin size={18} className="text-[#004e92] shrink-0" />
                  <input
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="Pickup location"
                    className="w-full bg-transparent outline-none text-sm text-[#000428] placeholder:text-[#000428]/40"
                  />
                </div>
                <div className="flex items-center gap-3 bg-[#F5F7FA] rounded-xl border border-[#000428]/10 px-4 py-3 focus-within:border-[#004e92] transition-colors">
                  <Navigation size={18} className="text-[#D4AF37] shrink-0" />
                  <input
                    value={drop}
                    onChange={(e) => setDrop(e.target.value)}
                    placeholder="Drop location"
                    className="w-full bg-transparent outline-none text-sm text-[#000428] placeholder:text-[#000428]/40"
                  />
                </div>
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#004e92] to-[#000428] text-white font-bold text-sm py-3.5 rounded-xl transition-all hover:shadow-[0_10px_30px_rgba(0,78,146,0.45)] hover:-translate-y-0.5 disabled:opacity-60"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                Search Taxi
              </button>
            </motion.form>
          )}

          {step === STEPS.FARE && (
            <motion.form
              key="fare"
              onSubmit={handleBook}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <button
                type="button"
                onClick={() => setStep(STEPS.SEARCH)}
                className="flex items-center gap-1 text-xs text-[#000428]/60 hover:text-[#000428] transition-colors"
              >
                <ArrowLeft size={14} /> Change route
              </button>

              <div className="bg-gradient-to-br from-[#000428] to-[#004e92] rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-xs">{pickup} → {drop}</p>
                  <p className="text-white/40 text-[11px] mt-0.5">Estimated fare</p>
                </div>
                <div className="text-[#D4AF37] text-2xl font-mono font-bold">
                  ₹{fare}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-[#F5F7FA] rounded-xl border border-[#000428]/10 px-4 py-3 focus-within:border-[#004e92] transition-colors">
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
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="10-digit phone number"
                    inputMode="numeric"
                    className="w-full bg-transparent outline-none text-sm text-[#000428] placeholder:text-[#000428]/40"
                  />
                </div>
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#c19b2e] text-[#000428] font-bold text-sm py-3.5 rounded-xl transition-all hover:shadow-[0_10px_30px_rgba(212,175,55,0.45)] hover:-translate-y-0.5 disabled:opacity-60"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : null}
                Book Taxi
              </button>
              <p className="text-[11px] text-[#000428]/50 text-center">
                No call needed — your booking saves instantly and our team calls you.
              </p>
            </motion.form>
          )}

          {step === STEPS.DONE && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center py-4 space-y-3"
            >
              <CheckCircle2 size={44} className="text-[#004e92] mx-auto" />
              <p className="font-bold text-[#000428] text-lg">Booking confirmed!</p>
              <p className="text-sm text-[#000428]/60">
                We've got your ride from <b>{pickup}</b> to <b>{drop}</b>. Our
                team will call {phone} shortly to confirm your driver.
              </p>
              <button
                onClick={reset}
                className="mt-2 text-sm font-bold text-[#004e92] underline underline-offset-4 hover:text-[#000428]"
              >
                Book another ride
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-[#000428] via-[#001845] to-[#004e92] overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
        <div
          className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,175,55,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute -top-24 -right-24 w-[30rem] h-[30rem] bg-[#D4AF37]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#004e92]/30 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <span className="inline-flex items-center gap-2 bg-white/5 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono tracking-widest uppercase px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              Now booking across your city
            </span>
            <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.05] tracking-tight">
              Your ride is a
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#f2d878] bg-clip-text text-transparent"> tap</span> away.
            </h1>
            <p className="mt-6 text-white/60 text-lg max-w-md">
              Enter your pickup and drop, see your fare instantly, and book —
              no calling, no waiting on hold.
            </p>

            <div className="mt-10 flex items-center gap-8">
              <div>
                <p className="text-2xl font-bold text-white">4.9<span className="text-[#D4AF37]">★</span></p>
                <p className="text-white/40 text-xs mt-1">Rider rating</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <p className="text-2xl font-bold text-white">12k+</p>
                <p className="text-white/40 text-xs mt-1">Rides completed</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <p className="text-2xl font-bold text-white">24/7</p>
                <p className="text-white/40 text-xs mt-1">Always available</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:justify-self-end w-full flex justify-center lg:block"
          >
            <BookingCard />
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[#F5F7FA] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            className="max-w-xl mb-16"
          >
            <span className="text-[#004e92] font-mono text-xs tracking-widest uppercase font-semibold">
              How booking works
            </span>
            <h2 className="font-bold text-3xl sm:text-4xl text-[#000428] mt-3">
              Three steps. No phone call required.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUp}
                transition={{ delay: i * 0.12 }}
                className="bg-white rounded-2xl p-7 border border-[#000428]/5 hover:border-[#D4AF37]/50 hover:shadow-[0_20px_40px_rgba(0,4,40,0.08)] transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#004e92] to-[#000428] flex items-center justify-center mb-5">
                  <s.icon size={20} className="text-[#D4AF37]" />
                </div>
                <h3 className="font-bold text-lg text-[#000428] mb-2">
                  {s.title}
                </h3>
                <p className="text-[#000428]/55 text-sm leading-relaxed">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-gradient-to-br from-[#000428] to-[#001845] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            className="flex items-center gap-2 mb-12"
          >
            <Star size={18} className="text-[#D4AF37] fill-[#D4AF37]" />
            <p className="text-white/70 text-sm">
              Trusted by riders across the city
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-8">
            {trust.map((t, i) => (
              <motion.div
                key={t.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUp}
                transition={{ delay: i * 0.12 }}
                className="flex gap-4"
              >
                <t.icon size={22} className="text-[#D4AF37] shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white text-base mb-1">
                    {t.title}
                  </h4>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {t.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#D4AF37] to-[#e8c968] py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-bold text-2xl sm:text-3xl text-[#000428]">
              Ready when you are.
            </h3>
            <p className="text-[#000428]/70 mt-1">
              Book your first ride in under a minute.
            </p>
          </div>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="bg-gradient-to-r from-[#000428] to-[#004e92] text-white font-bold text-sm px-7 py-3.5 rounded-full hover:shadow-[0_10px_30px_rgba(0,4,40,0.4)] hover:-translate-y-0.5 transition-all shrink-0"
          >
            Book a taxi now
          </a>
        </div>
      </section>
    </div>
  );
}
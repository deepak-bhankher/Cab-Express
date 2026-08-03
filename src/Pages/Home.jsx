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
  Car,
} from "lucide-react";
import { createBooking } from "../lib/api";
import { calculateFare, getFixedFare } from "../lib/fareCalculator";
import CityInput from "../Components/Cityinput";

const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');
    .font-display { font-family: 'Space Grotesk', sans-serif; }
    .font-body { font-family: 'Inter', sans-serif; }
    .font-data { font-family: 'IBM Plex Mono', monospace; }
  `}</style>
);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const heroItem = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const staggerGrid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const floatSlow = {
  animate: {
    y: [0, 24, 0],
    x: [0, 12, 0],
    transition: { duration: 10, repeat: Infinity, ease: "easeInOut" },
  },
};

const floatSlower = {
  animate: {
    y: [0, -20, 0],
    x: [0, -14, 0],
    transition: { duration: 13, repeat: Infinity, ease: "easeInOut" },
  },
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

function RouteSignature() {
  return (
    <svg
      viewBox="0 0 640 420"
      fill="none"
      className="absolute inset-0 w-full h-full opacity-[0.35] pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
    >
      <motion.path
        d="M 40 360 C 160 360, 180 220, 300 220 S 460 80, 600 60"
        stroke="#66c2ff"
        strokeWidth="2.5"
        strokeDasharray="2 10"
        strokeLinecap="round"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -120 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      <motion.circle
        cx="40"
        cy="360"
        r="7"
        fill="#0EA894"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      />
      <circle cx="40" cy="360" r="13" stroke="#0EA894" strokeWidth="1.5" opacity="0.4" />
      <motion.circle
        cx="600"
        cy="60"
        r="7"
        fill="#FF6B4A"
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ scale: { duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1 } }}
      />
      <circle cx="600" cy="60" r="13" stroke="#FF6B4A" strokeWidth="1.5" opacity="0.4" />
    </svg>
  );
}

function RouteDivider({ tone = "light" }) {
  const lineColor = tone === "light" ? "#000428" : "#ffffff";
  return (
    <div className="relative h-px w-full max-w-7xl mx-auto px-6">
      <div
        className="w-full h-px"
        style={{
          backgroundImage: `linear-gradient(90deg, transparent, ${lineColor}22 20%, ${lineColor}22 80%, transparent)`,
        }}
      />
      <span
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: tone === "light" ? "#004e92" : "#66c2ff" }}
      />
    </div>
  );
}

const STEPS = { SEARCH: "search", FARE: "fare", DONE: "done" };

function BookingCard() {
  const [step, setStep] = useState(STEPS.SEARCH);
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [baseFares, setBaseFares] = useState(null);
  const [carType, setCarType] = useState("small");
  const [distanceKm, setDistanceKm] = useState(null);
  const [isFixedRoute, setIsFixedRoute] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const baseFare = baseFares ? baseFares[carType] : 0;

  async function handleSearch(e) {
    e.preventDefault();
    setError("");
    if (!pickup.trim() || !drop.trim()) {
      setError("Enter both pickup and drop location");
      return;
    }
    if (pickup.trim() === drop.trim()) {
      setError("Pickup and drop can't be the same city");
      return;
    }
    setLoading(true);

    setTimeout(() => {
      const fixed = getFixedFare(pickup.trim(), drop.trim());
      if (fixed) {
        setBaseFares(fixed);
        setDistanceKm(null);
        setIsFixedRoute(true);
        setCarType("small");
        setStep(STEPS.FARE);
        setLoading(false);
        return;
      }

      const result = calculateFare(pickup.trim(), drop.trim());
      if (!result) {
        setError("We don't service one of these cities yet.");
        setLoading(false);
        return;
      }
      setBaseFares({ small: result.fare, large: Math.round(result.fare * 1.2) });
      setDistanceKm(result.distanceKm);
      setIsFixedRoute(false);
      setCarType("small");
      setStep(STEPS.FARE);
      setLoading(false);
    }, 350);
  }

  async function handleBook(e) {
    e.preventDefault();
    setError("");
    if (!name.trim() || !/^\d{10}$/.test(phone.trim())) {
      setError("Enter your name and a valid 10-digit phone number");
      return;
    }
    setLoading(true);
    try {
      await createBooking({
        passengerName: name.trim(),
        phoneNumber: phone.trim(),
        pickupLocation: pickup.trim(),
        dropLocation: drop.trim(),
        carType,
        fare: baseFare,
      });
      setStep(STEPS.DONE);
    } catch (err) {
      setError("Could not book right now. Make sure the backend server is running.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setStep(STEPS.SEARCH);
    setPickup("");
    setDrop("");
    setPhone("");
    setName("");
    setBaseFares(null);
    setCarType("small");
    setDistanceKm(null);
    setIsFixedRoute(false);
    setError("");
  }

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="relative w-full max-w-md rounded-[28px] p-[1.5px] bg-gradient-to-br from-[#0072c6]/60 via-white/10 to-[#66c2ff]/40 shadow-[0_35px_80px_rgba(0,4,40,0.55)]"
    >
      <div className="rounded-[26px] bg-white/97 backdrop-blur-xl overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-[#004e92] via-[#0072c6] to-[#001845]" />
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
                <div>
                  <p className="font-display font-semibold text-[#000428] text-lg">
                    Where are you headed?
                  </p>
                  <p className="font-body text-xs text-[#000428]/45 mt-1">
                    Fares are calculated instantly — no waiting for a quote.
                  </p>
                </div>

                <div className="space-y-3">
                  <CityInput
                    value={pickup}
                    onChange={setPickup}
                    placeholder="Pickup location"
                    icon={MapPin}
                    iconClassName="text-[#0EA894]"
                  />
                  <CityInput
                    value={drop}
                    onChange={setDrop}
                    placeholder="Drop location"
                    icon={Navigation}
                    iconClassName="text-[#FF6B4A]"
                  />
                </div>

                {error && <p className="font-body text-sm text-red-600">{error}</p>}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ y: -2, boxShadow: "0 14px 34px rgba(0,78,146,0.5)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="w-full flex items-center cursor-pointer justify-center gap-2 bg-gradient-to-r from-[#004e92] to-[#000428] text-white font-body font-bold text-sm py-3.5 rounded-xl disabled:opacity-60"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                  Search Taxi
                </motion.button>
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
                  className="flex items-center gap-1 font-body text-xs text-[#000428]/60 hover:text-[#000428] transition-colors"
                >
                  <ArrowLeft size={14} /> Change route
                </button>

                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative overflow-hidden bg-gradient-to-br from-[#000428] to-[#004e92] rounded-xl p-4"
                >
                  <div className="absolute -right-6 -top-6 w-20 h-20 bg-[#66c2ff]/20 rounded-full blur-2xl" />
                  <div className="relative flex items-center justify-between">
                    <div>
                      <p className="font-body text-white/70 text-xs">{pickup} → {drop}</p>
                      <p className="font-data text-white/40 text-[11px] mt-1 tracking-wide">
                        {isFixedRoute ? "FIXED OUTSTATION FARE" : distanceKm ? `~${distanceKm} KM · ESTIMATED` : "ESTIMATED FARE"}
                      </p>
                    </div>
                    <div className="relative font-data text-white text-2xl font-semibold">
                      ₹{baseFare}
                    </div>
                  </div>
                </motion.div>

                <div>
                  <p className="font-data text-[11px] text-[#000428]/45 uppercase tracking-wide mb-2">
                    Choose your car
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {["small", "large"].map((type) => (
                      <motion.button
                        key={type}
                        type="button"
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setCarType(type)}
                        className={`relative flex flex-col items-center gap-1.5 rounded-xl border-2 py-3 transition-colors ${
                          carType === type
                            ? "border-[#004e92] bg-[#004e92]/5"
                            : "border-[#000428]/10 hover:border-[#000428]/20"
                        }`}
                      >
                        <Car
                          size={type === "large" ? 26 : 20}
                          className={carType === type ? "text-[#004e92]" : "text-[#000428]/40"}
                        />
                        <span className={`font-body text-xs font-bold ${carType === type ? "text-[#000428]" : "text-[#000428]/50"}`}>
                          {type === "small" ? "Small Car" : "Large Car"}
                        </span>
                        <span className="font-data text-[11px] text-[#000428]/50">
                          ₹{baseFares ? baseFares[type] : 0}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-[#F5F7FA] rounded-xl border border-[#000428]/10 px-4 py-3 focus-within:border-[#004e92] transition-colors">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full bg-transparent outline-none font-body text-sm text-[#000428] placeholder:text-[#000428]/40"
                    />
                  </div>
                  <div className="flex items-center gap-3 bg-[#F5F7FA] rounded-xl border border-[#000428]/10 px-4 py-3 focus-within:border-[#004e92] transition-colors">
                    <Phone size={18} className="text-[#004e92] shrink-0" />
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="10-digit phone number"
                      inputMode="numeric"
                      className="w-full bg-transparent outline-none font-body text-sm text-[#000428] placeholder:text-[#000428]/40"
                    />
                  </div>
                </div>

                {error && <p className="font-body text-sm text-red-600">{error}</p>}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ y: -2, boxShadow: "0 14px 34px rgba(0,78,146,0.5)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#004e92] to-[#000428] text-white font-body font-bold text-sm py-3.5 rounded-xl disabled:opacity-60"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : null}
                  Book Taxi · ₹{baseFare}
                </motion.button>
                <p className="font-body text-[11px] text-[#000428]/50 text-center">
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
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
                >
                  <CheckCircle2 size={44} className="text-[#004e92] mx-auto" />
                </motion.div>
                <p className="font-display font-semibold text-[#000428] text-lg">Booking confirmed!</p>
                <p className="font-body text-sm text-[#000428]/60">
                  We've got your ride from <b>{pickup}</b> to <b>{drop}</b>. Our
                  team will call {phone} shortly to confirm your driver.
                </p>
                <button
                  onClick={reset}
                  className="mt-2 font-body text-sm font-bold text-[#004e92] underline underline-offset-4 hover:text-[#000428]"
                >
                  Book another ride
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="font-body">
      <FontImport />

      <section className="relative bg-gradient-to-br from-[#000428] via-[#001845] to-[#004e92] overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
        <div
          className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,114,198,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,114,198,0.08) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <RouteSignature />
        <motion.div
          variants={floatSlow}
          animate="animate"
          className="absolute -top-24 -right-24 w-[30rem] h-[30rem] bg-[#0072c6]/10 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatSlower}
          animate="animate"
          className="absolute bottom-0 left-0 w-96 h-96 bg-[#004e92]/30 rounded-full blur-3xl"
        />

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
          <motion.div initial="hidden" animate="show" variants={heroContainer}>
            <motion.span
              variants={heroItem}
              className="inline-flex items-center gap-2 bg-white/5 border border-[#0072c6]/30 text-[#66c2ff] font-data text-xs tracking-widest uppercase px-3 py-1.5 rounded-full mb-6"
            >
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-[#0072c6]"
              />
              Now booking across your city
            </motion.span>
            <motion.h1
              variants={heroItem}
              className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.05] tracking-tight"
            >
              Your ride is a
              <span className="bg-gradient-to-r from-[#0072c6] to-[#66c2ff] bg-clip-text text-transparent"> tap</span> away.
            </motion.h1>
            <motion.p variants={heroItem} className="mt-6 text-white/60 text-lg max-w-md">
              Enter your pickup and drop, see your fare instantly, and book —
              no calling, no waiting on hold.
            </motion.p>

            <motion.div variants={heroItem} className="mt-10 flex items-center gap-8">
              <div>
                <p className="font-data text-2xl font-semibold text-white">4.9<span className="text-[#66c2ff]">★</span></p>
                <p className="text-white/40 text-xs mt-1">Rider rating</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <p className="font-data text-2xl font-semibold text-white">12k+</p>
                <p className="text-white/40 text-xs mt-1">Rides completed</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <p className="font-data text-2xl font-semibold text-white">24/7</p>
                <p className="text-white/40 text-xs mt-1">Always available</p>
              </div>
            </motion.div>
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

      <section className="relative bg-[#F5F7FA] py-24">
        <div className="absolute -top-px left-0 right-0">
          <RouteDivider tone="light" />
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            className="max-w-xl mb-16"
          >
            <span className="font-data text-[#004e92] text-xs tracking-widest uppercase font-semibold">
              How booking works
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#000428] mt-3">
              Three steps. No phone call required.
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerGrid}
            className="grid md:grid-cols-3 gap-8"
          >
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="relative bg-white rounded-2xl p-7 border border-[#000428]/5 hover:border-[#0072c6]/50 hover:shadow-[0_20px_40px_rgba(0,4,40,0.08)] transition-shadow"
              >
                <span className="absolute top-6 right-7 font-data text-[#000428]/10 text-3xl font-semibold select-none">
                  0{i + 1}
                </span>
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#004e92] to-[#000428] flex items-center justify-center mb-5">
                  <s.icon size={20} className="text-white" />
                </div>
                <h3 className="font-display font-semibold text-lg text-[#000428] mb-2">
                  {s.title}
                </h3>
                <p className="text-[#000428]/55 text-sm leading-relaxed">{s.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative bg-gradient-to-br from-[#000428] to-[#001845] py-20 overflow-hidden">
        <div className="absolute -top-px left-0 right-0">
          <RouteDivider tone="dark" />
        </div>
        <motion.div
          variants={floatSlow}
          animate="animate"
          className="absolute -bottom-32 right-0 w-72 h-72 bg-[#0072c6]/10 rounded-full blur-3xl"
        />
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            className="flex items-center gap-2 mb-12"
          >
            <Star size={18} className="text-[#66c2ff] fill-[#66c2ff]" />
            <p className="text-white/70 text-sm">
              Trusted by riders across the city
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerGrid}
            className="grid sm:grid-cols-3 gap-8"
          >
            {trust.map((t) => (
              <motion.div
                key={t.title}
                variants={fadeUp}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex gap-4"
              >
                <t.icon size={22} className="text-[#0072c6] shrink-0 mt-1" />
                <div>
                  <h4 className="font-display font-semibold text-white text-base mb-1">
                    {t.title}
                  </h4>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {t.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative bg-gradient-to-r from-[#004e92] to-[#0072c6] py-16 overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="relative max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Ready when you are.
            </h3>
            <p className="text-white/70 mt-1">
              Book your first ride in under a minute.
            </p>
          </div>
          <motion.a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            whileHover={{ y: -3, boxShadow: "0 14px 34px rgba(0,4,40,0.45)" }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="bg-[#000428] text-white font-body font-bold text-sm px-7 py-3.5 rounded-full shrink-0"
          >
            Book a taxi now
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
}
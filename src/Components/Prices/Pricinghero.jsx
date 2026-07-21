import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function PricingHero() {
  return (
    <section className="relative bg-gradient-to-br from-[#000428] via-[#001845] to-[#004e92] overflow-hidden pt-32 pb-24">
      <div
        className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,114,198,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,114,198,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute -bottom-24 -right-24 w-[26rem] h-[26rem] bg-[#0072c6]/15 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-6">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <span className="inline-flex items-center gap-2 bg-white/5 border border-[#0072c6]/30 text-[#66c2ff] text-xs font-mono tracking-widest uppercase px-3 py-1.5 rounded-full mb-6">
            Fare & Pricing
          </span>
          <h1 className="font-bold text-4xl sm:text-5xl text-white leading-tight tracking-tight">
            One fare.
            <span className="bg-gradient-to-r from-[#0072c6] to-[#66c2ff] bg-clip-text text-transparent"> No surprises.</span>
          </h1>
          <p className="text-white/60 text-lg mt-6 max-w-2xl">
            The price you see when you search is exactly what you pay at
            drop-off. Here's a look at typical routes.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const floatSlow = {
  animate: {
    y: [0, 18, 0],
    x: [0, 14, 0],
    transition: { duration: 13, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function FaqHero() {
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
      <motion.div
        variants={floatSlow}
        animate="animate"
        className="absolute -top-24 -left-24 w-[26rem] h-[26rem] bg-[#0072c6]/15 rounded-full blur-3xl"
      />

      <div className="relative max-w-5xl mx-auto px-6">
        <motion.div initial="hidden" animate="show" variants={heroContainer}>
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 bg-white/5 border border-[#0072c6]/30 text-[#66c2ff] text-xs font-mono tracking-widest uppercase px-3 py-1.5 rounded-full mb-6"
          >
            FAQ
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="font-bold text-4xl sm:text-5xl text-white leading-tight tracking-tight"
          >
            Questions? We've got
            <span className="bg-gradient-to-r from-[#0072c6] to-[#66c2ff] bg-clip-text text-transparent"> answers.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/60 text-lg mt-6 max-w-2xl">
            Everything you need to know about booking, fares, and rides.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
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
    y: [0, 22, 0],
    x: [0, -12, 0],
    transition: { duration: 11, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function AboutHero() {
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
        className="absolute -top-24 -right-24 w-[26rem] h-[26rem] bg-[#0072c6]/15 rounded-full blur-3xl"
      />

      <div className="relative max-w-5xl mx-auto px-6">
        <motion.div initial="hidden" animate="show" variants={heroContainer}>
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 bg-white/5 border border-[#0072c6]/30 text-[#66c2ff] text-xs font-mono tracking-widest uppercase px-3 py-1.5 rounded-full mb-6"
          >
            About MyCabExpress
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="font-bold text-4xl sm:text-5xl text-white leading-tight tracking-tight"
          >
            Built for riders who just want a
            <span className="bg-gradient-to-r from-[#0072c6] to-[#66c2ff] bg-clip-text text-transparent"> straight answer.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/60 text-lg mt-6 max-w-2xl">
            No surge multipliers hidden behind a spinner, no chasing a driver
            through an app. Tell us where you're going, see the fare, and
            we'll take it from there.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
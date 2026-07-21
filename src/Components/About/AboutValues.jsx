import { motion } from "framer-motion";
import { Target, Users, MapPin, TrendingUp } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const points = [
  {
    icon: Target,
    title: "Why we started",
    text: "Booking a taxi shouldn't mean ten minutes on hold. We built MyCabExpress so a ride is just pickup, drop, and one tap.",
  },
  {
    icon: Users,
    title: "Who's driving",
    text: "Every driver on our network is verified and known to our local dispatch team, not an anonymous profile.",
  },
  {
    icon: MapPin,
    title: "Where we operate",
    text: "Currently live across the city, expanding to nearby towns as our driver network grows.",
  },
];

const stats = [
  { value: "12k+", label: "Rides completed" },
  { value: "4.9★", label: "Average rating" },
  { value: "150+", label: "Verified drivers" },
  { value: "24/7", label: "Booking support" },
];

export default function AboutValues() {
  return (
    <section className="bg-[#F5F7FA] py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="space-y-6 mb-16">
          {points.map((p, i) => (
            <motion.div
              key={p.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
              transition={{ delay: i * 0.1 }}
              className="flex gap-6 items-start bg-white rounded-2xl p-7 border border-[#000428]/5 hover:border-[#0072c6]/40 hover:shadow-[0_20px_40px_rgba(0,4,40,0.08)] transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#004e92] to-[#000428] flex items-center justify-center shrink-0">
                <p.icon size={22} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-[#000428] mb-2">
                  {p.title}
                </h3>
                <p className="text-[#000428]/60 leading-relaxed">{p.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="bg-gradient-to-br from-[#000428] to-[#004e92] rounded-2xl p-10 grid grid-cols-2 sm:grid-cols-4 gap-8"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-white">{s.value}</p>
              <p className="text-white/50 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
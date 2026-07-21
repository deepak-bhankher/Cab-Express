import { motion } from "framer-motion";
import { Car, Users, Briefcase, MapPinned } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const rides = [
  {
    icon: Car,
    title: "Mini",
    text: "Compact and quick for everyday city rides. Fits up to 3 passengers.",
    tag: "Most booked",
  },
  {
    icon: Users,
    title: "Sedan",
    text: "Extra legroom and boot space, ideal for airport runs and families.",
    tag: "Comfort",
  },
  {
    icon: Briefcase,
    title: "SUV",
    text: "Spacious rides for groups or extra luggage. Seats up to 6.",
    tag: "Group travel",
  },
  {
    icon: MapPinned,
    title: "Outstation",
    text: "One-way or round trips between cities with a fixed, upfront fare.",
    tag: "Long distance",
  },
];

export default function ServicesGrid() {
  return (
    <section className="bg-[#F5F7FA] py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 gap-6">
          {rides.map((r, i) => (
            <motion.div
              key={r.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-7 border border-[#000428]/5 hover:border-[#0072c6]/40 hover:shadow-[0_20px_40px_rgba(0,4,40,0.08)] transition-all"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#004e92] to-[#000428] flex items-center justify-center">
                  <r.icon size={22} className="text-white" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wide text-[#004e92] bg-[#004e92]/10 px-2.5 py-1 rounded-full">
                  {r.tag}
                </span>
              </div>
              <h3 className="font-bold text-xl text-[#000428] mb-2">
                {r.title}
              </h3>
              <p className="text-[#000428]/60 text-sm leading-relaxed">
                {r.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Static sample routes — swap with live data from GET /api/fare/all later
const routes = [
  { from: "Delhi", to: "Gurgaon", price: 500, duration: "45 min" },
  { from: "Delhi", to: "Noida", price: 450, duration: "40 min" },
  { from: "Hisar", to: "Delhi", price: 1800, duration: "3 hr" },
  { from: "Hisar", to: "Chandigarh", price: 2200, duration: "3.5 hr" },
];

export default function PricingTable() {
  return (
    <section className="bg-[#F5F7FA] py-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="bg-white rounded-2xl border border-[#000428]/5 overflow-hidden shadow-[0_20px_50px_rgba(0,4,40,0.06)]"
        >
          <div className="grid grid-cols-[1fr_auto_1fr] sm:grid-cols-[1fr_1fr_auto_auto] bg-gradient-to-r from-[#000428] to-[#004e92] text-white text-xs font-mono uppercase tracking-wide px-6 py-4">
            <span>Pickup</span>
            <span className="hidden sm:block">Drop</span>
            <span className="text-right sm:text-left">Duration</span>
            <span className="text-right">Fare</span>
          </div>

          {routes.map((r, i) => (
            <motion.div
              key={`${r.from}-${r.to}`}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
              transition={{ delay: i * 0.08 }}
              className="grid grid-cols-[1fr_auto_1fr] sm:grid-cols-[1fr_1fr_auto_auto] items-center px-6 py-4 border-t border-[#000428]/5 hover:bg-[#F5F7FA] transition-colors"
            >
              <span className="text-[#000428] font-medium text-sm">{r.from}</span>
              <span className="hidden sm:flex items-center gap-1 text-[#000428]/50 text-sm">
                <ArrowRight size={14} /> {r.to}
              </span>
              <span className="text-[#000428]/50 text-xs text-right sm:text-left">
                {r.duration}
              </span>
              <span className="font-mono font-bold text-[#004e92] text-right">
                ₹{r.price}
              </span>
            </motion.div>
          ))}

          <div className="px-6 py-4 border-t border-[#000428]/5 bg-[#F5F7FA]">
            <p className="text-xs text-[#000428]/50">
              Fares shown are estimates for common routes. Your exact fare is
              always confirmed before you book.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
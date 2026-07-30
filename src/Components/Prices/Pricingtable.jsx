import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { calculateFare } from "../../lib/fareCalculator";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerRows = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const rowVariant = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const sampleRoutes = [
  { from: "Delhi", to: "Gurgaon" },
  { from: "Delhi", to: "Noida" },
  { from: "Hisar", to: "Delhi" },
  { from: "Hisar", to: "Chandigarh" },
  { from: "Panipat", to: "Delhi" },
];

const routes = sampleRoutes
  .map((r) => {
    const result = calculateFare(r.from, r.to);
    return result ? { ...r, price: result.fare, distanceKm: result.distanceKm } : null;
  })
  .filter(Boolean);

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
          {/* Header — hidden on mobile, table-style only makes sense on wider screens */}
          <div className="hidden sm:grid grid-cols-[1fr_1fr_auto_auto] bg-gradient-to-r from-[#000428] to-[#004e92] text-white text-xs font-mono uppercase tracking-wide px-6 py-4">
            <span>Pickup</span>
            <span>Drop</span>
            <span className="text-left">Distance</span>
            <span className="text-right">Fare</span>
          </div>
          <div className="sm:hidden bg-gradient-to-r from-[#000428] to-[#004e92] text-white text-xs font-mono uppercase tracking-wide px-6 py-4">
            Sample Routes
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerRows}
          >
            {routes.map((r) => (
              <motion.div
                key={`${r.from}-${r.to}`}
                variants={rowVariant}
                whileHover={{ backgroundColor: "#F5F7FA" }}
                className="px-6 py-4 border-t border-[#000428]/5"
              >
                {/* Mobile layout: route on top, distance + fare below */}
                <div className="flex sm:hidden flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-[#000428] font-medium text-sm">
                    <span>{r.from}</span>
                    <ArrowRight size={14} className="text-[#000428]/40" />
                    <span>{r.to}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#000428]/50 text-xs">~{r.distanceKm} km</span>
                    <span className="font-mono font-bold text-[#004e92] text-base">
                      ₹{r.price}
                    </span>
                  </div>
                </div>

                {/* Desktop/tablet layout: full grid row */}
                <div className="hidden sm:grid grid-cols-[1fr_1fr_auto_auto] items-center">
                  <span className="text-[#000428] font-medium text-sm">{r.from}</span>
                  <span className="flex items-center gap-1 text-[#000428]/50 text-sm">
                    <ArrowRight size={14} /> {r.to}
                  </span>
                  <span className="text-[#000428]/50 text-xs text-left">
                    ~{r.distanceKm} km
                  </span>
                  <span className="font-mono font-bold text-[#004e92] text-right">
                    ₹{r.price}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="px-6 py-4 border-t border-[#000428]/5 bg-[#F5F7FA]">
            <p className="text-xs text-[#000428]/50">
              Fares are calculated live based on distance. Search your exact
              route on the home page to see your fare before booking.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const faqs = [
  {
    q: "Do I need to call to book a taxi?",
    a: "No. Enter your pickup and drop on the website, see the fare, and tap Book Taxi — your ride is saved instantly. Our team calls you to confirm the driver.",
  },
  {
    q: "Will the fare change during the ride?",
    a: "No. The fare shown when you search is the fare you pay. No surge pricing, no meter surprises.",
  },
  {
    q: "How do I pay?",
    a: "You can pay the driver directly in cash or via UPI at the end of your ride.",
  },
  {
    q: "What if I need to cancel?",
    a: "Call our support line as soon as possible and we'll update your booking status — no cancellation fee if done early.",
  },
  {
    q: "Are drivers verified?",
    a: "Yes, every driver on our network is background-checked and known to our local dispatch team.",
  },
];

function FaqItem({ item, isOpen, onClick }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={fadeUp}
      className="bg-white rounded-2xl border border-[#000428]/5 overflow-hidden"
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-bold text-[#000428]">{item.q}</span>
        <ChevronDown
          size={20}
          className={`text-[#004e92] shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-[#000428]/60 text-sm leading-relaxed">
            {item.a}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function FaqList() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-[#F5F7FA] py-20">
      <div className="max-w-3xl mx-auto px-6 space-y-4">
        {faqs.map((item, i) => (
          <FaqItem
            key={item.q}
            item={item}
            isOpen={openIndex === i}
            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        ))}
      </div>
    </section>
  );
}
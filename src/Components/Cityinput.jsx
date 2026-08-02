import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// This is your service-area city list — the cities your owner/drivers cover.
// Add or remove cities here anytime; the suggestions update automatically.
export const SERVICE_CITIES = [
  "Hisar",
  "Delhi",
  "Gurgaon",
  "Noida",
  "Faridabad",
  "Chandigarh",
  "Panipat",
  "Rohtak",
  "Karnal",
  "Sonipat",
  "Jind",
  "Sirsa",
  "Fatehabad",
  "Ambala",
  "Jaipur",
];

export default function CityInput({
  value,
  onChange,
  placeholder,
  icon: Icon,
  iconClassName = "text-[#004e92]",
}) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const wrapperRef = useRef(null);

  const matches =
    value.trim().length === 0
      ? SERVICE_CITIES
      : SERVICE_CITIES.filter((c) =>
          c.toLowerCase().startsWith(value.trim().toLowerCase())
        );

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function selectCity(city) {
    onChange(city);
    setOpen(false);
  }

  function handleKeyDown(e) {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, matches.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      if (matches[highlight]) {
        e.preventDefault();
        selectCity(matches[highlight]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={wrapperRef} className="relative">
      <div
        className={`group flex items-center gap-3 bg-white rounded-2xl border px-4 py-3.5 transition-all duration-200 ${
          focused
            ? "border-[#004e92] shadow-[0_0_0_4px_rgba(0,78,146,0.1)]"
            : "border-[#000428]/8 shadow-[0_1px_2px_rgba(0,4,40,0.04)] hover:border-[#000428]/15"
        }`}
      >
        {Icon && (
          <span
            className={`flex items-center justify-center w-8 h-8 rounded-xl shrink-0 transition-colors duration-200 ${
              focused ? "bg-[#004e92]/10" : "bg-[#F5F7FA]"
            }`}
          >
            <Icon size={16} className={`${iconClassName}`} strokeWidth={2.25} />
          </span>
        )}
        <input
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setHighlight(0);
            setOpen(true);
          }}
          onFocus={() => {
            setOpen(true);
            setFocused(true);
          }}
          onBlur={() => setFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-[15px] font-medium text-[#000428] placeholder:text-[#000428]/35 placeholder:font-normal"
          autoComplete="off"
        />
      </div>

      <AnimatePresence>
        {open && matches.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute z-20 top-[calc(100%+8px)] left-0 right-0 bg-white rounded-2xl border border-[#000428]/8 shadow-[0_20px_50px_rgba(0,4,40,0.16)] overflow-hidden max-h-60 overflow-y-auto p-1.5"
          >
            {matches.map((city, i) => (
              <button
                key={city}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onMouseEnter={() => setHighlight(i)}
                onClick={() => selectCity(city)}
                className={`w-full flex items-center gap-2.5 text-left px-3 py-2.5 rounded-xl text-sm transition-colors ${
                  i === highlight
                    ? "bg-[#004e92] text-white"
                    : "text-[#000428]/75"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    i === highlight ? "bg-white" : "bg-[#000428]/20"
                  }`}
                />
                {city}
              </button>
            ))}
          </motion.div>
        )}

        {open && matches.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
            className="absolute z-20 top-[calc(100%+8px)] left-0 right-0 bg-white rounded-2xl border border-[#000428]/8 shadow-[0_20px_50px_rgba(0,4,40,0.16)] px-4 py-3.5 text-sm text-[#000428]/50"
          >
            No city found — we don't serve this area yet.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
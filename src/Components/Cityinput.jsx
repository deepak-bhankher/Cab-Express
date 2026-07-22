import { useState, useRef, useEffect } from "react";

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
      <div className="flex items-center gap-3 bg-[#F5F7FA] rounded-xl border border-[#000428]/10 px-4 py-3 focus-within:border-[#004e92] transition-colors">
        {Icon && <Icon size={18} className={`${iconClassName} shrink-0`} />}
        <input
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setHighlight(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-sm text-[#000428] placeholder:text-[#000428]/40"
          autoComplete="off"
        />
      </div>

      {open && matches.length > 0 && (
        <div className="absolute z-20 top-[calc(100%+6px)] left-0 right-0 bg-white rounded-xl border border-[#000428]/10 shadow-[0_15px_40px_rgba(0,4,40,0.15)] overflow-hidden max-h-56 overflow-y-auto">
          {matches.map((city, i) => (
            <button
              key={city}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => selectCity(city)}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                i === highlight
                  ? "bg-[#004e92]/10 text-[#000428]"
                  : "text-[#000428]/80 hover:bg-[#F5F7FA]"
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      )}

      {open && matches.length === 0 && (
        <div className="absolute z-20 top-[calc(100%+6px)] left-0 right-0 bg-white rounded-xl border border-[#000428]/10 shadow-[0_15px_40px_rgba(0,4,40,0.15)] px-4 py-3 text-sm text-[#000428]/50">
          No city found — we don't serve this area yet.
        </div>
      )}
    </div>
  );
}
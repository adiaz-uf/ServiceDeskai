import { useState, useRef, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  highlightWord?: string;
}

export function Select({ options, value, onChange, placeholder = "Seleccionar", className = "", highlightWord }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(
    options.find(opt => opt.value === value) || null
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: Option) => {
    setSelected(option);
    onChange?.(option.value);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className={`relative min-w-[160px] ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-ui-background border border-ui-primary text-ui-primary rounded-md px-4 py-2 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-ui-primary flex items-center justify-between gap-2"
      >
        <span className="truncate">{selected?.label || placeholder}</span>
        <IoChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      
      {isOpen && (
        <div className="fixed left-0 right-0 z-10 mx-8 mt-1 bg-ui-background border border-ui-primary rounded-md shadow-lg overflow-y-auto max-h-80">
          {options.map((option) => {

            let isNearOffice: boolean = false;

            if (highlightWord)
              isNearOffice = option.label.toLowerCase().includes(highlightWord.toLowerCase());

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option)}
                className={`w-full px-4 py-2 text-left font-medium transition-colors hover:bg-ui-secondary
                  ${selected?.value === option.value ? "bg-ui-primary text-white" : 
                    isNearOffice ? "bg-blue-200 text-ui-primary" : "text-ui-primary"}`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

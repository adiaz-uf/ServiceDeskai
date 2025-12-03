import { useState, type ReactNode } from "react";
import { IoChevronDown } from "react-icons/io5";
import { Card } from "./Card";

interface CollapsibleCardProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function CollapsibleCard({ title, children, defaultOpen = false, className = "" }: CollapsibleCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Card className={className}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-left font-semibold text-ui-primary"
      >
        <span className="text-lg">{title}</span>
        <IoChevronDown className={`text-xl transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="px-4 pb-4">
          {children}
        </div>
      )}
    </Card>
  );
}

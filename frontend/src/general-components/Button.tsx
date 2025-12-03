import * as React from "react";
import { cn } from "../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "like" | "none";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", onClick, ...props }, ref) => {
    const baseCommon =
      "inline-flex items-center justify-center font-semibold hover:font-large hover:scale-105 transform transition duration-150 active:scale-90";

    const base =
      variant === "like"
      ? "" + baseCommon
      : "px-2.5 py-1 rounded-xl text-sm" + baseCommon;

    const variants = {
      default: "bg-ui-primary text-white hover:bg-blue-900",
      outline: "border-2 border-ui-primary text-ui-primary hover:border-ui-primary bg-white/50 hover:bg-blue-100",
      like: "rounded-full text-4xl",
      none: ""
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (!onClick) return;

      e.preventDefault();

      setTimeout(() => {
        onClick(e);
      }, 150);
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], className)}
        onClick={handleClick}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
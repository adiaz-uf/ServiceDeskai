import React from "react";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

interface MessageBoxProps {
  type: "success" | "error" | "info" | "app";
  message: string;
  show: boolean;
}

export const MessageBox: React.FC<MessageBoxProps> = ({ type, message, show }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
    } else {
      const timeout = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [show]);

  if (!show && !visible) return null;

  return (
    <div
      className={cn(
        "px-4 py-3 rounded-xl text-sm border w-70 ml-auto shadow-md transition-all duration-300 transform break-words overflow-hidden",
        type === "error" && "bg-red-100 border-status-error text-status-error",
        type === "success" && "bg-green-100 border-status-success text-status-success",
        type === "app" && "bg-blue-100 border-ui-primary text-ui-primary",
        type === "info" && "bg-orange-100 border-status-warning text-status-warning"
      )}
    >
      {message}
    </div>
  );
};
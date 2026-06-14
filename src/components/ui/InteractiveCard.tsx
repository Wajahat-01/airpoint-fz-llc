"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/utils/cn";

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  hoverLift?: boolean;
}

export function InteractiveCard({ children, className, hoverLift = true }: InteractiveCardProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={cn("interactive-card", className)}>{children}</div>;
  }

  return (
    <motion.div
      whileHover={hoverLift ? { y: -6, scale: 1.01 } : undefined}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={cn("interactive-card", className)}
    >
      {children}
    </motion.div>
  );
}

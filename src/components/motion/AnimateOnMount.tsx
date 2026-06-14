"use client";

import React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { motionTransitions, motionVariants, type MotionVariant } from "@/config/motion";
import { cn } from "@/utils/cn";

interface AnimateOnMountProps extends Omit<HTMLMotionProps<"div">, "initial" | "animate" | "variants" | "transition"> {
  children: React.ReactNode;
  variant?: MotionVariant;
  delay?: number;
  className?: string;
}

export function AnimateOnMount({
  children,
  variant = "fadeUp",
  delay = 0,
  className,
  ...props
}: AnimateOnMountProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={motionVariants[variant]}
      transition={{ ...motionTransitions.default, delay }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

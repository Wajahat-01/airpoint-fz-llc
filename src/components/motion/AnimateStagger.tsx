"use client";

import React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { motionVariants, type MotionVariant } from "@/config/motion";
import { cn } from "@/utils/cn";

type StaggerPreset = "container" | "containerFast";

interface AnimateStaggerProps extends Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport" | "variants"> {
  children: React.ReactNode;
  preset?: StaggerPreset;
  onMount?: boolean;
  className?: string;
}

interface AnimateItemProps extends Omit<HTMLMotionProps<"div">, "variants"> {
  children: React.ReactNode;
  variant?: MotionVariant;
  className?: string;
}

export function AnimateStagger({
  children,
  preset = "container",
  onMount = false,
  className,
  ...props
}: AnimateStaggerProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      {...(onMount
        ? { animate: "visible" }
        : {
            whileInView: "visible",
            viewport: { once: true, amount: 0.12, margin: "-40px 0px" },
          })}
      variants={motionVariants[preset]}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function AnimateItem({
  children,
  variant = "fadeUp",
  className,
  ...props
}: AnimateItemProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div variants={motionVariants[variant]} className={cn(className)} {...props}>
      {children}
    </motion.div>
  );
}

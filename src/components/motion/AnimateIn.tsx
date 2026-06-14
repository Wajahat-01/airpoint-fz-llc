"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import {
  motionTransitions,
  motionVariants,
  motionViewport,
  type MotionVariant,
} from "@/config/motion";
import { cn } from "@/utils/cn";

interface AnimateInProps extends Omit<HTMLMotionProps<"div">, "initial" | "animate" | "whileInView" | "viewport" | "variants" | "transition"> {
  children: React.ReactNode;
  variant?: MotionVariant;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}

export function AnimateIn({
  children,
  variant = "fadeUp",
  delay = 0,
  duration,
  once = true,
  className,
  ...props
}: AnimateInProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { ...motionViewport, once });
  const [forceVisible, setForceVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const inViewport =
      rect.top < window.innerHeight &&
      rect.bottom > 0;

    if (inViewport) {
      setForceVisible(true);
      return;
    }

    const timer = window.setTimeout(() => setForceVisible(true), 200);
    return () => window.clearTimeout(timer);
  }, []);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const isVisible = isInView || forceVisible;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={motionVariants[variant]}
      transition={{
        ...motionTransitions.default,
        ...(duration ? { duration } : {}),
        delay,
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

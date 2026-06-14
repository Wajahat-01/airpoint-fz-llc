import type { Transition, Variants } from "framer-motion";

export const MOTION_EASE = [0.22, 1, 0.36, 1] as const;

export const motionViewport = {
  once: true,
  amount: 0.05,
  margin: "0px 0px -5% 0px",
} as const;

export const motionTransitions = {
  default: { duration: 0.55, ease: MOTION_EASE } satisfies Transition,
  slow: { duration: 0.75, ease: MOTION_EASE } satisfies Transition,
  fast: { duration: 0.35, ease: MOTION_EASE } satisfies Transition,
  spring: { type: "spring", stiffness: 120, damping: 18 } satisfies Transition,
} as const;

export const motionVariants = {
  fadeUp: {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -36 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 36 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1 },
  },
  floatIn: {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  container: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.06,
      },
    },
  },
  containerFast: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.04,
      },
    },
  },
} as const satisfies Record<string, Variants>;

export type MotionVariant = keyof typeof motionVariants;

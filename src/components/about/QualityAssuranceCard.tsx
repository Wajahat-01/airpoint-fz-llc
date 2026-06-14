"use client";

import { useEffect, useRef } from "react";
import { Award } from "lucide-react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { MOTION_EASE } from "@/config/motion";

interface Metric {
  label: string;
  value: number;
  color: string;
}

interface QualityAssuranceCardProps {
  title: string;
  subtitle: string;
  projectsLabel: string;
  partsLabel: string;
  metricsTitle: string;
  metrics: Metric[];
}

function AnimatedCenterValue({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.6 });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 1.4, bounce: 0 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    motionValue.set(reduceMotion ? value : value);
  }, [isInView, motionValue, reduceMotion, value]);

  useEffect(() => {
    if (reduceMotion) {
      if (ref.current) ref.current.textContent = `${value}%`;
      return;
    }

    return springValue.on("change", (latest) => {
      if (ref.current) ref.current.textContent = `${Math.round(latest)}%`;
    });
  }, [reduceMotion, springValue, value]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex flex-col items-center justify-center text-center rotate-0"
    >
      <motion.span
        ref={ref}
        className="font-outfit font-black text-3xl text-white leading-none"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2, ease: MOTION_EASE }}
      >
        0%
      </motion.span>
      <motion.span
        className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 max-w-[88px]"
        initial={{ opacity: 0, y: 6 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45, delay: 0.45, ease: MOTION_EASE }}
      >
        {label}
      </motion.span>
    </div>
  );
}

function DonutChart({
  metrics,
  centerValue,
  centerLabel,
}: {
  metrics: Metric[];
  centerValue: number;
  centerLabel: string;
}) {
  const chartRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(chartRef, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();

  const size = 168;
  const stroke = 20;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = metrics.reduce((sum, metric) => sum + metric.value, 0);

  let accumulated = 0;
  const segments = metrics.map((metric, index) => {
    const segmentLength = (metric.value / total) * circumference;
    const offset = accumulated;
    accumulated += segmentLength;
    return { ...metric, segmentLength, offset, index };
  });

  return (
    <motion.div
      ref={chartRef}
      className="relative shrink-0"
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.55, ease: MOTION_EASE }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
        />
        {segments.map(({ label, color, segmentLength, offset, index }) => (
          <motion.circle
            key={label}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="butt"
            strokeDashoffset={-offset}
            initial={{
              strokeDasharray: reduceMotion
                ? `${segmentLength} ${circumference - segmentLength}`
                : `0 ${circumference}`,
            }}
            animate={
              isInView
                ? { strokeDasharray: `${segmentLength} ${circumference - segmentLength}` }
                : {}
            }
            transition={{
              duration: reduceMotion ? 0 : 0.9,
              delay: reduceMotion ? 0 : 0.15 + index * 0.12,
              ease: MOTION_EASE,
            }}
          />
        ))}
      </svg>
      <AnimatedCenterValue value={centerValue} label={centerLabel} />
    </motion.div>
  );
}

export default function QualityAssuranceCard({
  title,
  subtitle,
  projectsLabel,
  partsLabel,
  metricsTitle,
  metrics,
}: QualityAssuranceCardProps) {
  const legendRef = useRef<HTMLDivElement>(null);
  const isLegendInView = useInView(legendRef, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();

  const averageScore = Math.round(
    metrics.reduce((sum, metric) => sum + metric.value, 0) / metrics.length
  );

  return (
    <div className="glass-panel rounded-2xl border-white/10 shadow-xl overflow-hidden flex flex-col">
      <div className="p-6 sm:p-7 border-b border-white/5 relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-3 relative">
          <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center border border-brand-cyan/20 text-brand-cyan">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-outfit font-bold text-white text-base">{title}</h3>
            <span className="text-[10px] text-slate-500">{subtitle}</span>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-7 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
        <DonutChart
          metrics={metrics}
          centerValue={averageScore}
          centerLabel={metricsTitle}
        />

        <div ref={legendRef} className="flex-1 w-full space-y-3">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              className="flex items-center justify-between gap-3 text-xs"
              initial={{ opacity: 0, x: reduceMotion ? 0 : 16 }}
              animate={isLegendInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.45,
                delay: reduceMotion ? 0 : 0.35 + index * 0.1,
                ease: MOTION_EASE,
              }}
            >
              <div className="flex items-center gap-2 min-w-0">
                <motion.span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: metric.color }}
                  initial={{ scale: 0 }}
                  animate={isLegendInView ? { scale: 1 } : {}}
                  transition={{
                    duration: 0.35,
                    delay: reduceMotion ? 0 : 0.4 + index * 0.1,
                    ease: MOTION_EASE,
                  }}
                />
                <span className="text-slate-400 truncate">{metric.label}</span>
              </div>
              <motion.span
                className="font-outfit font-bold text-white shrink-0"
                initial={{ opacity: 0 }}
                animate={isLegendInView ? { opacity: 1 } : {}}
                transition={{
                  duration: 0.4,
                  delay: reduceMotion ? 0 : 0.5 + index * 0.1,
                }}
              >
                {metric.value}%
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="p-6 sm:p-7 pt-0 grid grid-cols-2 gap-4">
        <div className="text-center p-3 rounded-lg bg-white/5 border border-white/5">
          <span className="block font-outfit font-black text-2xl text-brand-cyan">50+</span>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest">{projectsLabel}</span>
        </div>
        <div className="text-center p-3 rounded-lg bg-white/5 border border-white/5">
          <span className="block font-outfit font-black text-2xl text-brand-gold">100%</span>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest">{partsLabel}</span>
        </div>
      </div>
    </div>
  );
}

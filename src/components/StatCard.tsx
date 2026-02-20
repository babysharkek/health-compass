import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  unit: string;
  glowClass: string;
  boxGlowClass: string;
  delay?: number;
}

const StatCard = ({ icon, label, value, unit, glowClass, boxGlowClass, delay = 0 }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.33, 1, 0.68, 1] }}
      className={`bg-card rounded-lg p-4 border border-border ${boxGlowClass}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className={glowClass}>{icon}</span>
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <motion.span
          className={`text-2xl font-bold font-mono ${glowClass}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: delay + 0.3 }}
        >
          {value}
        </motion.span>
        <span className="text-xs text-muted-foreground font-mono">{unit}</span>
      </div>
    </motion.div>
  );
};

export default StatCard;

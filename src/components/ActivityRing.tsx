import { motion } from "framer-motion";

interface ActivityRingProps {
  progress: number;
  size: number;
  strokeWidth: number;
  color: string;
  delay?: number;
  children?: React.ReactNode;
}

const ActivityRing = ({ progress, size, strokeWidth, color, delay = 0, children }: ActivityRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-secondary"
          opacity={0.4}
        />
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - Math.min(progress, 1)) }}
          transition={{ duration: 1.5, delay, ease: [0.33, 1, 0.68, 1] }}
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};

export default ActivityRing;

import { motion } from "framer-motion";
import { ChartBar, TrendUp, TrendDown, Minus } from "@phosphor-icons/react";
import { useStepTracker } from "@/hooks/useStepTracker";

const Trends = () => {
  const { weekData, stepGoal } = useStepTracker();

  const totalSteps = weekData.reduce((a, b) => a + b, 0);
  const activeDays = weekData.filter((d) => d > 0).length;
  const avgSteps = activeDays > 0 ? Math.round(totalSteps / activeDays) : 0;
  const bestDay = Math.max(...weekData);

  const goalHitDays = weekData.filter((d) => d >= stepGoal).length;

  const stats = [
    { label: "Total Steps", value: totalSteps.toLocaleString() },
    { label: "Daily Average", value: avgSteps.toLocaleString() },
    { label: "Best Day", value: bestDay.toLocaleString() },
    { label: "Goal Hit", value: `${goalHitDays} / 7 days` },
    { label: "Active Days", value: `${activeDays} / 7` },
  ];

  const trend = avgSteps >= stepGoal ? "up" : avgSteps >= stepGoal * 0.6 ? "flat" : "down";
  const TrendIcon = trend === "up" ? TrendUp : trend === "down" ? TrendDown : Minus;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto px-5 pt-12 pb-28">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Analytics</p>
          <h1 className="text-2xl font-bold mt-1 flex items-center gap-2">
            <ChartBar size={24} weight="fill" className="text-ring-exercise" />
            Trends
          </h1>
        </motion.div>

        {/* Trend indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mt-8 bg-card rounded-lg p-5 border border-border flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
            <TrendIcon size={24} weight="bold" className="text-ring-exercise" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-mono">Weekly trend</p>
            <p className="text-lg font-bold">
              {trend === "up" ? "On track" : trend === "flat" ? "Moderate" : "Below target"}
            </p>
          </div>
        </motion.div>

        {/* Stats list */}
        <div className="mt-6 space-y-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
              className="bg-card rounded-lg px-4 py-3 border border-border flex items-center justify-between"
            >
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <span className="text-base font-bold font-mono">{s.value}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trends;

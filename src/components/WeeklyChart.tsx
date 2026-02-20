import { motion } from "framer-motion";

interface WeeklyChartProps {
  data: number[];
  goal: number;
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const WeeklyChart = ({ data, goal }: WeeklyChartProps) => {
  const maxVal = Math.max(...data, goal);
  const today = new Date().getDay();
  // JS getDay: 0=Sun, convert to Mon=0 index
  const todayIdx = today === 0 ? 6 : today - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-card rounded-lg p-5 border border-border"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
          This Week
        </h3>
        <span className="text-xs font-mono text-muted-foreground">
          Goal: {goal.toLocaleString()}
        </span>
      </div>
      <div className="flex items-end justify-between gap-2 h-32 relative">
        {/* Goal line */}
        <div
          className="absolute left-0 right-0 border-t border-dashed border-muted-foreground/30"
          style={{ bottom: `${(goal / maxVal) * 100}%` }}
        />
        {data.map((val, i) => {
          const height = maxVal > 0 ? (val / maxVal) * 100 : 0;
          const isToday = i === todayIdx;
          return (
            <div key={i} className="flex flex-col items-center gap-2 flex-1">
              <motion.div
                className={`w-full rounded-t-md ${isToday ? "bg-ring-steps" : "bg-secondary"}`}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 0.8, delay: 0.8 + i * 0.08, ease: [0.33, 1, 0.68, 1] }}
              />
              <span className={`text-[10px] font-mono ${isToday ? "text-foreground" : "text-muted-foreground"}`}>
                {days[i]}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default WeeklyChart;

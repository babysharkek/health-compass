import { motion } from "framer-motion";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const data = [6200, 8400, 4300, 9100, 7600, 11200, 8750];
const maxVal = Math.max(...data);

const WeeklyChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-card rounded-lg p-5 border border-border box-glow-green"
    >
      <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">
        This Week
      </h3>
      <div className="flex items-end justify-between gap-2 h-32">
        {data.map((val, i) => {
          const height = (val / maxVal) * 100;
          const isToday = i === 6;
          return (
            <div key={i} className="flex flex-col items-center gap-2 flex-1">
              <motion.div
                className={`w-full rounded-t-md ${isToday ? "bg-primary" : "bg-secondary"}`}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 0.8, delay: 0.8 + i * 0.08, ease: [0.33, 1, 0.68, 1] }}
                style={{
                  boxShadow: isToday ? "0 0 10px hsl(145 100% 50% / 0.3)" : "none",
                }}
              />
              <span className={`text-[10px] font-mono ${isToday ? "text-primary glow-green" : "text-muted-foreground"}`}>
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

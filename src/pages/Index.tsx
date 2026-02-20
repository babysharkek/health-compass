import { motion } from "framer-motion";
import { Footprints, FireSimple, MapPin, Timer, Gear } from "@phosphor-icons/react";
import ActivityRing from "@/components/ActivityRing";
import StatCard from "@/components/StatCard";
import WeeklyChart from "@/components/WeeklyChart";
import BottomNav from "@/components/BottomNav";
import { useStepTracker } from "@/hooks/useStepTracker";

const Index = () => {
  const { today, stepGoal, weekData, addSteps } = useStepTracker();
  const stepProgress = stepGoal > 0 ? today.steps / stepGoal : 0;
  const calGoal = 400;
  const calProgress = calGoal > 0 ? today.calories / calGoal : 0;
  const activeGoal = 30;
  const activeProgress = activeGoal > 0 ? today.activeMinutes / activeGoal : 0;

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });

  return (
    <div className="min-h-screen bg-background relative">
      <div className="max-w-md mx-auto px-5 pt-12 pb-28">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
              {dateStr}
            </p>
            <h1 className="text-2xl font-bold mt-1">Activity</h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => addSteps(500)}
            className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center"
            title="Add 500 test steps"
          >
            <Gear size={20} weight="bold" className="text-muted-foreground" />
          </motion.button>
        </motion.div>

        {/* Main Ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="flex justify-center mb-8"
        >
          <ActivityRing
            progress={stepProgress}
            size={220}
            strokeWidth={14}
            color="hsl(4, 80%, 60%)"
          >
            <ActivityRing
              progress={calProgress}
              size={185}
              strokeWidth={14}
              color="hsl(38, 95%, 55%)"
              delay={0.2}
            >
              <ActivityRing
                progress={activeProgress}
                size={150}
                strokeWidth={14}
                color="hsl(160, 60%, 50%)"
                delay={0.4}
              >
                <div className="text-center">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <Footprints size={22} weight="fill" className="text-ring-move mx-auto mb-1" />
                    <p className="text-2xl font-bold font-mono">
                      {today.steps.toLocaleString()}
                    </p>
                    <p className="text-[10px] font-mono text-muted-foreground">
                      / {stepGoal.toLocaleString()}
                    </p>
                  </motion.div>
                </div>
              </ActivityRing>
            </ActivityRing>
          </ActivityRing>
        </motion.div>

        {/* Ring Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex justify-center gap-6 mb-8"
        >
          {[
            { label: "Move", colorClass: "bg-ring-move" },
            { label: "Exercise", colorClass: "bg-ring-exercise" },
            { label: "Stand", colorClass: "bg-ring-stand" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${item.colorClass}`} />
              <span className="text-xs font-mono text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <StatCard
            icon={<Footprints size={18} weight="fill" />}
            label="Steps"
            value={today.steps.toLocaleString()}
            unit="steps"
            colorClass="text-ring-steps"
            delay={0.3}
          />
          <StatCard
            icon={<FireSimple size={18} weight="fill" />}
            label="Calories"
            value={today.calories.toLocaleString()}
            unit="kcal"
            colorClass="text-ring-exercise"
            delay={0.4}
          />
          <StatCard
            icon={<MapPin size={18} weight="fill" />}
            label="Distance"
            value={today.distanceKm.toFixed(1)}
            unit="km"
            colorClass="text-ring-stand"
            delay={0.5}
          />
          <StatCard
            icon={<Timer size={18} weight="fill" />}
            label="Active"
            value={today.activeMinutes.toString()}
            unit="min"
            colorClass="text-ring-move"
            delay={0.6}
          />
        </div>

        {/* Weekly Chart */}
        <WeeklyChart data={weekData} goal={stepGoal} />
      </div>

      <BottomNav />
    </div>
  );
};

export default Index;

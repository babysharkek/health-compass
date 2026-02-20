import { motion } from "framer-motion";
import { Footprints, FireSimple, MapPin, Timer, Lightning } from "@phosphor-icons/react";
import ActivityRing from "@/components/ActivityRing";
import StatCard from "@/components/StatCard";
import WeeklyChart from "@/components/WeeklyChart";
import BottomNav from "@/components/BottomNav";

const steps = 8750;
const goal = 10000;
const progress = steps / goal;

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative scanline">
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
              Sunday, Feb 20
            </p>
            <h1 className="text-2xl font-bold mt-1 glow-green">Activity</h1>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center"
          >
            <Lightning size={20} weight="fill" className="text-phosphor-amber" />
          </motion.div>
        </motion.div>

        {/* Main Ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="flex justify-center mb-8"
        >
          <ActivityRing
            progress={progress}
            size={220}
            strokeWidth={14}
            color="hsl(145, 100%, 50%)"
            glowClass="glow-green"
          >
            <ActivityRing
              progress={0.72}
              size={185}
              strokeWidth={14}
              color="hsl(185, 100%, 50%)"
              delay={0.2}
            >
              <ActivityRing
                progress={0.45}
                size={150}
                strokeWidth={14}
                color="hsl(340, 90%, 55%)"
                delay={0.4}
              >
                <div className="text-center">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <Footprints size={24} weight="fill" className="text-primary mx-auto mb-1" />
                    <p className="text-2xl font-bold font-mono glow-green">
                      {steps.toLocaleString()}
                    </p>
                    <p className="text-[10px] font-mono text-muted-foreground">
                      / {goal.toLocaleString()} steps
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
            { label: "Steps", color: "text-phosphor-green", glow: "glow-green" },
            { label: "Exercise", color: "text-phosphor-cyan", glow: "glow-cyan" },
            { label: "Stand", color: "text-phosphor-rose", glow: "glow-rose" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${item.color.replace("text-", "bg-")}`} />
              <span className={`text-xs font-mono ${item.color} ${item.glow}`}>{item.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <StatCard
            icon={<Footprints size={18} weight="fill" />}
            label="Steps"
            value="8,750"
            unit="steps"
            glowClass="glow-green text-phosphor-green"
            boxGlowClass="box-glow-green"
            delay={0.3}
          />
          <StatCard
            icon={<FireSimple size={18} weight="fill" />}
            label="Calories"
            value="420"
            unit="kcal"
            glowClass="glow-amber text-phosphor-amber"
            boxGlowClass="box-glow-amber"
            delay={0.4}
          />
          <StatCard
            icon={<MapPin size={18} weight="fill" />}
            label="Distance"
            value="5.8"
            unit="km"
            glowClass="glow-cyan text-phosphor-cyan"
            boxGlowClass="box-glow-cyan"
            delay={0.5}
          />
          <StatCard
            icon={<Timer size={18} weight="fill" />}
            label="Active"
            value="48"
            unit="min"
            glowClass="glow-rose text-phosphor-rose"
            boxGlowClass="box-glow-rose"
            delay={0.6}
          />
        </div>

        {/* Weekly Chart */}
        <WeeklyChart />
      </div>

      <BottomNav />
    </div>
  );
};

export default Index;

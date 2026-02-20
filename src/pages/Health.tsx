import { motion } from "framer-motion";
import { Heartbeat, Heart, Moon, Drop, Barbell } from "@phosphor-icons/react";

const metrics = [
  { icon: Heart, label: "Heart Rate", value: "--", unit: "bpm", note: "No sensor data" },
  { icon: Moon, label: "Sleep", value: "--", unit: "hrs", note: "No sensor data" },
  { icon: Drop, label: "Blood Oxygen", value: "--", unit: "%", note: "No sensor data" },
  { icon: Barbell, label: "Workouts", value: "0", unit: "today", note: "No workouts logged" },
];

const Health = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto px-5 pt-12 pb-28">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Vitals</p>
          <h1 className="text-2xl font-bold mt-1 flex items-center gap-2">
            <Heartbeat size={24} weight="fill" className="text-ring-move" />
            Health
          </h1>
        </motion.div>

        <div className="mt-8 space-y-3">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                className="bg-card rounded-lg p-4 border border-border flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <Icon size={20} weight="fill" className="text-ring-move" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{m.label}</p>
                    <p className="text-xs text-muted-foreground font-mono">{m.note}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold font-mono">{m.value}</span>
                  <span className="text-xs text-muted-foreground font-mono ml-1">{m.unit}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xs text-muted-foreground text-center mt-8 font-mono"
        >
          Health data will populate when connected to device sensors.
        </motion.p>
      </div>
    </div>
  );
};

export default Health;

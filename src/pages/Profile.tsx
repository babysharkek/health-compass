import { motion } from "framer-motion";
import { User, Footprints, Target } from "@phosphor-icons/react";
import { useStepTracker } from "@/hooks/useStepTracker";
import { useState } from "react";

const Profile = () => {
  const { stepGoal, setGoal } = useStepTracker();
  const [editingGoal, setEditingGoal] = useState(false);
  const [goalInput, setGoalInput] = useState(stepGoal.toString());

  const handleSaveGoal = () => {
    const val = parseInt(goalInput, 10);
    if (val > 0) {
      setGoal(val);
    }
    setEditingGoal(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto px-5 pt-12 pb-28">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Settings</p>
          <h1 className="text-2xl font-bold mt-1 flex items-center gap-2">
            <User size={24} weight="fill" className="text-ring-stand" />
            Profile
          </h1>
        </motion.div>

        {/* Avatar area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mt-8 flex flex-col items-center"
        >
          <div className="w-20 h-20 rounded-full bg-secondary border border-border flex items-center justify-center">
            <User size={36} weight="fill" className="text-muted-foreground" />
          </div>
          <p className="mt-3 text-lg font-bold">User</p>
          <p className="text-xs text-muted-foreground font-mono">No account connected</p>
        </motion.div>

        {/* Goal setting */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="mt-8 bg-card rounded-lg p-4 border border-border"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Target size={20} weight="fill" className="text-ring-exercise" />
              <div>
                <p className="text-sm font-medium">Daily Step Goal</p>
                <p className="text-xs text-muted-foreground font-mono">Your target steps per day</p>
              </div>
            </div>
            {!editingGoal ? (
              <button
                onClick={() => { setGoalInput(stepGoal.toString()); setEditingGoal(true); }}
                className="text-sm font-mono font-bold text-ring-steps"
              >
                {stepGoal.toLocaleString()}
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={goalInput}
                  onChange={(e) => setGoalInput(e.target.value)}
                  className="w-20 bg-secondary border border-border rounded px-2 py-1 text-sm font-mono text-foreground text-right"
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && handleSaveGoal()}
                />
                <button
                  onClick={handleSaveGoal}
                  className="text-xs font-mono text-ring-stand font-bold"
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="mt-4 bg-card rounded-lg p-4 border border-border"
        >
          <div className="flex items-center gap-3">
            <Footprints size={20} weight="fill" className="text-ring-move" />
            <div>
              <p className="text-sm font-medium">Step Detection</p>
              <p className="text-xs text-muted-foreground font-mono">Uses device accelerometer when available</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;

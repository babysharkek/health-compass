import { House, Heartbeat, ChartBar, User } from "@phosphor-icons/react";
import { motion } from "framer-motion";

const tabs = [
  { icon: House, label: "Home", active: true },
  { icon: Heartbeat, label: "Health", active: false },
  { icon: ChartBar, label: "Trends", active: false },
  { icon: User, label: "Profile", active: false },
];

const BottomNav = () => {
  return (
    <motion.nav
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
      className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-xl border-t border-border"
    >
      <div className="flex items-center justify-around py-2 pb-6 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.label}
              className="flex flex-col items-center gap-1 px-4 py-1 relative"
            >
              <Icon
                size={24}
                weight={tab.active ? "fill" : "regular"}
                className={tab.active ? "text-primary glow-green" : "text-muted-foreground"}
              />
              <span
                className={`text-[10px] font-mono ${
                  tab.active ? "text-primary glow-green" : "text-muted-foreground"
                }`}
              >
                {tab.label}
              </span>
              {tab.active && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-1 w-1 h-1 rounded-full bg-primary"
                  style={{ boxShadow: "0 0 8px hsl(145 100% 50% / 0.6)" }}
                />
              )}
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default BottomNav;

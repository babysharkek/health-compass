import { House, Heartbeat, ChartBar, User } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const tabs = [
  { icon: House, label: "Home", path: "/" },
  { icon: Heartbeat, label: "Health", path: "/health" },
  { icon: ChartBar, label: "Trends", path: "/trends" },
  { icon: User, label: "Profile", path: "/profile" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
      className="fixed bottom-5 left-0 right-0 flex justify-center z-50 px-6"
    >
      <div className="flex items-center justify-around w-full max-w-xs bg-card/80 backdrop-blur-2xl border border-border rounded-full py-2 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;
          return (
            <motion.button
              key={tab.label}
              onClick={() => navigate(tab.path)}
              whileTap={{ scale: 0.9 }}
              className={`relative flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-full transition-colors ${
                isActive ? "bg-secondary" : ""
              }`}
            >
              <Icon
                size={22}
                weight={isActive ? "fill" : "regular"}
                className={isActive ? "text-foreground" : "text-muted-foreground"}
              />
              <span
                className={`text-[9px] font-mono ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default BottomNav;

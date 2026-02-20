import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "fitness_tracker_data";

interface DayData {
  date: string;
  steps: number;
  calories: number;
  distanceKm: number;
  activeMinutes: number;
}

interface TrackerData {
  days: Record<string, DayData>;
  stepGoal: number;
}

function getTodayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function getWeekKeys(): string[] {
  const keys: string[] = [];
  const now = new Date();
  const day = now.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + mondayOffset + i);
    keys.push(d.toISOString().slice(0, 10));
  }
  return keys;
}

function loadData(): TrackerData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { days: {}, stepGoal: 10000 };
}

function saveData(data: TrackerData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getOrCreateDay(data: TrackerData, key: string): DayData {
  if (!data.days[key]) {
    data.days[key] = { date: key, steps: 0, calories: 0, distanceKm: 0, activeMinutes: 0 };
  }
  return data.days[key];
}

// Estimate derived metrics from steps
function deriveMetrics(steps: number) {
  const distanceKm = Math.round((steps * 0.762) / 10) / 100; // avg stride ~0.762m
  const calories = Math.round(steps * 0.04);
  const activeMinutes = Math.round(steps / 100);
  return { distanceKm, calories, activeMinutes };
}

export function useStepTracker() {
  const [data, setData] = useState<TrackerData>(loadData);
  const todayKey = getTodayKey();
  const today = getOrCreateDay(data, todayKey);

  const addSteps = useCallback((count: number) => {
    setData((prev) => {
      const next = { ...prev, days: { ...prev.days } };
      const day = { ...(next.days[todayKey] || { date: todayKey, steps: 0, calories: 0, distanceKm: 0, activeMinutes: 0 }) };
      day.steps += count;
      const derived = deriveMetrics(day.steps);
      day.calories = derived.calories;
      day.distanceKm = derived.distanceKm;
      day.activeMinutes = derived.activeMinutes;
      next.days[todayKey] = day;
      saveData(next);
      return next;
    });
  }, [todayKey]);

  const setGoal = useCallback((goal: number) => {
    setData((prev) => {
      const next = { ...prev, stepGoal: goal };
      saveData(next);
      return next;
    });
  }, []);

  const weekKeys = getWeekKeys();
  const weekData = weekKeys.map((key) => data.days[key]?.steps || 0);

  // Simple accelerometer-based step detection
  useEffect(() => {
    let lastMagnitude = 0;
    let stepThreshold = 12;
    let cooldown = false;

    const handleMotion = (e: DeviceMotionEvent) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc || acc.x === null || acc.y === null || acc.z === null) return;
      const magnitude = Math.sqrt(acc.x * acc.x + acc.y * acc.y + acc.z * acc.z);

      if (magnitude > stepThreshold && lastMagnitude <= stepThreshold && !cooldown) {
        addSteps(1);
        cooldown = true;
        setTimeout(() => { cooldown = false; }, 300);
      }
      lastMagnitude = magnitude;
    };

    // Request permission on iOS 13+
    if (typeof (DeviceMotionEvent as any).requestPermission === "function") {
      (DeviceMotionEvent as any).requestPermission().then((state: string) => {
        if (state === "granted") {
          window.addEventListener("devicemotion", handleMotion);
        }
      });
    } else {
      window.addEventListener("devicemotion", handleMotion);
    }

    return () => {
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, [addSteps]);

  return {
    today: {
      steps: today.steps,
      calories: today.calories,
      distanceKm: today.distanceKm,
      activeMinutes: today.activeMinutes,
    },
    stepGoal: data.stepGoal,
    weekData,
    addSteps,
    setGoal,
  };
}

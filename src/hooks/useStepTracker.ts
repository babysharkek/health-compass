import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "fitness_tracker_data";

interface DayData {
  date: string;
  steps: number;
  calories: number;
  distanceKm: number;
  activeMinutes: number;
}

interface RunSession {
  id: string;
  startTime: number;
  endTime?: number;
  distance: number;
  duration: number;
}

interface TrackerData {
  days: Record<string, DayData>;
  stepGoal: number;
  runs: RunSession[];
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
    if (raw) {
      const parsed = JSON.parse(raw);
      if (!parsed.runs) parsed.runs = [];
      return parsed;
    }
  } catch {}
  return { days: {}, stepGoal: 10000, runs: [] };
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
  const [isTrackingRun, setIsTrackingRun] = useState(false);
  const [currentRun, setCurrentRun] = useState<RunSession | null>(null);
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

  const startRun = useCallback(() => {
    const newRun: RunSession = {
      id: crypto.randomUUID(),
      startTime: Date.now(),
      distance: 0,
      duration: 0,
    };
    setCurrentRun(newRun);
    setIsTrackingRun(true);
  }, []);

  const stopRun = useCallback(() => {
    if (!currentRun) return;
    const finalRun = { ...currentRun, endTime: Date.now() };
    setData((prev) => {
      const next = { ...prev, runs: [...prev.runs, finalRun] };
      saveData(next);
      return next;
    });
    setIsTrackingRun(false);
    setCurrentRun(null);
  }, [currentRun]);

  const setGoal = useCallback((goal: number) => {
    setData((prev) => {
      const next = { ...prev, stepGoal: goal };
      saveData(next);
      return next;
    });
  }, []);

  const weekKeys = getWeekKeys();
  const weekData = weekKeys.map((key) => data.days[key]?.steps || 0);

  // GPS Tracking for Run
  useEffect(() => {
    if (!isTrackingRun) return;

    let watchId: number;
    let lastPos: GeolocationPosition | null = null;

    const handleSuccess = (position: GeolocationPosition) => {
      if (lastPos) {
        const R = 6371; // km
        const dLat = (position.coords.latitude - lastPos.coords.latitude) * Math.PI / 180;
        const dLon = (position.coords.longitude - lastPos.coords.longitude) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(lastPos.coords.latitude * Math.PI / 180) * Math.cos(position.coords.latitude * Math.PI / 180) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        setCurrentRun((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            distance: prev.distance + distance,
            duration: (Date.now() - prev.startTime) / 1000,
          };
        });

        // Also update daily totals
        setData((prev) => {
          const next = { ...prev, days: { ...prev.days } };
          const day = { ...(next.days[todayKey] || { date: todayKey, steps: 0, calories: 0, distanceKm: 0, activeMinutes: 0 }) };
          day.distanceKm += distance;
          day.activeMinutes += (Date.now() - (lastPos?.timestamp || Date.now())) / 60000;
          next.days[todayKey] = day;
          return next;
        });
      }
      lastPos = position;
    };

    if ("geolocation" in navigator) {
      watchId = navigator.geolocation.watchPosition(handleSuccess, (err) => {
        console.error(err);
        if (err.code === err.PERMISSION_DENIED) {
          setIsTrackingRun(false);
          alert("Location permission is required for run tracking.");
        }
      }, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      });
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [isTrackingRun, todayKey]);

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
    isTrackingRun,
    currentRun,
    addSteps,
    setGoal,
    startRun,
    stopRun,
  };
}

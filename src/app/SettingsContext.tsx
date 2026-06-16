import React, { createContext, useContext, useState, useEffect } from "react";
import { getPlayerProgression } from "./progression";

interface SettingsContextType {
  username: string;
  setUsername: (name: string) => void;
  swapControls: boolean;
  setSwapControls: (swap: boolean) => void;
  controlMode: "buttons" | "joystick";
  setControlMode: (mode: "buttons" | "joystick") => void;
  steerControlType: "buttons" | "joystick";
  setSteerControlType: (mode: "buttons" | "joystick") => void;
  throttleControlType: "buttons" | "joystick";
  setThrottleControlType: (mode: "buttons" | "joystick") => void;
  resetControls: () => void;
  lang: string;
  setLang: (lang: string) => void;
  level: number;
  xp: number;
  maxXp: number;
  rank: string;
  totalGames: number;
  bestResult: string;
  globalRank: string;
  clubMemberSince: string;
  gamesToNextLevel: number;
  walletBalance: number;
  addWalletBalance: (amount: number) => void;
  spendWalletBalance: (amount: number) => boolean;
  activatedPromoCodes: string[];
  activatePromoCode: (code: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("god_pilot_name") || "CYBER_PILOT_01";
  });
  
  const [swapControls, setSwapControls] = useState(() => {
    return localStorage.getItem("god_swap_controls") === "true";
  });

  const [controlMode, setControlMode] = useState<"buttons" | "joystick">(() => {
    const stored = localStorage.getItem("god_control_mode");
    return stored === "joystick" ? "joystick" : "buttons";
  });

  const [steerControlType, setSteerControlType] = useState<"buttons" | "joystick">(() => {
    const stored = localStorage.getItem("god_steer_control_type");
    if (stored === "buttons" || stored === "joystick") return stored;
    return localStorage.getItem("god_control_mode") === "joystick" ? "joystick" : "buttons";
  });

  const [throttleControlType, setThrottleControlType] = useState<"buttons" | "joystick">(() => {
    const stored = localStorage.getItem("god_throttle_control_type");
    if (stored === "buttons" || stored === "joystick") return stored;
    return localStorage.getItem("god_control_mode") === "joystick" ? "joystick" : "buttons";
  });

  const [lang, setLang] = useState(() => {
    return localStorage.getItem("god_lang") || "EN";
  });

  const [walletBalance, setWalletBalance] = useState(() => {
    const storedBalance = Number(localStorage.getItem("god_wallet_balance"));
    return Number.isFinite(storedBalance) && storedBalance >= 0 ? storedBalance : 1500;
  });

  const [activatedPromoCodes, setActivatedPromoCodes] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("god_activated_promo_codes") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("god_pilot_name", username);
  }, [username]);

  useEffect(() => {
    localStorage.setItem("god_swap_controls", String(swapControls));
  }, [swapControls]);

  useEffect(() => {
    localStorage.setItem("god_control_mode", controlMode);
  }, [controlMode]);

  useEffect(() => {
    localStorage.setItem("god_steer_control_type", steerControlType);
  }, [steerControlType]);

  useEffect(() => {
    localStorage.setItem("god_throttle_control_type", throttleControlType);
  }, [throttleControlType]);

  useEffect(() => {
    localStorage.setItem("god_lang", lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("god_wallet_balance", String(walletBalance));
  }, [walletBalance]);

  useEffect(() => {
    localStorage.setItem("god_activated_promo_codes", JSON.stringify(activatedPromoCodes));
  }, [activatedPromoCodes]);

  const resetControls = () => {
    setSwapControls(false);
    setControlMode("buttons");
    setSteerControlType("buttons");
    setThrottleControlType("buttons");
  };

  const addWalletBalance = (amount: number) => {
    setWalletBalance(currentBalance => Math.max(0, currentBalance + amount));
  };

  const spendWalletBalance = (amount: number) => {
    if (walletBalance < amount) {
      return false;
    }

    setWalletBalance(currentBalance => currentBalance - amount);
    return true;
  };

  const activatePromoCode = (code: string) => {
    setActivatedPromoCodes(currentCodes => (
      currentCodes.includes(code) ? currentCodes : [...currentCodes, code]
    ));
  };

  const totalGames = 42;
  const bestResult = "01:12.4";
  const globalRank = "#4,092";
  const clubMemberSince = "4 Months";
  const { level, rank, xp, maxXp, gamesToNextLevel } = getPlayerProgression(totalGames);

  return (
    <SettingsContext.Provider value={{ 
      username, setUsername, 
      swapControls, setSwapControls, resetControls,
      controlMode, setControlMode,
      steerControlType, setSteerControlType,
      throttleControlType, setThrottleControlType,
      lang, setLang,
      level, rank, xp, maxXp,
      totalGames, bestResult, globalRank, clubMemberSince, gamesToNextLevel,
      walletBalance, addWalletBalance, spendWalletBalance, activatedPromoCodes, activatePromoCode
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}

import { useState } from "react";
import { useNavigate } from "react-router";
import { CyberButton } from "../components/CyberButton";
import { useSettings } from "../SettingsContext";
import { ChevronLeft, Settings, Award, Trophy, Target, Shield, Clock, Zap, Star } from "lucide-react";
import profilePlaceholder from "@/assets/images/profile/placeholder-user.jpg";

export function Profile() {
  const navigate = useNavigate();
  const {
    username,
    level,
    xp,
    maxXp,
    rank,
    totalGames,
    bestResult,
    globalRank,
    clubMemberSince,
    gamesToNextLevel,
  } = useSettings();

  const [showLevelUp, setShowLevelUp] = useState(false);

  const progress = maxXp > 0 ? Math.min((xp / maxXp) * 100, 100) : 100;
  const totalWins = Math.max(0, Math.round(totalGames * 0.65));
  const winRate = totalGames > 0 ? Math.round((totalWins / totalGames) * 100) : 0;
  const totalPoints = xp;
  const highestLevel = level;

  const modeStats = [
    {
      id: "race",
      name: "Race",
      title: "Ace Pilot",
      level: 15,
      wins: 42,
      losses: 12,
      points: 12840,
    },
    {
      id: "robosumo",
      name: "RoboSumo",
      title: "Blade Master",
      level: 12,
      wins: 31,
      losses: 18,
      points: 9520,
    },
    {
      id: "football",
      name: "Drone Football",
      title: "Field Commander",
      level: 13,
      wins: 36,
      losses: 14,
      points: 10420,
    },
  ];

  return (
    <div className="flex flex-col h-full bg-black relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-screen pointer-events-none"></div>

      <header className="px-8 py-3 flex items-center justify-between border-b border-primary/20 bg-black/50 backdrop-blur-sm relative z-10 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/home")}
            className="w-10 h-10 rounded border border-white/20 bg-black/50 text-white backdrop-blur-sm flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-display font-black text-white uppercase tracking-widest">Profile</h2>
        </div>

        <CyberButton
          variant="ghost"
          onClick={() => navigate("/settings")}
          className="h-8 px-4 py-0 text-xs border border-white/10 bg-white/5 hover:border-primary/50"
        >
          <Settings className="w-4 h-4 mr-2" /> Edit profile
        </CyberButton>
      </header>

      <div className="flex-1 min-h-0 flex px-8 py-6 gap-8 overflow-y-auto scrollbar-hide relative z-10">
        <div className="w-5/12 flex flex-col gap-6 min-w-0">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-3xl border-2 border-primary bg-primary/10 flex items-center justify-center overflow-hidden">
                <img src={profilePlaceholder} alt="avatar" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs uppercase tracking-widest text-primary">Pilot</p>
                <h1 className="text-2xl font-black text-white font-display uppercase truncate">{username}</h1>
                <p className="mt-2 text-sm text-muted-foreground">Level {level} · {rank}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              <div className="rounded-3xl border border-white/10 bg-black/50 p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Total points</p>
                <p className="mt-2 text-2xl font-bold text-white">{totalPoints.toLocaleString()}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-black/50 p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Win rate</p>
                <p className="mt-2 text-2xl font-bold text-white">{winRate}%</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-black/50 p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Total wins</p>
                <p className="mt-2 text-2xl font-bold text-white">{totalWins}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-black/50 p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Highest level</p>
                <p className="mt-2 text-2xl font-bold text-white">{highestLevel}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-7/12 min-h-0 min-w-0 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary">Stats by game mode</p>
              <h2 className="text-2xl font-black text-white font-display uppercase tracking-tight">Mode performance</h2>
            </div>
          </div>

          <div className="grid gap-4">
            {modeStats.map((mode) => (
              <div key={mode.id} className="rounded-3xl border border-white/10 bg-black/50 p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-white">{mode.name}</p>
                    <p className="text-xs text-muted-foreground">{mode.title}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">Lvl {mode.level}</p>
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Current rank</p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-center">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Points</p>
                    <p className="mt-2 text-lg font-bold text-white">{mode.points.toLocaleString()}</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-center">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Wins</p>
                    <p className="mt-2 text-lg font-bold text-white">{mode.wins}</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-center">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Losses</p>
                    <p className="mt-2 text-lg font-bold text-white">{mode.losses}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import { useNavigate } from "react-router";
import { CyberButton } from "../components/CyberButton";
import { useSettings } from "../SettingsContext";
import { ChevronLeft, Settings, Award, Trophy, Target, Shield, Clock, Zap, Star } from "lucide-react";
import profilePlaceholder from "@/assets/images/profile/placeholder-user.jpg";

export function Profile() {
  const navigate = useNavigate();
  const { 
    username, level, xp, maxXp, rank,
    totalGames, bestResult, globalRank, clubMemberSince, gamesToNextLevel
  } = useSettings();
  const [showLevelUp, setShowLevelUp] = useState(false);

  const progress = maxXp > 0 ? Math.min((xp / maxXp) * 100, 100) : 100;

  const stats = [
    { label: "Total Games", value: String(totalGames), icon: <Target className="w-4 h-4 text-primary" /> },
    { label: "Best Result", value: bestResult, icon: <Zap className="w-4 h-4 text-accent" /> },
    { label: "Global Rank", value: globalRank, icon: <Trophy className="w-4 h-4 text-yellow-500" /> },
    { label: "Club Member", value: clubMemberSince, icon: <Clock className="w-4 h-4 text-green-400" /> },
  ];

  const badges = [
    { name: "First Flight", desc: "Completed onboarding", icon: <Shield className="w-6 h-6" />, color: "text-slate-300" },
    { name: "Speed Demon", desc: "Sub 1:20 time", icon: <Zap className="w-6 h-6" />, color: "text-accent" },
    { name: "Top 5000", desc: "Reached global rank", icon: <Trophy className="w-6 h-6" />, color: "text-yellow-500" },
    { name: "Veteran", desc: "100+ Games played", icon: <Star className="w-6 h-6" />, color: "text-primary" },
  ];

  return (
    <div className="flex flex-col h-full bg-black relative z-10 overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-screen pointer-events-none"></div>

      {/* Header */}
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
          <Settings className="w-4 h-4 mr-2" /> Settings
        </CyberButton>
      </header>

      <div className="flex-1 min-h-0 flex px-8 py-6 gap-8 overflow-y-auto scrollbar-hide relative z-10">
        
        {/* Left Column: Identity & Progression */}
        <div className="w-5/12 flex flex-col gap-6 min-w-0">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-xl border-2 border-primary bg-primary/20 flex items-center justify-center text-primary relative shadow-[0_0_20px_rgba(6,182,212,0.3)] shrink-0 overflow-hidden">
              <img src={profilePlaceholder} alt="avatar" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-primary font-display uppercase tracking-widest flex items-center gap-1">
                Level {level} {rank} <Award className="w-3 h-3" />
              </span>
              <h1 className="text-2xl font-black text-white font-display uppercase tracking-wide truncate max-w-[200px]">{username}</h1>
              <button className="text-[10px] text-muted-foreground hover:text-white font-sans text-left mt-1 underline decoration-white/30 underline-offset-2">
                Edit Profile
              </button>
            </div>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-xl p-4 flex flex-col gap-2">
            <div className="flex justify-between items-end">
              <span className="text-xs font-display uppercase text-white">XP Progression</span>
              <span className="text-[10px] font-sans text-muted-foreground">{xp} / {maxXp} XP</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-[10px] text-muted-foreground font-sans mt-1">
              {gamesToNextLevel > 0 ? `${gamesToNextLevel} games to next level` : "Top level reached"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, i) => (
              <div key={i} className="bg-black/40 border border-white/10 rounded-lg p-3 flex flex-col gap-1">
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-display uppercase">
                  {stat.icon} {stat.label}
                </div>
                <div className="text-lg font-display font-bold text-white">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Badges & Rewards */}
        <div className="w-7/12 min-h-0 min-w-0 flex flex-col gap-4 overflow-hidden">
          <div className="flex justify-between items-end shrink-0">
            <h3 className="text-sm font-display uppercase text-white tracking-widest">Earned Badges</h3>
            <button className="text-[10px] text-primary hover:text-white font-display uppercase">View All</button>
          </div>
          
          <div className="grid grid-cols-2 gap-3 shrink-0">
            {badges.map((badge, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg hover:border-white/30 transition-colors">
                <div className={`w-10 h-10 rounded bg-black/50 border border-white/10 flex items-center justify-center ${badge.color} shadow-[0_0_15px_rgba(255,255,255,0.05)]`}>
                  {badge.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-display font-bold text-white uppercase">{badge.name}</span>
                  <span className="text-[10px] font-sans text-muted-foreground">{badge.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-end mt-4 shrink-0">
            <h3 className="text-sm font-display uppercase text-white tracking-widest">Rewards History</h3>
            <button onClick={() => setShowLevelUp(true)} className="text-[10px] text-accent hover:text-white font-display uppercase">Test Level Up</button>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide flex flex-col gap-2 pr-2">
            {[
              { title: "Weekly Top 10%", reward: "500 G", date: "2 days ago" },
              { title: "Level Up: Pilot", reward: "Profile Badge, 1000 G", date: "1 week ago" },
              { title: "First Booking", reward: "200 G", date: "1 month ago" },
            ].map((reward, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-black/40 border border-white/10 rounded-lg">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-display font-bold text-white">{reward.title}</span>
                  <span className="text-[10px] font-sans text-muted-foreground">{reward.date}</span>
                </div>
                <div className="text-xs font-display font-black text-yellow-500">{reward.reward}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Level Up Modal (Test) */}
      {showLevelUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full h-auto max-w-md max-h-[90vh] bg-background border-2 border-accent rounded-2xl shadow-[0_0_50px_rgba(236,72,153,0.3)] overflow-y-auto scrollbar-hide flex flex-col text-center relative pointer-events-auto sm:max-w-sm md:max-w-md">
            {/* Confetti / Glow effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-accent/20 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="p-6 sm:p-8 flex flex-col items-center gap-4 relative z-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-accent/20 border-2 border-accent rounded-full flex items-center justify-center text-accent mb-2 shadow-[0_0_30px_rgba(236,72,153,0.5)] animate-bounce shrink-0">
                <Target className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-widest">Level Up!</h2>
              <p className="text-base sm:text-lg font-display text-accent uppercase tracking-wider">You are now a <span className="text-white font-black">{rank}</span></p>
              
              <div className="bg-black/50 border border-white/10 rounded-lg p-4 w-full mt-2 sm:mt-4 flex flex-col gap-2">
                <span className="text-xs text-muted-foreground font-display uppercase tracking-widest mb-2">Rewards Unlocked</span>
                <div className="flex justify-between items-center text-xs sm:text-sm gap-2">
                  <span className="text-white font-sans">Virtual Currency</span>
                  <span className="font-display font-black text-yellow-500">1,000 G</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm gap-2">
                  <span className="text-white font-sans">Profile Badge</span>
                  <span className="font-display font-black text-primary">"Pilot" Status</span>
                </div>
              </div>

              <CyberButton onClick={() => setShowLevelUp(false)} className="w-full mt-4 sm:mt-6 py-2 sm:py-3 text-sm">
                Claim Rewards
              </CyberButton>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

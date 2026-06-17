import { useState } from "react";
import { useNavigate } from "react-router";
import { CyberButton } from "../components/CyberButton";
import { CyberInput } from "../components/CyberInput";
import { ChevronLeft, Search, Trophy, Medal, RefreshCw, Filter } from "lucide-react";
import { useSettings } from "../SettingsContext";
import profilePlaceholder from "@/assets/images/profile/placeholder-user.jpg";

const LEADERBOARD_DATA = [
  { id: 2, name: "NEON_RACER", time: "01:25.10", level: 4, rank: "Ace", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&q=80", me: false },
  { id: 3, name: "GLITCH_99", time: "01:28.44", level: 3, rank: "Pilot", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&q=80", me: false },
  { id: 4, name: "VOID_WALKER", time: "01:30.05", level: 3, rank: "Pilot", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80", me: false },
  { id: 5, name: "ZERO_COOL", time: "01:31.99", level: 2, rank: "Racer", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80", me: false },
  { id: 6, name: "HACK_THE_PLANET", time: "01:35.20", level: 2, rank: "Racer", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80", me: false },
];

export function Leaderboard() {
  const navigate = useNavigate();
  const { username, level, rank, bestResult } = useSettings();
  const [tab, setTab] = useState("daily");
  const [search, setSearch] = useState("");

  const leaderboardData = [
    { id: 1, name: username, time: bestResult, level, rank, avatar: profilePlaceholder, me: true },
    ...LEADERBOARD_DATA,
  ];

  const filteredData = leaderboardData.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col h-full bg-background relative z-10">
      <header className="px-4 py-4 flex items-center gap-4 border-b border-white/10 bg-black/50 sticky top-0 z-20 backdrop-blur-md">
        <button 
          onClick={() => navigate("/home")}
          className="w-10 h-10 rounded border border-white/20 bg-black/50 text-white backdrop-blur-sm flex items-center justify-center"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="flex-1 text-xl font-display font-bold uppercase tracking-widest text-white">
          Leaderboard
        </h2>
        <button className="w-10 h-10 flex items-center justify-center text-primary hover:text-white transition-colors">
          <RefreshCw className="w-5 h-5" />
        </button>
      </header>

      <div className="p-4 flex gap-4 shrink-0">
        {/* Tabs */}
        <div className="flex p-1 bg-black/50 rounded-lg border border-white/10 w-1/3">
          <button 
            onClick={() => setTab("daily")}
            className={`flex-1 py-1.5 text-[10px] font-display font-bold uppercase ${tab === 'daily' ? 'text-white bg-primary/20 border border-primary/50 rounded shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'text-muted-foreground hover:text-white'}`}
          >
            Daily
          </button>
          <button 
            onClick={() => setTab("weekly")}
            className={`flex-1 py-1.5 text-[10px] font-display font-bold uppercase ${tab === 'weekly' ? 'text-white bg-primary/20 border border-primary/50 rounded shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'text-muted-foreground hover:text-white'}`}
          >
            Weekly
          </button>
          <button 
            onClick={() => setTab("monthly")}
            className={`flex-1 py-1.5 text-[10px] font-display font-bold uppercase ${tab === 'monthly' ? 'text-white bg-primary/20 border border-primary/50 rounded shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'text-muted-foreground hover:text-white'}`}
          >
            Monthly
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-2 w-2/3">
          <div className="flex-1">
            <CyberInput 
              icon={<Search className="w-4 h-4" />}
              placeholder="Search pilots..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="py-1.5 text-sm"
            />
          </div>
          <CyberButton variant="ghost" className="px-3 border border-white/10 bg-white/5 py-1.5">
            <Filter className="w-4 h-4" />
          </CyberButton>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 scrollbar-hide grid grid-cols-2 gap-2 content-start">
        {filteredData.map((player, idx) => (
          <div 
            key={player.id}
            className={`flex items-center gap-3 p-2 rounded-lg border ${player.me ? 'border-primary bg-primary/10' : 'border-white/5 bg-black/40'} ${idx === 0 ? 'border-yellow-500/50 bg-yellow-500/10' : idx === 1 ? 'border-slate-300/50 bg-slate-300/10' : idx === 2 ? 'border-amber-600/50 bg-amber-600/10' : ''}`}
          >
            <div className={`w-6 h-6 flex items-center justify-center font-display font-bold text-sm ${idx === 0 ? 'text-yellow-500' : idx === 1 ? 'text-slate-300' : idx === 2 ? 'text-amber-600' : 'text-muted-foreground'}`}>
              {idx < 3 ? <Medal className="w-4 h-4" /> : `#${idx + 1}`}
            </div>
            
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 shrink-0">
              <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1 flex flex-col min-w-0">
              <span className={`font-display font-bold text-xs truncate ${player.me ? 'text-primary' : 'text-white'}`}>
                {player.name} {player.me && "(YOU)"}
              </span>
              <span className="text-[9px] text-muted-foreground font-display uppercase">
                Lvl {player.level} {player.rank}
              </span>
            </div>
            
            <div className="font-display font-black text-white text-right tracking-wider text-sm pr-2">
              {player.time}
            </div>
          </div>
        ))}
      </div>
      
      {/* Current Player Sticky Bottom (if not in top view) */}
      <div className="p-4 border-t border-primary/30 bg-black/90 backdrop-blur-md sticky bottom-0">
        <div className="flex items-center gap-3 p-3 rounded-lg border border-primary shadow-[0_0_15px_rgba(6,182,212,0.2)] bg-primary/10">
          <div className="w-8 h-8 flex items-center justify-center font-display font-bold text-lg text-primary">
            #1
          </div>
          <div className="flex-1 flex flex-col">
            <span className="font-display font-bold text-sm text-primary">
              {username} (YOU)
            </span>
            <span className="text-[10px] text-muted-foreground font-display uppercase">
              Lvl {level} {rank}
            </span>
          </div>
          <div className="font-display font-black text-white text-right tracking-wider">
            {bestResult}
          </div>
        </div>
      </div>
    </div>
  );
}

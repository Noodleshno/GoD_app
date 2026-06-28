import { useState } from "react";
import { useNavigate } from "react-router";
import { CyberButton } from "../components/CyberButton";
import { CyberInput } from "../components/CyberInput";
import { ChevronLeft, Search, Filter, Clock, Zap } from "lucide-react";

export function Catalog() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const activities = [
    {
      id: 1,
      title: "Neon Circuit Race",
      category: "racing",
      desc: "High-speed competitive racing in the underground sector. 12 pilot slots.",
      cost: "500 G",
      duration: "15m",
      track: "Alpha Sector",
      status: "active",
      img: "",
      recommended: true
    },
    {
      id: 2,
      title: "Drone Football",
      category: "team",
      desc: "Open arena with obstacles for practicing stunts and maneuvers.",
      cost: "300 G",
      duration: "15m",
      track: "Neon Ring",
      status: "active",
      img: "",
      recommended: false
    },
    {
      id: 3,
      title: "RoboSumo",
      category: "pvp",
      desc: "Tactical team-based drone combat. Lasers enabled. High stakes.",
      cost: "1000 G",
      duration: "20m",
      track: "Underground",
      status: "unavailable",
      img: "",
      recommended: false
    }
  ];

  const visibleActivities = activities.filter(activity => {
    const matchesFilter = filter === "all" || activity.category === filter;
    const matchesSearch = activity.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full bg-black relative z-10 overflow-hidden">
      {/* Header */}
      <header className="px-8 py-3 flex items-center justify-between border-b border-primary/20 bg-black/50 backdrop-blur-sm relative z-10 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate("/home")}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:border-primary/50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-display font-black text-white uppercase tracking-widest">Game Catalog</h2>
        </div>
        <div className="flex gap-2 w-64">
          <CyberInput 
            icon={<Search className="w-4 h-4" />}
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="py-1.5 text-xs"
          />
        </div>
      </header>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-4 overflow-hidden relative z-10">
        
        {/* Filters */}
        <div className="flex gap-2 shrink-0 overflow-x-auto scrollbar-hide pb-2">
          {["all", "racing", "team", "pvp"].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded text-xs font-display uppercase tracking-wider transition-colors whitespace-nowrap border ${filter === cat ? 'bg-primary/20 border-primary text-white shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'bg-white/5 border-white/10 text-muted-foreground hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
          <button className="ml-auto px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white flex items-center gap-2 text-xs font-display">
            <Filter className="w-3 h-3" /> Filters
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto scrollbar-hide pr-2 flex flex-col gap-4">
          {visibleActivities.map(activity => (
            <div key={activity.id} className="flex bg-black/40 border border-white/10 rounded-xl overflow-hidden h-32 hover:border-primary/50 transition-colors group">
              {/* Image */}
              <div className="w-48 relative shrink-0">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${activity.img})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/80"></div>
                {activity.recommended && (
                  <div className="absolute top-2 left-2 bg-accent text-white text-[9px] font-display font-black uppercase px-2 py-0.5 rounded shadow-[0_0_10px_rgba(236,72,153,0.8)]">
                    Recommended
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 p-4 flex flex-col justify-between relative">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-display font-bold text-lg text-white uppercase tracking-wide">{activity.title}</h3>
                    <p className="text-xs text-muted-foreground font-sans mt-1 line-clamp-2 max-w-sm">{activity.desc}</p>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className="text-sm font-display font-black text-yellow-500 drop-shadow-[0_0_5px_rgba(234,179,8,0.5)] flex items-center gap-1">
                      <Zap className="w-3 h-3" /> {activity.cost}
                    </span>
                    <span className={`text-[10px] font-sans font-bold uppercase px-2 py-0.5 mt-1 rounded ${activity.status === 'active' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-red-500/20 text-red-400 border border-red-500/50'}`}>
                      {activity.status}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div className="flex gap-3 text-xs text-muted-foreground font-sans">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {activity.duration} Sessions</span>
                  </div>
                  <CyberButton 
                    className="h-8 px-6 py-0 text-xs"
                    disabled={activity.status !== 'active'}
                    onClick={() => navigate("/booking", { state: { activity } })}
                  >
                    {activity.status === 'active' ? 'Book Time' : 'Unavailable'}
                  </CyberButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

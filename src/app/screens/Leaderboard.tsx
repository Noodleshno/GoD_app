// ...existing code...
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { CyberButton } from "../components/CyberButton";
import { CyberInput } from "../components/CyberInput";
import {
  ChevronLeft,
  Search,
  Trophy,
  Medal,
  RefreshCw,
  Filter,
  Shield,
  Crown,
} from "lucide-react";
import profilePlaceholder from "@/assets/images/profile/placeholder-user.jpg";
import { Card } from "../components/ui/card";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { cn } from "../../lib/utils";

export function Leaderboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<
    "overall" | "robosumo" | "football" | "race" | "clans"
  >("overall");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const ME = {
    id: 1,
    name: "PLAYER_ONE",
    time: "01:24.88",
    level: 5,
    rank: "Ace",
    avatar: profilePlaceholder,
    me: true,
  };

  const SAMPLE = [
    {
      id: 2,
      name: "NEON_RACER",
      time: "01:25.10",
      level: 4,
      rank: "Ace",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&q=80",
    },
    {
      id: 3,
      name: "GLITCH_99",
      time: "01:28.44",
      level: 3,
      rank: "Pilot",
      avatar:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&q=80",
    },
    {
      id: 4,
      name: "VOID_WALKER",
      time: "01:30.05",
      level: 3,
      rank: "Pilot",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80",
    },
    {
      id: 5,
      name: "ZERO_COOL",
      time: "01:31.99",
      level: 2,
      rank: "Racer",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    },
    {
      id: 6,
      name: "HACK_THE_PLANET",
      time: "01:35.20",
      level: 2,
      rank: "Racer",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    },
  ];

  const leaderboardData = useMemo(() => {
    return [ME, ...SAMPLE].map((p, i) => ({ ...p, pos: i + 1 }));
  }, []);

  const filtered = leaderboardData.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleRefresh() {
    setLoading(true);
    setTimeout(() => setLoading(false), 600);
  }

  const sampleClans = [
    {
      id: "c1",
      name: "Neon Syndicate",
      tag: "NEON",
      leader: "Razor",
      members: 12,
      points: 8420,
      rank: 1,
    },
    {
      id: "c2",
      name: "Pulse Riders",
      tag: "PULSE",
      leader: "Vega",
      members: 9,
      points: 7310,
      rank: 2,
    },
    {
      id: "c3",
      name: "Cyber Drift",
      tag: "CYBR",
      leader: "Nova",
      members: 15,
      points: 9840,
      rank: 3,
    },
  ];

  function rankIcon(rank: number) {
    if (rank === 1) return <Trophy className="mx-auto size-5 text-yellow-400" />;
    if (rank === 2) return <Medal className="mx-auto size-5 text-slate-400" />;
    if (rank === 3) return <Medal className="mx-auto size-5 text-amber-600" />;
    return (
      <span className="font-heading text-sm font-black text-muted-foreground">
        #{rank}
      </span>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background relative z-10">
      <header className="px-4 py-4 flex items-center gap-4 border-b border-white/10 bg-black/50 sticky top-0 z-20 backdrop-blur-md">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded border border-white/20 bg-black/50 text-white flex items-center justify-center"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="flex-1 text-xl font-display font-bold uppercase tracking-widest text-white">
          Leaderboard
        </h2>
        <button
          onClick={handleRefresh}
          className="w-10 h-10 flex items-center justify-center text-primary hover:text-white transition-colors"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
        </button>
      </header>

      <div className="p-4 flex gap-4 shrink-0 items-center">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setTab("overall")}
            className={`px-3 py-1.5 rounded-md text-sm font-semibold uppercase ${
              tab === "overall"
                ? "bg-primary/20 text-white border border-primary/40"
                : "text-muted-foreground bg-black/40"
            }`}
          >
            <Trophy className="inline mr-2 size-4" /> Overall
          </button>
          <button
            onClick={() => setTab("robosumo")}
            className={`px-3 py-1.5 rounded-md text-sm font-semibold uppercase ${
              tab === "robosumo"
                ? "bg-primary/20 text-white border border-primary/40"
                : "text-muted-foreground bg-black/40"
            }`}
          >
            RoboSumo
          </button>
          <button
            onClick={() => setTab("football")}
            className={`px-3 py-1.5 rounded-md text-sm font-semibold uppercase ${
              tab === "football"
                ? "bg-primary/20 text-white border border-primary/40"
                : "text-muted-foreground bg-black/40"
            }`}
          >
            Drone Football
          </button>
          <button
            onClick={() => setTab("race")}
            className={`px-3 py-1.5 rounded-md text-sm font-semibold uppercase ${
              tab === "race"
                ? "bg-primary/20 text-white border border-primary/40"
                : "text-muted-foreground bg-black/40"
            }`}
          >
            Race
          </button>
          <button
            onClick={() => setTab("clans")}
            className={`px-3 py-1.5 rounded-md text-sm font-semibold uppercase ${
              tab === "clans"
                ? "bg-primary/20 text-white border border-primary/40"
                : "text-muted-foreground bg-black/40"
            }`}
          >
            <Shield className="inline mr-2 size-4" /> Clans
          </button>
        </div>

        <div className="flex-1" />

        <div className="flex gap-2 w-1/3">
          <div className="flex-1">
            <CyberInput
              icon={<Search className="w-4 h-4" />}
              placeholder={tab === "clans" ? "Search clans..." : "Search pilots..."}
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

      <div className="flex-1 overflow-y-auto px-4 pb-24 scrollbar-hide">
        {tab === "clans" ? (
          <div className="grid gap-2">
            {sampleClans.map((c) => (
              <Card
                key={c.id}
                className={cn(
                  "flex items-center gap-3 border-border/60 p-3 rounded-xl",
                  c.rank === 1 && "border-yellow-500/30"
                )}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 shrink-0">{rankIcon(c.rank)}</div>
                  <span className="flex items-center justify-center w-10 h-8 rounded-md border border-primary/30 bg-primary/10 text-xs font-black uppercase text-primary">
                    {c.tag}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-bold uppercase tracking-tight truncate text-sm">
                      {c.name}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-2 truncate">
                      <Crown className="size-3 text-primary inline" /> {c.leader} · {c.members}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="font-heading text-sm font-bold text-primary">
                    {c.points.toLocaleString()}
                  </p>
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    pts
                  </p>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-2">
            {filtered.map((player) => (
              <Card
                key={player.id}
                className={cn(
                  "flex items-center gap-3 border-border/60 p-3 rounded-xl",
                  player.me && "border-primary/50 bg-primary/5"
                )}
              >
                <div className="w-8 flex items-center justify-center text-sm">
                  {rankIcon(player.pos)}
                </div>

                <Avatar className="size-8 border border-white/10">
                  <AvatarFallback className="bg-primary/10 text-xs font-bold text-primary">
                    {player.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <p className="font-heading font-bold uppercase tracking-tight truncate text-sm flex items-center gap-2">
                    {player.name}
                    {player.me && (
                      <Badge
                        variant="outline"
                        className="border-primary/40 text-primary text-[10px] px-2 py-0"
                      >
                        YOU
                      </Badge>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">Lvl {player.level} · {player.rank}</p>
                </div>

                <div className="text-right shrink-0">
                  <p className="font-heading text-sm font-bold text-primary">{player.time}</p>
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">time</p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="fixed left-0 right-0 bottom-0 p-4 border-t border-primary/30 bg-black/90 backdrop-blur-md">
        <div className="max-w-3xl mx-auto flex items-center gap-3 p-3 rounded-lg border border-primary bg-primary/10">
          <div className="w-8 h-8 flex items-center justify-center font-display font-bold text-lg text-primary">
            #1
          </div>
          <div className="flex-1 flex flex-col">
            <span className="font-display font-bold text-sm text-primary">PLAYER_ONE (YOU)</span>
            <span className="text-[10px] text-muted-foreground font-display uppercase">Lvl 5 Ace</span>
          </div>
          <div className="font-display font-black text-white text-right tracking-wider">
            01:24.88
          </div>
        </div>
      </div>
    </div>
  );
}
// ...existing code...
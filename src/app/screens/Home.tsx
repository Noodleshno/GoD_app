import { useState } from "react";
import { useNavigate } from "react-router";
import { CyberButton } from "../components/CyberButton";
import { CyberInput } from "../components/CyberInput";
import { 
  Gamepad2, Calendar, Trophy, Ticket, 
  HelpCircle, Settings, Rocket,
  X, Mail, MessageSquare, ExternalLink, CheckCircle2, AlertCircle
} from "lucide-react";
import { useSettings } from "../SettingsContext";
import profilePlaceholder from "@/assets/images/profile/placeholder-user.jpg";

const PROMO_CODES = {
  GOD500: { message: "500 G added to your pilot wallet.", coins: 500 }
};

export function Home() {
  const navigate = useNavigate();
  const { 
    username, level, xp, maxXp,
    walletBalance, addWalletBalance, activatedPromoCodes, activatePromoCode: markPromoCodeActivated
  } = useSettings();
  const [showSupport, setShowSupport] = useState(false);
  const [showPrizePool, setShowPrizePool] = useState(false);
  const [showPromoCode, setShowPromoCode] = useState(false);
  const [prizeTab, setPrizeTab] = useState<"daily" | "weekly" | "monthly">("daily");
  const [promoCode, setPromoCode] = useState("");
  const [promoResult, setPromoResult] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const activatePromoCode = () => {
    const normalizedCode = promoCode.trim().toUpperCase();
    const reward = PROMO_CODES[normalizedCode as keyof typeof PROMO_CODES];

    if (!normalizedCode) {
      setPromoResult({ type: "error", message: "Enter a promo code first." });
      return;
    }

    if (!reward) {
      setPromoResult({ type: "error", message: "Promo code not found or already expired." });
      return;
    }

    if (activatedPromoCodes.includes(normalizedCode)) {
      setPromoResult({ type: "error", message: "Promo code has already been activated." });
      return;
    }

    if (reward.coins > 0) {
      addWalletBalance(reward.coins);
    }

    markPromoCodeActivated(normalizedCode);
    setPromoResult({ type: "success", message: reward.message });
  };

  return (
    <div className="flex flex-col h-full relative z-10">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-screen pointer-events-none"></div>
      
      {/* Header */}
      <header className="px-8 py-3 flex justify-between items-center border-b border-primary/20 bg-black/50 backdrop-blur-sm relative z-10">
        <button 
          onClick={() => navigate("/profile")}
          className="flex items-center gap-3 hover:bg-white/5 p-1 pr-3 rounded-full transition-colors border border-transparent hover:border-white/10"
        >
          <div className="w-8 h-8 rounded-full border-2 border-primary bg-primary/20 flex items-center justify-center text-primary relative shadow-[0_0_10px_rgba(6,182,212,0.5)] overflow-hidden">
            <img src={profilePlaceholder} alt="avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-primary font-display uppercase tracking-widest flex items-center gap-1">Lvl {level} <span className="text-muted-foreground ml-1">{xp}/{maxXp} XP</span></span>
            <span className="text-xs font-bold text-white font-display uppercase">{username}</span>
          </div>
        </button>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate("/settings")}
            className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-muted-foreground hover:text-white hover:border-primary/50 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setShowPrizePool(true)}
            className="h-8 rounded-full border border-yellow-500/30 bg-yellow-500/10 flex items-center justify-center text-yellow-500 hover:bg-yellow-500/20 transition-colors shadow-[0_0_10px_rgba(234,179,8,0.2)] px-3 gap-1"
          >
            <span className="font-display font-bold text-xs">G</span>
            <span className="font-display font-bold text-xs">{walletBalance.toLocaleString()}</span>
          </button>
        </div>
      </header>

      {/* Main Content - Landscape 2 Column */}
      <div className="flex-1 flex px-8 py-4 gap-6 overflow-hidden relative z-10">
        
        {/* Left Column */}
        <div className="w-3/5 flex flex-col gap-4">
          <div className="relative w-full h-32 rounded-xl border border-primary/30 overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506950266008-8e6da5fb3d05?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
              <div>
                <h3 className="text-xl font-display font-bold text-white uppercase tracking-wider mb-0.5 shadow-black drop-shadow-md">
                  Race Arena Alpha
                </h3>
                <p className="text-xs font-sans text-primary drop-shadow-md">Drones Available: 4 / 12</p>
              </div>
              <CyberButton onClick={() => navigate("/drone")} className="h-9 px-5 py-0 text-xs shadow-[0_0_18px_rgba(6,182,212,0.9)]">
                <Rocket className="w-4 h-4" />
                Let&apos;s Go
              </CyberButton>
            </div>
            {/* Cyberpunk accent */}
            <div className="absolute top-0 right-4 w-12 h-[2px] bg-primary shadow-[0_0_10px_rgba(6,182,212,1)]"></div>
            <div className="absolute top-4 right-0 w-[2px] h-12 bg-primary shadow-[0_0_10px_rgba(6,182,212,1)]"></div>
          </div>

          <div className="flex gap-4 h-24">
            <CyberButton 
              onClick={() => navigate("/catalog")}
              className="flex-1 flex-col gap-2 bg-primary/20 hover:bg-primary/30 h-full"
            >
              <Gamepad2 className="w-6 h-6" />
              <span className="text-sm">Game Catalog</span>
            </CyberButton>
            
            <CyberButton 
              variant="secondary"
              onClick={() => window.open("https://t.me/god_drones_club", "_blank")}
              className="flex-1 flex-col gap-2 h-full"
            >
              <ExternalLink className="w-6 h-6" />
              <span className="text-sm">Join Club</span>
            </CyberButton>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-2/5 flex flex-col gap-2 overflow-y-auto scrollbar-hide pr-2">
          <CyberButton 
            variant="ghost" 
            onClick={() => navigate("/leaderboard")}
            className="justify-start border border-white/10 bg-white/5 hover:border-primary/50 py-2 text-sm"
          >
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="ml-2">Leaderboard</span>
          </CyberButton>
          
          <CyberButton 
            variant="ghost" 
            onClick={() => navigate("/booking")}
            className="justify-start border border-white/10 bg-white/5 hover:border-white/50 py-2 text-sm"
          >
            <Calendar className="w-4 h-4" />
            <span className="ml-2">Book Time</span>
          </CyberButton>

          <CyberButton 
            variant="ghost" 
            onClick={() => {
              setShowPromoCode(true);
              setPromoResult(null);
            }}
            className="justify-start border border-white/10 bg-white/5 hover:border-accent/50 py-2 text-sm"
          >
            <Ticket className="w-4 h-4 text-accent" />
            <span className="ml-2">Promo Code</span>
          </CyberButton>
          
          <CyberButton 
            variant="ghost" 
            onClick={() => setShowSupport(true)}
            className="justify-start border border-white/10 bg-white/5 hover:border-white/50 py-2 text-sm"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="ml-2">Support</span>
          </CyberButton>
        </div>
      </div>

      {/* Popups */}
      {showPromoCode && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-background border border-accent/50 rounded-xl shadow-[0_0_30px_rgba(236,72,153,0.2)] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-3 border-b border-white/10 bg-accent/10">
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-white">Promo Code</h3>
              <button onClick={() => setShowPromoCode(false)} className="text-muted-foreground hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 flex flex-col gap-3">
              <CyberInput
                icon={<Ticket className="w-4 h-4" />}
                placeholder="Enter code"
                value={promoCode}
                onChange={(event) => {
                  setPromoCode(event.target.value.toUpperCase());
                  setPromoResult(null);
                }}
                className="py-2 text-sm uppercase"
              />

              {promoResult && (
                <div className={`flex items-start gap-2 rounded-lg border p-3 text-xs font-sans ${
                  promoResult.type === "success"
                    ? "border-green-500/40 bg-green-500/10 text-green-300"
                    : "border-destructive/40 bg-destructive/10 text-destructive"
                }`}>
                  {promoResult.type === "success" ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  )}
                  <span>{promoResult.message}</span>
                </div>
              )}

              <CyberButton variant="secondary" className="w-full py-2 text-sm" onClick={activatePromoCode}>
                Activate
              </CyberButton>
            </div>
          </div>
        </div>
      )}

      {showSupport && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-background border border-primary/50 rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.2)] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-3 border-b border-white/10 bg-primary/10">
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-white">Comms Uplink</h3>
              <button onClick={() => setShowSupport(false)} className="text-muted-foreground hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 flex flex-col gap-3">
              <CyberButton variant="secondary" className="w-full justify-start pl-6 py-2 text-sm">
                <MessageSquare className="w-4 h-4 mr-3" /> Telegram
              </CyberButton>
              <CyberButton variant="ghost" className="w-full justify-start pl-6 border border-white/10 py-2 text-sm">
                <Mail className="w-4 h-4 mr-3" /> help@god.kz
              </CyberButton>
            </div>
          </div>
        </div>
      )}

      {showPrizePool && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-background border border-yellow-500/50 rounded-xl shadow-[0_0_30px_rgba(234,179,8,0.2)] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-3 border-b border-white/10 bg-yellow-500/10">
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-yellow-500">Prize Pool</h3>
              <button onClick={() => setShowPrizePool(false)} className="text-muted-foreground hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3 flex flex-col gap-3 h-[250px] overflow-y-auto scrollbar-hide">
              <div className="flex p-1 bg-black/50 rounded-lg border border-white/10 shrink-0">
                {[
                  { id: "daily", label: "Daily" },
                  { id: "weekly", label: "Weekly" },
                  { id: "monthly", label: "Monthly" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setPrizeTab(tab.id as "daily" | "weekly" | "monthly")}
                    className={`flex-1 py-1 text-[10px] font-display rounded ${prizeTab === tab.id
                      ? "text-white bg-yellow-500/20 border border-yellow-500/50"
                      : "text-muted-foreground hover:text-white"}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              
              {prizeTab === "daily" && (
                <div className="text-center py-2 shrink-0">
                  <p className="text-2xl font-display font-black text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]">
                    1,500 G
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1">Current Daily Fund</p>
                </div>
              )}
              {prizeTab === "weekly" && (
                <div className="text-center py-2 shrink-0">
                  <p className="text-2xl font-display font-black text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]">
                    10,500 G
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1">Current Weekly Fund</p>
                </div>
              )}
              {prizeTab === "monthly" && (
                <div className="text-center py-2 shrink-0">
                  <p className="text-2xl font-display font-black text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]">
                    45,000 G
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1">Current Monthly Fund</p>
                </div>
              )}

              <div className="flex flex-col gap-2">
                {[1, 2, 3].map((place) => (
                  <div key={place} className={`flex justify-between items-center p-2 rounded-lg border ${place === 1 ? 'border-yellow-500/50 bg-yellow-500/10' : place === 2 ? 'border-slate-300/50 bg-slate-300/10' : 'border-amber-600/50 bg-amber-600/10'}`}>
                    <span className="font-display font-bold text-sm text-white">#{place}</span>
                    <span className="font-sans text-muted-foreground text-xs">Prize</span>
                    <span className="font-display text-sm text-white">{place === 1 ? '750' : place === 2 ? '450' : '300'} G</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

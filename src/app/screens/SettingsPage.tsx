import { useState } from "react";
import { useNavigate } from "react-router";
import { CyberButton } from "../components/CyberButton";
import { useSettings } from "../SettingsContext";
import { ChevronLeft, Globe, Gamepad2, Volume2, Shield, User, Smartphone } from "lucide-react";
import { CyberInput } from "../components/CyberInput";

export function SettingsPage() {
  const navigate = useNavigate();
  const { 
    username, setUsername, 
    swapControls, setSwapControls, resetControls,
    lang, setLang 
  } = useSettings();

  const [activeTab, setActiveTab] = useState("controls");
  const [newUsername, setNewUsername] = useState(username);

  const tabs = [
    { id: "controls", label: "Controls", icon: <Gamepad2 className="w-4 h-4" /> },
    { id: "account", label: "Account", icon: <User className="w-4 h-4" /> },
    { id: "language", label: "Language", icon: <Globe className="w-4 h-4" /> },
    { id: "audio", label: "Audio", icon: <Volume2 className="w-4 h-4" /> },
    { id: "privacy", label: "Privacy", icon: <Shield className="w-4 h-4" /> },
  ];

  return (
    <div className="flex flex-col h-full bg-black relative z-10 overflow-hidden">
      {/* Header */}
      <header className="px-8 py-3 flex items-center justify-between border-b border-primary/20 bg-black/50 backdrop-blur-sm relative z-10 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:border-primary/50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-display font-black text-white uppercase tracking-widest">Settings</h2>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative z-10">
        
        {/* Sidebar Tabs */}
        <div className="w-1/3 border-r border-white/10 bg-black/40 flex flex-col p-4 gap-2 overflow-y-auto scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-display uppercase tracking-wide transition-colors border ${activeTab === tab.id ? 'bg-primary/20 border-primary/50 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'bg-transparent border-transparent text-muted-foreground hover:text-white hover:bg-white/5'}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="w-2/3 p-6 overflow-y-auto scrollbar-hide flex flex-col gap-6">
          
          {activeTab === "controls" && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-300">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-display uppercase text-white tracking-widest">Layout Configuration</h3>
                <p className="text-xs text-muted-foreground font-sans">
                  Optimize your touchscreen layout for landscape ergonomics. Changes apply instantly to gameplay.
                </p>
              </div>

              <div className="bg-black/50 border border-white/10 rounded-xl p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-display text-white">Swap L/R and F/B</span>
                    <span className="text-xs text-muted-foreground font-sans mt-1 max-w-[200px]">
                      {swapControls 
                        ? "Move (F/B) is on the Right. Steer (L/R) is on the Left." 
                        : "Move (F/B) is on the Left. Steer (L/R) is on the Right."}
                    </span>
                  </div>
                  <button 
                    onClick={() => setSwapControls(!swapControls)}
                    className={`w-12 h-6 rounded-full relative transition-colors ${swapControls ? 'bg-primary shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'bg-white/20'}`}
                  >
                    <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${swapControls ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </button>
                </div>

                <div className="h-[1px] bg-white/10 w-full my-2"></div>

                <div className="flex items-center justify-between opacity-50 pointer-events-none">
                  <div className="flex flex-col">
                    <span className="text-sm font-display text-white">Control Scale</span>
                    <span className="text-xs text-muted-foreground font-sans mt-1">Adjust size of virtual buttons</span>
                  </div>
                  <span className="text-xs text-white">100%</span>
                </div>
                
                <CyberButton variant="ghost" onClick={resetControls} className="w-fit mt-2 py-2 px-4 text-xs border border-white/20">
                  Restore Defaults
                </CyberButton>
              </div>
            </div>
          )}

          {activeTab === "language" && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-300">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-display uppercase text-white tracking-widest">Localization</h3>
                <p className="text-xs text-muted-foreground font-sans">
                  Select your preferred system language.
                </p>
              </div>

              <div className="flex gap-4">
                {[
                  { code: "EN", name: "English" },
                  { code: "RU", name: "Русский" },
                  { code: "KZ", name: "Қазақша" }
                ].map(l => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`flex-1 py-4 flex flex-col items-center gap-2 rounded-xl border transition-all ${lang === l.code ? 'bg-primary/20 border-primary shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'bg-black/50 border-white/10 hover:border-white/30'}`}
                  >
                    <span className={`text-xl font-display font-black ${lang === l.code ? 'text-primary' : 'text-white'}`}>{l.code}</span>
                    <span className="text-xs text-muted-foreground">{l.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === "account" && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-300">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-display uppercase text-white tracking-widest">Pilot Profile</h3>
                <p className="text-xs text-muted-foreground font-sans">
                  Manage your public identity.
                </p>
              </div>

              <div className="flex flex-col gap-3 max-w-sm">
                <label className="text-xs text-muted-foreground font-display uppercase">Callsign</label>
                <div className="flex gap-2">
                  <CyberInput 
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="py-2 text-sm"
                  />
                  <CyberButton onClick={() => setUsername(newUsername)} className="py-2 px-4 text-sm shrink-0">
                    Save
                  </CyberButton>
                </div>
              </div>
              
              <div className="h-[1px] bg-white/10 w-full max-w-sm my-2"></div>

              <div className="flex flex-col gap-3 max-w-sm">
                 <CyberButton variant="ghost" className="w-full justify-start text-sm py-2 border border-white/10" onClick={() => navigate("/login")}>
                    Log Out
                 </CyberButton>
                 <CyberButton variant="danger" className="w-full justify-start text-sm py-2" glow={false}>
                    Delete Account
                 </CyberButton>
              </div>
            </div>
          )}

          {/* Placeholders for Audio / Privacy */}
          {(activeTab === "audio" || activeTab === "privacy") && (
            <div className="flex flex-col gap-4 items-center justify-center h-full text-center opacity-50 animate-in fade-in duration-300">
              <Shield className="w-12 h-12 text-muted-foreground mb-2" />
              <h3 className="text-sm font-display text-white uppercase tracking-widest">Module Offline</h3>
              <p className="text-xs text-muted-foreground font-sans max-w-[200px]">
                This settings module is currently under maintenance.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
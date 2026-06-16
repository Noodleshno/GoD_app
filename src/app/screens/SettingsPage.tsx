import { useState } from "react";
import { useNavigate } from "react-router";
import { CyberButton } from "../components/CyberButton";
import { useSettings } from "../SettingsContext";
import { ChevronLeft, Globe, Gamepad2, Volume2, Shield, User, Smartphone, Volume, VolumeX } from "lucide-react";
import { CyberInput } from "../components/CyberInput";
import { Slider } from "../components/ui/slider";

export function SettingsPage() {
  const navigate = useNavigate();
  const { 
    username, setUsername, 
    swapControls, setSwapControls, resetControls,
    steerControlType, setSteerControlType,
    throttleControlType, setThrottleControlType,
    lang, setLang 
  } = useSettings();

  const [activeTab, setActiveTab] = useState("controls");
  const [newUsername, setNewUsername] = useState(username);
  const [masterVolume, setMasterVolume] = useState([70]);
  const [musicVolume, setMusicVolume] = useState([60]);
  const [sfxVolume, setSfxVolume] = useState([80]);
  const [voiceVolume, setVoiceVolume] = useState([75]);
  const [controlSpeed, setControlSpeed] = useState([100]);

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
                  Changes apply instantly to gameplay.
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

                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm font-display text-white">Turn Input</span>
                      <span className="text-xs text-muted-foreground font-sans mt-1 max-w-[200px]">
                        Choose how you steer: buttons or joystick.
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {[
                        { mode: "buttons", label: "Buttons" },
                        { mode: "joystick", label: "Joystick" },
                      ].map(option => (
                        <button
                          key={option.mode}
                          onClick={() => setSteerControlType(option.mode as "buttons" | "joystick")}
                          className={`px-3 py-2 rounded-lg text-xs transition ${steerControlType === option.mode 
                            ? 'bg-primary/20 border border-primary text-white' 
                            : 'bg-white/5 border border-white/10 text-muted-foreground hover:text-white'}`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm font-display text-white">Speed Input</span>
                      <span className="text-xs text-muted-foreground font-sans mt-1 max-w-[200px]">
                        Choose how you control throttle: buttons or joystick.
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {[
                        { mode: "buttons", label: "Buttons" },
                        { mode: "joystick", label: "Joystick" },
                      ].map(option => (
                        <button
                          key={option.mode}
                          onClick={() => setThrottleControlType(option.mode as "buttons" | "joystick")}
                          className={`px-3 py-2 rounded-lg text-xs transition ${throttleControlType === option.mode 
                            ? 'bg-primary/20 border border-primary text-white' 
                            : 'bg-white/5 border border-white/10 text-muted-foreground hover:text-white'}`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="h-[1px] bg-white/10 w-full my-2"></div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-display text-white">Speed</span>
                    <span className="text-xs text-muted-foreground font-sans mt-1">Adjust control response speed</span>
                  </div>
                  <span className="text-xs font-display text-primary">{controlSpeed[0]}%</span>
                </div>

                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-muted-foreground">0%</span>
                  <Slider 
                    value={controlSpeed}
                    onValueChange={setControlSpeed}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-xs text-muted-foreground">100%</span>
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
                {(
                  [
                    { code: "EN", name: "English" },
                    { code: "RU", name: "Русский" },
                    { code: "KZ", name: "Қазақша" }
                  ]
                ).map(l => (
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
                <h3 className="text-lg font-display uppercase text-white tracking-widest">Profile</h3>
                <p className="text-xs text-muted-foreground font-sans">
                  Manage your public identity.
                </p>
              </div>

              <div className="flex flex-col gap-3 max-w-sm">
                <label className="text-xs text-muted-foreground font-display uppercase">Nickname</label>
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

          {activeTab === "audio" && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-300">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-display uppercase text-white tracking-widest">Audio Settings</h3>
                <p className="text-xs text-muted-foreground font-sans">
                  Adjust volume levels for different audio channels.
                </p>
              </div>

              <div className="bg-black/50 border border-white/10 rounded-xl p-6 flex flex-col gap-6 max-w-sm">
                {/* Master Volume */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-display text-white uppercase">Master Volume</label>
                    <span className="text-xs font-display text-primary">{masterVolume[0]}%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <VolumeX className="w-4 h-4 text-muted-foreground" />
                    <Slider 
                      value={masterVolume}
                      onValueChange={setMasterVolume}
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                    <Volume2 className="w-4 h-4 text-primary" />
                  </div>
                </div>

                <div className="h-[1px] bg-white/10 w-full"></div>

                {/* Music Volume */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-display text-white uppercase">Music</label>
                    <span className="text-xs font-display text-accent">{musicVolume[0]}%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <VolumeX className="w-4 h-4 text-muted-foreground" />
                    <Slider 
                      value={musicVolume}
                      onValueChange={setMusicVolume}
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                    <Volume2 className="w-4 h-4 text-accent" />
                  </div>
                </div>

                <div className="h-[1px] bg-white/10 w-full"></div>

                {/* SFX Volume */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-display text-white uppercase">Sound Effects</label>
                    <span className="text-xs font-display text-yellow-500">{sfxVolume[0]}%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <VolumeX className="w-4 h-4 text-muted-foreground" />
                    <Slider 
                      value={sfxVolume}
                      onValueChange={setSfxVolume}
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                    <Volume2 className="w-4 h-4 text-yellow-500" />
                  </div>
                </div>

                <div className="h-[1px] bg-white/10 w-full"></div>

                {/* Voice Volume */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-display text-white uppercase">Voice Chat</label>
                    <span className="text-xs font-display text-green-400">{voiceVolume[0]}%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <VolumeX className="w-4 h-4 text-muted-foreground" />
                    <Slider 
                      value={voiceVolume}
                      onValueChange={setVoiceVolume}
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                    <Volume2 className="w-4 h-4 text-green-400" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Placeholders for Privacy */}
          {activeTab === "privacy" && (
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

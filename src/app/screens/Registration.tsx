import { useState } from "react";
import { useNavigate } from "react-router";
import { CyberButton } from "../components/CyberButton";
import { CyberInput } from "../components/CyberInput";
import { Eye, EyeOff, Globe, User, Mail, Lock, ShieldCheck } from "lucide-react";
import { useSettings } from "../SettingsContext";
import godLogo from "@/assets/images/onboarding/god-logo.png";

export function Registration() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const { lang, setLang } = useSettings();

  const handleLangToggle = () => {
    if (lang === "EN") setLang("RU");
    else if (lang === "RU") setLang("KZ");
    else setLang("EN");
  };

  return (
    <div className="flex h-full px-8 pb-4 relative z-10">
      {/* Grid Background Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
      ></div>

      <div className="w-1/2 flex flex-col justify-center pr-8 relative z-10 border-r border-primary/20">
        <header className="mb-4 mt-[10px]">
          <img
            src={godLogo}
            alt="G.O.D"
            className="w-36 max-h-16 object-contain object-left mb-3 drop-shadow-[0_0_16px_rgba(6,182,212,0.5)]"
          />
          <h2 className="text-xl font-display uppercase tracking-widest text-white mb-1">Registration</h2>
          <p className="text-muted-foreground font-sans text-xs">Create your pilot profile</p>
        </header>

        <div className="mt-4 flex items-center gap-4">
          <button 
            onClick={handleLangToggle}
            className="flex items-center gap-2 text-xs font-display text-primary hover:text-white transition-colors border border-primary/30 px-3 py-1 bg-primary/10 w-fit"
          >
            <Globe className="w-3 h-3" />
            {lang}
          </button>
        </div>

        <div className="mt-auto text-left">
          <span className="text-muted-foreground font-sans text-xs">Already a pilot? </span>
          <button 
            onClick={() => navigate("/login")}
            className="text-accent hover:text-white font-display uppercase text-xs tracking-wider transition-colors ml-1"
          >
            Log In
          </button>
        </div>
      </div>

      <div className="w-1/2 flex flex-col justify-center pl-8 relative z-10">
        <form className="flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); navigate("/home"); }}>
          <CyberInput 
            icon={<User className="w-4 h-4" />} 
            placeholder="Name" 
            className="py-2 text-sm"
            required
          />
          <CyberInput 
            icon={<Mail className="w-4 h-4" />} 
            type="email"
            placeholder="Email" 
            className="py-2 text-sm"
            required
          />
          <CyberInput 
            icon={<Lock className="w-4 h-4" />} 
            type={showPassword ? "text" : "password"}
            placeholder="Password" 
            className="py-2 text-sm"
            rightElement={
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
            required
          />
          <CyberInput 
            icon={<ShieldCheck className="w-4 h-4" />} 
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password" 
            className="py-2 text-sm"
            required
          />

          <label className="flex items-start gap-2 mt-1 cursor-pointer group">
            <div className="relative flex items-center justify-center w-4 h-4 mt-0.5 border border-primary/50 group-hover:border-primary transition-colors bg-black/50 shrink-0">
              <input 
                type="checkbox" 
                className="opacity-0 absolute inset-0 cursor-pointer"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                required
              />
              {agreed && <div className="w-2 h-2 bg-primary shadow-[0_0_5px_#06b6d4]"></div>}
            </div>
            <span className="text-[10px] text-muted-foreground font-sans leading-tight">
              I agree to the <span className="text-primary underline decoration-primary/50">User Agreement</span> and confirm I am ready for combat operations.
            </span>
          </label>

          <CyberButton type="submit" className="w-full mt-2 py-2 text-sm">
            Sign Up
          </CyberButton>
        </form>
      </div>
    </div>
  );
}

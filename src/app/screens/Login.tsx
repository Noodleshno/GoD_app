import { useState } from "react";
import { useNavigate } from "react-router";
import { CyberButton } from "../components/CyberButton";
import { CyberInput } from "../components/CyberInput";
import { Eye, EyeOff, Globe, Mail, Lock } from "lucide-react";
import { useSettings } from "../SettingsContext";
import godLogo from "@/assets/images/onboarding/god-logo.png";

export function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { lang, setLang } = useSettings();

  const handleLangToggle = () => {
    if (lang === "EN") setLang("RU");
    else if (lang === "RU") setLang("KZ");
    else setLang("EN");
  };

  return (
    <div className="flex h-full px-8 pb-4 relative z-10">
      <div className="fixed inset-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'linear-gradient(rgba(236, 72, 153, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(236, 72, 153, 0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
      ></div>

      <div className="w-1/2 flex flex-col justify-center pr-8 relative z-10 border-r border-accent/20">
        <header className="mb-4 mt-[10px]">
          <img
            src={godLogo}
            alt="G.O.D"
            className="w-36 max-h-16 object-contain object-left mb-3 drop-shadow-[0_0_16px_rgba(236,72,153,0.45)]"
          />
          <h2 className="text-xl font-display uppercase tracking-widest text-white mb-1">Access System</h2>
          <p className="text-muted-foreground font-sans text-xs">Enter pilot credentials</p>
        </header>

        <div className="mt-4 flex items-center gap-4">
          <button 
            onClick={handleLangToggle}
            className="flex items-center gap-2 text-xs font-display text-accent hover:text-white transition-colors border border-accent/30 px-3 py-1 bg-accent/10 w-fit"
          >
            <Globe className="w-3 h-3" />
            {lang}
          </button>
        </div>

        <div className="mt-auto text-left">
          <span className="text-muted-foreground font-sans text-xs">New pilot? </span>
          <button 
            onClick={() => navigate("/register")}
            className="text-primary hover:text-white font-display uppercase text-xs tracking-wider transition-colors ml-1"
          >
            Sign Up
          </button>
        </div>
      </div>

      <div className="w-1/2 flex flex-col justify-center pl-8 relative z-10">
        <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); navigate("/home"); }}>
          <CyberInput 
            icon={<Mail className="w-4 h-4" />} 
            type="email"
            placeholder="Email" 
            className="py-2 text-sm"
            required
          />
          <div className="flex flex-col gap-1">
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
            <div className="text-right">
              <button type="button" className="text-[10px] font-sans text-muted-foreground hover:text-accent transition-colors mt-1">
                Forgot Security Code?
              </button>
            </div>
          </div>

          <CyberButton variant="secondary" type="submit" className="w-full mt-2 py-2 text-sm">
            Log In
          </CyberButton>
        </form>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router";
import { CyberButton } from "../components/CyberButton";
import { ChevronLeft, Zap, Mic, MicOff, Camera, RefreshCw, Activity, Battery, Crosshair, Settings2, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { useSettings } from "../SettingsContext";

export function DronePage() {
  const navigate = useNavigate();
  const { swapControls } = useSettings();
  
  const [micActive, setMicActive] = useState(false);
  const [rearCamera, setRearCamera] = useState(false);
  const [boosting, setBoosting] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Left/Right Controls
  const SteerControls = (
    <div className="flex gap-4">
      <CyberButton 
        variant="ghost" 
        className="w-16 h-16 rounded-xl border border-white/20 bg-black/50 text-white backdrop-blur-sm active:bg-primary/40 active:border-primary active:scale-95 transition-all p-0 flex items-center justify-center"
      >
        <ArrowLeft className="w-8 h-8" />
      </CyberButton>
      <CyberButton 
        variant="ghost" 
        className="w-16 h-16 rounded-xl border border-white/20 bg-black/50 text-white backdrop-blur-sm active:bg-primary/40 active:border-primary active:scale-95 transition-all p-0 flex items-center justify-center"
      >
        <ArrowRight className="w-8 h-8" />
      </CyberButton>
    </div>
  );

  // Forward/Backward Controls
  const MoveControls = (
    <div className="flex flex-col gap-4">
      <CyberButton 
        variant="ghost" 
        className="w-16 h-16 rounded-xl border border-white/20 bg-black/50 text-white backdrop-blur-sm active:bg-primary/40 active:border-primary active:scale-95 transition-all p-0 flex items-center justify-center"
      >
        <ArrowUp className="w-8 h-8" />
      </CyberButton>
      <CyberButton 
        variant="ghost" 
        className="w-16 h-16 rounded-xl border border-white/20 bg-black/50 text-white backdrop-blur-sm active:bg-primary/40 active:border-primary active:scale-95 transition-all p-0 flex items-center justify-center"
      >
        <ArrowDown className="w-8 h-8" />
      </CyberButton>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-black relative z-10 overflow-hidden">
      
      {/* Video Feed Background */}
      <div className="absolute inset-0 z-0">
        
        {/* VHS/Cyberpunk CRT Effects */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10"></div>
        
        {/* Rear Camera overlay effect */}
        {rearCamera && (
          <div className="absolute inset-0 backdrop-blur-md bg-black/40 z-10 flex items-center justify-center">
            <span className="text-white/50 font-display uppercase tracking-widest text-2xl">Rear View Active</span>
          </div>
        )}
      </div>

      {/* HUD Overlay */}
      <div className={`relative z-20 flex flex-col h-full p-6 pointer-events-none ${showExitConfirm ? 'blur-sm grayscale-[50%]' : ''}`}>
        
        {/* Top HUD */}
        <header className="flex justify-between items-start pointer-events-auto">
          <button 
            onClick={() => setShowExitConfirm(true)}
            className="w-10 h-10 bg-black/50 border border-white/20 rounded flex items-center justify-center text-white hover:border-red-500 hover:text-red-500 transition-colors backdrop-blur-sm shadow-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="flex flex-col items-center bg-black/50 px-6 py-2 border border-primary/50 rounded backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <span className="text-[10px] text-primary font-display uppercase tracking-widest mb-1">Telemetry</span>
            <div className="flex gap-6 text-white font-display text-sm">
              <span className="flex items-center gap-1"><Battery className="w-4 h-4 text-green-400" /> 84%</span>
              <span className="flex items-center gap-1"><Activity className="w-4 h-4 text-primary" /> 12ms</span>
              <span className="text-accent font-black tracking-widest">85km/h</span>
            </div>
          </div>
          
          <div className="flex gap-3">
             <button 
                className={`w-10 h-10 rounded border ${micActive ? 'border-accent bg-accent/20 text-accent shadow-[0_0_15px_rgba(236,72,153,0.5)]' : 'border-white/20 bg-black/50 text-white backdrop-blur-sm'} flex items-center justify-center`}
                onClick={() => setMicActive(!micActive)}
              >
                {micActive ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>
              <button 
                className={`w-10 h-10 rounded border ${rearCamera ? 'border-primary bg-primary/20 text-primary shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'border-white/20 bg-black/50 text-white backdrop-blur-sm'} flex items-center justify-center`}
                onMouseDown={() => setRearCamera(true)}
                onMouseUp={() => setRearCamera(false)}
                onMouseLeave={() => setRearCamera(false)}
                onTouchStart={() => setRearCamera(true)}
                onTouchEnd={() => setRearCamera(false)}
              >
                <Camera className="w-5 h-5" />
              </button>
          </div>
        </header>

        {/* Center Crosshair */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <Crosshair className="w-20 h-20 text-primary/30 stroke-[1px]" />
          {boosting && (
            <div className="absolute inset-0 flex items-center justify-center z-[-1]">
              <div className="w-48 h-48 border-4 border-accent rounded-full animate-ping opacity-20"></div>
            </div>
          )}
        </div>

        {/* Bottom Controls */}
        <div className="flex justify-between items-end pointer-events-auto w-full relative">
          
          {/* Bottom Left Control Area */}
          <div className="flex items-end justify-center w-40">
            {swapControls ? SteerControls : MoveControls}
          </div>
          
          {/* Bottom Right Control Area */}
          <div className="flex flex-col items-end gap-6 relative">
            {/* Boost Button positioned above Right Controls */}
            <div className="absolute -top-24 right-4">
              <CyberButton 
                variant="secondary"
                className="w-20 h-20 rounded-full flex flex-col items-center justify-center border-2 border-accent text-accent bg-accent/20 active:bg-accent/40 active:scale-95 transition-all shadow-[0_0_30px_rgba(236,72,153,0.5)] p-0"
                onMouseDown={() => setBoosting(true)}
                onMouseUp={() => setBoosting(false)}
                onMouseLeave={() => setBoosting(false)}
                onTouchStart={() => setBoosting(true)}
                onTouchEnd={() => setBoosting(false)}
              >
                <Zap className="w-8 h-8" />
              </CyberButton>
            </div>
            
            <div className="flex items-end justify-center w-40">
              {swapControls ? MoveControls : SteerControls}
            </div>
          </div>

        </div>
      </div>

      {/* Exit Confirmation Popup */}
      {showExitConfirm && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
          <div className="w-full max-w-sm bg-background border border-primary/50 rounded-xl shadow-[0_0_40px_rgba(6,182,212,0.3)] overflow-hidden flex flex-col pointer-events-auto">
            <div className="flex justify-between items-center p-4 border-b border-white/10 bg-primary/10">
              <h3 className="font-display font-bold text-lg uppercase tracking-wider text-white">Leave Game?</h3>
            </div>
            <div className="p-6 flex flex-col gap-6 text-center">
              <p className="text-sm font-sans text-muted-foreground">
                Are you sure you want to exit?
              </p>
              
              <div className="flex gap-4">
                <CyberButton 
                  variant="ghost" 
                  className="flex-1 border border-white/20 bg-white/5 py-3"
                  onClick={() => setShowExitConfirm(false)}
                >
                  Continue
                </CyberButton>
                <CyberButton 
                  variant="danger" 
                  className="flex-1 py-3"
                  onClick={() => navigate("/home")}
                >
                  Exit
                </CyberButton>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

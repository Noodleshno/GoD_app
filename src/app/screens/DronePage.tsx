import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { CyberButton } from "../components/CyberButton";
import { ChevronLeft, Zap, Mic, MicOff, Camera, Settings2, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, X } from "lucide-react";
import { useSettings } from "../SettingsContext";

export function DronePage() {
  const navigate = useNavigate();
  const { swapControls, steerControlType, throttleControlType, resetControls } = useSettings();
  
  const [micActive, setMicActive] = useState(false);
  const [rearCamera, setRearCamera] = useState(false);
  const [boosting, setBoosting] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [pendingSwapControls, setPendingSwapControls] = useState(swapControls);
  const [joystickPos, setJoystickPos] = useState({ x: 0, y: 0 });
  const [activeJoystick, setActiveJoystick] = useState<"steer" | "throttle" | null>(null);

  // Lap stats
  const [currentLapTime, setCurrentLapTime] = useState(0);
  const [lapCount, setLapCount] = useState(0);
  const [bestLapTime, setBestLapTime] = useState(0);
  const [lastLapTime, setLastLapTime] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    setPendingSwapControls(swapControls);
  }, [swapControls]);

  // Timer for current lap - starts only when moving
  useEffect(() => {
    if (!isMoving) return;
    
    const interval = setInterval(() => {
      setCurrentLapTime(prev => prev + 10);
    }, 10);
    return () => clearInterval(interval);
  }, [isMoving]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  // Left/Right Controls
  const SteerControls = (
    <div className="flex gap-4">
      <CyberButton 
        variant="ghost" 
        className="w-16 h-16 rounded-xl border border-white/20 bg-black/50 text-white backdrop-blur-sm active:bg-primary/40 active:border-primary active:scale-95 transition-all p-0 flex items-center justify-center"
        onMouseDown={() => setIsMoving(true)}
        onTouchStart={() => setIsMoving(true)}
      >
        <ArrowLeft className="w-8 h-8" />
      </CyberButton>
      <CyberButton 
        variant="ghost" 
        className="w-16 h-16 rounded-xl border border-white/20 bg-black/50 text-white backdrop-blur-sm active:bg-primary/40 active:border-primary active:scale-95 transition-all p-0 flex items-center justify-center"
        onMouseDown={() => setIsMoving(true)}
        onTouchStart={() => setIsMoving(true)}
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
        onMouseDown={() => setIsMoving(true)}
        onTouchStart={() => setIsMoving(true)}
      >
        <ArrowUp className="w-8 h-8" />
      </CyberButton>
      <CyberButton 
        variant="ghost" 
        className="w-16 h-16 rounded-xl border border-white/20 bg-black/50 text-white backdrop-blur-sm active:bg-primary/40 active:border-primary active:scale-95 transition-all p-0 flex items-center justify-center"
        onMouseDown={() => setIsMoving(true)}
        onTouchStart={() => setIsMoving(true)}
      >
        <ArrowDown className="w-8 h-8" />
      </CyberButton>
    </div>
  );

  const handleJoystickStart = (type: "steer" | "throttle") => {
    setActiveJoystick(type);
    setIsMoving(true);
  };

  const handleJoystickMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!activeJoystick) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;

    const distance = Math.sqrt(x * x + y * y);
    const maxDistance = rect.width / 2 - 32; 

    if (distance > maxDistance) {
      const angle = Math.atan2(y, x);
      setJoystickPos({
        x: Math.cos(angle) * maxDistance,
        y: Math.sin(angle) * maxDistance,
      });
    } else {
      setJoystickPos({ x, y });
    }
  };

  const handleJoystickEnd = () => {
    setActiveJoystick(null);
    setJoystickPos({ x: 0, y: 0 });
  };

  const JoystickControl = ({ type }: { type: "steer" | "throttle" }) => (
    <div
      onPointerDown={() => handleJoystickStart(type)}
      onPointerMove={handleJoystickMove}
      onPointerUp={handleJoystickEnd}
      onPointerLeave={handleJoystickEnd}
      className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
    >
      <div className="relative w-40 h-40 rounded-full border border-white/20 bg-black/30 flex items-center justify-center">
        <div className="absolute inset-6 rounded-full border border-white/10 bg-white/5"></div>
        <div
          className="relative w-16 h-16 rounded-full bg-white/10 border border-white/20 shadow-[0_0_25px_rgba(56,189,248,0.5)] transition-transform"
          style={{
            transform: activeJoystick === type ? `translate(${joystickPos.x}px, ${joystickPos.y}px)` : 'translate(0, 0)',
          }}
        ></div>
      </div>
    </div>
  );

  const steerControlElement = steerControlType === "buttons"
    ? SteerControls
    : <JoystickControl type="steer" />;

  const throttleControlElement = throttleControlType === "buttons"
    ? MoveControls
    : <JoystickControl type="throttle" />;

  const leftControl = swapControls ? throttleControlElement : steerControlElement;
  const rightControl = swapControls ? steerControlElement : throttleControlElement;

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
        <header className="flex justify-between items-start pointer-events-auto gap-4">
          <button 
            onClick={() => setShowExitConfirm(true)}
            className="w-10 h-10 bg-black/50 border border-white/20 rounded flex items-center justify-center text-white hover:border-red-500 hover:text-red-500 transition-colors backdrop-blur-sm shadow-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          {/* Left Stats Panel */}
          <div className="absolute left-20 top-6 flex flex-col gap-2 bg-black/50 px-4 py-3 border border-primary/50 rounded backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-primary font-display uppercase tracking-widest">Laps</span>
              <span className="text-xl font-display font-black text-white">{lapCount}</span>
            </div>
            <div className="h-[1px] bg-white/10 w-full my-1"></div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-muted-foreground font-display uppercase tracking-widest">Best</span>
              <span className="text-sm font-display font-bold text-accent">{bestLapTime > 0 ? formatTime(bestLapTime) : '--:--.--'}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-muted-foreground font-display uppercase tracking-widest">Last</span>
              <span className="text-sm font-display font-bold text-primary">{lastLapTime > 0 ? formatTime(lastLapTime) : '--:--.--'}</span>
            </div>
          </div>

          {/* Center Timer */}
          <div className="absolute left-20 top-[210px] flex flex-col items-center justify-center bg-black/50 px-4 py-2 border border-accent/50 rounded backdrop-blur-sm shadow-[0_0_15px_rgba(236,72,153,0.3)] h-10 w-32">
            <div className="text-lg font-display font-black text-accent tracking-wider tabular-nums">
               {formatTime(currentLapTime)}
             </div>
          </div>

          {/* Right Controls */}
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
              <button
                className="w-10 h-10 rounded border border-white/20 bg-black/50 text-white backdrop-blur-sm hover:border-primary hover:text-primary transition-colors flex items-center justify-center"
                onClick={() => navigate("/settings")}
              >
                <Settings2 className="w-5 h-5" />
              </button>
          </div>
        </header>

        {/* Center Area */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
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
            {leftControl}
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
              {rightControl}
            </div>
          </div>

        </div>
      </div>

      {showSettings && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-background border border-primary/50 rounded-xl shadow-[0_0_40px_rgba(6,182,212,0.3)] overflow-hidden pointer-events-auto">
            <div className="flex justify-between items-center p-4 border-b border-white/10 bg-black/50">
              <div>
                <h3 className="font-display font-bold text-lg uppercase tracking-widest text-white">Settings</h3>
                <p className="text-xs text-muted-foreground">Confirm changes and return to the game.</p>
              </div>
              <button onClick={() => setShowSettings(false)} className="text-muted-foreground hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-display uppercase text-white">Swap controls</span>
                    <p className="text-xs text-muted-foreground">Switch left/right and forward/back layouts.</p>
                  </div>
                  <button
                    onClick={() => setPendingSwapControls(!pendingSwapControls)}
                    className={`w-12 h-6 rounded-full relative transition-colors ${pendingSwapControls ? 'bg-primary shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'bg-white/20'}`}
                  >
                    <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${pendingSwapControls ? 'translate-x-6' : 'translate-x-0'}`}></span>
                  </button>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/50 p-4">
                  <div className="text-xs text-muted-foreground">Current layout will be applied only after confirmation.</div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <CyberButton
                  variant="ghost"
                  className="flex-1 border border-white/20 bg-white/5 py-3"
                  onClick={() => {
                    setPendingSwapControls(swapControls);
                    setShowSettings(false);
                  }}
                >
                  Cancel
                </CyberButton>
                <CyberButton
                  className="flex-1 py-3"
                  onClick={() => {
                    setSwapControls(pendingSwapControls);
                    setShowSettings(false);
                  }}
                >
                  Confirm
                </CyberButton>
              </div>
              <CyberButton
                variant="ghost"
                className="w-full py-3 border border-white/10 bg-black/40 text-xs"
                onClick={() => {
                  resetControls();
                  setPendingSwapControls(false);
                }}
              >
                Restore Default Controls
              </CyberButton>
            </div>
          </div>
        </div>
      )}

      {/* Exit Confirmation Popup */}
      {showExitConfirm && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
          <div className="w-full max-w-sm bg-background border border-primary/50 rounded-xl shadow-[0_0_40px_rgba(6,182,212,0.3)] overflow-hidden flex flex-col pointer-events-auto">
            <div className="flex justify-between items-center p-4 border-b border-white/10 bg-primary/10">
              <h3 className="font-display font-bold text-lg uppercase tracking-widest text-white">Leave Game?</h3>
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

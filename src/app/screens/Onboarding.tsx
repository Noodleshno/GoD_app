import { useState } from "react";
import { useNavigate } from "react-router";
import { CyberButton } from "../components/CyberButton";
import { ChevronRight, ExternalLink } from "lucide-react";
import slide1 from "@/assets/images/onboarding/slide_1.jpg";
import slide2 from "@/assets/images/onboarding/slide_2.jpg";
import slide3 from "@/assets/images/onboarding/slide_3.jpg";
import godLogo from "@/assets/images/onboarding/god-logo.png";

export function Onboarding() {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);

  const completeOnboarding = () => {
    localStorage.setItem("god_onboarding_seen", "true");
    navigate("/register");
  };

  const slides = [
    {
      title: "Control Real Drones",
      desc: "Experience a new generation of online gaming. Take control of real physical drones through the internet and compete from anywhere in the world.",
      img: slide1
    },
    {
      title: "Immersive Live Action",
      desc: "Drive through specially designed arenas using real-time first-person camera feeds for a true cockpit experience.",
      img: slide2
    },
    {
      title: "Compete & Rise",
      desc: "Challenge players worldwide, earn rewards, climb the leaderboards, and become part of the next era of esports.",
      img: slide3
    }
  ];

  return (
    <div className="flex flex-col h-full relative z-10 overflow-hidden bg-black">
      {/* Background Image Carousel */}
      {slides.map((s, i) => (
        <div 
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${slide === i ? 'opacity-40' : 'opacity-0'}`}
          style={{ backgroundImage: `url(${s.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        ></div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
      ></div>

      <button 
        onClick={completeOnboarding}
        className="absolute top-4 right-8 z-[9999] text-xs font-display text-muted-foreground hover:text-white uppercase tracking-widest"
      >
        Skip
      </button>

      <div className="flex-1 flex flex-col justify-end p-8 relative z-20">
        <img
          src={godLogo}
          alt="GoD"
          className="w-40 max-h-20 object-contain object-left mb-3 drop-shadow-[0_0_18px_rgba(6,182,212,0.55)]"
        />
        
        <div className="h-24 mb-4">
          {slides[slide].title && (
            <h2 className="text-2xl font-display text-white uppercase tracking-widest mb-2 shadow-black drop-shadow-lg">
              {slides[slide].title}
            </h2>
          )}
          <p className="text-sm text-muted-foreground font-sans max-w-md leading-relaxed">
            {slides[slide].desc}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4">
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button 
                key={i}
                onClick={() => setSlide(i)}
                className={`h-1 transition-all ${slide === i ? 'w-8 bg-primary shadow-[0_0_10px_rgba(6,182,212,0.8)]' : 'w-4 bg-white/20'}`}
              />
            ))}
          </div>

          <div className="flex gap-4">
            <CyberButton 
              variant="ghost" 
              className="border border-accent/50 text-accent hover:bg-accent/10 px-4 py-2 text-sm h-10"
              onClick={() => window.open("https://t.me/aaatribeebot", "_blank")}
            >
              <ExternalLink className="w-4 h-4 mr-2" /> Join Club
            </CyberButton>
            <CyberButton 
              className="px-6 py-2 text-sm h-10 group"
              onClick={() => {
                if (slide < slides.length - 1) {
                  setSlide(slide + 1);
                } else {
                  completeOnboarding();
                }
              }}
            >
              {slide < slides.length - 1 ? "Next" : "Let's Go"} 
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </CyberButton>
          </div>
        </div>
      </div>
    </div>
  );
}

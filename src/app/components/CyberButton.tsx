import React from "react";
import { cn } from "../../lib/utils";

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  glow?: boolean;
}

export function CyberButton({ className, variant = "primary", glow = true, children, ...props }: CyberButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center px-6 py-3 font-display font-bold uppercase tracking-widest transition-all duration-200 overflow-hidden";
  
  const variants = {
    primary: "bg-primary/10 text-primary border border-primary hover:bg-primary/20",
    secondary: "bg-accent/10 text-accent border border-accent hover:bg-accent/20",
    danger: "bg-destructive/10 text-destructive border border-destructive hover:bg-destructive/20",
    ghost: "bg-transparent text-foreground hover:bg-white/5",
  };

  const glowStyles = glow ? {
    primary: "shadow-[0_0_15px_rgba(6,182,212,0.5)]",
    secondary: "shadow-[0_0_15px_rgba(236,72,153,0.5)]",
    danger: "shadow-[0_0_15px_rgba(239,68,68,0.5)]",
    ghost: "",
  } : {};

  return (
    <button 
      className={cn(baseStyles, variants[variant], glow ? glowStyles[variant] : "", "group", className)}
      {...props}
    >
      <div className="absolute inset-0 w-0 bg-white/10 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {/* Cyberpunk corner details */}
      {variant !== "ghost" && (
        <>
          <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-current"></span>
          <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-current"></span>
        </>
      )}
    </button>
  );
}

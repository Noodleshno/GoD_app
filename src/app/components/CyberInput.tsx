import React from "react";
import { cn } from "../../lib/utils";

interface CyberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  error?: string;
}

export const CyberInput = React.forwardRef<HTMLInputElement, CyberInputProps>(
  ({ className, icon, rightElement, error, ...props }, ref) => {
    return (
      <div className="w-full relative flex flex-col gap-1 text-left">
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3 text-primary/70 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full bg-input-background/50 border border-border text-foreground px-4 py-3 font-sans outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary focus:bg-input-background placeholder:text-muted-foreground",
              icon && "pl-10",
              rightElement && "pr-12",
              error && "border-destructive focus:border-destructive focus:ring-destructive",
              className
            )}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              {rightElement}
            </div>
          )}
          {/* Cyberpunk accent lines */}
          <div className="absolute -bottom-[1px] left-0 w-8 h-[2px] bg-primary"></div>
        </div>
        {error && (
          <span className="text-destructive text-sm font-sans tracking-wide">
            {error}
          </span>
        )}
      </div>
    );
  }
);
CyberInput.displayName = "CyberInput";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { CyberButton } from "../components/CyberButton";
import { AlertCircle, CheckCircle2, ChevronLeft, RefreshCw, Calendar, Clock, Play, Zap } from "lucide-react";
import { useSettings } from "../SettingsContext";

interface BookingActivity {
  title: string;
  category: string;
  desc: string;
  cost: string;
  duration: string;
}

interface ReservationDetails {
  id: string;
  title: string;
  time: string;
  cost: string;
}

export function Booking() {
  const navigate = useNavigate();
  const location = useLocation();
  const { walletBalance, spendWalletBalance } = useSettings();
  const [bookingResult, setBookingResult] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [reservedSlots, setReservedSlots] = useState<string[]>([]);
  const [reservationDetails, setReservationDetails] = useState<ReservationDetails | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const activity = (location.state as { activity?: BookingActivity } | null)?.activity ?? {
    title: "Quick Race",
    category: "racing",
    desc: "Fast access to the next available drone session.",
    cost: "500 G",
    duration: "15m",
  };
  const activityCost = Number.parseInt(activity.cost, 10) || 0;
  const activityKey = activity.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const reservedSlotsStorageKey = `god_reserved_slots_${activityKey}`;
  const reservationStorageKey = `god_last_reservation_${activityKey}`;

  useEffect(() => {
    try {
      setReservedSlots(JSON.parse(localStorage.getItem(reservedSlotsStorageKey) || "[]"));
      const storedReservation = JSON.parse(localStorage.getItem(reservationStorageKey) || "null");
      setReservationDetails(storedReservation);
      setShowConfirmation(Boolean(storedReservation));
    } catch {
      setReservedSlots([]);
      setReservationDetails(null);
      setShowConfirmation(false);
    }
  }, [reservedSlotsStorageKey, reservationStorageKey]);

  useEffect(() => {
    localStorage.setItem(reservedSlotsStorageKey, JSON.stringify(reservedSlots));
  }, [reservedSlots, reservedSlotsStorageKey]);

  useEffect(() => {
    if (reservationDetails) {
      localStorage.setItem(reservationStorageKey, JSON.stringify(reservationDetails));
    }
  }, [reservationDetails, reservationStorageKey]);

  const reserveSlot = (time: string) => {
    const slotId = `${time}`;

    if (reservedSlots.includes(slotId)) {
      return;
    }

    const paid = spendWalletBalance(activityCost);

    if (!paid) {
      setBookingResult({
        type: "error",
        message: `Not enough G for ${activity.title}. Required: ${activity.cost}.`,
      });
      return;
    }

    setReservedSlots(currentSlots => [...currentSlots, slotId]);
    setReservationDetails({
      id: slotId,
      title: activity.title,
      time,
      cost: activity.cost,
    });
    setBookingResult({
      type: "success",
      message: `${activity.title} reserved at ${time}.`,
    });
    setShowConfirmation(true);
  };

  return (
    <div className="flex flex-col h-full bg-background relative z-10">
      <header className="px-4 py-4 flex items-center justify-between border-b border-white/10 bg-black/50 sticky top-0 z-20 backdrop-blur-md">
        <button 
          onClick={() => navigate("/home")}
          className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-display font-bold uppercase tracking-widest text-white">
          Book Time
        </h2>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center text-primary hover:text-white transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1 bg-yellow-500/10 border border-yellow-500/30 px-2 py-1 rounded text-yellow-500 text-xs font-display font-bold">
            G {walletBalance.toLocaleString()}
          </div>
        </div>
      </header>

      {showConfirmation && reservationDetails ? (
        <div className="flex-1 min-h-0 p-6 relative z-10">
          <div className="h-full rounded-xl border border-primary/40 bg-primary/10 overflow-hidden relative flex">
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full"></div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-accent/20 blur-3xl rounded-full"></div>

            <div className="w-5/12 p-6 flex flex-col justify-center relative z-10">
              <div className="w-16 h-16 rounded-full border border-primary/60 bg-primary/20 text-primary flex items-center justify-center shadow-[0_0_25px_rgba(6,182,212,0.45)] mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="text-[10px] font-display uppercase tracking-widest text-primary mb-2">Reservation Confirmed</div>
              <h3 className="text-2xl font-display font-black uppercase text-white leading-tight">
                {reservationDetails.title}
              </h3>
              <p className="text-xs text-muted-foreground font-sans mt-3 max-w-xs">
                Your slot is locked. You can start the session now or return to the menu.
              </p>
            </div>

            <div className="w-7/12 p-6 flex flex-col justify-center gap-4 relative z-10">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-white/10 bg-black/40 p-3">
                  <span className="text-[10px] text-muted-foreground font-sans">Time</span>
                  <div className="text-xl font-display font-bold text-white">{reservationDetails.time}</div>
                </div>
                <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3">
                  <span className="text-[10px] text-muted-foreground font-sans">Paid</span>
                  <div className="text-sm font-display font-black text-yellow-500">{reservationDetails.cost}</div>
                </div>
              </div>

              <div className="flex gap-3">
                <CyberButton className="flex-1 py-3 text-sm" onClick={() => navigate("/drone")}>
                  <Play className="w-4 h-4" /> Start Session
                </CyberButton>
                <CyberButton variant="ghost" className="flex-1 py-3 text-sm border border-white/10 bg-white/5" onClick={() => navigate("/home")}>
                  Back Home
                </CyberButton>
                <CyberButton
                  variant="ghost"
                  className="flex-1 py-3 text-sm border border-white/10 bg-white/5"
                  onClick={() => {
                    setShowConfirmation(false);
                    setBookingResult(null);
                  }}
                >
                  Book Another
                </CyberButton>
              </div>
            </div>
          </div>
        </div>
      ) : (
      <div className="flex-1 overflow-hidden flex px-4 pb-4 gap-6">
        {/* Next Check-in Info */}
        <div className="w-1/3 flex flex-col pt-4">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 relative overflow-hidden h-full flex flex-col justify-center gap-3">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/20 blur-2xl rounded-full"></div>
            <div className="relative z-10">
              <span className="text-[10px] font-display uppercase tracking-widest text-primary">{activity.category}</span>
              <h3 className="text-lg font-display font-black uppercase text-white leading-tight mt-1">
                {activity.title}
              </h3>
              <p className="text-xs text-muted-foreground font-sans mt-2 line-clamp-3">
                {activity.desc}
              </p>
            </div>
            <div className="relative z-10 grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-2">
                <span className="text-[10px] text-muted-foreground font-sans">Cost</span>
                <div className="text-sm font-display font-black text-yellow-500 flex items-center gap-1">
                  <Zap className="w-3 h-3" /> {activity.cost}
                </div>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/30 p-2">
                <span className="text-[10px] text-muted-foreground font-sans">Session</span>
                <div className="text-sm font-display font-bold text-white">{activity.duration}</div>
              </div>
            </div>
            <div className="relative z-10 pt-1">
              <h4 className="text-xs font-display uppercase text-primary mb-1 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Next Window
              </h4>
              <div className="text-3xl font-display font-black text-white tracking-wider">00:14:59</div>
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="w-2/3 flex flex-col pt-4 overflow-hidden">
          <h3 className="text-sm font-display uppercase text-white mb-2 flex items-center gap-2 shrink-0">
            <Calendar className="w-4 h-4" /> Schedule
          </h3>

          {bookingResult && (
            <div className={`mb-2 flex items-start gap-2 rounded-lg border p-2 text-xs font-sans shrink-0 ${
              bookingResult.type === "success"
                ? "border-green-500/40 bg-green-500/10 text-green-300"
                : "border-destructive/40 bg-destructive/10 text-destructive"
            }`}>
              {bookingResult.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              <span>{bookingResult.message}</span>
            </div>
          )}
          
          <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col gap-2">
            {[
              { time: "18:00", available: 12, status: "open" },
              { time: "18:30", available: 5, status: "filling" },
              { time: "19:00", available: 0, status: "full" },
              { time: "19:30", available: 12, status: "open" },
            ].map((slot, idx) => {
              const slotId = `${slot.time}`;
              const isReserved = reservedSlots.includes(slotId);
              const isDisabled = slot.status === "full" || isReserved;

              return (
              <div key={idx} className={`flex p-3 rounded-lg border gap-4 items-center justify-between ${
                isReserved
                  ? "border-green-500/50 bg-green-500/10"
                  : "border-white/10 bg-black/40"
              }`}>
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-display font-bold text-white w-16">{slot.time}</div>
                  <div className="flex flex-col">
                    <span className={`text-xs font-display font-bold uppercase ${slot.available > 0 ? 'text-primary' : 'text-destructive'}`}>
                      {isReserved ? "Reserved" : `${slot.available} drones`}
                    </span>
                  </div>
                </div>
                <CyberButton 
                  variant={isReserved || slot.status === "full" ? "ghost" : slot.status === "filling" ? "secondary" : "primary"}
                  disabled={isDisabled}
                  className={`w-32 h-8 text-xs py-0 ${isDisabled ? "opacity-60 cursor-not-allowed border-white/10" : ""}`}
                  glow={!isDisabled}
                  onClick={() => reserveSlot(slot.time)}
                >
                  {isReserved ? "Reserved" : slot.status === "full" ? "Sector Full" : "Reserve"}
                </CyberButton>
              </div>
            )})}
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
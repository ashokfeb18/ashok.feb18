import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { Play, Pause, SkipForward, SkipBack, X, Compass, ChevronRight, Check } from "lucide-react";

interface DemoScreen {
  id: string;
  label: string;
  emoji: string;
  path: string;
  description: string;
  highlights: string[];
  duration: number; // ms
}

const DEMO_SCREENS: DemoScreen[] = [
  {
    id: "plp",
    label: "Product Listing",
    emoji: "🗂️",
    path: "/dealer/products",
    description: "Browse all products with live filters, sorting, and scheme badges.",
    highlights: ["Filter by Category, Brand, Finish", "Dual-handle price range slider", "Add to Cart from the grid"],
    duration: 5000,
  },
  {
    id: "pdp",
    label: "Product Detail",
    emoji: "🖼️",
    path: "/dealer/products/p001",
    description: "Deep-dive into a product — shades, specs, pack sizes, and schemes.",
    highlights: ["16-shade explorer with hover tooltips", "Pack size & quantity selector", "Scheme banner + accordion docs"],
    duration: 6000,
  },
  {
    id: "cart",
    label: "My Cart",
    emoji: "🛒",
    path: "/dealer/cart",
    description: "Review cart items, apply coupons, and see live order summary.",
    highlights: ["Inline quantity steppers", "Scheme progress strips", "Coupon code: DEALER10"],
    duration: 5000,
  },
  {
    id: "checkout",
    label: "Checkout",
    emoji: "📋",
    path: "/dealer/checkout",
    description: "Two-step address + order review with delivery date picker.",
    highlights: ["Collapsible step-by-step flow", "5-day delivery date selector", "Compact sticky order summary"],
    duration: 5000,
  },
  {
    id: "thankyou",
    label: "Order Confirmed",
    emoji: "🎉",
    path: "/dealer/order-confirmation",
    description: "Celebration screen with loyalty points earned and next actions.",
    highlights: ["Animated success checkmark", "Loyalty reward card (+850 pts)", "Delivery timeline tracker"],
    duration: 5000,
  },
];

export function DemoPanel() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const current = DEMO_SCREENS[currentIdx];

  // Sync current step with URL
  useEffect(() => {
    const idx = DEMO_SCREENS.findIndex(s => location.pathname === s.path || location.pathname.startsWith(s.path + "/"));
    if (idx !== -1) setCurrentIdx(idx);
  }, [location.pathname]);

  function clearTimers() {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
    timerRef.current = null;
    progressRef.current = null;
  }

  function goTo(idx: number) {
    clearTimers();
    setCurrentIdx(idx);
    setProgress(0);
    navigate(DEMO_SCREENS[idx].path);
  }

  function startStep(idx: number) {
    const screen = DEMO_SCREENS[idx];
    setCurrentIdx(idx);
    setProgress(0);
    navigate(screen.path);

    const interval = 50;
    let elapsed = 0;
    progressRef.current = setInterval(() => {
      elapsed += interval;
      setProgress(Math.min(100, (elapsed / screen.duration) * 100));
    }, interval);

    timerRef.current = setTimeout(() => {
      clearTimers();
      const next = idx + 1;
      if (next < DEMO_SCREENS.length) {
        startStep(next);
      } else {
        setPlaying(false);
        setProgress(100);
      }
    }, screen.duration);
  }

  function handlePlay() {
    if (playing) {
      clearTimers();
      setPlaying(false);
    } else {
      setPlaying(true);
      setOpen(true);
      startStep(currentIdx);
    }
  }

  function handleNext() {
    clearTimers();
    const next = Math.min(currentIdx + 1, DEMO_SCREENS.length - 1);
    if (playing) {
      startStep(next);
    } else {
      goTo(next);
    }
  }

  function handlePrev() {
    clearTimers();
    const prev = Math.max(currentIdx - 1, 0);
    if (playing) {
      startStep(prev);
    } else {
      goTo(prev);
    }
  }

  function handleSelectScreen(idx: number) {
    clearTimers();
    setPlaying(false);
    goTo(idx);
  }

  useEffect(() => {
    return () => clearTimers();
  }, []);

  // Don't show on login page
  if (location.pathname === "/") return null;

  return (
    <>
      {/* ── Floating Toggle Button ── */}
      <div
        style={{
          position: "fixed",
          bottom: 28,
          right: 28,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 12,
        }}
      >
        {/* Mini progress bar when playing & panel closed */}
        {playing && !open && (
          <div style={{
            background: "#fff",
            borderRadius: 12,
            border: "1px solid #D8D0F0",
            boxShadow: "0 4px 24px rgba(76,52,148,0.18)",
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            minWidth: 220,
          }}>
            <span style={{ fontSize: 16 }}>{current.emoji}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 12, color: "#2D1B69", marginBottom: 4 }}>
                {current.label}
              </div>
              <div style={{ height: 3, background: "#EEE9FF", borderRadius: 2 }}>
                <div style={{ height: "100%", width: `${progress}%`, background: "#F5A623", borderRadius: 2, transition: "width 0.1s linear" }} />
              </div>
            </div>
            <button onClick={() => setOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9B92B8", padding: 0, display: "flex" }}>
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* FAB */}
        <button
          onClick={() => { setOpen(v => !v); }}
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: playing
              ? "linear-gradient(135deg, #38A169, #2D8A58)"
              : "linear-gradient(135deg, #4C3494, #2D1B69)",
            border: "none",
            boxShadow: "0 6px 24px rgba(76,52,148,0.35)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
            position: "relative",
          }}
          title="Demo Tour"
        >
          {playing && (
            <div style={{
              position: "absolute",
              inset: -3,
              borderRadius: "50%",
              border: "2px solid rgba(56,161,105,0.4)",
              animation: "ping 1.5s ease-in-out infinite",
            }} />
          )}
          <Compass size={24} color="#fff" />
        </button>
      </div>

      {/* ── Demo Panel ── */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 96,
            right: 28,
            width: 340,
            background: "#fff",
            borderRadius: 20,
            border: "1px solid #D8D0F0",
            boxShadow: "0 16px 64px rgba(76,52,148,0.2)",
            zIndex: 9998,
            overflow: "hidden",
          }}
        >
          {/* Panel header */}
          <div style={{ background: "linear-gradient(135deg, #2D1B69, #4C3494)", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: "#fff" }}>
                🎬 Interactive Demo
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>
                5-screen e-commerce flow
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: 30, height: 30, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <X size={14} color="#fff" />
            </button>
          </div>

          {/* Current screen callout */}
          <div style={{ padding: "16px 20px", background: "#F8F5FF", borderBottom: "1px solid #EEE9FF" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{ fontSize: 28, lineHeight: 1, flexShrink: 0 }}>{current.emoji}</div>
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: "#1A0F3E", marginBottom: 3 }}>
                  {current.label}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#5A5280", lineHeight: 1.5, marginBottom: 8 }}>
                  {current.description}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {current.highlights.map(h => (
                    <div key={h} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#EEE9FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Check size={9} color="#4C3494" />
                      </div>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#5A5280" }}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress bar */}
            {playing && (
              <div style={{ marginTop: 12, height: 3, background: "#D8D0F0", borderRadius: 2 }}>
                <div style={{ height: "100%", width: `${progress}%`, background: "#F5A623", borderRadius: 2, transition: "width 0.1s linear" }} />
              </div>
            )}
          </div>

          {/* Screen list */}
          <div style={{ padding: "12px 12px" }}>
            {DEMO_SCREENS.map((screen, idx) => {
              const isCurrent = idx === currentIdx;
              const isDone = idx < currentIdx;
              return (
                <button
                  key={screen.id}
                  onClick={() => handleSelectScreen(idx)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "9px 12px",
                    borderRadius: 10,
                    border: "none",
                    background: isCurrent ? "#EEE9FF" : "transparent",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "background 0.15s",
                    marginBottom: 2,
                  }}
                  onMouseEnter={e => { if (!isCurrent) (e.currentTarget as HTMLButtonElement).style.background = "#F8F5FF"; }}
                  onMouseLeave={e => { if (!isCurrent) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                >
                  {/* Step indicator */}
                  <div style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: isCurrent ? "#4C3494" : isDone ? "#38A169" : "#F0EDF8",
                    border: `1.5px solid ${isCurrent ? "#4C3494" : isDone ? "#38A169" : "#D8D0F0"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.2s",
                  }}>
                    {isDone ? (
                      <Check size={12} color="#fff" />
                    ) : (
                      <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 600, fontSize: 11, color: isCurrent ? "#fff" : "#9B92B8" }}>
                        {idx + 1}
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: 16 }}>{screen.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: isCurrent ? 600 : 400, fontSize: 13, color: isCurrent ? "#2D1B69" : "#5A5280" }}>
                      {screen.label}
                    </div>
                  </div>
                  {isCurrent && <ChevronRight size={14} color="#4C3494" />}
                </button>
              );
            })}
          </div>

          {/* Controls */}
          <div style={{ padding: "12px 16px 16px", borderTop: "1px solid #EEE9FF", display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              style={{ width: 36, height: 36, borderRadius: 10, border: "1.5px solid #D8D0F0", background: "#fff", cursor: currentIdx === 0 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: currentIdx === 0 ? 0.4 : 1 }}
            >
              <SkipBack size={16} color="#4C3494" />
            </button>

            {/* Play/Pause */}
            <button
              onClick={handlePlay}
              style={{
                flex: 1,
                height: 38,
                borderRadius: 10,
                border: "none",
                background: playing
                  ? "linear-gradient(135deg, #38A169, #2D8A58)"
                  : "linear-gradient(135deg, #4C3494, #2D1B69)",
                color: "#fff",
                fontFamily: "'Syne', sans-serif",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                transition: "all 0.2s",
              }}
            >
              {playing ? <><Pause size={15} /> Pause Tour</> : <><Play size={15} /> {currentIdx > 0 ? "Resume Tour" : "Start Auto Tour"}</>}
            </button>

            <button
              onClick={handleNext}
              disabled={currentIdx === DEMO_SCREENS.length - 1}
              style={{ width: 36, height: 36, borderRadius: 10, border: "1.5px solid #D8D0F0", background: "#fff", cursor: currentIdx === DEMO_SCREENS.length - 1 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: currentIdx === DEMO_SCREENS.length - 1 ? 0.4 : 1 }}
            >
              <SkipForward size={16} color="#4C3494" />
            </button>
          </div>

          <div style={{ padding: "0 16px 14px", textAlign: "center" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#9B92B8" }}>
              Screen {currentIdx + 1} of {DEMO_SCREENS.length} · Click any screen to jump
            </span>
          </div>
        </div>
      )}

      <style>{`
        @keyframes ping {
          0% { transform: scale(1); opacity: 0.6; }
          70% { transform: scale(1.35); opacity: 0; }
          100% { transform: scale(1.35); opacity: 0; }
        }
      `}</style>
    </>
  );
}

import { useState } from "react";

export type TierVariant = "platinum" | "top150" | "combo" | "regular";

export interface BannerCardProps {
  tier: TierVariant;
  dealerName: string;
  dealerId: string;
  city: string;
  partnerSince: number;
}

// ─── Shimmer keyframe injected once ─────────────────────────────────────────
const SHIMMER_STYLE = `
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
  @keyframes goldGlow {
    0%, 100% { text-shadow: 0 0 8px rgba(245,166,35,0.0); }
    50% { text-shadow: 0 0 18px rgba(245,166,35,0.55); }
  }
  @keyframes subtlePulse {
    0%, 100% { opacity: 0.28; }
    50% { opacity: 0.42; }
  }
`;

// ─── Tier config map ─────────────────────────────────────────────────────────
const TIER_CONFIG = {
  platinum: {
    bg: "linear-gradient(135deg, #1A0F3E 0%, #3D2680 100%)",
    accentBar: "linear-gradient(90deg, #C0C0D8 0%, #E8E8F0 50%, #A8A8C8 100%)",
    nameColor: "#fff",
    mutedColor: "rgba(255,255,255,0.5)",
    chipBg: "rgba(255,255,255,0.1)",
    chipColor: "rgba(255,255,255,0.7)",
  },
  top150: {
    bg: "linear-gradient(135deg, #2D1B69 0%, #6B3A00 60%, #7A5500 100%)",
    accentBar: "linear-gradient(90deg, #F5D878 0%, #D4A017 50%, #FFF0C0 100%)",
    nameColor: "#fff",
    mutedColor: "rgba(255,255,255,0.5)",
    chipBg: "rgba(255,255,255,0.1)",
    chipColor: "rgba(255,255,255,0.7)",
  },
  combo: {
    bg: "", // handled inline
    accentBar: "", // handled inline
    nameColor: "#fff",
    mutedColor: "rgba(255,255,255,0.5)",
    chipBg: "rgba(255,255,255,0.1)",
    chipColor: "rgba(255,255,255,0.7)",
  },
  regular: {
    bg: "linear-gradient(135deg, #EEE9FF 0%, #F8F5FF 100%)",
    accentBar: "linear-gradient(90deg, #C8B8F8 0%, #A990E0 50%, #C8B8F8 100%)",
    nameColor: "#1A0F3E",
    mutedColor: "#7A6A9A",
    chipBg: "rgba(76,52,148,0.08)",
    chipColor: "#5A5280",
  },
};

// ─── Platinum Badge ──────────────────────────────────────────────────────────
function PlatinumBadge({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const h = size === "lg" ? 40 : size === "md" ? 36 : 28;
  const px = size === "lg" ? 18 : 14;
  const fs = size === "lg" ? 14 : 12;
  return (
    <div
      style={{
        height: h,
        padding: `0 ${px}px`,
        borderRadius: h / 2,
        background: "linear-gradient(90deg, #C8C8E0 0%, #E8E8F4 40%, #F0F0F8 60%, #C0C0D8 100%)",
        backgroundSize: "400px 100%",
        animation: "shimmer 3s linear infinite",
        border: "1px solid #A0A0C0",
        display: "flex",
        alignItems: "center",
        gap: 6,
        flexShrink: 0,
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L15.5 8.5L22 9.5L17 14.5L18.5 21L12 17.5L5.5 21L7 14.5L2 9.5L8.5 8.5L12 2Z"
          fill="#9090B0" stroke="#8080A8" strokeWidth="1.2" />
        <path d="M12 6L14.2 10.5L19 11.2L15.5 14.7L16.4 19.5L12 17.2L7.6 19.5L8.5 14.7L5 11.2L9.8 10.5L12 6Z"
          fill="#D0D0E8" />
      </svg>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: fs, color: "#50508A", letterSpacing: "0.5px" }}>
        Platinum
      </span>
    </div>
  );
}

// ─── Top 150 Badge ───────────────────────────────────────────────────────────
function Top150Badge({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const h = size === "lg" ? 40 : size === "md" ? 36 : 28;
  const px = size === "lg" ? 18 : 14;
  const fs = size === "lg" ? 14 : 12;
  return (
    <div
      style={{
        height: h,
        padding: `0 ${px}px`,
        borderRadius: h / 2,
        background: "linear-gradient(90deg, #FFF0C0 0%, #F5D878 40%, #FFE898 60%, #D4A017 100%)",
        backgroundSize: "400px 100%",
        animation: "shimmer 2.5s linear infinite",
        border: "1px solid #D4A017",
        display: "flex",
        alignItems: "center",
        gap: 6,
        flexShrink: 0,
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
          fill="#B07800" stroke="#9A6500" strokeWidth="1" />
      </svg>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: fs, color: "#7A5500", letterSpacing: "0.5px" }}>
        Top 150
      </span>
    </div>
  );
}

// ─── Combo Badge ─────────────────────────────────────────────────────────────
function ComboBadge() {
  return (
    <div style={{ display: "flex", height: 36, borderRadius: 18, overflow: "hidden", border: "1px solid rgba(255,255,255,0.25)" }}>
      {/* Left: Platinum half */}
      <div
        style={{
          padding: "0 14px",
          background: "linear-gradient(90deg, #C8C8E0 0%, #E8E8F4 60%, #D0D0E8 100%)",
          backgroundSize: "400px 100%",
          animation: "shimmer 3s linear infinite",
          display: "flex",
          alignItems: "center",
          gap: 5,
          borderRadius: "18px 0 0 18px",
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L15.5 8.5L22 9.5L17 14.5L18.5 21L12 17.5L5.5 21L7 14.5L2 9.5L8.5 8.5L12 2Z"
            fill="#9090B0" stroke="#8080A8" strokeWidth="1.2" />
        </svg>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 11, color: "#50508A" }}>
          Platinum
        </span>
      </div>
      {/* Divider */}
      <div style={{ width: 1, background: "rgba(160,140,220,0.5)" }} />
      {/* Right: Top 150 half */}
      <div
        style={{
          padding: "0 14px",
          background: "linear-gradient(90deg, #FFF0C0 0%, #F5D878 50%, #D4A017 100%)",
          backgroundSize: "400px 100%",
          animation: "shimmer 2.5s linear infinite",
          display: "flex",
          alignItems: "center",
          gap: 5,
          borderRadius: "0 18px 18px 0",
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
            fill="#B07800" stroke="#9A6500" strokeWidth="1" />
        </svg>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 11, color: "#7A5500" }}>
          Top 150
        </span>
      </div>
    </div>
  );
}

// ─── Regular Badge ───────────────────────────────────────────────────────────
function RegularBadge({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const h = size === "lg" ? 40 : size === "md" ? 36 : 28;
  const px = size === "lg" ? 18 : 14;
  const fs = size === "lg" ? 14 : 12;
  return (
    <div
      style={{
        height: h,
        padding: `0 ${px}px`,
        borderRadius: h / 2,
        background: "#F2F2F2",
        border: "1px solid #CACACA",
        display: "flex",
        alignItems: "center",
        gap: 6,
        flexShrink: 0,
      }}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8" fill="#CCCCCC" stroke="#B0B0B0" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" fill="#AAAAAA" />
      </svg>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: fs, color: "#666", letterSpacing: "0.5px" }}>
        Regular
      </span>
    </div>
  );
}

// ─── Action button ───────────────────────────────────────────────────────────
function ActionBtn({
  icon, label, lightMode,
}: {
  icon: React.ReactNode; label: string; lightMode?: boolean;
}) {
  const [hov, setHov] = useState(false);
  const border = lightMode ? "1.5px solid rgba(76,52,148,0.3)" : "1.5px solid rgba(255,255,255,0.25)";
  const bg = lightMode
    ? hov ? "rgba(76,52,148,0.08)" : "rgba(76,52,148,0.04)"
    : hov ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)";
  const color = lightMode ? "#4C3494" : "#fff";

  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        height: 36,
        padding: "0 14px",
        borderRadius: 8,
        border,
        background: bg,
        color,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 500,
        fontSize: 13,
        transition: "all 0.18s ease",
        whiteSpace: "nowrap",
      }}
    >
      {icon}
      {label}
    </button>
  );
}

// ─── Dealer Avatar ───────────────────────────────────────────────────────────
function DealerAvatar({ name, lightMode }: { name: string; lightMode?: boolean }) {
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div
      style={{
        width: 64,
        height: 64,
        borderRadius: "50%",
        border: `3px solid ${lightMode ? "#4C3494" : "#fff"}`,
        background: lightMode
          ? "linear-gradient(135deg, #4C3494 0%, #7B5EA7 100%)"
          : "linear-gradient(135deg, #5A40A0 0%, #A990E0 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Syne', sans-serif",
        fontWeight: 700,
        fontSize: 22,
        color: "#fff",
        flexShrink: 0,
        boxShadow: lightMode
          ? "0 4px 16px rgba(76,52,148,0.3)"
          : "0 4px 20px rgba(0,0,0,0.35)",
      }}
    >
      {initials}
    </div>
  );
}

// ─── Main Banner ─────────────────────────────────────────────────────────────
export function DealerHeroBanner({
  tier, dealerName, dealerId, city, partnerSince,
}: BannerCardProps) {
  const cfg = TIER_CONFIG[tier];
  const lightMode = tier === "regular";

  const bannerBg =
    tier === "combo"
      ? "linear-gradient(135deg, #1A0F3E 0%, #2D1B69 45%, #3D2000 55%, #7A5500 100%)"
      : cfg.bg;

  const accentBar =
    tier === "combo"
      ? "linear-gradient(90deg, #C0C0D8 0%, #D8D8F0 30%, #D4A017 65%, #FFF0C0 100%)"
      : cfg.accentBar;

  return (
    <div style={{ position: "relative", width: "100%", height: 220, overflow: "hidden", borderRadius: "16px 16px 0 0" }}>
      <style>{SHIMMER_STYLE}</style>

      {/* Background */}
      <div style={{ position: "absolute", inset: 0, background: bannerBg }} />

      {/* Silver mesh texture for Platinum */}
      {(tier === "platinum" || tier === "combo") && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(220,220,240,0.08) 0%, transparent 50%),
              repeating-linear-gradient(45deg, rgba(200,200,220,0.03) 0px, rgba(200,200,220,0.03) 1px, transparent 1px, transparent 12px),
              repeating-linear-gradient(-45deg, rgba(200,200,220,0.03) 0px, rgba(200,200,220,0.03) 1px, transparent 1px, transparent 12px)`,
          }}
        />
      )}

      {/* Gold dust noise for Top 150 */}
      {(tier === "top150" || tier === "combo") && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(ellipse at 70% 40%, rgba(245,166,35,0.07) 0%, transparent 60%),
              radial-gradient(circle at 85% 80%, rgba(245,200,35,0.05) 0%, transparent 30%)`,
          }}
        />
      )}

      {/* Top accent bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: accentBar }} />

      {/* Crown for combo (decorative) */}
      {tier === "combo" && (
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 180,
            fontSize: 30,
            opacity: 0.3,
            animation: "subtlePulse 3s ease-in-out infinite",
          }}
        >
          👑
        </div>
      )}

      {/* #47 in Region chip for top150 */}
      {tier === "top150" && (
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 24,
            background: "rgba(212,160,23,0.18)",
            border: "1px solid rgba(212,160,23,0.4)",
            borderRadius: 20,
            padding: "4px 12px",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: 11,
            color: "#F5D060",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          🏆 #47 in Region
        </div>
      )}

      {/* Elite Performer chip for combo */}
      {tier === "combo" && (
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 24,
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 20,
            padding: "5px 14px",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: 11,
            color: "rgba(255,255,255,0.9)",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          ✨ Elite Performer
        </div>
      )}

      {/* Main content */}
      <div
        style={{
          position: "absolute",
          inset: "4px 0 0 0",
          display: "flex",
          alignItems: "center",
          padding: "0 28px",
          gap: 20,
        }}
      >
        {/* Avatar */}
        <DealerAvatar name={dealerName} lightMode={lightMode} />

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: 26,
                color: cfg.nameColor,
                margin: 0,
                lineHeight: 1.1,
                ...(tier === "combo"
                  ? {
                      background: "linear-gradient(90deg, #fff 60%, #FFD87A 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }
                  : {}),
              }}
            >
              {dealerName}
            </h2>
            {tier === "platinum" && <PlatinumBadge />}
            {tier === "top150" && <Top150Badge />}
            {tier === "combo" && <ComboBadge />}
            {tier === "regular" && <RegularBadge />}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontWeight: 500,
                fontSize: 12,
                color: cfg.mutedColor,
                letterSpacing: "0.5px",
              }}
            >
              {dealerId}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            {/* City chip */}
            <div
              style={{
                background: cfg.chipBg,
                border: lightMode ? "1px solid rgba(76,52,148,0.15)" : "1px solid rgba(255,255,255,0.12)",
                borderRadius: 20,
                padding: "4px 10px",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: 12,
                color: cfg.chipColor,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              📍 {city}
            </div>
            {/* Partner since chip */}
            <div
              style={{
                background: cfg.chipBg,
                border: lightMode ? "1px solid rgba(76,52,148,0.15)" : "1px solid rgba(255,255,255,0.12)",
                borderRadius: 20,
                padding: "4px 10px",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: 12,
                color: cfg.chipColor,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              🤝 Partner since {partnerSince}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          <ActionBtn
            lightMode={lightMode}
            label="Call"
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.29h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.89a16 16 0 0 0 6.18 6.18l.97-.89a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            }
          />
          <ActionBtn
            lightMode={lightMode}
            label="Message"
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            }
          />
          <ActionBtn
            lightMode={lightMode}
            label="History"
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="12 8 12 12 14 14" />
                <path d="M3.05 11a9 9 0 1 0 .5-4.5" />
                <polyline points="3 2 3 7 8 7" />
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
}

// ─── Public badge exports ────────────────────────────────────────────────────
export { PlatinumBadge, Top150Badge, ComboBadge, RegularBadge };

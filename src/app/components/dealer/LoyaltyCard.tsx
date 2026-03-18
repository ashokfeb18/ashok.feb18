import { useState } from "react";

const MILESTONES = [
  { label: "Regular", pts: 0, pct: 0 },
  { label: "Top 150", pts: 8000, pct: 38 },
  { label: "Plat+Top", pts: 15000, pct: 72 },
  { label: "Platinum", pts: 20500, pct: 100 },
];

const CURRENT_PTS = 12450;
const MAX_PTS = 20500;
const CURRENT_PCT = Math.round((CURRENT_PTS / MAX_PTS) * 100); // ~61%

const REWARDS = [
  { emoji: "🎁", title: "Redeem Points", sub: "3 offers available", value: "", bg: "#F4F0FF" },
  { emoji: "🎟️", title: "Vouchers Available", sub: "Ready to use", value: "₹2,000", bg: "#FFF9EE" },
  { emoji: "🎯", title: "This Quarter Target", sub: "On track", value: "78%", bg: "#EDFFF5" },
  { emoji: "⏳", title: "Expiring Soon", sub: "Act before Dec", value: "450 pts", bg: "#FFF2F2" },
];

const ACTIVITY = [
  { type: "earn", desc: "Order #ORD-2291", pts: "+200 pts", time: "2 days ago" },
  { type: "earn", desc: "Scheme Enrollment", pts: "+150 pts", time: "5 days ago" },
  { type: "redeem", desc: "Voucher Redeemed", pts: "-500 pts", time: "1 week ago" },
];

function TierProgressBar() {
  const [tooltip, setTooltip] = useState(false);
  const ptsToNext = 20500 - CURRENT_PTS;

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 12, color: "#5A5280" }}>
          Tier Progress
        </span>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            fontSize: 11,
            color: "#4C3494",
            background: "#EEE9FF",
            borderRadius: 20,
            padding: "3px 10px",
            cursor: "default",
          }}
          onMouseEnter={() => setTooltip(true)}
          onMouseLeave={() => setTooltip(false)}
        >
          {ptsToNext.toLocaleString()} pts to Platinum
        </span>
      </div>

      {/* Track */}
      <div
        style={{
          position: "relative",
          height: 6,
          background: "#EEE9FF",
          borderRadius: 6,
          marginBottom: 24,
        }}
      >
        {/* Fill */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: `${CURRENT_PCT}%`,
            background: "linear-gradient(90deg, #4C3494 0%, #A990E0 100%)",
            borderRadius: 6,
            transition: "width 0.8s ease",
          }}
        />

        {/* Current position dot */}
        <div
          style={{
            position: "absolute",
            left: `${CURRENT_PCT}%`,
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "#4C3494",
            border: "3px solid #fff",
            boxShadow: "0 0 0 2px #4C3494",
            zIndex: 2,
          }}
        />

        {/* Milestone markers */}
        {MILESTONES.map((m) => (
          <div
            key={m.label}
            style={{
              position: "absolute",
              left: `${m.pct}%`,
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: m.pct === 0 || m.pct === 100 ? 0 : 8,
              height: m.pct === 0 || m.pct === 100 ? 0 : 8,
              borderRadius: "50%",
              background: m.pct <= CURRENT_PCT ? "#A990E0" : "#D8D0F0",
              border: `2px solid ${m.pct <= CURRENT_PCT ? "#fff" : "#EEE9FF"}`,
              zIndex: 1,
            }}
          />
        ))}
      </div>

      {/* Milestone labels */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: -16 }}>
        {MILESTONES.map((m) => (
          <div
            key={m.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: m.pct === 0 ? "flex-start" : m.pct === 100 ? "flex-end" : "center",
              gap: 2,
            }}
          >
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 10, color: "#9B92B8", letterSpacing: "0.04em" }}>
              {m.label}
            </span>
            {m.pts > 0 && (
              <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: 9, color: "#C8B8F0" }}>
                {m.pts.toLocaleString()}
              </span>
            )}
          </div>
        ))}
      </div>

      {tooltip && (
        <div
          style={{
            position: "absolute",
            top: -36,
            left: `${CURRENT_PCT}%`,
            transform: "translateX(-50%)",
            background: "#2D1B69",
            color: "#fff",
            padding: "4px 10px",
            borderRadius: 8,
            fontSize: 11,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            whiteSpace: "nowrap",
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          {ptsToNext.toLocaleString()} pts to Platinum
        </div>
      )}
    </div>
  );
}

function RewardCell({ emoji, title, sub, value, bg }: { emoji: string; title: string; sub: string; value: string; bg: string }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "#EDE8FF" : bg,
        borderRadius: 10,
        padding: "14px 16px",
        cursor: "pointer",
        transition: "all 0.18s ease",
        transform: hov ? "translateY(-2px)" : "none",
        boxShadow: hov ? "0 4px 12px rgba(76,52,148,0.12)" : "none",
      }}
    >
      <div style={{ fontSize: 22, marginBottom: 6 }}>{emoji}</div>
      {value && (
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: "#1A0F3E", marginBottom: 2 }}>
          {value}
        </div>
      )}
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 12, color: "#2D1B69", marginBottom: 2 }}>
        {title}
      </div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: 11, color: "#9B92B8" }}>
        {sub}
      </div>
    </div>
  );
}

export function LoyaltyCard() {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: 28,
        border: "1px solid #D8D0F0",
        boxShadow: "0 2px 12px rgba(76,52,148,0.07)",
        display: "flex",
        flexDirection: "column",
        gap: 0,
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <span style={{ fontSize: 22 }}>🏅</span>
        <h3
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: 18,
            color: "#4C3494",
            margin: 0,
          }}
        >
          Loyalty Standing
        </h3>
      </div>

      {/* Points */}
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontWeight: 500,
            fontSize: 40,
            color: "#2D1B69",
            lineHeight: 1,
            marginBottom: 4,
          }}
        >
          {CURRENT_PTS.toLocaleString()} pts
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: 12, color: "#9B92B8" }}>
          Valid until Dec 2026
        </div>
      </div>

      {/* Tier Progress */}
      <div style={{ position: "relative" }}>
        <TierProgressBar />
      </div>

      {/* Rewards grid */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 12, color: "#5A5280", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>
          Rewards & Targets
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
          }}
        >
          {REWARDS.map((r) => (
            <RewardCell key={r.title} {...r} />
          ))}
        </div>
      </div>

      {/* Activity */}
      <div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 12, color: "#5A5280", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>
          Recent Activity
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {ACTIVITY.map((a, i) => (
            <div key={i}>
              {i > 0 && <div style={{ height: 1, background: "#F0EDF8", margin: "8px 0" }} />}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: a.type === "earn" ? "#22c55e" : "#ef4444",
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 13, color: "#2D1B69" }}>
                    {a.desc}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontWeight: 500,
                    fontSize: 12,
                    color: a.type === "earn" ? "#16a34a" : "#dc2626",
                  }}
                >
                  {a.pts}
                </span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: 11, color: "#9B92B8", minWidth: 72, textAlign: "right" }}>
                  {a.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type TierVariant = "platinum" | "top150" | "combo" | "regular";

const TIER_CONFIG: Record<TierVariant, { label: string; bg: string; color: string; border: string }> = {
  platinum: { label: "Platinum", bg: "#F0F0F5", color: "#4A4A6A", border: "#C8C0E0" },
  top150:   { label: "Top 150",  bg: "#FFF8E6", color: "#B8760A", border: "#F5A623" },
  combo:    { label: "👑 Platinum + Top 150", bg: "linear-gradient(90deg,#EEE9FF,#FFF8E6)", color: "#4C3494", border: "#C8A0E0" },
  regular:  { label: "Regular",  bg: "#F5F5F5", color: "#777",    border: "#DDD" },
};

interface TierBadgeProps {
  tier: TierVariant;
  size?: "sm" | "md";
}

export function TierBadge({ tier, size = "sm" }: TierBadgeProps) {
  const cfg = TIER_CONFIG[tier];
  const isGradient = tier === "combo";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: size === "sm" ? "2px 8px" : "4px 12px",
        borderRadius: 20,
        border: `1px solid ${cfg.border}`,
        background: isGradient ? undefined : cfg.bg,
        backgroundImage: isGradient ? cfg.bg : undefined,
        color: cfg.color,
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 600,
        fontSize: size === "sm" ? 11 : 12,
        whiteSpace: "nowrap",
      }}
    >
      {cfg.label}
    </span>
  );
}

export type { TierVariant };

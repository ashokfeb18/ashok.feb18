interface StatItem {
  value: string;
  label: string;
  delta: string;
  positive: boolean;
  neutral?: boolean;
}

const STATS: StatItem[] = [
  { value: "₹8.25L", label: "MTD Sales", delta: "+12% vs last month", positive: true },
  { value: "24", label: "Orders This Month", delta: "+3 vs last month", positive: true },
  { value: "98%", label: "Fill Rate", delta: "-1% vs last month", positive: false },
  { value: "#47", label: "Region Rank", delta: "+5 positions", positive: true },
  { value: "4.8★", label: "Star Rating", delta: "No change", positive: true, neutral: true },
];

function DeltaChip({ delta, positive, neutral }: { delta: string; positive: boolean; neutral?: boolean }) {
  const bg = neutral
    ? "rgba(154,146,184,0.12)"
    : positive
    ? "rgba(34,197,94,0.1)"
    : "rgba(239,68,68,0.1)";
  const color = neutral ? "#9B92B8" : positive ? "#16a34a" : "#dc2626";
  const icon = neutral ? "→" : positive ? "↑" : "↓";

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
        background: bg,
        borderRadius: 20,
        padding: "2px 8px",
        marginTop: 4,
      }}
    >
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 10, color }}>
        {icon} {delta}
      </span>
    </div>
  );
}

export function StatsBar() {
  return (
    <div
      style={{
        width: "100%",
        height: 88,
        background: "#fff",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #D8D0F0",
        boxShadow: "0 2px 12px rgba(76,52,148,0.07)",
      }}
    >
      {STATS.map((stat, i) => (
        <div key={stat.label} style={{ display: "flex", flex: 1, alignItems: "stretch" }}>
          {i > 0 && (
            <div style={{ width: 1, background: "#EEE9FF", alignSelf: "stretch", margin: "16px 0" }} />
          )}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 16px",
              gap: 2,
            }}
          >
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: 22,
                color: "#1A0F3E",
                lineHeight: 1,
              }}
            >
              {stat.value}
            </span>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: 10,
                color: "#9B92B8",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              {stat.label}
            </span>
            <DeltaChip delta={stat.delta} positive={stat.positive} neutral={stat.neutral} />
          </div>
        </div>
      ))}
    </div>
  );
}

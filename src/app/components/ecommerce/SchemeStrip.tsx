import { ArrowRight, Flame } from "lucide-react";

interface SchemeStripProps {
  schemeName: string;
  description: string;
  endsDate: string;
  progress?: number;
  ctaLabel?: string;
  compact?: boolean;
}

export function SchemeStrip({ schemeName, description, endsDate, progress, ctaLabel, compact = false }: SchemeStripProps) {
  return (
    <div
      style={{
        background: "#FFF8E6",
        border: "1px solid #D4A017",
        borderRadius: 10,
        padding: compact ? "8px 12px" : "12px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
        <Flame size={16} color="#F5A623" />
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 600,
                fontSize: 13,
                color: "#B8760A",
              }}
            >
              Scheme Active · {schemeName}
            </span>
          </div>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: "#9A6C08",
            }}
          >
            {description} · Ends {endsDate}
          </span>
        </div>
      </div>

      {progress !== undefined && (
        <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 100 }}>
          <div
            style={{
              height: 4,
              background: "#F0D890",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${Math.min(100, progress)}%`,
                background: "#F5A623",
                borderRadius: 2,
                transition: "width 0.4s ease",
              }}
            />
          </div>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#9A6C08" }}>
            {progress}% towards unlock
          </span>
        </div>
      )}

      {ctaLabel && (
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: 12,
            color: "#B8760A",
            padding: 0,
            textDecoration: "underline",
            whiteSpace: "nowrap",
          }}
        >
          {ctaLabel} <ArrowRight size={12} />
        </button>
      )}
    </div>
  );
}

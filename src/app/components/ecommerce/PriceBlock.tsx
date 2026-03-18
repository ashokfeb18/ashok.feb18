interface PriceBlockProps {
  mrp: number;
  dealerPrice: number;
  gstIncluded?: boolean;
  compact?: boolean;
}

export function PriceBlock({ mrp, dealerPrice, gstIncluded = true, compact = false }: PriceBlockProps) {
  const savings = mrp - dealerPrice;
  const pct = Math.round((savings / mrp) * 100);

  if (compact) {
    return (
      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: "#2D1B69" }}>
          ₹{dealerPrice.toLocaleString("en-IN")}
        </span>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#9B92B8", textDecoration: "line-through" }}>
          ₹{mrp.toLocaleString("en-IN")}
        </span>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#38A169", fontWeight: 600 }}>
          {pct}% off
        </span>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: "#9B92B8",
            textDecoration: "line-through",
          }}
        >
          MRP ₹{mrp.toLocaleString("en-IN")}
        </span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "3px 10px",
            borderRadius: 20,
            background: "#F0FFF4",
            border: "1px solid #9AE6B4",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: 12,
            color: "#38A169",
          }}
        >
          You save ₹{savings.toLocaleString("en-IN")} ({pct}%)
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: 28,
            color: "#2D1B69",
            lineHeight: 1.1,
          }}
        >
          ₹{dealerPrice.toLocaleString("en-IN")}
        </span>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#9B92B8" }}>
          / pack
        </span>
      </div>
      {gstIncluded && (
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#9B92B8" }}>
          Price inclusive of 18% GST
        </span>
      )}
    </div>
  );
}

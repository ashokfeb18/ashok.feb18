import { useState } from "react";

interface OrderLine {
  id: string;
  name: string;
  shade: string;
  size: string;
  qty: number;
  price: number;
}

const INITIAL_LINES: OrderLine[] = [
  { id: "1", name: "Royale Aspira", shade: "Swiss Coffee", size: "20L", qty: 2, price: 4250 },
  { id: "2", name: "Apex Ultima", shade: "Ivory White", size: "10L", qty: 5, price: 1980 },
];

const RECENT_CHIPS = [
  { id: "r1", name: "Apex Exterior" },
  { id: "r2", name: "Royale Matt" },
  { id: "r3", name: "Tractor Emulsion" },
];

const SIZE_OPTIONS = ["1L", "4L", "10L", "20L"];

function PaintIcon({ color = "#4C3494" }: { color?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="4" y="8" width="16" height="16" rx="3" fill={color} opacity="0.15" />
      <rect x="6" y="10" width="12" height="12" rx="2" fill={color} opacity="0.4" />
      <rect x="8" y="4" width="8" height="6" rx="1.5" fill={color} opacity="0.6" />
      <path d="M22 10C22 10 24 12 24 14C24 15.1 23.1 16 22 16C20.9 16 20 15.1 20 14C20 12 22 10 22 10Z"
        fill={color} opacity="0.7" />
      <path d="M20 10L22 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function QuantityStepper({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #D8D0F0",
        borderRadius: 8,
        overflow: "hidden",
        height: 32,
      }}
    >
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        style={{
          width: 28,
          height: "100%",
          background: "#F4F0FF",
          border: "none",
          cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600,
          fontSize: 15,
          color: "#4C3494",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.15s",
        }}
      >
        −
      </button>
      <div
        style={{
          width: 32,
          textAlign: "center",
          fontFamily: "'DM Mono', monospace",
          fontWeight: 500,
          fontSize: 13,
          color: "#1A0F3E",
        }}
      >
        {value}
      </div>
      <button
        onClick={() => onChange(value + 1)}
        style={{
          width: 28,
          height: "100%",
          background: "#F4F0FF",
          border: "none",
          cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600,
          fontSize: 15,
          color: "#4C3494",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.15s",
        }}
      >
        +
      </button>
    </div>
  );
}

export function QuickOrderWidget({ dealerName = "Shree Ganesh Paints" }: { dealerName?: string }) {
  const [lines, setLines] = useState<OrderLine[]>(INITIAL_LINES);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [saveDraftHov, setSaveDraftHov] = useState(false);
  const [checkoutHov, setCheckoutHov] = useState(false);

  function updateQty(id: string, qty: number) {
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, qty } : l)));
  }
  function updateSize(id: string, size: string) {
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, size } : l)));
  }
  function removeLine(id: string) {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }

  const subtotal = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  const fmt = (n: number) =>
    "₹" + (n >= 100000 ? (n / 100000).toFixed(2) + "L" : n.toLocaleString("en-IN"));

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
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 20 }}>⚡</span>
            <h3
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: 18,
                color: "#4C3494",
                margin: 0,
              }}
            >
              Quick Order
            </h3>
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: 13, color: "#9B92B8", margin: 0 }}>
            Add products for <span style={{ color: "#5A5280", fontWeight: 500 }}>{dealerName}</span>
          </p>
        </div>
        <div
          style={{
            background: "#F4F0FF",
            border: "1px solid #D8D0F0",
            borderRadius: 8,
            padding: "4px 10px",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: 11,
            color: "#4C3494",
          }}
        >
          {lines.length} item{lines.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: 16 }}>
        <span
          style={{
            position: "absolute",
            left: 14,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#9B92B8",
            display: "flex",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="text"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          placeholder="Search product or shade..."
          style={{
            width: "100%",
            height: 44,
            background: "#FAFAFE",
            borderWidth: "1.5px",
            borderStyle: "solid",
            borderColor: searchFocused ? "#4C3494" : "#D8D0F0",
            borderRadius: 10,
            padding: "0 14px 0 40px",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: 14,
            color: "#1A0F3E",
            outline: "none",
            boxSizing: "border-box",
            boxShadow: searchFocused ? "0 0 0 3px rgba(76,52,148,0.12)" : "none",
            transition: "all 0.18s",
          }}
        />
      </div>

      {/* Recent chips */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none" }}>
        {RECENT_CHIPS.map((chip) => (
          <div
            key={chip.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "#F4F0FF",
              border: "1px solid #D8D0F0",
              borderRadius: 20,
              padding: "4px 10px 4px 8px",
              cursor: "pointer",
              whiteSpace: "nowrap",
              flexShrink: 0,
              transition: "background 0.15s",
            }}
          >
            <div style={{ width: 18, height: 18, borderRadius: "50%", background: "linear-gradient(135deg, #4C3494, #A990E0)", flexShrink: 0 }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 12, color: "#4C3494" }}>
              {chip.name}
            </span>
            <span style={{ fontSize: 10, color: "#9B92B8", cursor: "pointer" }}>✕</span>
          </div>
        ))}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            background: "transparent",
            border: "1px dashed #C8B8F0",
            borderRadius: 20,
            padding: "4px 12px",
            cursor: "pointer",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 12, color: "#A990E0" }}>
            + Add more
          </span>
        </div>
      </div>

      {/* Order lines */}
      <div
        style={{
          border: "1px solid #EEE9FF",
          borderRadius: 12,
          overflow: "hidden",
          marginBottom: 20,
          flex: 1,
        }}
      >
        {lines.length === 0 ? (
          <div style={{ padding: "32px 20px", textAlign: "center", color: "#C8B8F0", fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>
            No products added yet
          </div>
        ) : (
          lines.map((line, i) => (
            <div key={line.id}>
              {i > 0 && <div style={{ height: 1, background: "#F0EDF8" }} />}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "14px 16px",
                  background: "#fff",
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: "#F4F0FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <PaintIcon color="#4C3494" />
                </div>

                {/* Product info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, color: "#1A0F3E", marginBottom: 2 }}>
                    {line.name}
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: 11, color: "#9B92B8" }}>
                    {line.shade}
                  </div>
                </div>

                {/* Size dropdown */}
                <select
                  value={line.size}
                  onChange={(e) => updateSize(line.id, e.target.value)}
                  style={{
                    height: 32,
                    padding: "0 8px",
                    border: "1px solid #D8D0F0",
                    borderRadius: 8,
                    background: "#F8F5FF",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: 12,
                    color: "#2D1B69",
                    cursor: "pointer",
                    outline: "none",
                    flexShrink: 0,
                  }}
                >
                  {SIZE_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>

                {/* Stepper */}
                <QuantityStepper value={line.qty} onChange={(v) => updateQty(line.id, v)} />

                {/* Line total */}
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: 13,
                    color: "#1A0F3E",
                    minWidth: 68,
                    textAlign: "right",
                    flexShrink: 0,
                  }}
                >
                  {fmt(line.price * line.qty)}
                </div>

                {/* Delete */}
                <button
                  onClick={() => removeLine(line.id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#C8B8F0",
                    padding: 4,
                    display: "flex",
                    alignItems: "center",
                    borderRadius: 6,
                    transition: "color 0.15s",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#C8B8F0")}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6L18 20H6L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4h6v2" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Order summary */}
      <div
        style={{
          background: "#FAFAFE",
          borderRadius: 12,
          padding: "14px 16px",
          marginBottom: 20,
          border: "1px solid #EEE9FF",
        }}
      >
        {[
          { label: "Subtotal", value: fmt(subtotal), muted: true },
          { label: "GST 18%", value: fmt(gst), muted: true },
        ].map((row) => (
          <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: 13, color: "#9B92B8" }}>{row.label}</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: 13, color: "#5A5280" }}>{row.value}</span>
          </div>
        ))}
        <div style={{ height: 1, background: "#D8D0F0", margin: "10px 0" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "#1A0F3E" }}>Total</span>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: "#2D1B69" }}>
            {fmt(total)}
          </span>
        </div>
      </div>

      {/* CTAs */}
      <div style={{ display: "flex", gap: 12 }}>
        <button
          onMouseEnter={() => setSaveDraftHov(true)}
          onMouseLeave={() => setSaveDraftHov(false)}
          style={{
            flex: 1,
            height: 44,
            borderRadius: 10,
            border: "1.5px solid #4C3494",
            background: saveDraftHov ? "#F4F0FF" : "transparent",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: 14,
            color: "#4C3494",
            cursor: "pointer",
            transition: "all 0.18s",
          }}
        >
          Save as Draft
        </button>
        <button
          onMouseEnter={() => setCheckoutHov(true)}
          onMouseLeave={() => setCheckoutHov(false)}
          style={{
            flex: 2,
            height: 44,
            borderRadius: 10,
            border: "none",
            background: checkoutHov
              ? "linear-gradient(135deg, #3D2680 0%, #5A40A0 100%)"
              : "linear-gradient(135deg, #2D1B69 0%, #4C3494 100%)",
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: 14,
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            boxShadow: checkoutHov
              ? "0 6px 20px rgba(76,52,148,0.4)"
              : "0 3px 10px rgba(76,52,148,0.25)",
            transform: checkoutHov ? "translateY(-1px)" : "none",
            transition: "all 0.18s",
          }}
        >
          Proceed to Checkout
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
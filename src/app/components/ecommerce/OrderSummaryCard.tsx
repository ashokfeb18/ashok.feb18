import { useState } from "react";
import { Lock, Shield, Truck, ChevronRight, Tag } from "lucide-react";
import { useNavigate } from "react-router";
import type { CartItem } from "./CartContext";
import { TierBadge } from "./TierBadge";
import { DEALER } from "./mockData";

interface OrderSummaryCardProps {
  items: CartItem[];
  ctaLabel?: string;
  onCta?: () => void;
  compact?: boolean;
  showContinueShopping?: boolean;
}

export function OrderSummaryCard({ items, ctaLabel = "Proceed to Checkout", onCta, compact = false, showContinueShopping = true }: OrderSummaryCardProps) {
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const subtotal = items.reduce((sum, item) => {
    const ps = item.product.packSizes.find(p => p.size === item.packSize);
    return sum + (ps ? ps.dealerPrice * item.quantity : 0);
  }, 0);

  const mrpTotal = items.reduce((sum, item) => {
    const ps = item.product.packSizes.find(p => p.size === item.packSize);
    return sum + (ps ? ps.mrp * item.quantity : 0);
  }, 0);

  const schemeDiscount = Math.round(subtotal * 0.05);
  const couponDiscount = appliedCoupon ? Math.round(subtotal * 0.03) : 0;
  const totalDiscount = mrpTotal - subtotal + schemeDiscount + couponDiscount;
  const gst = 0; // already included
  const delivery = subtotal >= 50000 ? 0 : 350;
  const total = subtotal - schemeDiscount - couponDiscount + delivery;

  const visibleItems = compact ? items.slice(0, 3) : items.slice(0, 3);
  const hiddenCount = items.length - visibleItems.length;

  function applyCoupon() {
    if (coupon.trim().toUpperCase() === "DEALER10") {
      setAppliedCoupon(coupon.trim().toUpperCase());
      setCoupon("");
    }
  }

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        border: "1px solid #D8D0F0",
        boxShadow: "0 2px 12px rgba(76,52,148,0.07)",
        padding: compact ? "20px" : "24px",
        display: "flex",
        flexDirection: "column",
        gap: 0,
      }}
    >
      {/* Title */}
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: compact ? 16 : 18, color: "#1A0F3E", margin: 0 }}>
          Order Summary
        </h3>
      </div>

      {/* Dealer info */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#4C3494,#2D1B69)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13 }}>
          {DEALER.initials}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, color: "#2D1B69" }}>{DEALER.name}</div>
          <TierBadge tier={DEALER.tier} size="sm" />
        </div>
      </div>

      <div style={{ height: 1, background: "#EEE9FF", marginBottom: 16 }} />

      {/* Items list */}
      {visibleItems.map((item) => {
        const ps = item.product.packSizes.find(p => p.size === item.packSize);
        const lineTotal = ps ? ps.dealerPrice * item.quantity : 0;
        return (
          <div key={`${item.productId}-${item.packSize}`} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, gap: 8 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#2D1B69", fontWeight: 500, lineHeight: 1.3 }}>
                {item.product.name}
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#9B92B8" }}>
                {item.packSize} × {item.quantity}
              </div>
            </div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontWeight: 600, fontSize: 13, color: "#2D1B69", whiteSpace: "nowrap" }}>
              ₹{lineTotal.toLocaleString("en-IN")}
            </div>
          </div>
        );
      })}
      {hiddenCount > 0 && (
        <button style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#4C3494", padding: "0 0 10px", textAlign: "left", display: "flex", alignItems: "center", gap: 4 }}>
          and {hiddenCount} more item{hiddenCount > 1 ? "s" : ""} <ChevronRight size={12} />
        </button>
      )}

      <div style={{ height: 1, background: "#EEE9FF", marginBottom: 16 }} />

      {/* Price breakdown */}
      {[
        { label: "Subtotal", value: `₹${subtotal.toLocaleString("en-IN")}`, color: "#2D1B69" },
        { label: "Scheme Discount", value: `-₹${schemeDiscount.toLocaleString("en-IN")}`, color: "#38A169" },
        ...(couponDiscount > 0 ? [{ label: `Coupon (${appliedCoupon})`, value: `-₹${couponDiscount.toLocaleString("en-IN")}`, color: "#38A169" }] : []),
        { label: "GST 18%", value: "Included", color: "#9B92B8" },
        { label: "Delivery", value: delivery === 0 ? "FREE" : `₹${delivery}`, color: delivery === 0 ? "#38A169" : "#2D1B69" },
      ].map(row => (
        <div key={row.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#9B92B8" }}>{row.label}</span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: row.color, fontWeight: 500 }}>{row.value}</span>
        </div>
      ))}

      <div style={{ height: 2, background: "#EEE9FF", margin: "8px 0 16px" }} />

      {/* Total */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: "#1A0F3E" }}>Total</span>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22, color: "#2D1B69" }}>
          ₹{total.toLocaleString("en-IN")}
        </span>
      </div>

      {/* Savings note */}
      <div style={{ background: "#F0FFF4", border: "1px solid #9AE6B4", borderRadius: 8, padding: "8px 12px", marginBottom: 16, textAlign: "center" }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 12, color: "#38A169" }}>
          🎉 You save ₹{totalDiscount.toLocaleString("en-IN")} on this order
        </span>
      </div>

      {/* Coupon input (non-compact) */}
      {!compact && (
        <div style={{ marginBottom: 16 }}>
          {appliedCoupon ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#F0FFF4", border: "1px solid #9AE6B4", borderRadius: 10, padding: "10px 14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Tag size={14} color="#38A169" />
                <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 600, fontSize: 13, color: "#38A169" }}>{appliedCoupon}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#38A169" }}>· -₹{couponDiscount.toLocaleString("en-IN")} off</span>
              </div>
              <button onClick={() => setAppliedCoupon(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9B92B8", fontSize: 16, lineHeight: 1 }}>×</button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={coupon}
                onChange={e => setCoupon(e.target.value)}
                placeholder="Promo / Coupon code"
                style={{ flex: 1, height: 40, borderRadius: 10, border: "1.5px solid #D8D0F0", padding: "0 12px", fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#2D1B69", outline: "none" }}
                onKeyDown={e => e.key === "Enter" && applyCoupon()}
              />
              <button
                onClick={applyCoupon}
                style={{ height: 40, padding: "0 16px", borderRadius: 10, border: "1.5px solid #4C3494", background: "#EEE9FF", color: "#4C3494", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, cursor: "pointer" }}
              >
                Apply
              </button>
            </div>
          )}
        </div>
      )}

      {/* CTA */}
      <button
        onClick={onCta}
        style={{
          width: "100%",
          height: compact ? 44 : 52,
          borderRadius: 12,
          border: "none",
          background: "linear-gradient(135deg, #3D2680 0%, #4C3494 100%)",
          color: "#fff",
          fontFamily: "'Syne', sans-serif",
          fontWeight: 600,
          fontSize: compact ? 14 : 16,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          boxShadow: "0 4px 16px rgba(76,52,148,0.25)",
          transition: "all 0.2s",
          marginBottom: compact ? 0 : 16,
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 28px rgba(76,52,148,0.4)"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 16px rgba(76,52,148,0.25)"; (e.currentTarget as HTMLButtonElement).style.transform = ""; }}
      >
        {ctaLabel} →
      </button>

      {/* Trust badges */}
      {!compact && (
        <>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 12 }}>
            {[
              { icon: <Lock size={12} />, label: "Secure Checkout" },
              { icon: <Shield size={12} />, label: "Verified Dealer" },
              { icon: <Truck size={12} />, label: "Free above ₹50K" },
            ].map(b => (
              <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ color: "#9B92B8" }}>{b.icon}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#9B92B8" }}>{b.label}</span>
              </div>
            ))}
          </div>
          {showContinueShopping && (
            <button
              onClick={() => navigate("/dealer/products")}
              style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, color: "#4C3494", textAlign: "center", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}
            >
              ← Continue Shopping
            </button>
          )}
        </>
      )}

      {compact && (
        <div style={{ marginTop: 12, textAlign: "center" }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#4C3494", display: "flex", alignItems: "center", gap: 4, margin: "0 auto" }}>
            📞 Need help?
          </button>
        </div>
      )}
    </div>
  );
}

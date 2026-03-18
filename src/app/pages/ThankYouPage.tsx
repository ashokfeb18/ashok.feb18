import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Copy, Download, MapPin, ShoppingCart, ClipboardList, Headphones, Check, Package, Truck } from "lucide-react";
import { SharedLayout } from "../components/ecommerce/SharedLayout";
import { TierBadge } from "../components/ecommerce/TierBadge";
import { DEALER } from "../components/ecommerce/mockData";

const ORDER_ID = "ORD-20261103-4821";
const ESTIMATED_DELIVERY = "Mar 6–7, 2026";
const ORDER_DATE = "Mar 2, 2026";

const ORDERED_ITEMS = [
  { name: "Royale Aspira Emulsion", qty: 3, packSize: "10L", price: 11340, image: "https://images.unsplash.com/photo-1635260166178-41e20858d0d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80" },
  { name: "Tractor Emulsion", qty: 5, packSize: "4L", price: 6090, image: "https://images.unsplash.com/photo-1673297821205-e0575bbc2ab7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80" },
  { name: "Apcolite Premium Enamel", qty: 2, packSize: "1L", price: 1032, image: "https://images.unsplash.com/photo-1716471330478-7296f0266c59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80" },
];
const ORDER_TOTAL = ORDER_ITEMS_TOTAL();
function ORDER_ITEMS_TOTAL() {
  return ORDERED_ITEMS.reduce((s, i) => s + i.price, 0);
}

const LOYALTY_EARNED = 850;
const NEW_BALANCE = 13300;

const DELIVERY_STEPS = [
  { label: "Order Confirmed", date: ORDER_DATE, done: true },
  { label: "Out for Delivery", date: "Mar 6, 2026", done: false },
  { label: "Delivered", date: "Mar 7, 2026", done: false },
];

const NEXT_ACTIONS = [
  { icon: <ShoppingCart size={28} color="#4C3494" />, label: "Browse More Products", href: "/dealer/products" },
  { icon: <ClipboardList size={28} color="#4C3494" />, label: "View My Orders", href: "/dealer/orders" },
  { icon: <Headphones size={28} color="#4C3494" />, label: "Contact Support", href: "/dealer/support" },
];

function ConfettiDots() {
  const dots = Array.from({ length: 30 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 4 + Math.random() * 8,
    color: i % 3 === 0 ? "#F5A623" : i % 3 === 1 ? "#A990E0" : "#fff",
    opacity: 0.15 + Math.random() * 0.2,
  }));
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {dots.map((d, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            borderRadius: i % 5 === 0 ? "50%" : 2,
            background: d.color,
            opacity: d.opacity,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  );
}

export function ThankYouPage() {
  const navigate = useNavigate();
  const [checkVisible, setCheckVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setCheckVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  function handleCopy() {
    navigator.clipboard.writeText(ORDER_ID).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <SharedLayout hasSidebar={false} breadcrumb={[{ label: "Home", href: "/dealer" }, { label: "Order Confirmation" }]}>
      {/* ── Hero ── */}
      <div
        style={{
          position: "relative",
          background: "linear-gradient(135deg, #2D1B69 0%, #1A0F3E 100%)",
          borderRadius: 20,
          height: 320,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          marginBottom: 0,
          overflow: "hidden",
        }}
      >
        <ConfettiDots />
        {/* Animated check */}
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
            transform: checkVisible ? "scale(1)" : "scale(0.5)",
            opacity: checkVisible ? 1 : 0,
            transition: "all 0.5s cubic-bezier(0.34,1.56,0.64,1)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "#38A169",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Check size={32} color="#fff" strokeWidth={3} />
          </div>
        </div>
        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 32,
            color: "#fff",
            margin: 0,
            textAlign: "center",
            position: "relative",
            zIndex: 1,
            transform: checkVisible ? "translateY(0)" : "translateY(20px)",
            opacity: checkVisible ? 1 : 0,
            transition: "all 0.5s 0.2s ease",
          }}
        >
          Order Placed Successfully! 🎉
        </h1>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16,
            color: "rgba(255,255,255,0.75)",
            margin: 0,
            textAlign: "center",
            position: "relative",
            zIndex: 1,
            transform: checkVisible ? "translateY(0)" : "translateY(20px)",
            opacity: checkVisible ? 1 : 0,
            transition: "all 0.5s 0.35s ease",
          }}
        >
          Thank you for your order, {DEALER.name}
        </p>
      </div>

      {/* ── Order Reference Strip ── */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #D8D0F0",
          borderRadius: 14,
          padding: "20px 28px",
          display: "flex",
          alignItems: "center",
          gap: 24,
          flexWrap: "wrap",
          marginBottom: 28,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#9B92B8", marginBottom: 4 }}>Order ID</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: 18, color: "#2D1B69" }}>#{ORDER_ID}</span>
              <button
                onClick={handleCopy}
                style={{ background: "none", border: "none", cursor: "pointer", color: copied ? "#38A169" : "#9B92B8", display: "flex", alignItems: "center" }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          </div>
          <div
            style={{
              background: "#EEE9FF",
              border: "1px solid #C8BEE8",
              borderRadius: 20,
              padding: "6px 14px",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Truck size={14} color="#4C3494" />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, color: "#4C3494" }}>
              Estimated Delivery: {ESTIMATED_DELIVERY}
            </span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{
            display: "flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 10, border: "1.5px solid #D8D0F0", background: "#fff", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, color: "#2D1B69",
          }}>
            <Download size={14} /> Download Invoice
          </button>
          <button style={{
            display: "flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 10, border: "none", background: "linear-gradient(135deg, #3D2680, #4C3494)", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, color: "#fff",
          }}>
            <Package size={14} /> Track Order
          </button>
        </div>
      </div>

      {/* ── Three Info Cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 48 }}>
        {/* Card 1: Order Summary */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #D8D0F0", boxShadow: "0 2px 12px rgba(76,52,148,0.07)", padding: 24 }}>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: "#1A0F3E", margin: "0 0 16px" }}>
            What You Ordered
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
            {ORDERED_ITEMS.map((item, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, overflow: "hidden", flexShrink: 0, background: "#F8F5FF" }}>
                  <img src={item.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 12, color: "#2D1B69", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#9B92B8" }}>{item.packSize} × {item.qty}</div>
                </div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#2D1B69", fontWeight: 600, flexShrink: 0 }}>₹{item.price.toLocaleString("en-IN")}</div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid #EEE9FF", paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#9B92B8" }}>Total</span>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: "#2D1B69" }}>₹{ORDER_TOTAL.toLocaleString("en-IN")}</span>
          </div>
          <button style={{ marginTop: 14, width: "100%", padding: "9px 0", borderRadius: 8, border: "1.5px solid #4C3494", background: "none", color: "#4C3494", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
            View Full Order
          </button>
        </div>

        {/* Card 2: Delivery Details */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #D8D0F0", boxShadow: "0 2px 12px rgba(76,52,148,0.07)", padding: 24 }}>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: "#1A0F3E", margin: "0 0 16px" }}>
            Delivery To
          </h3>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 20 }}>
            <MapPin size={16} color="#4C3494" style={{ marginTop: 2, flexShrink: 0 }} />
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "#2D1B69" }}>{DEALER.name}</span>
                <TierBadge tier={DEALER.tier} size="sm" />
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#9B92B8", lineHeight: 1.6 }}>
                42, Laxmi Industrial Estate, Near Viman Nagar<br />
                Pune, Maharashtra – 411014
              </div>
            </div>
          </div>

          {/* Delivery timeline */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {DELIVERY_STEPS.map((step, idx) => (
              <div key={idx} style={{ display: "flex", gap: 12, position: "relative" }}>
                {idx < DELIVERY_STEPS.length - 1 && (
                  <div style={{ position: "absolute", left: 15, top: 32, width: 2, height: "calc(100% - 8px)", background: step.done ? "#38A169" : "#EEE9FF" }} />
                )}
                <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: "50%", background: step.done ? "#38A169" : "#F0EDF8", border: `2px solid ${step.done ? "#38A169" : "#D8D0F0"}`, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                  {step.done ? <Check size={14} color="#fff" /> : <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#D8D0F0" }} />}
                </div>
                <div style={{ paddingBottom: idx < DELIVERY_STEPS.length - 1 ? 20 : 0 }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, color: step.done ? "#38A169" : "#9B92B8" }}>{step.label}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#9B92B8" }}>{step.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 3: Loyalty Reward */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #D8D0F0", boxShadow: "0 2px 12px rgba(76,52,148,0.07)", padding: 24 }}>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: "#1A0F3E", margin: "0 0 16px" }}>
            Points Earned 🏆
          </h3>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 36, color: "#F5A623", lineHeight: 1.1, marginBottom: 6 }}>
              +{LOYALTY_EARNED.toLocaleString("en-IN")} pts
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#9B92B8" }}>Added to your Loyalty balance</div>
          </div>

          <div style={{ background: "#FFF8E6", borderRadius: 10, padding: "12px 16px", marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#9A6C08" }}>New balance</span>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "#B8760A" }}>
                ⭐ {NEW_BALANCE.toLocaleString("en-IN")} pts
              </span>
            </div>
            {/* Progress to next tier */}
            <div style={{ height: 6, background: "#F0D890", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: "73%", background: "linear-gradient(90deg, #F5A623, #E09020)", borderRadius: 3, transition: "width 1s ease" }} />
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#9A6C08", marginTop: 6 }}>
              3,200 pts to Elite tier
            </div>
          </div>

          <button
            onClick={() => navigate("/dealer/loyalty")}
            style={{ width: "100%", padding: "10px 0", borderRadius: 10, border: "1.5px solid #4C3494", background: "none", color: "#4C3494", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, cursor: "pointer" }}
          >
            View Loyalty Dashboard
          </button>
        </div>
      </div>

      {/* ── What's Next ── */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22, color: "#1A0F3E", margin: "0 0 24px" }}>
          What would you like to do next?
        </h2>
        <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
          {NEXT_ACTIONS.map(action => (
            <div
              key={action.label}
              onClick={() => navigate(action.href)}
              style={{
                width: 180,
                background: "#fff",
                borderRadius: 14,
                border: "1px solid #D8D0F0",
                boxShadow: "0 2px 12px rgba(76,52,148,0.07)",
                padding: "24px 20px",
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.18s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(76,52,148,0.14)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(76,52,148,0.07)"; }}
            >
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#EEE9FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {action.icon}
                </div>
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, color: "#2D1B69", lineHeight: 1.3 }}>
                {action.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer note ── */}
      <div style={{ textAlign: "center", paddingBottom: 32 }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#9B92B8", margin: 0, lineHeight: 1.7 }}>
          A confirmation has been sent to your registered email and mobile.<br />
          For any queries contact your Sales Agent or call <strong>1800-XXX-XXXX</strong>.
        </p>
      </div>
    </SharedLayout>
  );
}

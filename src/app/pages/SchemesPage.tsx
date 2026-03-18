import { SharedLayout } from "../components/ecommerce/SharedLayout";
import { Tag, Calendar, ChevronRight, CheckCircle2, Clock } from "lucide-react";

const SCHEMES = [
  {
    id: "SCH-2024-001",
    name: "Platinum Dealer Festive Boost",
    brand: "Asian Paints",
    type: "Volume Discount",
    validUntil: "31 Mar 2024",
    status: "active",
    discount: "12%",
    minOrder: "₹50,000",
    description: "Exclusive 12% off on all Royale and Apex range orders above ₹50,000 for Platinum dealers during the festive quarter.",
    progress: 68,
    progressLabel: "₹34,000 of ₹50,000 target reached",
  },
  {
    id: "SCH-2024-002",
    name: "Tractor Emulsion Summer Push",
    brand: "Tractor by Asian Paints",
    type: "Cashback",
    validUntil: "30 Apr 2024",
    status: "active",
    discount: "₹800 cashback / 20L",
    minOrder: "Min 10 cans",
    description: "Order 10+ cans of Tractor Emulsion range and earn ₹800 cashback per 20L can, credited within 7 working days.",
    progress: 40,
    progressLabel: "4 of 10 cans ordered",
  },
  {
    id: "SCH-2024-003",
    name: "Apex Exterior Combo Deal",
    brand: "Asian Paints",
    type: "Combo",
    validUntil: "15 Apr 2024",
    status: "active",
    discount: "Free 1L primer",
    minOrder: "Buy 4×20L Apex Exterior",
    description: "Buy any 4 cans of Apex Exterior and get one 1L Primer can absolutely free per combo purchased.",
    progress: 100,
    progressLabel: "Achieved! Collect your free primer.",
  },
  {
    id: "SCH-2023-089",
    name: "Year-End Volume Bonus",
    brand: "Asian Paints",
    type: "Loyalty Bonus",
    validUntil: "31 Dec 2023",
    status: "expired",
    discount: "1,000 bonus pts",
    minOrder: "₹1,00,000 in Dec",
    description: "Earn 1,000 bonus loyalty points for every ₹1,00,000 in purchases during December 2023.",
    progress: 100,
    progressLabel: "Expired — 2,000 pts awarded",
  },
];

const STATUS_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  active: { bg: "#ECFDF5", color: "#16A34A", label: "Active" },
  expired: { bg: "#F3F4F6", color: "#6B7280", label: "Expired" },
};

const TYPE_COLOR: Record<string, string> = {
  "Volume Discount": "#4C3494",
  Cashback: "#2563EB",
  Combo: "#EA580C",
  "Loyalty Bonus": "#F5A623",
};

export function SchemesPage() {
  return (
    <SharedLayout>
      <div style={{ padding: "28px 32px", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, color: "#1A0F3E", margin: "0 0 4px" }}>Schemes & Offers</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#9B92B8", margin: 0 }}>
            Active and past promotional schemes tailored for your dealer tier.
          </p>
        </div>

        {/* Active banner */}
        <div style={{ background: "linear-gradient(135deg, #F5A623 0%, #E8941A 100%)", borderRadius: 14, padding: "18px 24px", marginBottom: 28, display: "flex", alignItems: "center", gap: 16 }}>
          <Tag size={28} color="#fff" />
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "#fff" }}>
              3 Active Schemes Available
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.85)", marginTop: 2 }}>
              Check your progress and place orders to unlock rewards before they expire.
            </div>
          </div>
        </div>

        {/* Scheme cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {SCHEMES.map(scheme => {
            const ss = STATUS_STYLE[scheme.status];
            const typeColor = TYPE_COLOR[scheme.type] || "#4C3494";
            const achieved = scheme.progress >= 100;
            return (
              <div
                key={scheme.id}
                style={{
                  background: "#fff",
                  border: "1px solid #D8D0F0",
                  borderRadius: 14,
                  boxShadow: "0 2px 12px rgba(76,52,148,0.07)",
                  overflow: "hidden",
                  opacity: scheme.status === "expired" ? 0.75 : 1,
                }}
              >
                <div style={{ padding: "18px 22px" }}>
                  {/* Top row */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 20, background: typeColor + "18", color: typeColor }}>
                          {scheme.type}
                        </span>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 20, background: ss.bg, color: ss.color, display: "flex", alignItems: "center", gap: 4 }}>
                          {scheme.status === "active" ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                          {ss.label}
                        </span>
                      </div>
                      <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "#1A0F3E", margin: "0 0 2px" }}>
                        {scheme.name}
                      </h3>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#9B92B8" }}>{scheme.brand}</div>
                    </div>

                    <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 20 }}>
                      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: typeColor }}>{scheme.discount}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#9B92B8", marginTop: 2 }}>{scheme.minOrder}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4, justifyContent: "flex-end" }}>
                        <Calendar size={11} color="#9B92B8" />
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#9B92B8" }}>Until {scheme.validUntil}</span>
                      </div>
                    </div>
                  </div>

                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#5A5280", lineHeight: 1.6, margin: "0 0 14px" }}>
                    {scheme.description}
                  </p>

                  {/* Progress */}
                  {scheme.status === "active" && (
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: achieved ? "#16A34A" : "#5A5280" }}>
                          {scheme.progressLabel}
                        </span>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: typeColor }}>{scheme.progress}%</span>
                      </div>
                      <div style={{ height: 5, background: "#EEE9FF", borderRadius: 3 }}>
                        <div style={{ height: "100%", width: `${Math.min(scheme.progress, 100)}%`, background: achieved ? "#16A34A" : typeColor, borderRadius: 3, transition: "width 0.4s ease" }} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                {scheme.status === "active" && !achieved && (
                  <div style={{ padding: "12px 22px", background: "#F8F5FF", borderTop: "1px solid #EEE9FF", display: "flex", justifyContent: "flex-end" }}>
                    <button style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 16px", borderRadius: 8, border: "none", background: "linear-gradient(135deg, #4C3494, #2D1B69)", color: "#fff", fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>
                      Order to Unlock <ChevronRight size={13} />
                    </button>
                  </div>
                )}
                {scheme.status === "active" && achieved && (
                  <div style={{ padding: "12px 22px", background: "#ECFDF5", borderTop: "1px solid #BBF7D0", display: "flex", alignItems: "center", gap: 8 }}>
                    <CheckCircle2 size={15} color="#16A34A" />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 12, color: "#16A34A" }}>Scheme achieved! Your reward is on its way.</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </SharedLayout>
  );
}

import { SharedLayout } from "../components/ecommerce/SharedLayout";
import { Star, Gift, TrendingUp, Award } from "lucide-react";

const HISTORY = [
  { date: "12 Mar 2024", desc: "Order ORD-20240312-8821 delivered", pts: +420, balance: 4820 },
  { date: "05 Mar 2024", desc: "Order ORD-20240305-7743 placed", pts: +210, balance: 4400 },
  { date: "20 Feb 2024", desc: "Order ORD-20240220-5501 delivered", pts: +580, balance: 4190 },
  { date: "10 Feb 2024", desc: "Bonus: Scheme achievement reward", pts: +500, balance: 3610 },
  { date: "02 Feb 2024", desc: "Order ORD-20240202-3398 delivered", pts: +310, balance: 3110 },
  { date: "15 Jan 2024", desc: "Redeemed — Discount coupon ₹500", pts: -500, balance: 2800 },
  { date: "10 Jan 2024", desc: "Order ORD-20240110-1100 delivered", pts: +250, balance: 3300 },
];

export function LoyaltyPage() {
  return (
    <SharedLayout>
      <div style={{ padding: "28px 32px", maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, color: "#1A0F3E", margin: "0 0 4px" }}>Loyalty Points</h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#9B92B8", margin: "0 0 28px" }}>Earn points on every order and redeem for rewards.</p>

        {/* Summary */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
          {[
            { icon: <Star size={20} color="#F5A623" />, label: "Available Points", value: "4,820", color: "#F5A623" },
            { icon: <TrendingUp size={20} color="#4C3494" />, label: "Earned This Year", value: "2,270", color: "#4C3494" },
            { icon: <Gift size={20} color="#16A34A" />, label: "Redeemed", value: "500", color: "#16A34A" },
          ].map(c => (
            <div key={c.label} style={{ background: "#fff", border: "1px solid #D8D0F0", borderRadius: 14, padding: "20px 24px", boxShadow: "0 2px 12px rgba(76,52,148,0.07)", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: "#F8F5FF", display: "flex", alignItems: "center", justifyContent: "center" }}>{c.icon}</div>
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#9B92B8", marginBottom: 4 }}>{c.label}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, color: c.color }}>{c.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tier card */}
        <div style={{ background: "linear-gradient(135deg, #2D1B69, #4C3494)", borderRadius: 16, padding: "24px 28px", marginBottom: 28, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 6 }}>Your Tier</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <Award size={24} color="#F5A623" />
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, color: "#fff" }}>Platinum</span>
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
              180 more points to maintain Platinum status
            </div>
            <div style={{ marginTop: 10, height: 6, background: "rgba(255,255,255,0.15)", borderRadius: 3, width: 240 }}>
              <div style={{ height: "100%", width: "73%", background: "#F5A623", borderRadius: 3 }} />
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>Earn Rate</div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, color: "#F5A623" }}>1.5×</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.5)" }}>pts per ₹100 spent</div>
          </div>
        </div>

        {/* History */}
        <div style={{ background: "#fff", border: "1px solid #D8D0F0", borderRadius: 14, boxShadow: "0 2px 12px rgba(76,52,148,0.07)", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #EEE9FF" }}>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: "#1A0F3E" }}>Points History</span>
          </div>
          {HISTORY.map((row, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", padding: "14px 20px", borderBottom: i < HISTORY.length - 1 ? "1px solid #F0EDF8" : "none" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#1A0F3E", marginBottom: 2 }}>{row.desc}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#9B92B8" }}>{row.date}</div>
              </div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontWeight: 600, fontSize: 14, color: row.pts > 0 ? "#16A34A" : "#DC2626", minWidth: 80, textAlign: "right" }}>
                {row.pts > 0 ? "+" : ""}{row.pts.toLocaleString()} pts
              </div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#9B92B8", minWidth: 90, textAlign: "right" }}>
                {row.balance.toLocaleString()} bal
              </div>
            </div>
          ))}
        </div>
      </div>
    </SharedLayout>
  );
}

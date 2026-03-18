import { useState } from "react";
import { DealerHeroBanner, type TierVariant } from "./DealerHeroBanner";
import { StatsBar } from "./StatsBar";
import { LoyaltyCard } from "./LoyaltyCard";
import { QuickOrderWidget } from "./QuickOrderWidget";

const DEALER = {
  dealerName: "Shree Ganesh Paints",
  dealerId: "DLR-MH-10234",
  city: "Pune, Maharashtra",
  partnerSince: 2016,
};

const TIER_OPTIONS: { value: TierVariant; label: string; emoji: string }[] = [
  { value: "platinum", label: "Platinum", emoji: "⬡" },
  { value: "top150", label: "Top 150", emoji: "★" },
  { value: "combo", label: "Platinum + Top 150", emoji: "👑" },
  { value: "regular", label: "Regular", emoji: "○" },
];

export function DealerLandingPage() {
  const [tier, setTier] = useState<TierVariant>("combo");

  return (
    <div style={{ minHeight: "100vh", background: "#F0EDF8", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Top nav bar */}
      <nav
        style={{
          background: "#fff",
          borderBottom: "1px solid #D8D0F0",
          height: 56,
          display: "flex",
          alignItems: "center",
          padding: "0 40px",
          gap: 16,
          position: "sticky",
          top: 0,
          zIndex: 50,
          boxShadow: "0 1px 8px rgba(76,52,148,0.07)",
        }}
      >
        {/* Back */}
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: "#4C3494",
            textDecoration: "none",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: 13,
            padding: "6px 10px",
            borderRadius: 8,
            background: "#F4F0FF",
            border: "1px solid #D8D0F0",
            transition: "background 0.15s",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </a>

        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: "linear-gradient(135deg, #4C3494, #2D1B69)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M4 20L9 6L14 20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6.5 14H11.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M16 6H19C20.66 6 22 7.34 22 9C22 10.66 20.66 12 19 12H16V6Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 12V18" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: "#1A0F3E" }}>
            Myawaaz
          </span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#9B92B8" }}>/</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 13, color: "#5A5280" }}>
            Dealer Profile
          </span>
        </div>

        <div style={{ flex: 1 }} />

        {/* Tier switcher (demo control) */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#9B92B8", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Preview Tier:
          </span>
          <div
            style={{
              display: "flex",
              background: "#F4F0FF",
              borderRadius: 10,
              padding: 3,
              gap: 2,
              border: "1px solid #D8D0F0",
            }}
          >
            {TIER_OPTIONS.map((t) => (
              <button
                key={t.value}
                onClick={() => setTier(t.value)}
                style={{
                  padding: "5px 12px",
                  borderRadius: 7,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 12,
                  transition: "all 0.18s",
                  ...(tier === t.value
                    ? { background: "#fff", color: "#4C3494", boxShadow: "0 1px 6px rgba(76,52,148,0.18)" }
                    : { background: "transparent", color: "#9B92B8" }),
                }}
              >
                {t.emoji} {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Agent info */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 8 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #4C3494, #7B5EA7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 12,
              color: "#fff",
            }}
          >
            RA
          </div>
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 12, color: "#2D1B69", lineHeight: 1 }}>
              Rahul Arora
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: 10, color: "#9B92B8", lineHeight: 1.4 }}>
              AP-EMP-00421
            </div>
          </div>
        </div>
      </nav>

      {/* Page content */}
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px 64px" }}>

        {/* Breadcrumb */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "16px 0 12px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            color: "#9B92B8",
          }}
        >
          <span>Dashboard</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
          <span>Dealers</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
          <span style={{ color: "#4C3494", fontWeight: 500 }}>{DEALER.dealerName}</span>
        </div>

        {/* Zone 1: Hero banner */}
        <div
          style={{
            borderRadius: "16px 16px 0 0",
            overflow: "hidden",
            boxShadow: "0 2px 12px rgba(76,52,148,0.1)",
          }}
        >
          <DealerHeroBanner tier={tier} {...DEALER} />
        </div>

        {/* Zone 2: Stats bar */}
        <div style={{ boxShadow: "0 2px 12px rgba(76,52,148,0.07)", borderRadius: "0 0 12px 12px", overflow: "hidden", marginBottom: 24 }}>
          <StatsBar />
        </div>

        {/* Zone 3 + 4: Two columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "55fr 45fr",
            gap: 24,
            alignItems: "start",
          }}
          className="dealer-cols"
        >
          <LoyaltyCard />
          <QuickOrderWidget dealerName={DEALER.dealerName} />
        </div>
      </div>

      {/* Footer note */}
      <div
        style={{
          textAlign: "center",
          padding: "12px 0 24px",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
          fontSize: 11,
          color: "#B8B0D8",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Secured with TLS 1.3 · Asian Paints Internal
      </div>

      <style>{`
        @media (max-width: 960px) {
          .dealer-cols {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

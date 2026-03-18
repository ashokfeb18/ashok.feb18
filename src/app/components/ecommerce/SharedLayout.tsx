import { useState } from "react";
import type { ReactNode } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import {
  LayoutDashboard, Package, ClipboardList, Star, Tag, Headphones,
  Bell, Search, ShoppingCart, ChevronRight,
} from "lucide-react";
import { useCart } from "./CartContext";
import { TierBadge } from "./TierBadge";
import { DEALER } from "./mockData";

interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} />, href: "/dealer" },
  { id: "products", label: "Products", icon: <Package size={18} />, href: "/dealer/products" },
  { id: "orders", label: "My Orders", icon: <ClipboardList size={18} />, href: "/dealer/orders" },
  { id: "loyalty", label: "Loyalty Points", icon: <Star size={18} />, href: "/dealer/loyalty" },
  { id: "schemes", label: "Schemes", icon: <Tag size={18} />, href: "/dealer/schemes" },
  { id: "support", label: "Support", icon: <Headphones size={18} />, href: "/dealer/support" },
];

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface SharedLayoutProps {
  children: ReactNode;
  hasSidebar?: boolean;
  breadcrumb?: BreadcrumbItem[];
}

export function SharedLayout({ children, hasSidebar = true, breadcrumb }: SharedLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const activeId = (() => {
    const p = location.pathname;
    if (p.startsWith("/dealer/products")) return "products";
    if (p.startsWith("/dealer/orders") || p.startsWith("/dealer/cart") || p.startsWith("/dealer/checkout")) return "orders";
    if (p.startsWith("/dealer/loyalty")) return "loyalty";
    if (p.startsWith("/dealer/schemes")) return "schemes";
    if (p.startsWith("/dealer/support")) return "support";
    return "dashboard";
  })();

  return (
    <div style={{ minHeight: "100vh", background: "#F0EDF8", fontFamily: "'DM Sans', sans-serif" }}>
      {/* ── Fixed Header ─────────────────────────────────────────────────────── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 64,
          background: "#fff",
          borderBottom: "1px solid #D8D0F0",
          zIndex: 200,
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          gap: 24,
        }}
      >
        {/* Logo */}
        <div
          onClick={() => navigate("/dealer")}
          style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", flexShrink: 0, width: hasSidebar ? 216 : "auto" }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "linear-gradient(135deg, #4C3494, #2D1B69)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M4 20L9 6L14 20" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6.5 14H11.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M16 6H19C20.66 6 22 7.34 22 9C22 10.66 20.66 12 19 12H16V6Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 12V18" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: "#1A0F3E", letterSpacing: "-0.3px" }}>
            Myawaaz
          </span>
        </div>

        {/* Search bar – center */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 480,
            }}
          >
            <Search
              size={16}
              color="#9B92B8"
              style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
            />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search products, shades, codes..."
              style={{
                width: "100%",
                height: 40,
                borderRadius: 20,
                border: `1.5px solid ${searchFocused ? "#4C3494" : "#D8D0F0"}`,
                background: "#F8F5FF",
                padding: "0 16px 0 40px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: "#2D1B69",
                outline: "none",
                transition: "border-color 0.18s",
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          {/* Cart */}
          <button
            onClick={() => navigate("/dealer/cart")}
            style={{ position: "relative", width: 40, height: 40, borderRadius: "50%", background: "#F8F5FF", border: "1px solid #D8D0F0", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          >
            <ShoppingCart size={18} color="#4C3494" />
            {cartCount > 0 && (
              <span style={{ position: "absolute", top: 2, right: 2, width: 16, height: 16, borderRadius: "50%", background: "#E53E3E", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center", border: "1.5px solid #fff" }}>
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </button>

          {/* Bell */}
          <button style={{ position: "relative", width: 40, height: 40, borderRadius: "50%", background: "#F8F5FF", border: "1px solid #D8D0F0", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <Bell size={18} color="#4C3494" />
            {DEALER.notifications > 0 && (
              <span style={{ position: "absolute", top: 2, right: 2, width: 16, height: 16, borderRadius: "50%", background: "#E53E3E", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center", border: "1.5px solid #fff" }}>
                {DEALER.notifications}
              </span>
            )}
          </button>

          {/* Avatar + name + tier */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #4C3494, #2D1B69)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13 }}>
              {DEALER.initials}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, color: "#1A0F3E", lineHeight: 1 }}>
                {DEALER.name.split(" ").slice(0, 2).join(" ")}
              </span>
              <TierBadge tier={DEALER.tier} size="sm" />
            </div>
          </div>
        </div>
      </header>

      {/* ── Fixed Sidebar ─────────────────────────────────────────────────────── */}
      {hasSidebar && (
        <aside
          style={{
            position: "fixed",
            top: 64,
            left: 0,
            width: 240,
            height: "calc(100vh - 64px)",
            background: "#2D1B69",
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          {/* Nav items */}
          <nav style={{ padding: "20px 12px", flex: 1 }}>
            {NAV_ITEMS.map(item => {
              const isActive = item.id === activeId;
              return (
                <Link
                  key={item.id}
                  to={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "11px 14px",
                    borderRadius: 10,
                    marginBottom: 4,
                    background: isActive ? "rgba(255,255,255,0.12)" : "transparent",
                    color: isActive ? "#fff" : "rgba(255,255,255,0.55)",
                    textDecoration: "none",
                    transition: "all 0.18s",
                    borderLeft: isActive ? "3px solid #F5A623" : "3px solid transparent",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: isActive ? 600 : 400,
                    fontSize: 14,
                  }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.07)"; }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
                >
                  <span style={{ opacity: isActive ? 1 : 0.7 }}>{item.icon}</span>
                  {item.label}
                  {isActive && <ChevronRight size={14} style={{ marginLeft: "auto" }} />}
                </Link>
              );
            })}
          </nav>

          {/* Dealer info card at bottom */}
          <div
            style={{
              margin: 12,
              padding: "14px 16px",
              background: "rgba(255,255,255,0.08)",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #F5A623, #E09020)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 12, flexShrink: 0 }}>
                {DEALER.initials}
              </div>
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 12, color: "#fff", lineHeight: 1.2 }}>
                  {DEALER.name}
                </div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.45)", lineHeight: 1 }}>
                  {DEALER.id}
                </div>
              </div>
            </div>
            <TierBadge tier={DEALER.tier} size="sm" />
            <div style={{ marginTop: 10, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Points Balance</span>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: "#F5A623" }}>
                ⭐ {DEALER.loyaltyPoints.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </aside>
      )}

      {/* ── Main Content ──────────────────────────────────────────────────────── */}
      <main
        style={{
          paddingTop: 64,
          marginLeft: hasSidebar ? 240 : 0,
          minHeight: "100vh",
        }}
      >
        {/* Breadcrumb */}
        {breadcrumb && breadcrumb.length > 0 && (
          <div
            style={{
              padding: "12px 40px",
              background: "#fff",
              borderBottom: "1px solid #EEE9FF",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {breadcrumb.map((crumb, idx) => (
              <span key={idx} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {idx > 0 && <ChevronRight size={12} color="#9B92B8" />}
                {crumb.href ? (
                  <Link
                    to={crumb.href}
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#9B92B8", textDecoration: "none" }}
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#2D1B69", fontWeight: 600 }}>
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </div>
        )}

        {/* Page content */}
        <div style={{ padding: "32px 40px" }}>
          {children}
        </div>
      </main>
    </div>
  );
}
import { useState } from "react";
import type { ReactNode } from "react";
import { SharedLayout } from "../components/ecommerce/SharedLayout";
import { useNavigate } from "react-router";
import {
  Search, Download, Eye, RotateCcw, ChevronDown,
  Package, Truck, CheckCircle2, Clock, XCircle, ChevronRight,
} from "lucide-react";

type OrderStatus = "delivered" | "in-transit" | "processing" | "cancelled" | "pending";

interface OrderItem {
  name: string;
  sku: string;
  qty: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
  deliveryDate?: string;
  address: string;
}

const ORDERS: Order[] = [
  {
    id: "ORD-20240312-8821",
    date: "12 Mar 2024",
    status: "delivered",
    total: 47850,
    deliveryDate: "16 Mar 2024",
    address: "Plot 14, MIDC, Andheri East, Mumbai",
    items: [
      { name: "Apex Ultima Exterior — Base 1", sku: "AUE-B1-20L", qty: 4, price: 8960 },
      { name: "Royale Luxury Interior — White", sku: "RLI-WH-10L", qty: 6, price: 7650 },
      { name: "SmartCare Damp Proof", sku: "SCD-10L", qty: 2, price: 3920 },
    ],
  },
  {
    id: "ORD-20240305-7743",
    date: "05 Mar 2024",
    status: "in-transit",
    total: 29400,
    deliveryDate: "14 Mar 2024",
    address: "Plot 14, MIDC, Andheri East, Mumbai",
    items: [
      { name: "Tractor Emulsion Shyne — Ivory", sku: "TES-IV-20L", qty: 8, price: 3675 },
    ],
  },
  {
    id: "ORD-20240228-6610",
    date: "28 Feb 2024",
    status: "processing",
    total: 18250,
    address: "Plot 14, MIDC, Andheri East, Mumbai",
    items: [
      { name: "Ace Exterior Emulsion — Pista", sku: "AEE-PI-20L", qty: 5, price: 3650 },
    ],
  },
  {
    id: "ORD-20240220-5501",
    date: "20 Feb 2024",
    status: "delivered",
    total: 63100,
    deliveryDate: "24 Feb 2024",
    address: "Warehouse B, Bhiwandi, Thane",
    items: [
      { name: "Royale Play Texture — Sand", sku: "RPT-SA-20L", qty: 3, price: 12200 },
      { name: "Apex Ultima Exterior — Base 2", sku: "AUE-B2-20L", qty: 5, price: 7540 },
    ],
  },
  {
    id: "ORD-20240210-4420",
    date: "10 Feb 2024",
    status: "cancelled",
    total: 14800,
    address: "Plot 14, MIDC, Andheri East, Mumbai",
    items: [
      { name: "Apcolite Advanced Gloss — Red", sku: "AAG-RE-4L", qty: 4, price: 3700 },
    ],
  },
  {
    id: "ORD-20240202-3398",
    date: "02 Feb 2024",
    status: "delivered",
    total: 52600,
    deliveryDate: "06 Feb 2024",
    address: "Shop 7, Dadar West, Mumbai",
    items: [
      { name: "Tractor Shyne Emulsion — Base 1", sku: "TSE-B1-20L", qty: 12, price: 4383 },
    ],
  },
  {
    id: "ORD-20240125-2250",
    date: "25 Jan 2024",
    status: "pending",
    total: 9800,
    address: "Plot 14, MIDC, Andheri East, Mumbai",
    items: [
      { name: "SmartCare Waterproof — 10L", sku: "SCW-10L", qty: 2, price: 4900 },
    ],
  },
];

const STATUS_CONFIG: Record<OrderStatus, { label: string; bg: string; color: string; icon: ReactNode }> = {
  delivered: { label: "Delivered", bg: "#ECFDF5", color: "#16A34A", icon: <CheckCircle2 size={13} /> },
  "in-transit": { label: "In Transit", bg: "#EFF6FF", color: "#2563EB", icon: <Truck size={13} /> },
  processing: { label: "Processing", bg: "#FFF7ED", color: "#EA580C", icon: <Package size={13} /> },
  pending: { label: "Pending", bg: "#FFFBEB", color: "#D97706", icon: <Clock size={13} /> },
  cancelled: { label: "Cancelled", bg: "#FEF2F2", color: "#DC2626", icon: <XCircle size={13} /> },
};

const FILTERS: { id: OrderStatus | "all"; label: string }[] = [
  { id: "all", label: "All Orders" },
  { id: "delivered", label: "Delivered" },
  { id: "in-transit", label: "In Transit" },
  { id: "processing", label: "Processing" },
  { id: "pending", label: "Pending" },
  { id: "cancelled", label: "Cancelled" },
];

function fmt(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

export function OrdersPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<OrderStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = ORDERS.filter(o => {
    const matchStatus = activeFilter === "all" || o.status === activeFilter;
    const matchSearch =
      search === "" ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.items.some(i => i.name.toLowerCase().includes(search.toLowerCase()));
    return matchStatus && matchSearch;
  });

  const totalValue = ORDERS.reduce((s, o) => s + o.total, 0);
  const deliveredCount = ORDERS.filter(o => o.status === "delivered").length;

  return (
    <SharedLayout>
      <div style={{ padding: "28px 32px", maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, color: "#1A0F3E", margin: 0 }}>My Orders</h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#9B92B8", margin: "4px 0 0" }}>
              Track and manage your purchase history
            </p>
          </div>
          <button
            onClick={() => navigate("/dealer/products")}
            style={{
              padding: "9px 18px",
              borderRadius: 10,
              background: "linear-gradient(135deg, #4C3494, #2D1B69)",
              border: "none",
              color: "#fff",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            + New Order
          </button>
        </div>

        {/* Summary cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
          {[
            { label: "Total Orders", value: ORDERS.length, sub: "All time", color: "#4C3494" },
            { label: "Delivered", value: deliveredCount, sub: "Successfully", color: "#16A34A" },
            { label: "In Progress", value: ORDERS.filter(o => ["processing", "in-transit", "pending"].includes(o.status)).length, sub: "Active", color: "#2563EB" },
            { label: "Total Spent", value: fmt(totalValue), sub: "FY 2023–24", color: "#F5A623" },
          ].map(card => (
            <div
              key={card.label}
              style={{
                background: "#fff",
                border: "1px solid #D8D0F0",
                borderRadius: 14,
                padding: "16px 20px",
                boxShadow: "0 2px 12px rgba(76,52,148,0.07)",
              }}
            >
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#9B92B8", marginBottom: 6 }}>{card.label}</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, color: card.color }}>{card.value}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#C4BAE0", marginTop: 2 }}>{card.sub}</div>
            </div>
          ))}
        </div>

        {/* Filters + Search */}
        <div style={{ background: "#fff", border: "1px solid #D8D0F0", borderRadius: 14, padding: "16px 20px", marginBottom: 16, boxShadow: "0 2px 12px rgba(76,52,148,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            {/* Search */}
            <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
              <Search size={14} color="#9B92B8" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by order ID or product..."
                style={{
                  width: "100%",
                  paddingLeft: 34,
                  paddingRight: 12,
                  height: 36,
                  border: "1.5px solid #D8D0F0",
                  borderRadius: 8,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  color: "#1A0F3E",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Status pills */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {FILTERS.map(f => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id as OrderStatus | "all")}
                  style={{
                    padding: "5px 12px",
                    borderRadius: 20,
                    border: "1.5px solid",
                    borderColor: activeFilter === f.id ? "#4C3494" : "#D8D0F0",
                    background: activeFilter === f.id ? "#EEE9FF" : "#fff",
                    color: activeFilter === f.id ? "#4C3494" : "#9B92B8",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: activeFilter === f.id ? 600 : 400,
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Export */}
            <button style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", border: "1.5px solid #D8D0F0", borderRadius: 8, background: "#fff", color: "#9B92B8", fontFamily: "'DM Sans', sans-serif", fontSize: 12, cursor: "pointer" }}>
              <Download size={13} /> Export
            </button>
          </div>
        </div>

        {/* Orders list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#9B92B8", fontFamily: "'DM Sans', sans-serif" }}>
              No orders found.
            </div>
          )}

          {filtered.map(order => {
            const sc = STATUS_CONFIG[order.status];
            const isExp = expanded === order.id;

            return (
              <div
                key={order.id}
                style={{
                  background: "#fff",
                  border: "1px solid #D8D0F0",
                  borderRadius: 14,
                  boxShadow: "0 2px 12px rgba(76,52,148,0.07)",
                  overflow: "hidden",
                  transition: "box-shadow 0.2s",
                }}
              >
                {/* Order row */}
                <div
                  style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 16, cursor: "pointer" }}
                  onClick={() => setExpanded(isExp ? null : order.id)}
                >
                  {/* Order ID + date */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#2D1B69", marginBottom: 2 }}>{order.id}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#9B92B8" }}>
                      Placed: {order.date} · {order.items.length} item{order.items.length > 1 ? "s" : ""}
                    </div>
                  </div>

                  {/* Address */}
                  <div style={{ flex: 2, fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#5A5280", minWidth: 0 }}>
                    <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{order.address}</div>
                    {order.deliveryDate && (
                      <div style={{ color: "#16A34A", marginTop: 2, fontSize: 11 }}>
                        ✓ Delivered {order.deliveryDate}
                      </div>
                    )}
                  </div>

                  {/* Status */}
                  <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 20, background: sc.bg }}>
                    <span style={{ color: sc.color }}>{sc.icon}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: sc.color }}>{sc.label}</span>
                  </div>

                  {/* Amount */}
                  <div style={{ fontFamily: "'DM Mono', monospace", fontWeight: 600, fontSize: 14, color: "#1A0F3E", textAlign: "right", minWidth: 90 }}>
                    {fmt(order.total)}
                  </div>

                  {/* Expand */}
                  <ChevronDown
                    size={16}
                    color="#9B92B8"
                    style={{ transition: "transform 0.2s", transform: isExp ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}
                  />
                </div>

                {/* Expanded detail */}
                {isExp && (
                  <div style={{ borderTop: "1px solid #F0EDF8", padding: "16px 20px", background: "#FAFAFE" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr>
                          {["Product", "SKU", "Qty", "Unit Price", "Total"].map(h => (
                            <th key={h} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#9B92B8", fontWeight: 600, textAlign: h === "Product" ? "left" : "right", paddingBottom: 8, borderBottom: "1px solid #EEE9FF" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map(item => (
                          <tr key={item.sku}>
                            <td style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#1A0F3E", padding: "10px 0 0" }}>{item.name}</td>
                            <td style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#9B92B8", textAlign: "right", padding: "10px 0 0" }}>{item.sku}</td>
                            <td style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#5A5280", textAlign: "right", padding: "10px 0 0" }}>{item.qty}</td>
                            <td style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#5A5280", textAlign: "right", padding: "10px 0 0" }}>{fmt(item.price)}</td>
                            <td style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#1A0F3E", fontWeight: 600, textAlign: "right", padding: "10px 0 0" }}>{fmt(item.price * item.qty)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan={4} style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: "#1A0F3E", textAlign: "right", paddingTop: 12, borderTop: "1.5px solid #EEE9FF" }}>Order Total</td>
                          <td style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: 14, color: "#4C3494", textAlign: "right", paddingTop: 12, borderTop: "1.5px solid #EEE9FF" }}>{fmt(order.total)}</td>
                        </tr>
                      </tfoot>
                    </table>

                    {/* Actions */}
                    <div style={{ display: "flex", gap: 10, marginTop: 16, justifyContent: "flex-end" }}>
                      {order.status === "cancelled" || order.status === "delivered" ? (
                        <button
                          onClick={() => navigate("/dealer/products")}
                          style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 14px", borderRadius: 8, border: "1.5px solid #4C3494", background: "transparent", color: "#4C3494", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 12, cursor: "pointer" }}
                        >
                          <RotateCcw size={13} /> Reorder
                        </button>
                      ) : (
                        <button style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 14px", borderRadius: 8, border: "1.5px solid #D8D0F0", background: "transparent", color: "#9B92B8", fontFamily: "'DM Sans', sans-serif", fontSize: 12, cursor: "pointer" }}>
                          <Eye size={13} /> Track Order
                        </button>
                      )}
                      <button style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 14px", borderRadius: 8, border: "1.5px solid #D8D0F0", background: "transparent", color: "#9B92B8", fontFamily: "'DM Sans', sans-serif", fontSize: 12, cursor: "pointer" }}>
                        <Download size={13} /> Invoice
                      </button>
                    </div>
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
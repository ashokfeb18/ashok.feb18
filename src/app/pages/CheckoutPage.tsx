import { useState } from "react";
import { useNavigate } from "react-router";
import { Check, ChevronDown, Lock, MapPin, Edit2 } from "lucide-react";
import { SharedLayout } from "../components/ecommerce/SharedLayout";
import { CheckoutStepper } from "../components/ecommerce/CheckoutStepper";
import { OrderSummaryCard } from "../components/ecommerce/OrderSummaryCard";
import { useCart } from "../components/ecommerce/CartContext";

const DELIVERY_DATES = [
  { day: "Mon", date: "Mar 4", full: "Mar 4" },
  { day: "Tue", date: "Mar 5", full: "Mar 5" },
  { day: "Wed", date: "Mar 6", full: "Mar 6" },
  { day: "Thu", date: "Mar 7", full: "Mar 7" },
  { day: "Fri", date: "Mar 8", full: "Mar 8" },
];

const ADDRESSES = [
  {
    id: "addr1",
    name: "Shree Ganesh Paints (Primary)",
    line1: "42, Laxmi Industrial Estate, Near Viman Nagar",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411014",
  },
  {
    id: "addr2",
    name: "Shree Ganesh Paints (Warehouse)",
    line1: "Plot 7, MIDC Phase II, Bhosari",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411026",
  },
];

function FormLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 11, color: "#5A5280", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 8 }}>
      {children}
    </div>
  );
}

function SelectField({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { id: string; label: string }[] }) {
  return (
    <div style={{ position: "relative" }}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: "100%",
          height: 44,
          borderRadius: 10,
          border: "1.5px solid #D8D0F0",
          padding: "0 36px 0 14px",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          color: "#2D1B69",
          background: "#fff",
          outline: "none",
          appearance: "none",
          cursor: "pointer",
        }}
      >
        {options.map(opt => (
          <option key={opt.id} value={opt.id}>{opt.label}</option>
        ))}
      </select>
      <ChevronDown size={16} color="#9B92B8" style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
    </div>
  );
}

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, clearCart } = useCart();

  const [step1Collapsed, setStep1Collapsed] = useState(false);
  const [selectedAddr, setSelectedAddr] = useState(ADDRESSES[0].id);
  const [billingAddr, setBillingAddr] = useState(ADDRESSES[0].id);
  const [sameBilling, setSameBilling] = useState(true);
  const [selectedDate, setSelectedDate] = useState(DELIVERY_DATES[0].full);
  const [instructions, setInstructions] = useState("");
  const [placing, setPlacing] = useState(false);

  const addressOptions = ADDRESSES.map(a => ({ id: a.id, label: `${a.name} — ${a.pincode}` }));

  function handlePlaceOrder() {
    setPlacing(true);
    setTimeout(() => {
      clearCart();
      navigate("/dealer/order-confirmation");
    }, 2000);
  }

  if (items.length === 0) {
    return (
      <SharedLayout breadcrumb={[{ label: "Home", href: "/dealer" }, { label: "Checkout" }]}>
        <div style={{ textAlign: "center", padding: 80 }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 24, color: "#1A0F3E" }}>Your cart is empty</h2>
          <button onClick={() => navigate("/dealer/products")} style={{ marginTop: 16, padding: "10px 24px", borderRadius: 10, border: "none", background: "#4C3494", color: "#fff", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>
            Browse Products
          </button>
        </div>
      </SharedLayout>
    );
  }

  const selectedAddress = ADDRESSES.find(a => a.id === selectedAddr)!;

  return (
    <SharedLayout
      breadcrumb={[{ label: "Home", href: "/dealer" }, { label: "Cart", href: "/dealer/cart" }, { label: "Checkout" }]}
    >
      {/* Checkout stepper */}
      <CheckoutStepper currentStep={step1Collapsed ? 2 : 1} />

      <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
        {/* ── Left Column (60%) ── */}
        <div style={{ flex: "0 0 60%", maxWidth: "60%", display: "flex", flexDirection: "column", gap: 16 }}>
          {/* ── Step 1: Delivery Address ── */}
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              border: step1Collapsed ? "1px solid #D8D0F0" : "2px solid #4C3494",
              boxShadow: "0 2px 12px rgba(76,52,148,0.07)",
              overflow: "hidden",
            }}
          >
            {/* Step 1 Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: step1Collapsed ? "none" : "1px solid #EEE9FF" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: step1Collapsed ? "#38A169" : "#4C3494", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {step1Collapsed ? <Check size={16} color="#fff" /> : <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: "#fff" }}>1</span>}
                </div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: "#1A0F3E", margin: 0 }}>
                  Delivery Address
                </h3>
              </div>
              {step1Collapsed && (
                <button
                  onClick={() => setStep1Collapsed(false)}
                  style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "1.5px solid #4C3494", borderRadius: 8, padding: "6px 14px", cursor: "pointer", color: "#4C3494", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13 }}
                >
                  <Edit2 size={13} /> Edit
                </button>
              )}
            </div>

            {/* Collapsed preview */}
            {step1Collapsed ? (
              <div style={{ padding: "14px 24px 20px", display: "flex", alignItems: "flex-start", gap: 12 }}>
                <MapPin size={16} color="#38A169" style={{ marginTop: 2, flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "#2D1B69", marginBottom: 2 }}>{selectedAddress.name}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#9B92B8", lineHeight: 1.5 }}>
                    {selectedAddress.line1}, {selectedAddress.city}, {selectedAddress.state} – {selectedAddress.pincode}
                  </div>
                </div>
                <Check size={16} color="#38A169" style={{ marginLeft: "auto", flexShrink: 0, marginTop: 2 }} />
              </div>
            ) : (
              <div style={{ padding: "24px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
                  <div>
                    <FormLabel>Shipping Address</FormLabel>
                    <SelectField value={selectedAddr} onChange={setSelectedAddr} options={addressOptions} />
                  </div>
                  <div>
                    <FormLabel>Billing Address</FormLabel>
                    <SelectField value={sameBilling ? selectedAddr : billingAddr} onChange={setBillingAddr} options={addressOptions} />
                  </div>
                </div>
                {/* Address preview */}
                <div style={{ background: "#F8F5FF", borderRadius: 10, padding: "14px 16px", marginBottom: 20, borderLeft: "3px solid #4C3494" }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, color: "#2D1B69", marginBottom: 4 }}>{selectedAddress.name}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#9B92B8", lineHeight: 1.6 }}>
                    {selectedAddress.line1}<br />
                    {selectedAddress.city}, {selectedAddress.state} – {selectedAddress.pincode}
                  </div>
                </div>
                <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", marginBottom: 24 }}>
                  <div
                    onClick={() => setSameBilling(v => !v)}
                    style={{ width: 18, height: 18, borderRadius: 5, border: sameBilling ? "none" : "1.5px solid #C8BEE8", background: sameBilling ? "#4C3494" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s", flexShrink: 0 }}
                  >
                    {sameBilling && (
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#5A5280" }}>
                    Shipping address same as billing address
                  </span>
                </label>
                <button
                  onClick={() => setStep1Collapsed(true)}
                  style={{ padding: "12px 28px", borderRadius: 10, border: "none", background: "linear-gradient(135deg, #3D2680, #4C3494)", color: "#fff", fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer" }}
                >
                  Continue →
                </button>
              </div>
            )}
          </div>

          {/* ── Step 2: Review Order ── */}
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              border: step1Collapsed ? "2px solid #4C3494" : "1px solid #D8D0F0",
              boxShadow: "0 2px 12px rgba(76,52,148,0.07)",
              overflow: "hidden",
              opacity: step1Collapsed ? 1 : 0.5,
              pointerEvents: step1Collapsed ? "all" : "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "20px 24px", borderBottom: "1px solid #EEE9FF" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: step1Collapsed ? "#4C3494" : "#D8D0F0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: "#fff" }}>2</span>
              </div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: "#1A0F3E", margin: 0 }}>Review Your Order</h3>
            </div>

            <div style={{ padding: "24px" }}>
              {/* Order items read-only */}
              <div style={{ marginBottom: 24 }}>
                {items.map((item, idx) => {
                  const ps = item.product.packSizes.find(p => p.size === item.packSize);
                  const lineTotal = ps ? ps.dealerPrice * item.quantity : 0;
                  return (
                    <div
                      key={`${item.productId}-${item.packSize}`}
                      style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: idx < items.length - 1 ? "1px solid #EEE9FF" : "none" }}
                    >
                      <div style={{ width: 48, height: 48, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
                        <img src={item.product.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "#2D1B69", marginBottom: 3 }}>{item.product.name}</div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#9B92B8" }}>
                          {item.packSize} · Qty {item.quantity}
                          {item.shade && ` · ${item.shade}`}
                        </div>
                      </div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontWeight: 600, fontSize: 15, color: "#2D1B69" }}>
                        ₹{lineTotal.toLocaleString("en-IN")}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Delivery date selector */}
              <div style={{ marginBottom: 24 }}>
                <FormLabel>Preferred Delivery Date</FormLabel>
                <div style={{ display: "flex", gap: 10 }}>
                  {DELIVERY_DATES.map(d => {
                    const sel = selectedDate === d.full;
                    return (
                      <button
                        key={d.full}
                        onClick={() => setSelectedDate(d.full)}
                        style={{
                          flex: 1,
                          padding: "12px 8px",
                          borderRadius: 10,
                          border: `1.5px solid ${sel ? "#4C3494" : "#D8D0F0"}`,
                          background: sel ? "#EEE9FF" : "#fff",
                          cursor: "pointer",
                          textAlign: "center",
                          transition: "all 0.15s",
                        }}
                      >
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: sel ? "#4C3494" : "#9B92B8", marginBottom: 4 }}>{d.day}</div>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: sel ? "#2D1B69" : "#5A5280" }}>{d.date}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Special instructions */}
              <div style={{ marginBottom: 28 }}>
                <FormLabel>Special Instructions (optional)</FormLabel>
                <textarea
                  value={instructions}
                  onChange={e => setInstructions(e.target.value)}
                  rows={3}
                  placeholder="Any special delivery instructions for this order..."
                  style={{
                    width: "100%",
                    borderRadius: 10,
                    border: "1.5px solid #D8D0F0",
                    padding: "12px 14px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    color: "#2D1B69",
                    outline: "none",
                    resize: "vertical",
                    boxSizing: "border-box",
                    lineHeight: 1.5,
                  }}
                />
              </div>

              {/* Place Order button */}
              <button
                onClick={handlePlaceOrder}
                disabled={placing}
                style={{
                  width: "100%",
                  height: 56,
                  borderRadius: 14,
                  border: "none",
                  background: placing ? "#38A169" : "linear-gradient(135deg, #2D1B69 0%, #4C3494 100%)",
                  color: "#fff",
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: placing ? "default" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  boxShadow: "0 6px 24px rgba(76,52,148,0.3)",
                  transition: "all 0.3s",
                  letterSpacing: "0.3px",
                }}
              >
                {placing ? (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "spin 0.8s linear infinite" }}>
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                    Placing Order...
                  </>
                ) : (
                  <>
                    <Lock size={18} />
                    Place Order →
                  </>
                )}
              </button>
              <p style={{ textAlign: "center", fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#9B92B8", margin: "12px 0 0" }}>
                By placing this order you agree to our Terms and Conditions
              </p>
            </div>
          </div>

          {/* Step 3 – locked */}
          <div
            style={{
              background: "#F8F5FF",
              borderRadius: 16,
              border: "1px solid #D8D0F0",
              padding: "20px 24px",
              opacity: 0.4,
              pointerEvents: "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#D8D0F0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: "#9B92B8" }}>3</span>
              </div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: "#9B92B8", margin: 0 }}>Confirm</h3>
              <Lock size={14} color="#9B92B8" style={{ marginLeft: 8 }} />
            </div>
          </div>
        </div>

        {/* ── Right Column (40%) ── */}
        <div style={{ flex: "0 0 40%", maxWidth: "40%", position: "sticky", top: 88 }}>
          <OrderSummaryCard
            items={items}
            ctaLabel="Place Order →"
            onCta={handlePlaceOrder}
            compact
          />
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </SharedLayout>
  );
}

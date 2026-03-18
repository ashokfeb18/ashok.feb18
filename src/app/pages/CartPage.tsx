import { useState } from "react";
import { Trash2, Bookmark, ShoppingBag, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router";
import { SharedLayout } from "../components/ecommerce/SharedLayout";
import { QuantityStepper } from "../components/ecommerce/QuantityStepper";
import { SchemeStrip } from "../components/ecommerce/SchemeStrip";
import { OrderSummaryCard } from "../components/ecommerce/OrderSummaryCard";
import { ProductCard } from "../components/ecommerce/ProductCard";
import { useCart } from "../components/ecommerce/CartContext";
import { PRODUCTS } from "../components/ecommerce/mockData";

function CartItemCard({ item }: { item: ReturnType<typeof useCart>["items"][number] }) {
  const { updateQuantity, removeItem, saveForLater } = useCart();
  const [hoveredDelete, setHoveredDelete] = useState(false);

  const ps = item.product.packSizes.find(p => p.size === item.packSize);
  const lineTotal = ps ? ps.dealerPrice * item.quantity : 0;
  const lineMrp = ps ? ps.mrp * item.quantity : 0;
  const savings = lineMrp - lineTotal;

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        border: "1px solid #D8D0F0",
        boxShadow: "0 2px 12px rgba(76,52,148,0.07)",
        padding: 20,
        marginBottom: 12,
      }}
    >
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
        {/* Thumbnail */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 8,
            background: "#F8F8F8",
            overflow: "hidden",
            flexShrink: 0,
            cursor: "pointer",
          }}
          onClick={() => window.location.pathname = `/dealer/products/${item.productId}`}
        >
          <img src={item.product.image} alt={item.product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        {/* Details */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 15, color: "#1A0F3E", marginBottom: 4, lineHeight: 1.3 }}>
            {item.product.name}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
            {item.shade && (
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#9B92B8" }}>
                Shade: {item.shade}
              </span>
            )}
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#9B92B8" }}>{item.product.code}</span>
            <span style={{ background: "#EEE9FF", color: "#4C3494", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 11, padding: "2px 8px", borderRadius: 6, border: "1px solid #C8BEE8" }}>
              {item.packSize}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <QuantityStepper
              value={item.quantity}
              onChange={val => updateQuantity(item.productId, item.packSize, val)}
              size="sm"
            />
          </div>
        </div>

        {/* Price + Actions */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: "#2D1B69" }}>
            ₹{lineTotal.toLocaleString("en-IN")}
          </div>
          {savings > 0 && (
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#38A169", fontWeight: 500 }}>
              Save ₹{savings.toLocaleString("en-IN")}
            </div>
          )}
          <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
            <button
              onClick={() => saveForLater(item.productId, item.packSize)}
              style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#9B92B8", padding: "4px 8px", borderRadius: 6 }}
            >
              <Bookmark size={13} /> Save
            </button>
            <button
              onMouseEnter={() => setHoveredDelete(true)}
              onMouseLeave={() => setHoveredDelete(false)}
              onClick={() => removeItem(item.productId, item.packSize)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                background: hoveredDelete ? "#FFF5F5" : "none",
                border: "none",
                cursor: "pointer",
                color: hoveredDelete ? "#E53E3E" : "#9B92B8",
                padding: "4px 8px",
                borderRadius: 6,
                transition: "all 0.15s",
              }}
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Scheme strip */}
      {item.product.hasScheme && item.product.scheme && (
        <div style={{ marginTop: 12 }}>
          <SchemeStrip
            schemeName={item.product.scheme.name}
            description={`Add ${item.product.scheme.requiredQty - item.product.scheme.currentQty} more to unlock`}
            endsDate={item.product.scheme.endsDate}
            progress={item.product.scheme.progress}
            compact
          />
        </div>
      )}
    </div>
  );
}

export function CartPage() {
  const navigate = useNavigate();
  const { items, savedItems, moveToCart, cartCount } = useCart();
  const [savedOpen, setSavedOpen] = useState(false);

  const recentlyViewed = PRODUCTS.filter(p => !items.find(i => i.productId === p.id)).slice(0, 5);

  if (items.length === 0) {
    return (
      <SharedLayout
        breadcrumb={[{ label: "Home", href: "/dealer" }, { label: "My Cart" }]}
      >
        <div style={{ textAlign: "center", padding: "80px 40px" }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>🛒</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 26, color: "#1A0F3E", margin: "0 0 10px" }}>Your cart is empty</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#9B92B8", margin: "0 0 28px" }}>
            Add products to get started with your order
          </p>
          <button
            onClick={() => navigate("/dealer/products")}
            style={{ padding: "12px 32px", borderRadius: 12, border: "none", background: "linear-gradient(135deg, #3D2680, #4C3494)", color: "#fff", fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 16, cursor: "pointer" }}
          >
            Browse Products
          </button>
        </div>
      </SharedLayout>
    );
  }

  return (
    <SharedLayout
      breadcrumb={[{ label: "Home", href: "/dealer" }, { label: "My Cart" }]}
    >
      {/* Page title */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 28, color: "#1A0F3E", margin: 0 }}>
          My Cart
        </h1>
        <span style={{ background: "#EEE9FF", color: "#4C3494", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, padding: "4px 14px", borderRadius: 20, border: "1px solid #C8BEE8" }}>
          {cartCount} items
        </span>
      </div>

      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        {/* ── Left Column (62%) ── */}
        <div style={{ flex: "0 0 62%", maxWidth: "62%" }}>
          {/* Cart items */}
          {items.map(item => (
            <CartItemCard key={`${item.productId}-${item.packSize}`} item={item} />
          ))}

          {/* Save for Later */}
          {savedItems.length > 0 && (
            <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #D8D0F0", padding: "0 20px", marginBottom: 16 }}>
              <button
                onClick={() => setSavedOpen(v => !v)}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", background: "none", border: "none", cursor: "pointer", padding: "16px 0" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Bookmark size={16} color="#4C3494" />
                  <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "#1A0F3E" }}>
                    Saved for Later ({savedItems.length})
                  </span>
                </div>
                <ChevronDown size={16} color="#9B92B8" style={{ transform: savedOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
              </button>
              {savedOpen && (
                <div style={{ paddingBottom: 16 }}>
                  {savedItems.map(item => {
                    const ps = item.product.packSizes.find(p => p.size === item.packSize);
                    return (
                      <div key={`${item.productId}-${item.packSize}`} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderTop: "1px solid #EEE9FF" }}>
                        <div style={{ width: 48, height: 48, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
                          <img src={item.product.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, color: "#2D1B69" }}>{item.product.name}</div>
                          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#9B92B8" }}>{item.packSize} · ₹{ps?.dealerPrice.toLocaleString("en-IN")}</div>
                        </div>
                        <button
                          onClick={() => moveToCart(item.productId, item.packSize)}
                          style={{ padding: "6px 14px", borderRadius: 8, border: "1.5px solid #4C3494", background: "#EEE9FF", color: "#4C3494", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 12, cursor: "pointer" }}
                        >
                          Move to Cart
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Recently Viewed */}
          {recentlyViewed.length > 0 && (
            <div style={{ marginTop: 32 }}>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: "#1A0F3E", margin: "0 0 16px", display: "flex", alignItems: "center", gap: 8 }}>
                <ShoppingBag size={18} color="#4C3494" /> Recently Viewed
              </h3>
              <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 12 }}>
                {recentlyViewed.map(p => (
                  <ProductCard key={p.id} product={p} variant="compact" />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Right Column (38%) ── */}
        <div style={{ flex: "0 0 38%", maxWidth: "38%", position: "sticky", top: 88 }}>
          <OrderSummaryCard
            items={items}
            ctaLabel="Proceed to Checkout →"
            onCta={() => navigate("/dealer/checkout")}
            showContinueShopping
          />
        </div>
      </div>
    </SharedLayout>
  );
}

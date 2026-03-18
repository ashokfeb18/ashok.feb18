import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Heart, Star, Copy, ChevronRight, ChevronDown, FileText, Download, Check } from "lucide-react";
import { SharedLayout } from "../components/ecommerce/SharedLayout";
import { QuantityStepper } from "../components/ecommerce/QuantityStepper";
import { PackSizeSelector } from "../components/ecommerce/PackSizeSelector";
import { PriceBlock } from "../components/ecommerce/PriceBlock";
import { SchemeStrip } from "../components/ecommerce/SchemeStrip";
import { ProductCard } from "../components/ecommerce/ProductCard";
import { useCart } from "../components/ecommerce/CartContext";
import { PRODUCTS } from "../components/ecommerce/mockData";

function StarRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ display: "flex", gap: 3 }}>
        {[1, 2, 3, 4, 5].map(i => (
          <Star key={i} size={16} fill={i <= Math.round(rating) ? "#F5A623" : "none"} color={i <= Math.round(rating) ? "#F5A623" : "#D8D0F0"} />
        ))}
      </div>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "#2D1B69" }}>{rating}</span>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#9B92B8" }}>({reviewCount.toLocaleString("en-IN")} reviews)</span>
    </div>
  );
}

function AccordionSection({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderTop: "1px solid #EEE9FF" }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0", background: "none", border: "none", cursor: "pointer" }}
      >
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "#1A0F3E" }}>{title}</span>
        <ChevronDown size={18} color="#9B92B8" style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
      </button>
      {open && <div style={{ paddingBottom: 20 }}>{children}</div>}
    </div>
  );
}

export function PDPPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = PRODUCTS.find(p => p.id === id);

  const [selectedPackSize, setSelectedPackSize] = useState(product?.defaultPackSize || "");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedShade, setSelectedShade] = useState<string | null>(product?.shades[0]?.name || null);
  const [shadeSearch, setShadeSearch] = useState("");
  const [wishlisted, setWishlisted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [hoveredShade, setHoveredShade] = useState<string | null>(null);

  if (!product) {
    return (
      <SharedLayout breadcrumb={[{ label: "Home", href: "/dealer" }, { label: "Products", href: "/dealer/products" }, { label: "Not Found" }]}>
        <div style={{ textAlign: "center", padding: 80 }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 24, color: "#1A0F3E" }}>Product not found</h2>
          <button onClick={() => navigate("/dealer/products")} style={{ marginTop: 16, padding: "10px 24px", borderRadius: 10, border: "none", background: "#4C3494", color: "#fff", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>
            Browse Products
          </button>
        </div>
      </SharedLayout>
    );
  }

  const currentPack = product.packSizes.find(p => p.size === selectedPackSize) || product.packSizes[0];
  const filteredShades = product.shades.filter(s => s.name.toLowerCase().includes(shadeSearch.toLowerCase()));
  const similarProducts = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

  function handleCopyCode() {
    navigator.clipboard.writeText(product.code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function handleAddToCart() {
    addToCart(product, quantity, currentPack.size, selectedShade || undefined);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1800);
  }

  return (
    <SharedLayout
      breadcrumb={[
        { label: "Home", href: "/dealer" },
        { label: "Products", href: "/dealer/products" },
        { label: product.name },
      ]}
    >
      <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>
        {/* ── LEFT COLUMN (52%) ────────────────────────────────────────── */}
        <div style={{ flex: "0 0 52%", maxWidth: "52%" }}>
          {/* Main image */}
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              border: "1px solid #D8D0F0",
              boxShadow: "0 2px 12px rgba(76,52,148,0.07)",
              height: 480,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              marginBottom: 16,
              position: "relative",
            }}
          >
            <img
              src={product.images[activeImage]}
              alt={product.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.12))" }}
            />
            {product.hasScheme && (
              <div style={{ position: "absolute", top: 16, left: 16, background: "#F5A623", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 11, padding: "4px 12px", borderRadius: 8 }}>
                🔥 SCHEME ACTIVE
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
            {product.images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImage(idx)}
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 8,
                  overflow: "hidden",
                  border: `2px solid ${activeImage === idx ? "#4C3494" : "#D8D0F0"}`,
                  cursor: "pointer",
                  transition: "border-color 0.15s",
                  flexShrink: 0,
                }}
              >
                <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>

          {/* Shade explorer */}
          {product.shades.length > 2 && (
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                border: "1px solid #D8D0F0",
                boxShadow: "0 2px 12px rgba(76,52,148,0.07)",
                padding: 20,
              }}
            >
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 14, color: "#1A0F3E", margin: "0 0 12px" }}>
                Explore Shades
              </h3>
              <input
                value={shadeSearch}
                onChange={e => setShadeSearch(e.target.value)}
                placeholder="Search shades..."
                style={{
                  width: "100%",
                  height: 36,
                  borderRadius: 8,
                  border: "1.5px solid #D8D0F0",
                  padding: "0 12px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  outline: "none",
                  marginBottom: 14,
                  boxSizing: "border-box",
                  color: "#2D1B69",
                }}
              />
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {filteredShades.map(shade => {
                  const isSelected = selectedShade === shade.name;
                  return (
                    <div
                      key={shade.name}
                      onClick={() => setSelectedShade(shade.name)}
                      onMouseEnter={() => setHoveredShade(shade.name)}
                      onMouseLeave={() => setHoveredShade(null)}
                      title={shade.name}
                      style={{
                        position: "relative",
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: shade.hex,
                        border: isSelected ? "2px solid #4C3494" : "1.5px solid rgba(0,0,0,0.1)",
                        cursor: "pointer",
                        boxShadow: isSelected ? "0 0 0 3px rgba(76,52,148,0.2)" : "none",
                        transition: "all 0.15s",
                        transform: isSelected ? "scale(1.15)" : "scale(1)",
                      }}
                    >
                      {isSelected && (
                        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Check size={12} color={shade.hex > "#888888" ? "#000" : "#fff"} />
                        </div>
                      )}
                      {hoveredShade === shade.name && (
                        <div style={{
                          position: "absolute",
                          bottom: "calc(100% + 6px)",
                          left: "50%",
                          transform: "translateX(-50%)",
                          background: "#1A0F3E",
                          color: "#fff",
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 10,
                          padding: "4px 8px",
                          borderRadius: 6,
                          whiteSpace: "nowrap",
                          zIndex: 10,
                          pointerEvents: "none",
                        }}>
                          {shade.name}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              {selectedShade && (
                <div style={{ marginTop: 12, fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#4C3494", fontWeight: 500 }}>
                  Selected: {selectedShade}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── RIGHT COLUMN (48%) ──────────────────────────────────────── */}
        <div style={{ flex: "0 0 48%", maxWidth: "48%", display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Category chip */}
          <div>
            <span style={{ background: "#EEE9FF", color: "#4C3494", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 12, padding: "4px 12px", borderRadius: 20, border: "1px solid #C8BEE8" }}>
              {product.category}
            </span>
          </div>

          {/* Product name */}
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 32, color: "#1A0F3E", margin: 0, lineHeight: 1.2 }}>
            {product.name}
          </h1>

          {/* Description */}
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#5A5280", margin: 0, lineHeight: 1.65 }}>
            {product.description}
          </p>

          {/* Product code */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#9B92B8" }}>Code:</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#2D1B69", fontWeight: 500 }}>
              {product.code}
            </span>
            <button
              onClick={handleCopyCode}
              style={{ background: "none", border: "none", cursor: "pointer", color: copied ? "#38A169" : "#9B92B8", display: "flex", alignItems: "center", gap: 4, padding: 4 }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>

          {/* Rating */}
          <StarRating rating={product.rating} reviewCount={product.reviewCount} />

          {/* Divider */}
          <div style={{ height: 1, background: "#EEE9FF" }} />

          {/* Pricing block */}
          <PriceBlock mrp={currentPack.mrp} dealerPrice={currentPack.dealerPrice} gstIncluded />

          {/* Divider */}
          <div style={{ height: 1, background: "#EEE9FF" }} />

          {/* Pack Size */}
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 11, color: "#5A5280", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 10 }}>
              Pack Size
            </div>
            <PackSizeSelector
              sizes={product.packSizes}
              selected={selectedPackSize}
              onChange={setSelectedPackSize}
            />
          </div>

          {/* Quantity */}
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 11, color: "#5A5280", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 10 }}>
              Quantity
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <QuantityStepper value={quantity} onChange={setQuantity} size="md" />
              <div style={{ background: "#F8F5FF", border: "1px solid #D8D0F0", borderRadius: 8, padding: "8px 14px" }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#5A5280" }}>
                  {quantity} Pack · {(currentPack.litres * quantity).toFixed(0)}L total
                </span>
              </div>
            </div>
          </div>

          {/* Scheme banner */}
          {product.hasScheme && product.scheme && (
            <SchemeStrip
              schemeName={product.scheme.name}
              description={product.scheme.description}
              endsDate={product.scheme.endsDate}
              progress={product.scheme.progress}
              ctaLabel="View Scheme"
            />
          )}

          {/* Add to Cart + Wishlist */}
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              style={{
                flex: 1,
                height: 48,
                borderRadius: 12,
                border: "none",
                background: !product.inStock ? "#F5F3FF" : addedToCart ? "#38A169" : "linear-gradient(135deg, #3D2680 0%, #4C3494 100%)",
                color: !product.inStock ? "#9B92B8" : "#fff",
                cursor: !product.inStock ? "not-allowed" : "pointer",
                fontFamily: "'Syne', sans-serif",
                fontWeight: 600,
                fontSize: 15,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transition: "all 0.2s",
                boxShadow: product.inStock && !addedToCart ? "0 4px 16px rgba(76,52,148,0.25)" : "none",
              }}
            >
              🛒 {!product.inStock ? "Out of Stock" : addedToCart ? "Added to Cart ✓" : "Add to Cart"}
            </button>
            <button
              onClick={() => setWishlisted(v => !v)}
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                border: `1.5px solid ${wishlisted ? "#E53E3E" : "#D8D0F0"}`,
                background: wishlisted ? "#FFF5F5" : "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.15s",
              }}
            >
              <Heart size={20} fill={wishlisted ? "#E53E3E" : "none"} color={wishlisted ? "#E53E3E" : "#9B92B8"} />
            </button>
          </div>

          {/* Delivery + Stock info */}
          <div style={{ display: "flex", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 14 }}>🚚</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#9B92B8" }}>
                Estimated delivery: 2–3 business days
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: product.inStock ? "#38A169" : "#E53E3E", flexShrink: 0 }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: product.inStock ? "#38A169" : "#E53E3E", fontWeight: 500 }}>
                {product.inStock ? `In Stock · ${product.stockUnits} units available` : "Out of Stock"}
              </span>
            </div>
          </div>

          {/* Product Details Accordion */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #D8D0F0", boxShadow: "0 2px 12px rgba(76,52,148,0.07)", overflow: "hidden", padding: "0 20px" }}>
            <AccordionSection title="Product Details" defaultOpen>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {product.specs.map(spec => (
                  <div key={spec.label} style={{ background: "#F8F5FF", borderRadius: 8, padding: "10px 14px" }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#9B92B8", marginBottom: 3 }}>{spec.label}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, color: "#2D1B69" }}>{spec.value}</div>
                  </div>
                ))}
              </div>
            </AccordionSection>

            <AccordionSection title="Application Guide">
              <ol style={{ margin: 0, padding: "0 0 0 20px", display: "flex", flexDirection: "column", gap: 10 }}>
                {product.applicationSteps.map((step, idx) => (
                  <li key={idx} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#5A5280", lineHeight: 1.6 }}>
                    {step}
                  </li>
                ))}
              </ol>
            </AccordionSection>

            <AccordionSection title="Documents">
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Technical Data Sheet (TDS)", "Safety Data Sheet (SDS)"].map(doc => (
                  <div key={doc} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: "#F8F5FF", borderRadius: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <FileText size={16} color="#4C3494" />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#2D1B69" }}>{doc}</span>
                    </div>
                    <button style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: "#4C3494", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 12 }}>
                      <Download size={14} /> Download
                    </button>
                  </div>
                ))}
              </div>
            </AccordionSection>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div style={{ marginTop: 56 }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22, color: "#1A0F3E", margin: "0 0 20px" }}>
            You May Also Like
          </h2>
          <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 12 }}>
            {similarProducts.map(p => (
              <ProductCard key={p.id} product={p} variant="compact" />
            ))}
          </div>
        </div>
      )}
    </SharedLayout>
  );
}

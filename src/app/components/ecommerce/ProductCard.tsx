import { useState } from "react";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { useNavigate } from "react-router";
import type { Product } from "./mockData";
import { useCart } from "./CartContext";

interface ProductCardProps {
  product: Product;
  variant?: "grid" | "compact";
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={12}
          fill={i <= Math.round(rating) ? "#F5A623" : "none"}
          color={i <= Math.round(rating) ? "#F5A623" : "#D8D0F0"}
        />
      ))}
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#9B92B8" }}>
        {rating}
      </span>
    </div>
  );
}

export function ProductCard({ product, variant = "grid" }: ProductCardProps) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  const defaultPack = product.packSizes.find(p => p.size === product.defaultPackSize) || product.packSizes[0];

  function handleAddToCart(e: React.MouseEvent) {
    e.stopPropagation();
    addToCart(product, 1, product.defaultPackSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  if (variant === "compact") {
    return (
      <div
        onClick={() => navigate(`/dealer/products/${product.id}`)}
        style={{
          width: 160,
          flexShrink: 0,
          background: "#fff",
          borderRadius: 12,
          border: "1px solid #D8D0F0",
          boxShadow: "0 2px 12px rgba(76,52,148,0.07)",
          cursor: "pointer",
          overflow: "hidden",
          transition: "transform 0.18s, box-shadow 0.18s",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 24px rgba(76,52,148,0.14)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(76,52,148,0.07)"; }}
      >
        <div
          style={{
            height: 100,
            background: "#F8F5FF",
            overflow: "hidden",
          }}
        >
          <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ padding: "10px 10px 12px" }}>
          <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 12, color: "#1A0F3E", margin: "0 0 4px", lineHeight: 1.3 }}>
            {product.name}
          </p>
          <p style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: 13, color: "#2D1B69", margin: 0 }}>
            ₹{defaultPack.dealerPrice.toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => navigate(`/dealer/products/${product.id}`)}
      style={{
        background: "#fff",
        borderRadius: 16,
        border: "1px solid #D8D0F0",
        boxShadow: "0 2px 12px rgba(76,52,148,0.07)",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.18s, box-shadow 0.18s",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(76,52,148,0.14)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(76,52,148,0.07)"; }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: 200, background: "#F8F5FF", overflow: "hidden" }}>
        <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        {/* Badges */}
        <div style={{ position: "absolute", top: 10, left: 10, display: "flex", flexDirection: "column", gap: 6 }}>
          {product.hasScheme && (
            <span style={{ background: "#F5A623", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 10, padding: "3px 8px", borderRadius: 6, letterSpacing: "0.5px" }}>
              🔥 SCHEME
            </span>
          )}
          {!product.inStock && (
            <span style={{ background: "#E53E3E", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 10, padding: "3px 8px", borderRadius: 6 }}>
              OUT OF STOCK
            </span>
          )}
        </div>
        <button
          onClick={e => { e.stopPropagation(); setWishlisted(v => !v); }}
          style={{ position: "absolute", top: 10, right: 10, width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Heart size={16} fill={wishlisted ? "#E53E3E" : "none"} color={wishlisted ? "#E53E3E" : "#9B92B8"} />
        </button>
        {/* Savings badge */}
        <div style={{ position: "absolute", bottom: 10, right: 10, background: "#F0FFF4", border: "1px solid #9AE6B4", borderRadius: 6, padding: "2px 8px" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 11, color: "#38A169" }}>
            {Math.round(((defaultPack.mrp - defaultPack.dealerPrice) / defaultPack.mrp) * 100)}% off
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "16px 16px 20px", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        {/* Category + brand */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ background: "#EEE9FF", color: "#4C3494", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 11, padding: "2px 8px", borderRadius: 6 }}>
            {product.category}
          </span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#9B92B8" }}>{product.brand}</span>
        </div>

        {/* Name */}
        <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "#1A0F3E", margin: 0, lineHeight: 1.3 }}>
          {product.name}
        </h3>

        {/* Description */}
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#9B92B8", margin: 0, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {product.description}
        </p>

        {/* Rating */}
        <StarRating rating={product.rating} />

        {/* Pack sizes chips */}
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {product.packSizes.map(ps => (
            <span key={ps.size} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#5A5280", background: "#F5F3FF", padding: "2px 6px", borderRadius: 4, border: "1px solid #D8D0F0" }}>
              {ps.size}
            </span>
          ))}
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Price */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: "#2D1B69" }}>
            ₹{defaultPack.dealerPrice.toLocaleString("en-IN")}
          </span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#9B92B8", textDecoration: "line-through" }}>
            ₹{defaultPack.mrp.toLocaleString("en-IN")}
          </span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#9B92B8" }}>
            /{product.defaultPackSize}
          </span>
        </div>

        {/* CTA */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          style={{
            width: "100%",
            height: 40,
            borderRadius: 10,
            border: "none",
            background: !product.inStock ? "#F5F3FF" : added ? "#38A169" : "linear-gradient(135deg, #3D2680 0%, #4C3494 100%)",
            color: !product.inStock ? "#9B92B8" : "#fff",
            cursor: !product.inStock ? "not-allowed" : "pointer",
            fontFamily: "'Syne', sans-serif",
            fontWeight: 600,
            fontSize: 13,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            transition: "all 0.2s",
          }}
        >
          <ShoppingCart size={14} />
          {!product.inStock ? "Out of Stock" : added ? "Added ✓" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

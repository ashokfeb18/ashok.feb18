import { useState, useMemo } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { SharedLayout } from "../components/ecommerce/SharedLayout";
import { ProductCard } from "../components/ecommerce/ProductCard";
import { PRODUCTS, CATEGORIES, BRANDS } from "../components/ecommerce/mockData";

const FINISHES = ["Matte", "Silk", "Gloss", "Sheen"];
const PACK_SIZES = ["500ml", "1L", "4L", "10L", "20L"];

interface FilterState {
  categories: string[];
  brands: string[];
  finishes: string[];
  packSizes: string[];
  priceMin: number;
  priceMax: number;
  inStockOnly: boolean;
}

const INITIAL_FILTERS: FilterState = {
  categories: [],
  brands: [],
  finishes: [],
  packSizes: [],
  priceMin: 0,
  priceMax: 10000,
  inStockOnly: false,
};

type SortOption = "featured" | "price-low" | "price-high" | "rating" | "newest";

const SORT_LABELS: Record<SortOption, string> = {
  featured: "Featured",
  "price-low": "Price: Low to High",
  "price-high": "Price: High to Low",
  rating: "Top Rated",
  newest: "Newest First",
};

function Checkbox({ checked, onChange, label, count }: { checked: boolean; onChange: () => void; label: string; count?: number }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "7px 0" }}>
      <div
        onClick={onChange}
        style={{
          width: 18,
          height: 18,
          borderRadius: 5,
          border: checked ? "none" : "1.5px solid #C8BEE8",
          background: checked ? "#4C3494" : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "all 0.15s",
        }}
      >
        {checked && (
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#2D1B69", flex: 1 }}>{label}</span>
      {count !== undefined && (
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#9B92B8", background: "#F0EDF8", padding: "1px 6px", borderRadius: 4 }}>
          {count}
        </span>
      )}
    </label>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ padding: "16px 0", borderBottom: "1px solid #EEE9FF" }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: open ? 8 : 0 }}
      >
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: "#1A0F3E" }}>{title}</span>
        <ChevronDown size={16} color="#9B92B8" style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
      </button>
      {open && children}
    </div>
  );
}

export function PLPPage() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [sort, setSort] = useState<SortOption>("featured");
  const [sortOpen, setSortOpen] = useState(false);

  function toggle<K extends keyof FilterState>(key: K, value: string) {
    setFilters(prev => {
      const arr = prev[key] as string[];
      return { ...prev, [key]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value] };
    });
  }

  function clearAll() {
    setFilters(INITIAL_FILTERS);
  }

  const hasFilters =
    filters.categories.length > 0 ||
    filters.brands.length > 0 ||
    filters.finishes.length > 0 ||
    filters.packSizes.length > 0 ||
    filters.inStockOnly;

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];
    if (filters.categories.length) list = list.filter(p => filters.categories.includes(p.category));
    if (filters.brands.length) list = list.filter(p => filters.brands.includes(p.brand));
    if (filters.finishes.length) list = list.filter(p => filters.finishes.includes(p.finish));
    if (filters.packSizes.length) list = list.filter(p => p.packSizes.some(ps => filters.packSizes.includes(ps.size)));
    if (filters.inStockOnly) list = list.filter(p => p.inStock);
    if (sort === "price-low") list.sort((a, b) => a.packSizes[0].dealerPrice - b.packSizes[0].dealerPrice);
    if (sort === "price-high") list.sort((a, b) => b.packSizes[0].dealerPrice - a.packSizes[0].dealerPrice);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [filters, sort]);

  return (
    <SharedLayout
      breadcrumb={[{ label: "Home", href: "/dealer" }, { label: "Products" }]}
    >
      {/* Page title row */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 28, color: "#1A0F3E", margin: "0 0 6px" }}>
            All Products
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#9B92B8", margin: 0 }}>
            Browse and order from our complete range
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#9B92B8" }}>
            {filteredProducts.length} products
          </span>
          {/* Sort dropdown */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setSortOpen(v => !v)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 14px",
                borderRadius: 10,
                border: "1.5px solid #D8D0F0",
                background: "#fff",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: "#2D1B69",
                fontWeight: 500,
              }}
            >
              <SlidersHorizontal size={14} />
              {SORT_LABELS[sort]}
              <ChevronDown size={14} />
            </button>
            {sortOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 6px)",
                  right: 0,
                  background: "#fff",
                  border: "1px solid #D8D0F0",
                  borderRadius: 12,
                  boxShadow: "0 8px 32px rgba(76,52,148,0.15)",
                  zIndex: 50,
                  overflow: "hidden",
                  minWidth: 200,
                }}
              >
                {(Object.keys(SORT_LABELS) as SortOption[]).map(opt => (
                  <button
                    key={opt}
                    onClick={() => { setSort(opt); setSortOpen(false); }}
                    style={{
                      width: "100%",
                      padding: "10px 16px",
                      textAlign: "left",
                      background: sort === opt ? "#EEE9FF" : "#fff",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      color: sort === opt ? "#4C3494" : "#2D1B69",
                      fontWeight: sort === opt ? 600 : 400,
                      borderBottom: "1px solid #F0EDF8",
                    }}
                  >
                    {SORT_LABELS[opt]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Body: filter sidebar + product grid */}
      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        {/* ── Filter Sidebar ──────────────────────────────────────────────── */}
        <div
          style={{
            width: 260,
            flexShrink: 0,
            background: "#fff",
            borderRadius: 16,
            border: "1px solid #D8D0F0",
            boxShadow: "0 2px 12px rgba(76,52,148,0.07)",
            padding: "0 20px",
            position: "sticky",
            top: 88,
          }}
        >
          {/* Filter header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0", borderBottom: "1px solid #EEE9FF" }}>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "#1A0F3E" }}>Filters</span>
            {hasFilters && (
              <button
                onClick={clearAll}
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#4C3494", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}
              >
                <X size={12} /> Clear All
              </button>
            )}
          </div>

          {/* Category */}
          <FilterSection title="Category">
            {CATEGORIES.map(cat => (
              <Checkbox
                key={cat.name}
                checked={filters.categories.includes(cat.name)}
                onChange={() => toggle("categories", cat.name)}
                label={cat.name}
                count={cat.count}
              />
            ))}
          </FilterSection>

          {/* Brand */}
          <FilterSection title="Brand">
            {BRANDS.map(brand => (
              <Checkbox
                key={brand.name}
                checked={filters.brands.includes(brand.name)}
                onChange={() => toggle("brands", brand.name)}
                label={brand.name}
                count={brand.count}
              />
            ))}
          </FilterSection>

          {/* Finish Type */}
          <FilterSection title="Finish Type">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingTop: 4 }}>
              {FINISHES.map(finish => {
                const selected = filters.finishes.includes(finish);
                return (
                  <button
                    key={finish}
                    onClick={() => toggle("finishes", finish)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: 20,
                      border: `1.5px solid ${selected ? "#4C3494" : "#D8D0F0"}`,
                      background: selected ? "#4C3494" : "#fff",
                      color: selected ? "#fff" : "#5A5280",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: 12,
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    {finish}
                  </button>
                );
              })}
            </div>
          </FilterSection>

          {/* Pack Size */}
          <FilterSection title="Pack Size">
            {PACK_SIZES.map(size => (
              <Checkbox
                key={size}
                checked={filters.packSizes.includes(size)}
                onChange={() => toggle("packSizes", size)}
                label={size}
              />
            ))}
          </FilterSection>

          {/* Price Range */}
          <FilterSection title="Price Range">
            <div style={{ paddingTop: 8 }}>
              <div style={{ position: "relative", height: 20, marginBottom: 12 }}>
                <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 4, background: "#EEE9FF", borderRadius: 2, transform: "translateY(-50%)" }}>
                  <div
                    style={{
                      position: "absolute",
                      left: `${(filters.priceMin / 10000) * 100}%`,
                      right: `${100 - (filters.priceMax / 10000) * 100}%`,
                      height: "100%",
                      background: "#4C3494",
                      borderRadius: 2,
                    }}
                  />
                </div>
                <input
                  type="range"
                  min={0}
                  max={10000}
                  step={100}
                  value={filters.priceMin}
                  onChange={e => setFilters(p => ({ ...p, priceMin: Math.min(+e.target.value, p.priceMax - 500) }))}
                  style={{ position: "absolute", width: "100%", appearance: "none", background: "transparent", height: 4, top: "50%", transform: "translateY(-50%)", cursor: "pointer", zIndex: 2 }}
                />
                <input
                  type="range"
                  min={0}
                  max={10000}
                  step={100}
                  value={filters.priceMax}
                  onChange={e => setFilters(p => ({ ...p, priceMax: Math.max(+e.target.value, p.priceMin + 500) }))}
                  style={{ position: "absolute", width: "100%", appearance: "none", background: "transparent", height: 4, top: "50%", transform: "translateY(-50%)", cursor: "pointer", zIndex: 2 }}
                />
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="number"
                  value={filters.priceMin}
                  onChange={e => setFilters(p => ({ ...p, priceMin: +e.target.value }))}
                  style={{ flex: 1, height: 34, borderRadius: 8, border: "1.5px solid #D8D0F0", padding: "0 8px", fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#2D1B69", outline: "none" }}
                />
                <span style={{ color: "#9B92B8", fontSize: 12 }}>–</span>
                <input
                  type="number"
                  value={filters.priceMax}
                  onChange={e => setFilters(p => ({ ...p, priceMax: +e.target.value }))}
                  style={{ flex: 1, height: 34, borderRadius: 8, border: "1.5px solid #D8D0F0", padding: "0 8px", fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#2D1B69", outline: "none" }}
                />
              </div>
            </div>
          </FilterSection>

          {/* In Stock Only */}
          <div style={{ padding: "16px 0" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: "#1A0F3E" }}>In Stock Only</span>
              <button
                onClick={() => setFilters(p => ({ ...p, inStockOnly: !p.inStockOnly }))}
                style={{
                  width: 44,
                  height: 24,
                  borderRadius: 12,
                  background: filters.inStockOnly ? "#4C3494" : "#D8D0F0",
                  border: "none",
                  cursor: "pointer",
                  position: "relative",
                  transition: "background 0.2s",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 3,
                    left: filters.inStockOnly ? "calc(100% - 21px)" : 3,
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: "#fff",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                    transition: "left 0.2s",
                  }}
                />
              </button>
            </div>
          </div>
        </div>

        {/* ── Product Grid ────────────────────────────────────────────────── */}
        <div style={{ flex: 1 }}>
          {/* Active filter chips */}
          {hasFilters && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
              {[...filters.categories, ...filters.brands, ...filters.finishes, ...filters.packSizes].map(chip => (
                <span
                  key={chip}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "4px 12px",
                    borderRadius: 20,
                    background: "#EEE9FF",
                    border: "1px solid #C8BEE8",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    color: "#4C3494",
                    fontWeight: 500,
                  }}
                >
                  {chip}
                  <X
                    size={10}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      for (const key of ["categories", "brands", "finishes", "packSizes"] as const) {
                        if ((filters[key] as string[]).includes(chip)) {
                          toggle(key, chip);
                          break;
                        }
                      }
                    }}
                  />
                </span>
              ))}
              {filters.inStockOnly && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 20, background: "#F0FFF4", border: "1px solid #9AE6B4", fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#38A169", fontWeight: 500 }}>
                  In Stock <X size={10} style={{ cursor: "pointer" }} onClick={() => setFilters(p => ({ ...p, inStockOnly: false }))} />
                </span>
              )}
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 40px", background: "#fff", borderRadius: 16, border: "1px solid #D8D0F0" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: "#1A0F3E", margin: "0 0 8px" }}>No products found</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#9B92B8", margin: 0 }}>Try adjusting your filters</p>
              <button onClick={clearAll} style={{ marginTop: 16, padding: "10px 24px", borderRadius: 10, border: "none", background: "#4C3494", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: 20,
              }}
            >
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} variant="grid" />
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #4C3494;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 1px 6px rgba(76,52,148,0.3);
        }
        input[type=range]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #4C3494;
          cursor: pointer;
          border: 2px solid #fff;
        }
      `}</style>
    </SharedLayout>
  );
}

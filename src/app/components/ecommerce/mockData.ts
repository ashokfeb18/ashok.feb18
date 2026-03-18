export interface PackSize {
  size: string;
  mrp: number;
  dealerPrice: number;
  pricePerLitre: string;
  litres: number;
}

export interface Shade {
  name: string;
  hex: string;
}

export interface Scheme {
  name: string;
  description: string;
  endsDate: string;
  progress: number;
  requiredQty: number;
  currentQty: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  finish: string;
  description: string;
  code: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockUnits: number;
  hasScheme: boolean;
  scheme?: Scheme;
  image: string;
  images: string[];
  shades: Shade[];
  packSizes: PackSize[];
  defaultPackSize: string;
  specs: { label: string; value: string }[];
  applicationSteps: string[];
}

const IMG_PAINTCAN = "https://images.unsplash.com/photo-1673297821205-e0575bbc2ab7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600";
const IMG_ROLLER   = "https://images.unsplash.com/photo-1635260166178-41e20858d0d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600";
const IMG_EXTERIOR = "https://images.unsplash.com/photo-1645072833393-1916508b700d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600";
const IMG_WOOD     = "https://images.unsplash.com/photo-1627590720218-c5ed819dae7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600";
const IMG_SWATCHES = "https://images.unsplash.com/photo-1716471330478-7296f0266c59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600";
const IMG_WATERPROOF = "https://images.unsplash.com/photo-1623490879046-75abc98e1176?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600";

const SHADES_WARM: Shade[] = [
  { name: "Ivory White", hex: "#FFFFF0" },
  { name: "Cream Bliss", hex: "#FFFDD0" },
  { name: "Pearl Mist", hex: "#F8F6F0" },
  { name: "Linen Sand", hex: "#F0E4CC" },
  { name: "Apricot Haze", hex: "#FBCBA7" },
  { name: "Butter Yellow", hex: "#F9E49A" },
  { name: "Sandstone", hex: "#D4B896" },
  { name: "Clay Pink", hex: "#E8C4A0" },
  { name: "Peachy Glow", hex: "#FFCBA4" },
  { name: "Rose Blush", hex: "#F7CAC9" },
  { name: "Mauve Dreams", hex: "#D8A7B1" },
  { name: "Warm Terracotta", hex: "#C4734A" },
  { name: "Sunset Gold", hex: "#E0923A" },
  { name: "Umber Deep", hex: "#8B5A2B" },
  { name: "Mahogany", hex: "#6B2D2D" },
  { name: "Midnight Spice", hex: "#4A2020" },
];

const SHADES_COOL: Shade[] = [
  { name: "Arctic White", hex: "#F0F8FF" },
  { name: "Sky Whisper", hex: "#D4EAF7" },
  { name: "Powder Blue", hex: "#B0D4E8" },
  { name: "Steel Blue", hex: "#7FADC4" },
  { name: "Ocean Teal", hex: "#5B9BB5" },
  { name: "Mint Fresh", hex: "#C8E6C9" },
  { name: "Sage Green", hex: "#9ABF8F" },
  { name: "Forest Calm", hex: "#5A8B6A" },
  { name: "Lavender Soft", hex: "#D4C5E2" },
  { name: "Lilac Mist", hex: "#B8A9D0" },
  { name: "Grape Light", hex: "#9580BD" },
  { name: "Slate Grey", hex: "#A0A8B8" },
  { name: "Charcoal Ash", hex: "#6B7280" },
  { name: "Graphite", hex: "#4B5563" },
  { name: "Deep Navy", hex: "#1E3A5F" },
  { name: "Ebony Black", hex: "#1C1C2E" },
];

export const PRODUCTS: Product[] = [
  {
    id: "p001",
    name: "Royale Aspira Emulsion",
    brand: "Royale",
    category: "Interior Emulsion",
    finish: "Silk",
    description: "Premium interior emulsion with advanced stain guard technology. Smooth silk finish, fully washable surface that stays fresh for years.",
    code: "RAE-SILK-4802",
    rating: 4.8,
    reviewCount: 1240,
    inStock: true,
    stockUnits: 240,
    hasScheme: true,
    scheme: {
      name: "Buy 5 Get 1 Free",
      description: "Buy 5 units get 1 free · Ends Mar 31",
      endsDate: "Mar 31, 2026",
      progress: 60,
      requiredQty: 5,
      currentQty: 3,
    },
    image: IMG_ROLLER,
    images: [IMG_ROLLER, IMG_PAINTCAN, IMG_SWATCHES, IMG_EXTERIOR],
    shades: SHADES_WARM,
    packSizes: [
      { size: "1L", mrp: 620, dealerPrice: 558, pricePerLitre: "₹558/L", litres: 1 },
      { size: "4L", mrp: 2200, dealerPrice: 1980, pricePerLitre: "₹495/L", litres: 4 },
      { size: "10L", mrp: 4200, dealerPrice: 3780, pricePerLitre: "₹378/L", litres: 10 },
      { size: "20L", mrp: 7800, dealerPrice: 7020, pricePerLitre: "₹351/L", litres: 20 },
    ],
    defaultPackSize: "10L",
    specs: [
      { label: "Coverage", value: "140–160 sq.ft/L" },
      { label: "Finish", value: "Silk" },
      { label: "Coats", value: "2 coats recommended" },
      { label: "Drying Time", value: "2 hrs (touch dry), 4 hrs (recoat)" },
      { label: "Dilution", value: "20–25% water" },
      { label: "VOC", value: "< 50 g/L" },
    ],
    applicationSteps: [
      "Clean the surface thoroughly. Remove all dust, grease and loose particles.",
      "Apply one coat of Royale Primer for best adhesion. Allow to dry for 4 hours.",
      "Stir the paint well before use. Dilute with 20–25% water for first coat.",
      "Apply first coat evenly using a roller or brush. Allow to dry for 2–4 hours.",
      "Lightly sand with fine sandpaper and apply second coat for best finish.",
      "Allow 24 hours before washing or cleaning the surface.",
    ],
  },
  {
    id: "p002",
    name: "Apex Ultima Exterior",
    brand: "Apex",
    category: "Exterior Emulsion",
    finish: "Sheen",
    description: "All-weather exterior emulsion with superior UV resistance and anti-algae formula. Protects and beautifies for 10+ years.",
    code: "AUE-SHEEN-2201",
    rating: 4.6,
    reviewCount: 890,
    inStock: true,
    stockUnits: 180,
    hasScheme: false,
    image: IMG_EXTERIOR,
    images: [IMG_EXTERIOR, IMG_ROLLER, IMG_PAINTCAN, IMG_SWATCHES],
    shades: SHADES_COOL,
    packSizes: [
      { size: "1L", mrp: 540, dealerPrice: 486, pricePerLitre: "₹486/L", litres: 1 },
      { size: "4L", mrp: 1960, dealerPrice: 1764, pricePerLitre: "₹441/L", litres: 4 },
      { size: "10L", mrp: 4400, dealerPrice: 3960, pricePerLitre: "₹396/L", litres: 10 },
      { size: "20L", mrp: 8200, dealerPrice: 7380, pricePerLitre: "₹369/L", litres: 20 },
    ],
    defaultPackSize: "10L",
    specs: [
      { label: "Coverage", value: "120–140 sq.ft/L" },
      { label: "Finish", value: "Sheen" },
      { label: "Coats", value: "2 coats recommended" },
      { label: "Drying Time", value: "3 hrs (touch dry), 6 hrs (recoat)" },
      { label: "Dilution", value: "15–20% water" },
      { label: "VOC", value: "< 100 g/L" },
    ],
    applicationSteps: [
      "Ensure surface is clean, dry and free of efflorescence.",
      "Apply Apex Weatherproof Primer for best bonding. Dry 6 hours.",
      "Stir paint thoroughly. Thin with 15–20% water for first coat.",
      "Apply evenly using brush, roller or spray. Work section by section.",
      "Allow 6 hours and apply second coat for complete coverage.",
      "Full cure in 7 days. Avoid washing for 48 hours after application.",
    ],
  },
  {
    id: "p003",
    name: "Tractor Emulsion",
    brand: "Tractor",
    category: "Interior Emulsion",
    finish: "Matte",
    description: "Value interior emulsion offering great coverage and a clean matte finish. Perfect for budget-conscious projects without compromising quality.",
    code: "TEM-MATT-1050",
    rating: 4.3,
    reviewCount: 2100,
    inStock: true,
    stockUnits: 450,
    hasScheme: true,
    scheme: {
      name: "Volume Discount 12%",
      description: "Order 10+ units get 12% off · Ends Apr 15",
      endsDate: "Apr 15, 2026",
      progress: 40,
      requiredQty: 10,
      currentQty: 4,
    },
    image: IMG_PAINTCAN,
    images: [IMG_PAINTCAN, IMG_ROLLER, IMG_EXTERIOR, IMG_SWATCHES],
    shades: SHADES_WARM,
    packSizes: [
      { size: "500ml", mrp: 210, dealerPrice: 185, pricePerLitre: "₹370/L", litres: 0.5 },
      { size: "1L", mrp: 380, dealerPrice: 336, pricePerLitre: "₹336/L", litres: 1 },
      { size: "4L", mrp: 1380, dealerPrice: 1218, pricePerLitre: "₹304/L", litres: 4 },
      { size: "10L", mrp: 3200, dealerPrice: 2816, pricePerLitre: "₹281/L", litres: 10 },
      { size: "20L", mrp: 5900, dealerPrice: 5192, pricePerLitre: "₹259/L", litres: 20 },
    ],
    defaultPackSize: "4L",
    specs: [
      { label: "Coverage", value: "130–150 sq.ft/L" },
      { label: "Finish", value: "Matte" },
      { label: "Coats", value: "2 coats recommended" },
      { label: "Drying Time", value: "1.5 hrs (touch dry), 3 hrs (recoat)" },
      { label: "Dilution", value: "25–30% water" },
      { label: "VOC", value: "< 30 g/L" },
    ],
    applicationSteps: [
      "Prepare the surface – clean, dry and dust-free.",
      "Apply one coat of Tractor Primer Sealer. Dry for 3 hours.",
      "Thin the paint with 25–30% water for first coat.",
      "Apply first coat and allow to dry for 1.5–2 hours.",
      "Apply second coat for uniform finish. Sand lightly between coats if needed.",
      "Clean tools immediately with water after use.",
    ],
  },
  {
    id: "p004",
    name: "Apcolite Premium Enamel",
    brand: "Apcolite",
    category: "Enamel",
    finish: "Gloss",
    description: "High-gloss synthetic enamel paint for wood and metal surfaces. Superior hardness, excellent adhesion, and lasting brilliance.",
    code: "APE-GLOS-3301",
    rating: 4.5,
    reviewCount: 560,
    inStock: true,
    stockUnits: 120,
    hasScheme: false,
    image: IMG_SWATCHES,
    images: [IMG_SWATCHES, IMG_PAINTCAN, IMG_ROLLER, IMG_WOOD],
    shades: SHADES_COOL,
    packSizes: [
      { size: "500ml", mrp: 310, dealerPrice: 275, pricePerLitre: "₹550/L", litres: 0.5 },
      { size: "1L", mrp: 580, dealerPrice: 516, pricePerLitre: "₹516/L", litres: 1 },
      { size: "4L", mrp: 2100, dealerPrice: 1869, pricePerLitre: "₹467/L", litres: 4 },
    ],
    defaultPackSize: "1L",
    specs: [
      { label: "Coverage", value: "90–110 sq.ft/L" },
      { label: "Finish", value: "High Gloss" },
      { label: "Coats", value: "2–3 coats" },
      { label: "Drying Time", value: "6 hrs (touch dry), 24 hrs (recoat)" },
      { label: "Dilution", value: "5–10% Mineral Turpentine" },
      { label: "Application", value: "Brush / Roller" },
    ],
    applicationSteps: [
      "Sand the surface smooth and wipe clean.",
      "Apply Apcolite Enamel Primer. Allow 24 hours to dry.",
      "Thin with 5–10% mineral turpentine for first coat.",
      "Apply first coat in long, even strokes. Dry 6 hours.",
      "Sand lightly with 220-grit paper. Wipe dust.",
      "Apply final coat for a high-gloss brilliant finish.",
    ],
  },
  {
    id: "p005",
    name: "Royale Health Shield",
    brand: "Royale",
    category: "Interior Emulsion",
    finish: "Matte",
    description: "Anti-bacterial interior paint with Silver Ion technology. Kills 99.9% bacteria. Silver finish for modern, hygienic interiors.",
    code: "RHS-MATT-5510",
    rating: 4.7,
    reviewCount: 750,
    inStock: true,
    stockUnits: 90,
    hasScheme: true,
    scheme: {
      name: "Flat 8% Off",
      description: "Flat 8% discount on all packs · Ends Mar 15",
      endsDate: "Mar 15, 2026",
      progress: 100,
      requiredQty: 1,
      currentQty: 1,
    },
    image: IMG_ROLLER,
    images: [IMG_ROLLER, IMG_SWATCHES, IMG_PAINTCAN, IMG_EXTERIOR],
    shades: SHADES_WARM,
    packSizes: [
      { size: "1L", mrp: 720, dealerPrice: 662, pricePerLitre: "₹662/L", litres: 1 },
      { size: "4L", mrp: 2600, dealerPrice: 2392, pricePerLitre: "₹598/L", litres: 4 },
      { size: "10L", mrp: 5800, dealerPrice: 5336, pricePerLitre: "₹533/L", litres: 10 },
    ],
    defaultPackSize: "4L",
    specs: [
      { label: "Coverage", value: "135–155 sq.ft/L" },
      { label: "Finish", value: "Matte" },
      { label: "Anti-bacterial", value: "Silver Ion Technology" },
      { label: "Drying Time", value: "2 hrs (touch dry), 4 hrs (recoat)" },
      { label: "Dilution", value: "20–25% water" },
      { label: "VOC", value: "< 10 g/L (Low VOC)" },
    ],
    applicationSteps: [
      "Ensure surface is clean, dry and free of mildew.",
      "Apply Royale Anti-bacterial Primer. Dry 4 hours.",
      "Thin Health Shield with 20–25% water.",
      "Apply first coat with roller. Allow 2–4 hours drying.",
      "Apply second coat for complete anti-bacterial protection.",
      "Silver Ion technology activates in 24 hours.",
    ],
  },
  {
    id: "p006",
    name: "Apex Weatherproof Primer",
    brand: "Apex",
    category: "Primer",
    finish: "Matte",
    description: "All-weather exterior primer with deep penetration. Seals porous surfaces and provides excellent adhesion for topcoats.",
    code: "AWP-PRIM-0802",
    rating: 4.4,
    reviewCount: 420,
    inStock: true,
    stockUnits: 310,
    hasScheme: false,
    image: IMG_EXTERIOR,
    images: [IMG_EXTERIOR, IMG_PAINTCAN, IMG_ROLLER, IMG_WATERPROOF],
    shades: [{ name: "White", hex: "#FFFFFF" }, { name: "Off White", hex: "#F5F5F0" }],
    packSizes: [
      { size: "4L", mrp: 820, dealerPrice: 738, pricePerLitre: "₹184/L", litres: 4 },
      { size: "10L", mrp: 1900, dealerPrice: 1710, pricePerLitre: "₹171/L", litres: 10 },
      { size: "20L", mrp: 3400, dealerPrice: 3060, pricePerLitre: "₹153/L", litres: 20 },
    ],
    defaultPackSize: "10L",
    specs: [
      { label: "Coverage", value: "100–120 sq.ft/L" },
      { label: "Finish", value: "Matte" },
      { label: "Coats", value: "1–2 coats" },
      { label: "Drying Time", value: "4 hrs (touch dry), 8 hrs (recoat)" },
      { label: "Dilution", value: "15–20% water" },
      { label: "Application", value: "Brush / Roller / Spray" },
    ],
    applicationSteps: [
      "Remove all loose material, dust and efflorescence from the surface.",
      "Dampen the surface slightly for better absorption.",
      "Stir primer thoroughly and dilute with 15–20% water.",
      "Apply first coat using roller or brush. Allow 4–8 hours to dry.",
      "Apply second coat if needed for highly porous surfaces.",
      "Apply topcoat after 8 hours for best results.",
    ],
  },
  {
    id: "p007",
    name: "Apcolite Wood Finish",
    brand: "Apcolite",
    category: "Wood Finish",
    finish: "Gloss",
    description: "Premium polyurethane wood finish with deep nourishing oils. Enhances natural wood grain. Scratch-resistant, long-lasting protection.",
    code: "AWF-GLOS-7701",
    rating: 4.6,
    reviewCount: 330,
    inStock: true,
    stockUnits: 80,
    hasScheme: false,
    image: IMG_WOOD,
    images: [IMG_WOOD, IMG_SWATCHES, IMG_PAINTCAN, IMG_ROLLER],
    shades: [
      { name: "Clear", hex: "#F5F0E0" },
      { name: "Teak", hex: "#8B5E3C" },
      { name: "Walnut", hex: "#5C3317" },
      { name: "Rosewood", hex: "#6B2F2F" },
      { name: "Mahogany", hex: "#7B3B3B" },
      { name: "Oak", hex: "#B8853A" },
      { name: "Pine", hex: "#C8A56A" },
      { name: "Natural", hex: "#D4B896" },
    ],
    packSizes: [
      { size: "500ml", mrp: 490, dealerPrice: 441, pricePerLitre: "₹882/L", litres: 0.5 },
      { size: "1L", mrp: 920, dealerPrice: 828, pricePerLitre: "₹828/L", litres: 1 },
      { size: "4L", mrp: 3200, dealerPrice: 2880, pricePerLitre: "₹720/L", litres: 4 },
    ],
    defaultPackSize: "1L",
    specs: [
      { label: "Coverage", value: "80–100 sq.ft/L" },
      { label: "Finish", value: "Gloss" },
      { label: "Coats", value: "3 coats recommended" },
      { label: "Drying Time", value: "12 hrs (touch dry), 24 hrs (recoat)" },
      { label: "Dilution", value: "5–10% Thinner AP60" },
      { label: "Hardener", value: "Mix Ratio 4:1 (Finish:Hardener)" },
    ],
    applicationSteps: [
      "Sand wood smooth with 180-grit sandpaper. Remove all dust.",
      "Apply wood filler for any holes and cracks. Dry 12 hours.",
      "Mix Apcolite Wood Finish with hardener at 4:1 ratio.",
      "Apply first coat, allow 24 hours to dry. Sand with 220-grit.",
      "Apply second coat evenly. Dry 24 hours. Sand with 320-grit.",
      "Apply final coat for a mirror-like gloss. Polish after 72 hours.",
    ],
  },
  {
    id: "p008",
    name: "Apex Waterguard Coating",
    brand: "Apex",
    category: "Waterproofing",
    finish: "Matte",
    description: "Flexible elastomeric waterproofing coating for roofs, terraces and basements. Bridges cracks, repels water, prevents seepage.",
    code: "AWG-WTRP-9901",
    rating: 4.5,
    reviewCount: 280,
    inStock: false,
    stockUnits: 0,
    hasScheme: false,
    image: IMG_WATERPROOF,
    images: [IMG_WATERPROOF, IMG_EXTERIOR, IMG_PAINTCAN, IMG_ROLLER],
    shades: [{ name: "White", hex: "#FFFFFF" }, { name: "Terracotta", hex: "#C25B3B" }, { name: "Grey", hex: "#9CA3AF" }],
    packSizes: [
      { size: "4L", mrp: 1400, dealerPrice: 1260, pricePerLitre: "₹315/L", litres: 4 },
      { size: "10L", mrp: 3100, dealerPrice: 2790, pricePerLitre: "��279/L", litres: 10 },
      { size: "20L", mrp: 5800, dealerPrice: 5220, pricePerLitre: "₹261/L", litres: 20 },
    ],
    defaultPackSize: "10L",
    specs: [
      { label: "Coverage", value: "50–60 sq.ft/L (2 coats)" },
      { label: "Elongation", value: "> 200% (crack-bridging)" },
      { label: "Coats", value: "2 coats mandatory" },
      { label: "Drying Time", value: "6 hrs (touch dry), 24 hrs (recoat)" },
      { label: "Dilution", value: "Do not dilute" },
      { label: "Service Temp", value: "-10°C to +80°C" },
    ],
    applicationSteps: [
      "Clean the surface thoroughly. Remove all dust, oil and loose particles.",
      "Fill cracks wider than 2mm with Apex Crack Filler.",
      "Apply first coat of Apex Waterguard undiluted using brush or roller.",
      "Allow first coat to dry fully (minimum 24 hours).",
      "Apply second coat perpendicular to first coat direction.",
      "Allow 7 days before exposing to ponded water.",
    ],
  },
];

export const DEALER = {
  name: "Shree Ganesh Paints",
  id: "DLR-MH-10234",
  initials: "SG",
  city: "Pune, Maharashtra",
  tier: "combo" as "platinum" | "top150" | "combo" | "regular",
  loyaltyPoints: 12450,
  notifications: 3,
};

export const CATEGORIES = [
  { name: "Interior Emulsion", count: 42 },
  { name: "Exterior Emulsion", count: 38 },
  { name: "Primer", count: 18 },
  { name: "Enamel", count: 26 },
  { name: "Wood Finish", count: 14 },
  { name: "Waterproofing", count: 10 },
];

export const BRANDS = [
  { name: "Royale", count: 32 },
  { name: "Apex", count: 48 },
  { name: "Tractor", count: 35 },
  { name: "Apcolite", count: 22 },
  { name: "Ace", count: 28 },
];

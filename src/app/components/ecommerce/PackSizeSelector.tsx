import type { PackSize } from "./mockData";

interface PackSizeSelectorProps {
  sizes: PackSize[];
  selected: string;
  onChange: (size: string) => void;
}

export function PackSizeSelector({ sizes, selected, onChange }: PackSizeSelectorProps) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {sizes.map((ps) => {
        const isSelected = selected === ps.size;
        return (
          <button
            key={ps.size}
            onClick={() => onChange(ps.size)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 16px",
              borderRadius: 10,
              border: isSelected ? "2px solid #4C3494" : "1.5px solid #D8D0F0",
              background: isSelected ? "#EEE9FF" : "#fff",
              cursor: "pointer",
              transition: "all 0.15s",
              minWidth: 64,
              gap: 2,
            }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: 14,
                color: isSelected ? "#2D1B69" : "#5A5280",
                lineHeight: 1.2,
              }}
            >
              {ps.size}
            </span>
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontWeight: 400,
                fontSize: 10,
                color: isSelected ? "#4C3494" : "#9B92B8",
                lineHeight: 1.2,
              }}
            >
              {ps.pricePerLitre}
            </span>
          </button>
        );
      })}
    </div>
  );
}

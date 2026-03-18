import { Minus, Plus } from "lucide-react";

interface QuantityStepperProps {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
}

const SIZE_MAP = {
  sm: { h: 36, w: 36, inputW: 44, fontSize: 14, iconSize: 14 },
  md: { h: 44, w: 44, inputW: 52, fontSize: 16, iconSize: 16 },
  lg: { h: 48, w: 48, inputW: 60, fontSize: 18, iconSize: 18 },
};

export function QuantityStepper({ value, onChange, min = 1, max = 999, size = "md" }: QuantityStepperProps) {
  const s = SIZE_MAP[size];

  const btnStyle = (disabled: boolean): React.CSSProperties => ({
    width: s.w,
    height: s.h,
    borderRadius: 10,
    border: "1.5px solid #D8D0F0",
    background: disabled ? "#F5F3FF" : "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: disabled ? "not-allowed" : "pointer",
    color: disabled ? "#C8BEE8" : "#4C3494",
    transition: "all 0.15s",
    flexShrink: 0,
  });

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
      <button
        style={btnStyle(value <= min)}
        onClick={() => value > min && onChange(value - 1)}
        disabled={value <= min}
      >
        <Minus size={s.iconSize} />
      </button>
      <div
        style={{
          width: s.inputW,
          height: s.h,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderTop: "1.5px solid #D8D0F0",
          borderBottom: "1.5px solid #D8D0F0",
          fontFamily: "'DM Mono', monospace",
          fontWeight: 500,
          fontSize: s.fontSize,
          color: "#2D1B69",
          background: "#fff",
          userSelect: "none",
        }}
      >
        {value}
      </div>
      <button
        style={btnStyle(value >= max)}
        onClick={() => value < max && onChange(value + 1)}
        disabled={value >= max}
      >
        <Plus size={s.iconSize} />
      </button>
    </div>
  );
}

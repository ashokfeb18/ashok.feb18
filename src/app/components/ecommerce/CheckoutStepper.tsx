import { Check } from "lucide-react";

interface Step {
  label: string;
  description: string;
}

const STEPS: Step[] = [
  { label: "Delivery Address", description: "Shipping & billing" },
  { label: "Review Order", description: "Confirm items" },
  { label: "Confirm", description: "Place order" },
];

interface CheckoutStepperProps {
  currentStep: 1 | 2 | 3;
}

export function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 32 }}>
      {STEPS.map((step, idx) => {
        const stepNum = idx + 1;
        const isDone = stepNum < currentStep;
        const isActive = stepNum === currentStep;
        const isUpcoming = stepNum > currentStep;

        return (
          <div key={step.label} style={{ display: "flex", alignItems: "center", flex: idx < STEPS.length - 1 ? 1 : "none" }}>
            {/* Step circle + label */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  border: isDone ? "2px solid #38A169" : isActive ? "2px solid #4C3494" : "2px solid #D8D0F0",
                  background: isDone ? "#38A169" : isActive ? "#4C3494" : "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s",
                  flexShrink: 0,
                }}
              >
                {isDone ? (
                  <Check size={16} color="#fff" strokeWidth={2.5} />
                ) : (
                  <span
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: 14,
                      color: isActive ? "#fff" : "#9B92B8",
                    }}
                  >
                    {stepNum}
                  </span>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: isDone || isActive ? 700 : 500,
                    fontSize: 14,
                    color: isDone ? "#38A169" : isActive ? "#2D1B69" : "#9B92B8",
                  }}
                >
                  {step.label}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11,
                    color: "#9B92B8",
                  }}
                >
                  {step.description}
                </span>
              </div>
            </div>

            {/* Connector line */}
            {idx < STEPS.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: 2,
                  background: isDone ? "#38A169" : "#D8D0F0",
                  margin: "0 16px",
                  transition: "background 0.3s",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";

// ─── Types ────────────────────────────────────────────────────────────────────
type Role = "agent" | "dealer";
type BtnState = "idle" | "loading" | "success";

// ─── Data ─────────────────────────────────────────────────────────────────────
const STATS = [
  { value: "12K+", label: "Dealers" },
  { value: "98%", label: "Accuracy" },
  { value: "4.9★", label: "Rating" },
];

const FEATURES = [
  {
    emoji: "📦",
    title: "Order Entry",
    subtitle: "Place and manage dealer orders in seconds",
  },
  {
    emoji: "📊",
    title: "Dealer Tier Insights",
    subtitle: "Visualize tier progress and unlock rewards",
  },
  {
    emoji: "🎯",
    title: "Live Target Tracking",
    subtitle: "Real-time tracking against monthly targets",
  },
  {
    emoji: "🔔",
    title: "Smart Notifications",
    subtitle: "Alerts on stock, schemes & approvals",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function AsianPaintsLogo() {
  return (
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: 12,
        background: "linear-gradient(135deg, #4C3494 0%, #2D1B69 100%)",
        border: "1.5px solid rgba(255,255,255,0.18)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 16px rgba(76,52,148,0.5)",
        flexShrink: 0,
      }}
    >
      {/* Stylised AP monogram */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 20L9 6L14 20"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.5 14H11.5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M16 6H19C20.6569 6 22 7.34315 22 9C22 10.6569 20.6569 12 19 12H16V6Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M16 12V18" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function LeftPanel() {
  return (
    <div
      style={{
        padding: "64px 40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 0,
      }}
    >
      {/* Brand mark */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 48 }}>
        <AsianPaintsLogo />
        <div>
          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 22,
              color: "#fff",
              letterSpacing: "-0.3px",
              lineHeight: 1,
            }}
          >
            Myawaaz
          </div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: 10,
              color: "#A990E0",
              letterSpacing: "2.5px",
              marginTop: 4,
            }}
          >
            AGENT PORTAL
          </div>
        </div>
      </div>

      {/* Headline */}
      <div style={{ marginBottom: 20 }}>
        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(32px, 3.5vw, 46px)",
            lineHeight: 1.15,
            color: "#fff",
            margin: 0,
          }}
        >
          Sell smarter.
          <br />
          Grow{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #F5A623 0%, #FFD080 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            faster.
          </span>
        </h1>
      </div>

      {/* Subtext */}
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 400,
          fontSize: 15,
          color: "#A990E0",
          maxWidth: 320,
          lineHeight: 1.65,
          margin: "0 0 48px 0",
        }}
      >
        Your all-in-one workspace to manage dealers, track targets, and drive
        growth across Asian Paints' network.
      </p>

      {/* Stats row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          background: "rgba(255,255,255,0.04)",
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.08)",
          overflow: "hidden",
          width: "fit-content",
        }}
      >
        {STATS.map((stat, i) => (
          <div key={stat.label} style={{ display: "flex", alignItems: "stretch" }}>
            {i > 0 && (
              <div
                style={{
                  width: 1,
                  background: "rgba(255,255,255,0.1)",
                  alignSelf: "stretch",
                }}
              />
            )}
            <div
              style={{
                padding: "18px 28px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
              }}
            >
              <span
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: 22,
                  color: "#fff",
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 11,
                  color: "#A990E0",
                  letterSpacing: "0.5px",
                }}
              >
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureCard({ emoji, title, subtitle }: { emoji: string; title: string; subtitle: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: "18px 20px",
        display: "flex",
        alignItems: "flex-start",
        gap: 16,
        cursor: "default",
        transform: hovered ? "translateX(-4px)" : "translateX(0)",
        transition: "all 0.22s ease",
      }}
    >
      {/* Emoji badge */}
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 12,
          background: "rgba(76,52,148,0.5)",
          border: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          flexShrink: 0,
        }}
      >
        {emoji}
      </div>
      <div>
        <div
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: 14,
            color: "#fff",
            marginBottom: 4,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: 13,
            color: "#A990E0",
            lineHeight: 1.5,
          }}
        >
          {subtitle}
        </div>
      </div>
    </div>
  );
}

function RightPanel() {
  return (
    <div
      style={{
        padding: "64px 40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 0,
      }}
    >
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: 11,
            color: "#A990E0",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          Everything you need
        </div>
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: 20,
            color: "#fff",
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          Built for field agents,
          <br />
          <span style={{ color: "#A990E0" }}>designed for speed.</span>
        </h2>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {FEATURES.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </div>
    </div>
  );
}

// ─── Login Card ────────────────────────────────────────────────────────────────
function LoginCard() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("agent");
  const [empId, setEmpId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [btnState, setBtnState] = useState<BtnState>("idle");
  const [errors, setErrors] = useState<{ empId?: string; password?: string }>({});
  const [empIdFocused, setEmpIdFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const idLabel = role === "agent" ? "Employee ID" : "Dealer ID";
  const idPlaceholder = role === "agent" ? "e.g. AP-EMP-00421" : "e.g. DLR-MH-10234";

  function validate() {
    const errs: { empId?: string; password?: string } = {};
    if (!empId.trim()) errs.empId = `${idLabel} is required`;
    else if (empId.trim().length < 5) errs.empId = `${idLabel} must be at least 5 characters`;
    if (!password) errs.password = "Password is required";
    else if (password.length < 6) errs.password = "Password must be at least 6 characters";
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setBtnState("loading");
    timerRef.current = setTimeout(() => {
      setBtnState("success");
      timerRef.current = setTimeout(() => navigate("/dealer"), 800);
    }, 1800);
  }

  const inputBase: React.CSSProperties = {
    width: "100%",
    background: "#F8F5FF",
    borderWidth: "1.5px",
    borderStyle: "solid",
    borderColor: "#D8D0F0",
    borderRadius: 10,
    padding: "12px 14px 12px 44px",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 400,
    fontSize: 15,
    color: "#2D1B69",
    outline: "none",
    transition: "border-color 0.18s, box-shadow 0.18s",
    boxSizing: "border-box",
  };

  const inputFocusStyle: React.CSSProperties = {
    borderColor: "#4C3494",
    boxShadow: "0 0 0 3px rgba(76,52,148,0.18)",
  };

  const inputErrorStyle: React.CSSProperties = {
    borderColor: "#e53e3e",
    boxShadow: "0 0 0 3px rgba(229,62,62,0.12)",
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 16px" }}>
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "#fff",
          borderRadius: 24,
          boxShadow: "0 8px 64px rgba(45,27,105,0.28), 0 2px 16px rgba(45,27,105,0.18)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Gradient top border */}
        <div
          style={{
            height: 4,
            background: "linear-gradient(90deg, #4C3494 0%, #A990E0 50%, #F5A623 100%)",
          }}
        />

        <div style={{ padding: "44px 40px" }}>
          {/* Heading */}
          <div style={{ marginBottom: 28 }}>
            <h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: 26,
                color: "#2D1B69",
                margin: "0 0 6px 0",
                lineHeight: 1.2,
              }}
            >
              Welcome back 👋
            </h1>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: 14,
                color: "#7A6A9A",
                margin: 0,
              }}
            >
              Sign in to your {role === "agent" ? "agent" : "dealer"} account
            </p>
          </div>

          {/* Role toggle */}
          <div
            style={{
              background: "#F8F5FF",
              borderRadius: 12,
              padding: 4,
              display: "flex",
              gap: 4,
              marginBottom: 28,
            }}
          >
            {(["agent", "dealer"] as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => { setRole(r); setErrors({}); setEmpId(""); }}
                style={{
                  flex: 1,
                  padding: "9px 0",
                  borderRadius: 9,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 13,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 7,
                  transition: "all 0.2s ease",
                  ...(role === r
                    ? {
                        background: "#fff",
                        color: "#4C3494",
                        boxShadow: "0 2px 10px rgba(76,52,148,0.2)",
                      }
                    : {
                        background: "transparent",
                        color: "#9B8FC0",
                      }),
                }}
              >
                <span style={{ fontSize: 15 }}>{r === "agent" ? "🧑‍💼" : "🏪"}</span>
                {r === "agent" ? "Sales Agent" : "Dealer"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Employee / Dealer ID */}
            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: "block",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 11,
                  color: "#5A5280",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                {idLabel}
              </label>
              <div style={{ position: "relative" }}>
                {/* Card icon */}
                <span
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9B8FC0",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={empId}
                  onChange={(e) => { setEmpId(e.target.value); if (errors.empId) setErrors((p) => ({ ...p, empId: undefined })); }}
                  onFocus={() => setEmpIdFocused(true)}
                  onBlur={() => setEmpIdFocused(false)}
                  placeholder={idPlaceholder}
                  style={{
                    ...inputBase,
                    ...(empIdFocused ? inputFocusStyle : {}),
                    ...(errors.empId ? inputErrorStyle : {}),
                  }}
                />
              </div>
              {errors.empId && (
                <p style={{ margin: "6px 0 0 0", fontSize: 12, color: "#e53e3e", fontFamily: "'DM Sans', sans-serif" }}>
                  ⚠ {errors.empId}
                </p>
              )}
            </div>

            {/* Password */}
            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  display: "block",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 11,
                  color: "#5A5280",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                {/* Lock icon */}
                <span
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9B8FC0",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors((p) => ({ ...p, password: undefined })); }}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  placeholder="Enter your password"
                  style={{
                    ...inputBase,
                    paddingRight: 44,
                    ...(passwordFocused ? inputFocusStyle : {}),
                    ...(errors.password ? inputErrorStyle : {}),
                  }}
                />
                {/* Eye toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#9B8FC0",
                    padding: 4,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p style={{ margin: "6px 0 0 0", fontSize: 12, color: "#e53e3e", fontFamily: "'DM Sans', sans-serif" }}>
                  ⚠ {errors.password}
                </p>
              )}
            </div>

            {/* Remember me + Forgot */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  color: "#5A5280",
                  userSelect: "none",
                }}
              >
                <div
                  onClick={() => setRememberMe((v) => !v)}
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 5,
                    border: rememberMe ? "none" : "2px solid #C8BEE8",
                    background: rememberMe ? "#4C3494" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.18s",
                    flexShrink: 0,
                    cursor: "pointer",
                  }}
                >
                  {rememberMe && (
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                Remember me
              </label>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: 14,
                  color: "#4C3494",
                  textDecoration: "none",
                }}
              >
                Forgot password?
              </a>
            </div>

            {/* CTA Button */}
            <button
              type="submit"
              disabled={btnState !== "idle"}
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              style={{
                width: "100%",
                padding: "14px 0",
                borderRadius: 12,
                border: "none",
                cursor: btnState !== "idle" ? "default" : "pointer",
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: 16,
                color: "#fff",
                letterSpacing: "0.3px",
                background:
                  btnState === "success"
                    ? "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"
                    : "linear-gradient(135deg, #3D2680 0%, #4C3494 100%)",
                boxShadow:
                  btnState === "idle" && btnHovered
                    ? "0 6px 24px rgba(245,166,35,0.45)"
                    : btnState === "success"
                    ? "0 4px 20px rgba(34,197,94,0.4)"
                    : "0 4px 16px rgba(76,52,148,0.35)",
                transform: btnState === "idle" && btnHovered ? "translateY(-2px)" : "translateY(0)",
                transition: "all 0.22s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              {btnState === "loading" && (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{ animation: "spin 0.8s linear infinite" }}
                >
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
              )}
              {btnState === "success" && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17L4 12" />
                </svg>
              )}
              {btnState === "idle" && "Sign In →"}
              {btnState === "loading" && "Signing In..."}
              {btnState === "success" && "Welcome!"}
            </button>
          </form>

          {/* Help text */}
          <p
            style={{
              marginTop: 24,
              textAlign: "center",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: 13,
              color: "#9B8FC0",
            }}
          >
            Need help?{" "}
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{ color: "#4C3494", fontWeight: 500, textDecoration: "none" }}
            >
              Contact IT Support
            </a>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// ─── Background grid + orbs ───────────────────────────────────────────────────
function Background() {
  return (
    <>
      {/* Radial gradient orbs */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-20%",
            left: "-10%",
            width: "60vw",
            height: "60vw",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(76,52,148,0.35) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-15%",
            right: "-5%",
            width: "50vw",
            height: "50vw",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(45,27,105,0.5) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "55%",
            width: "30vw",
            height: "30vw",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245,166,35,0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Grid lines */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
    </>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
          fontSize: 11,
          color: "rgba(255,255,255,0.2)",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
        }}
      >
        Secured with TLS 1.3 · Asian Paints Internal
      </span>
    </div>
  );
}

// ─── Main export ────────────────────────────────────────────────────────��─────
export function LoginPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#1A0F3E",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <Background />

      {/* Three-column layout */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "1fr minmax(420px, 480px) 1fr",
          minHeight: "100vh",
          alignItems: "center",
        }}
        className="login-grid"
      >
        <LeftPanel />
        <LoginCard />
        <RightPanel />
      </div>

      <Footer />

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1024px) {
          .login-grid {
            grid-template-columns: 1fr !important;
            padding-bottom: 48px;
          }
        }
        @media (max-width: 768px) {
          .login-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
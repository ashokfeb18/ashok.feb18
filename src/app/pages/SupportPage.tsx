import { SharedLayout } from "../components/ecommerce/SharedLayout";
import { Headphones, MessageCircle, Phone, Mail } from "lucide-react";

export function SupportPage() {
  return (
    <SharedLayout>
      <div style={{ padding: "28px 32px", maxWidth: 800, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, color: "#1A0F3E", margin: "0 0 4px" }}>Support</h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#9B92B8", margin: "0 0 28px" }}>
          Get help from the Asian Paints dealer support team.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { icon: <Phone size={24} color="#4C3494" />, title: "Call Us", desc: "1800-209-5678", sub: "Mon–Sat, 9am–6pm" },
            { icon: <Mail size={24} color="#4C3494" />, title: "Email", desc: "dealer@asianpaints.com", sub: "Reply within 24 hrs" },
            { icon: <MessageCircle size={24} color="#4C3494" />, title: "Live Chat", desc: "Chat with an agent", sub: "Available now" },
          ].map(c => (
            <div key={c.title} style={{ background: "#fff", border: "1px solid #D8D0F0", borderRadius: 14, padding: "24px 20px", boxShadow: "0 2px 12px rgba(76,52,148,0.07)", textAlign: "center" }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: "#EEE9FF", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>{c.icon}</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: "#1A0F3E", marginBottom: 6 }}>{c.title}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#4C3494", marginBottom: 4 }}>{c.desc}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#9B92B8" }}>{c.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </SharedLayout>
  );
}

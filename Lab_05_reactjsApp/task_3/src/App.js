import { useState } from "react";

const greetings = [
  { name: "Tayyab", timeOfDay: "morning", bgColor: "#2d0b4e" },
  { name: "Hassan", timeOfDay: "afternoon", bgColor: "#7a1f0e" },
  { name: "Musab", timeOfDay: "evening", bgColor: "#1a0533" },
  { name: "Sir Sharif", timeOfDay: "night", bgColor: "#0d0221" },
];

const timeConfig = {
  morning: {
    emoji: "🌄",
    label: "Good Morning",
    message: "Rise and shine! A beautiful day awaits you.",
    accent: "#FFB347",
    tag: "MORNING",
  },
  afternoon: {
    emoji: "☀️",
    label: "Good Afternoon",
    message: "Hope your day is going wonderfully well!",
    accent: "#FF6B35",
    tag: "AFTERNOON",
  },
  evening: {
    emoji: "🌇",
    label: "Good Evening",
    message: "Relax and enjoy the golden hour.",
    accent: "#FF4E8A",
    tag: "EVENING",
  },
  night: {
    emoji: "🌙",
    label: "Good Night",
    message: "Rest well and dream of great things.",
    accent: "#A855F7",
    tag: "NIGHT",
  },
};

const Greeting = ({ name, timeOfDay, bgColor }) => {
  const [hovered, setHovered] = useState(false);
  const config = timeConfig[timeOfDay] || timeConfig["morning"];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: `linear-gradient(135deg, ${bgColor} 0%, #1a0533 100%)`,
        border: "1px solid",
        borderColor: hovered ? config.accent : "#ffffff18",
        borderRadius: "20px",
        padding: "32px 28px",
        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 20px 40px ${config.accent}33`
          : "0 4px 20px rgba(0,0,0,0.4)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow Orb */}
      <div style={{
        position: "absolute",
        top: "-40px",
        right: "-40px",
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${config.accent}44, transparent 70%)`,
        transition: "all 0.35s ease",
        transform: hovered ? "scale(1.5)" : "scale(1)",
      }} />

      {/* Time Tag */}
      <div style={{
        display: "inline-block",
        background: `${config.accent}22`,
        border: `1px solid ${config.accent}55`,
        borderRadius: "20px",
        padding: "4px 14px",
        fontFamily: "'DM Mono', monospace",
        fontSize: "0.68rem",
        color: config.accent,
        letterSpacing: "0.15em",
        marginBottom: "20px",
      }}>
        {config.tag}
      </div>

      <div style={{ fontSize: "2.8rem", marginBottom: "12px", lineHeight: 1 }}>
        {config.emoji}
      </div>

      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.6rem",
        fontWeight: "800",
        color: "#fff",
        marginBottom: "6px",
        lineHeight: 1.2,
      }}>
        {config.label},
      </h2>

      <h3 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "2rem",
        fontWeight: "900",
        background: `linear-gradient(135deg, ${config.accent}, #fff)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        marginBottom: "14px",
        lineHeight: 1.1,
      }}>
        {name}!
      </h3>

      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.88rem",
        color: "#ffffff88",
        lineHeight: 1.6,
        fontWeight: "300",
      }}>
        {config.message}
      </p>

      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "3px",
        background: `linear-gradient(90deg, transparent, ${config.accent}, transparent)`,
        opacity: hovered ? 1 : 0.3,
        transition: "opacity 0.35s ease",
      }} />
    </div>
  );
};

export default function GreetingApp() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0d0221; }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at top, #2d0b4e 0%, #0d0221 60%)",
        padding: "52px 24px",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>

          {/* Header */}
          <div style={{
            textAlign: "center",
            marginBottom: "52px",
            animation: "fadeDown 0.6s ease forwards",
          }}>
            <p style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.25em",
              color: "#FF6B3588",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}>
              Greetings App · Lab Task 3 by Tayyab Ahmed Janjua
            </p>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
              fontWeight: "900",
              lineHeight: 1.1,
              background: "linear-gradient(135deg, #FF6B35 0%, #FFB347 40%, #FF4E8A 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmer 4s linear infinite",
            }}>
              Greetings App 🌅
            </h1>
            <p style={{
              color: "#ffffff44",
              fontSize: "0.88rem",
              marginTop: "12px",
              fontWeight: "300",
              letterSpacing: "0.05em",
            }}>
              Personalized greetings based on time of day
            </p>
          </div>

          {/* Greeting Cards Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            animation: "fadeUp 0.7s ease forwards",
          }}>
            {greetings.map((g, index) => (
              <Greeting
                key={index}
                name={g.name}
                timeOfDay={g.timeOfDay}
                bgColor={g.bgColor}
              />
            ))}
          </div>

          {/* Footer */}
          <p style={{
            textAlign: "center",
            color: "#ffffff18",
            fontSize: "0.72rem",
            marginTop: "52px",
            fontFamily: "'DM Mono', monospace",
            letterSpacing: "0.1em",
          }}>
            ✦ Built with React · Conditional Rendering & Props ✦
          </p>

        </div>
      </div>
    </>
  );
}
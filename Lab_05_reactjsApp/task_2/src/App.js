import { useState } from "react";

const courses = [
  { id: 1, courseName: "React & Modern JavaScript", instructor: "Sir Sharif Hussain", duration: "8 weeks", type: "Online" },
  { id: 2, courseName: "UI/UX Design Fundamentals", instructor: "Sir Anas Bilal", duration: "6 weeks", type: "Offline" },
  { id: 3, courseName: "Generative AI ", instructor: "Dr Humaiza Waqas", duration: "10 weeks", type: "Online" },
  { id: 4, courseName: "Mobile Development", instructor: "Dr Adnan Aslam", duration: "12 weeks", type: "Offline" },
  { id: 5, courseName: "Machine Learning Basics", instructor: "Dr Imran Ihsan", duration: "9 weeks", type: "Online" },
];

const CourseItem = ({ courseName, instructor, duration, type, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "4px 1fr auto",
        gap: "0 20px",
        alignItems: "stretch",
        background: hovered ? "#0f1a3d" : "#0A0E2A",
        border: "1px solid",
        borderColor: hovered ? "#FFD700" : "#1e2a5a",
        borderRadius: "14px",
        padding: "24px",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        transform: hovered ? "translateX(6px)" : "translateX(0)",
        boxShadow: hovered ? "0 0 24px rgba(255, 215, 0, 0.12)" : "none",
        animationDelay: `${index * 0.1}s`,
        animation: "slideIn 0.5s ease forwards",
        opacity: 0,
      }}
    >
      <div style={{
        background: "linear-gradient(180deg, #FFD700, #FFA500)",
        borderRadius: "4px",
        minHeight: "100%",
      }} />

      <div>
        <div style={{ marginBottom: "10px" }}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.15rem",
            fontWeight: "700",
            color: "#E8E8FF",
            lineHeight: 1.3,
          }}>
            {courseName}
          </span>
        </div>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <span style={{ color: "#7a85b8", fontSize: "0.82rem", fontFamily: "'DM Mono', monospace" }}>
            👤 {instructor}
          </span>
          <span style={{ color: "#7a85b8", fontSize: "0.82rem", fontFamily: "'DM Mono', monospace" }}>
            ⏱ {duration}
          </span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{
          background: type === "Online"
            ? "rgba(255, 215, 0, 0.12)"
            : "rgba(255, 165, 0, 0.12)",
          color: type === "Online" ? "#FFD700" : "#FFA500",
          border: `1px solid ${type === "Online" ? "#FFD70040" : "#FFA50040"}`,
          borderRadius: "20px",
          padding: "5px 14px",
          fontSize: "0.72rem",
          fontFamily: "'DM Mono', monospace",
          fontWeight: "600",
          letterSpacing: "0.08em",
          whiteSpace: "nowrap",
        }}>
          {type === "Online" ? "● ONLINE" : "◆ OFFLINE"}
        </span>
      </div>
    </div>
  );
};

export default function CourseListApp() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #060918; }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at top, #0f1a4a 0%, #060918 60%)",
        padding: "48px 24px",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <div style={{ maxWidth: "740px", margin: "0 auto" }}>

          <div style={{ marginBottom: "48px", animation: "fadeDown 0.6s ease forwards" }}>
            <p style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.25em",
              color: "#FFD70088",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}>
              Course List App · Lab Task 2 by Tayyab Janjua 231736
            </p>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.4rem, 5vw, 3.4rem)",
              fontWeight: "900",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              background: "linear-gradient(135deg, #FFD700 0%, #FFF8DC 50%, #FFA500 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmer 4s linear infinite",
            }}>
              Explore<br />Courses
            </h1>
            <p style={{
              color: "#4a5580",
              fontSize: "0.88rem",
              marginTop: "14px",
              fontWeight: "300",
              letterSpacing: "0.03em",
            }}>
              {courses.length} courses available — online & offline
            </p>
          </div>

          {/* Stats Row */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "12px",
            marginBottom: "32px",
          }}>
            {[
              { label: "Total Courses", value: courses.length },
              { label: "Online", value: courses.filter(c => c.type === "Online").length },
              { label: "Offline", value: courses.filter(c => c.type === "Offline").length },
            ].map((stat) => (
              <div key={stat.label} style={{
                background: "linear-gradient(135deg, #0d1535, #0a1128)",
                border: "1px solid #1e2a5a",
                borderRadius: "12px",
                padding: "18px",
                textAlign: "center",
              }}>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: "#FFD700",
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.68rem",
                  color: "#4a5580",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginTop: "4px",
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, #FFD70033, transparent)",
            marginBottom: "28px",
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {courses.map((course, index) => (
              <CourseItem key={course.id} {...course} index={index} />
            ))}
          </div>

          <p style={{
            textAlign: "center",
            color: "#1e2a5a",
            fontSize: "0.72rem",
            marginTop: "48px",
            fontFamily: "'DM Mono', monospace",
            letterSpacing: "0.1em",
          }}>
          </p>

        </div>
      </div>
    </>
  );
}
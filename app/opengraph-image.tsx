import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Akansha Lakhina — AI & Full-Stack Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const stats = [
    ["18", "agent AI video editor"],
    ["2,500+", "tests written"],
    ["40,000+", "AFE applicants · 1 scholar"],
  ];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(circle at 78% 40%, #2a2160 0%, #07070A 55%)",
          color: "#EDEDF2",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, color: "#C8FF3D" }}>
          <div style={{ width: 12, height: 12, borderRadius: 12, background: "#C8FF3D" }} />
          Open to SWE & AI-engineering roles
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 120, fontWeight: 700, letterSpacing: -6, lineHeight: 1 }}>Akansha Lakhina</div>
          <div style={{ fontSize: 40, color: "#A6A6B4", marginTop: 18 }}>
            AI & full-stack engineer — multi-agent systems, guard-railed LLMs
          </div>
        </div>
        <div style={{ display: "flex", gap: 56 }}>
          {stats.map(([v, l]) => (
            <div key={l} style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 52, fontWeight: 700, color: "#C8FF3D" }}>{v}</div>
              <div style={{ fontSize: 22, color: "#6C6C7A" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}

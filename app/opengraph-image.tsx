import { ImageResponse } from "next/og";

export const alt = "Andrea Marie Shenocca | Financial Advisor & Broker";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#071426",
        color: "#f5f1e8",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        padding: "70px",
        width: "100%",
      }}
    >
      <div style={{ border: "2px solid #d7b541", display: "flex", height: "100%", width: "100%", alignItems: "center", padding: "64px" }}>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "900px" }}>
          <div style={{ color: "#d7b541", fontSize: 24, letterSpacing: 7, textTransform: "uppercase" }}>Wealth Management</div>
          <div style={{ display: "flex", fontFamily: "Georgia, serif", fontSize: 76, gap: 20, lineHeight: 1.05, marginTop: 28 }}><span>Andrea Marie</span><span style={{ color: "#d7b541" }}>Shenocca</span></div>
          <div style={{ color: "#b6c4da", fontSize: 28, letterSpacing: 2, marginTop: 30 }}>Financial Advisor &amp; Broker</div>
        </div>
      </div>
    </div>,
    size,
  );
}

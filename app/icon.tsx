import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#071426", border: "3px solid #d7b541", color: "#d7b541", fontFamily: "serif", fontSize: 24, fontWeight: 600, letterSpacing: "-1px" }}>AS</div>,
    size,
  );
}

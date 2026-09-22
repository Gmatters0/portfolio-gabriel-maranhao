import { ImageResponse } from "next/og";
import { portfolio } from "@/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#090c13",
          color: "#f7f8fa",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 64,
            height: 8,
            borderRadius: 4,
            background: "#c2410c",
            marginBottom: 32,
          }}
        />
        <div style={{ display: "flex", fontSize: 64, fontWeight: 700 }}>{portfolio.nome}</div>
        <div style={{ display: "flex", fontSize: 32, color: "#9aa3b8", marginTop: 20 }}>
          {portfolio.headline}
        </div>
      </div>
    ),
    { ...size }
  );
}

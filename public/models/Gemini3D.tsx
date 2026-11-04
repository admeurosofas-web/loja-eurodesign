
"use client";

import { createElement } from "react";
import Script from "next/script";

export default function Gemini3D() {
  return (
    <>
      <Script
        src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.1.0/model-viewer.min.js"
        type="module"
        strategy="afterInteractive"
      />
      {createElement("model-viewer", {
        src: "/models/Gemini-HQ-Couro-Bege.glb",
        alt: "Poltrona Gemini em couro bege",
        "camera-controls": true,
        "auto-rotate": true,
        "rotation-per-second": "12deg",
        "shadow-intensity": "0.7",
        "shadow-softness": "0.9",
        exposure: "1.15",
        "environment-image": "neutral",
        "interaction-prompt": "auto",
        style: {
          width: "100%",
          height: "520px",
          background: "transparent",
        },
      })}
    </>
  );
}

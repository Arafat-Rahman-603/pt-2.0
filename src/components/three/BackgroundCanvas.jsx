"use client";
import dynamic from "next/dynamic";

// WebGL is client-only and non-critical → load after hydration, never block LCP.
const BackgroundScene = dynamic(() => import("./BackgroundScene"), {
  ssr: false,
  loading: () => null,
});

export default function BackgroundCanvas() {
  return (
    <div className="bg-canvas" aria-hidden="true">
      {/* static gradient shown instantly; WebGL fades in on top */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(34,211,238,0.10),transparent_50%),radial-gradient(ellipse_at_90%_30%,rgba(129,140,248,0.10),transparent_45%),radial-gradient(ellipse_at_50%_100%,rgba(192,132,252,0.08),transparent_50%)]" />
      <BackgroundScene />
    </div>
  );
}

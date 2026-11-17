"use client";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Portrait3D = dynamic(() => import("./Portrait3D"), { ssr: false, loading: () => null });

let webglSupport;
function hasWebGL() {
  if (webglSupport !== undefined) return webglSupport;
  try {
    const c = document.createElement("canvas");
    webglSupport = !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}
const noopSubscribe = () => () => {};

/**
 * Shows the optimized static avatar instantly (LCP-friendly), then swaps to
 * the interactive WebGL depth portrait once its textures are ready.
 * The render loop pauses whenever the hero is off-screen.
 */
export default function PortraitStage({ portrait, className }) {
  const ref = useRef(null);
  const webgl = useSyncExternalStore(noopSubscribe, hasWebGL, () => false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "100px" });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const onReady = useCallback(() => setReady(true), []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* glow behind the figure */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[42%] aspect-square w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.35),rgba(129,140,248,0.18)_45%,transparent_70%)] blur-2xl"
      />

      <Image
        src={portrait.image}
        alt={portrait.alt}
        fill
        priority
        fetchPriority="high"
        sizes="(min-width: 1024px) 40vw, 80vw"
        className={cn(
          "object-contain object-bottom transition-opacity duration-700 [mask-image:linear-gradient(to_top,transparent,#000_14%)]",
          ready ? "opacity-0" : "opacity-100"
        )}
      />

      {webgl && (
        <div className={cn("absolute inset-0 transition-opacity duration-700", ready ? "opacity-100" : "opacity-0")} aria-hidden="true">
          <Portrait3D image={portrait.image} depth={portrait.depth} active={visible} onReady={onReady} />
        </div>
      )}
    </div>
  );
}

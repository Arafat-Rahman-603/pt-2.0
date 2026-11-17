"use client";
/*
 * three.js buffers / camera are mutated imperatively inside useFrame —
 * that's the intended react-three-fiber pattern, so the React-Compiler
 * purity/immutability lint rules are disabled for this file only.
 */
/* eslint-disable react-hooks/immutability, react-hooks/purity */
import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, AdaptiveDpr } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const CONNECTION_DIST_SQ = 5;
const MAX_CONNECTIONS = 110;
const PALETTE = [
  [0.133, 0.827, 0.933],
  [0.231, 0.51, 0.965],
  [0.545, 0.361, 0.965],
  [0.753, 0.518, 0.988],
];

/* Shared, allocation-free input state (one listener for the whole scene) */
const input = { mx: 0, my: 0, scroll: 0 };

function useGlobalInput() {
  useEffect(() => {
    const onMove = (e) => {
      input.mx = (e.clientX / window.innerWidth) * 2 - 1;
      input.my = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      input.scroll = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
}

function ParticleNetwork({ count }) {
  const points = useRef();
  const lines = useRef();
  const frame = useRef(0);
  const { viewport } = useThree();

  const { positions, velocities, colors } = useMemo(() => {
    const p = new Float32Array(count * 3);
    const v = new Float32Array(count * 3);
    const c = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      p[i3] = (Math.random() - 0.5) * 18;
      p[i3 + 1] = (Math.random() - 0.5) * 16;
      p[i3 + 2] = (Math.random() - 0.5) * 8;
      v[i3] = (Math.random() - 0.5) * 0.004;
      v[i3 + 1] = (Math.random() - 0.5) * 0.004;
      v[i3 + 2] = (Math.random() - 0.5) * 0.002;
      const col = PALETTE[i % PALETTE.length];
      c.set(col, i3);
    }
    return { positions: p, velocities: v, colors: c };
  }, [count]);

  const linePos = useMemo(() => new Float32Array(MAX_CONNECTIONS * 6), []);
  const lineCol = useMemo(() => new Float32Array(MAX_CONNECTIONS * 6), []);

  useFrame(() => {
    if (!points.current) return;
    const pos = points.current.geometry.attributes.position.array;
    const mx = input.mx * viewport.width * 0.35;
    const my = input.my * viewport.height * 0.35;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] += velocities[i3];
      pos[i3 + 1] += velocities[i3 + 1];
      pos[i3 + 2] += velocities[i3 + 2];
      const dx = mx - pos[i3];
      const dy = my - pos[i3 + 1];
      if (dx * dx + dy * dy < 16) {
        pos[i3] += dx * 0.0025;
        pos[i3 + 1] += dy * 0.0025;
      }
      if (pos[i3] > 9 || pos[i3] < -9) velocities[i3] *= -1;
      if (pos[i3 + 1] > 8 || pos[i3 + 1] < -8) velocities[i3 + 1] *= -1;
      if (pos[i3 + 2] > 4 || pos[i3 + 2] < -4) velocities[i3 + 2] *= -1;
    }
    points.current.geometry.attributes.position.needsUpdate = true;

    // Rebuild connection lines every 3rd frame
    if (lines.current && ++frame.current % 3 === 0) {
      let li = 0;
      for (let i = 0; i < count && li < MAX_CONNECTIONS; i++) {
        const i3 = i * 3;
        for (let j = i + 1; j < count && li < MAX_CONNECTIONS; j++) {
          const j3 = j * 3;
          const ddx = pos[i3] - pos[j3];
          const ddy = pos[i3 + 1] - pos[j3 + 1];
          const ddz = pos[i3 + 2] - pos[j3 + 2];
          const d = ddx * ddx + ddy * ddy + ddz * ddz;
          if (d < CONNECTION_DIST_SQ) {
            const a = 1 - d / CONNECTION_DIST_SQ;
            const k = li * 6;
            linePos[k] = pos[i3]; linePos[k + 1] = pos[i3 + 1]; linePos[k + 2] = pos[i3 + 2];
            linePos[k + 3] = pos[j3]; linePos[k + 4] = pos[j3 + 1]; linePos[k + 5] = pos[j3 + 2];
            const r = 0.15 * a, g = 0.65 * a, b = 0.95 * a;
            lineCol[k] = r; lineCol[k + 1] = g; lineCol[k + 2] = b;
            lineCol[k + 3] = r; lineCol[k + 4] = g; lineCol[k + 5] = b;
            li++;
          }
        }
      }
      lines.current.geometry.attributes.position.needsUpdate = true;
      lines.current.geometry.attributes.color.needsUpdate = true;
      lines.current.geometry.setDrawRange(0, li * 2);
    }
  });

  return (
    <>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.07} vertexColors transparent opacity={0.9} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
      <lineSegments ref={lines}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePos, 3]} />
          <bufferAttribute attach="attributes-color" args={[lineCol, 3]} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
    </>
  );
}

/** Camera drifts with the cursor and dives/rotates as you scroll the page. */
function CameraRig({ followMouse }) {
  const { camera } = useThree();
  useFrame((_, dt) => {
    const k = Math.min(1, dt * 2.5);
    const tx = followMouse ? input.mx * 0.5 : 0;
    const ty = followMouse ? input.my * 0.35 : 0;
    camera.position.x += (tx - camera.position.x) * k;
    camera.position.y += (ty - camera.position.y) * k;
    camera.position.z += (8 - input.scroll * 3 - camera.position.z) * k;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/** Slowly rotates the whole field as the page scrolls → depth while scrolling. */
function ScrollGroup({ children }) {
  const group = useRef();
  useFrame((_, dt) => {
    if (!group.current) return;
    const k = Math.min(1, dt * 2);
    const g = group.current;
    g.rotation.z += ((input.scroll * Math.PI) / 4 - g.rotation.z) * k;
    g.rotation.x += ((input.scroll * Math.PI) / 8 - g.rotation.x) * k;
  });
  return <group ref={group}>{children}</group>;
}

export default function BackgroundScene() {
  const mobile = useMediaQuery("(max-width: 767px)");
  const reduce = !!useReducedMotion();
  const cfg = { count: mobile ? 32 : 72, stars: mobile ? 500 : 1400, follow: !mobile, reduce };

  useGlobalInput();

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      dpr={[1, 1.25]}
      frameloop={cfg.reduce ? "demand" : "always"}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance", stencil: false, depth: false }}
      performance={{ min: 0.4 }}
      style={{ position: "absolute", inset: 0 }}
      onCreated={({ gl }) => {
        gl.domElement.style.opacity = "0";
        gl.domElement.style.transition = "opacity 1.2s ease";
        requestAnimationFrame(() => (gl.domElement.style.opacity = "1"));
      }}
    >
      <AdaptiveDpr pixelated />
      <fog attach="fog" args={["#030712", 9, 22]} />
      <ScrollGroup>
        <Stars radius={100} depth={50} count={cfg.stars} factor={4} saturation={0.15} fade speed={cfg.reduce ? 0 : 0.4} />
        <ParticleNetwork count={cfg.count} />
      </ScrollGroup>
      <CameraRig followMouse={cfg.follow} />
    </Canvas>
  );
}

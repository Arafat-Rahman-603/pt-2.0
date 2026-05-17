"use client";
import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";

const DESKTOP_PARTICLES = 70;
const MOBILE_PARTICLES = 30;
const CONNECTION_DIST_SQ = 5.0;
const MAX_CONNECTIONS = 100;
const LINE_UPDATE_INTERVAL = 3;

function getParticleCount() {
  if (typeof window === "undefined") return DESKTOP_PARTICLES;
  return window.innerWidth < 768 ? MOBILE_PARTICLES : DESKTOP_PARTICLES;
}

function Particles({ count }) {
  const mesh = useRef();
  const lines = useRef();
  const mousePos = useRef({ x: 0, y: 0 });
  const frame = useRef(0);
  const { viewport } = useThree();

  const { positions, velocities, colors } = useMemo(() => {
    const p = new Float32Array(count * 3);
    const v = new Float32Array(count * 3);
    const c = new Float32Array(count * 3);

    const pal = [
      [0.133, 0.827, 0.933],
      [0.231, 0.510, 0.965],
      [0.545, 0.361, 0.965],
      [0.024, 0.714, 0.831],
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      p[i3] = (Math.random() - 0.5) * 16;
      p[i3 + 1] = (Math.random() - 0.5) * 16;
      p[i3 + 2] = (Math.random() - 0.5) * 8;
      v[i3] = (Math.random() - 0.5) * 0.004;
      v[i3 + 1] = (Math.random() - 0.5) * 0.004;
      v[i3 + 2] = (Math.random() - 0.5) * 0.002;
      const col = pal[(i * 7) % pal.length];
      c[i3] = col[0]; c[i3 + 1] = col[1]; c[i3 + 2] = col[2];
    }
    return { positions: p, velocities: v, colors: c };
  }, [count]);

  const linePos = useMemo(() => new Float32Array(MAX_CONNECTIONS * 6), []);
  const lineCol = useMemo(() => new Float32Array(MAX_CONNECTIONS * 6), []);

  useEffect(() => {
    const h = (e) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", h, { passive: true });
    return () => window.removeEventListener("mousemove", h);
  }, []);

  useFrame(() => {
    if (!mesh.current) return;
    const pos = mesh.current.geometry.attributes.position.array;
    const vel = velocities;
    const mx = mousePos.current.x * viewport.width * 0.3;
    const my = mousePos.current.y * viewport.height * 0.3;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] += vel[i3];
      pos[i3 + 1] += vel[i3 + 1];
      pos[i3 + 2] += vel[i3 + 2];

      const dx = mx - pos[i3];
      const dy = my - pos[i3 + 1];
      if (dx * dx + dy * dy < 20) {
        pos[i3] += dx * 0.002;
        pos[i3 + 1] += dy * 0.002;
      }

      if (pos[i3] > 8 || pos[i3] < -8) vel[i3] *= -1;
      if (pos[i3 + 1] > 8 || pos[i3 + 1] < -8) vel[i3 + 1] *= -1;
      if (pos[i3 + 2] > 4 || pos[i3 + 2] < -4) vel[i3 + 2] *= -1;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;

    frame.current++;
    if (lines.current && frame.current % LINE_UPDATE_INTERVAL === 0) {
      const lp = linePos;
      const lc = lineCol;
      let li = 0;

      for (let i = 0; i < count && li < MAX_CONNECTIONS; i++) {
        const i3 = i * 3;
        const px = pos[i3], py = pos[i3 + 1], pz = pos[i3 + 2];
        for (let j = i + 1; j < count && li < MAX_CONNECTIONS; j++) {
          const j3 = j * 3;
          const ddx = px - pos[j3], ddy = py - pos[j3 + 1], ddz = pz - pos[j3 + 2];
          const dSq = ddx * ddx + ddy * ddy + ddz * ddz;
          if (dSq < CONNECTION_DIST_SQ) {
            const a = 1 - dSq / CONNECTION_DIST_SQ;
            const k = li * 6;
            lp[k] = px; lp[k+1] = py; lp[k+2] = pz;
            lp[k+3] = pos[j3]; lp[k+4] = pos[j3+1]; lp[k+5] = pos[j3+2];
            const r = 0.13*a, g = 0.7*a, b = 0.9*a;
            lc[k]=r; lc[k+1]=g; lc[k+2]=b; lc[k+3]=r; lc[k+4]=g; lc[k+5]=b;
            li++;
          }
        }
      }

      for (let i = li * 6; i < lp.length; i++) { lp[i] = 0; lc[i] = 0; }
      lines.current.geometry.attributes.position.needsUpdate = true;
      lines.current.geometry.attributes.color.needsUpdate = true;
      lines.current.geometry.setDrawRange(0, li * 2);
    }
  });

  return (
    <>
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.08} vertexColors transparent opacity={0.9} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
      <lineSegments ref={lines}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={MAX_CONNECTIONS * 2} array={linePos} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={MAX_CONNECTIONS * 2} array={lineCol} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.18} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
    </>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const t = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const h = (e) => {
      t.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      t.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", h, { passive: true });
    return () => window.removeEventListener("mousemove", h);
  }, []);

  useFrame(() => {
    camera.position.x += (t.current.x * 0.4 - camera.position.x) * 0.01;
    camera.position.y += (t.current.y * 0.3 - camera.position.y) * 0.01;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function Background3D() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setConfig({
      count: isMobile ? MOBILE_PARTICLES : DESKTOP_PARTICLES,
      stars: isMobile ? 500 : 1200,
      showCameraRig: !isMobile,
    });
  }, []);

  if (!config) {
    return <div className="bg3d-canvas-wrapper" style={{ background: "#030712" }} />;
  }

  return (
    <div className="bg3d-canvas-wrapper">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.2]}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: false,
        }}
        performance={{ min: 0.3 }}
      >
        <AdaptiveDpr pixelated />
        <color attach="background" args={["#030712"]} />
        <fog attach="fog" args={["#030712", 10, 22]} />
        <Stars radius={100} depth={50} count={config.stars} factor={4} saturation={0.1} fade speed={0.3} />
        <Particles count={config.count} />
        {config.showCameraRig && <CameraRig />}
      </Canvas>
    </div>
  );
}

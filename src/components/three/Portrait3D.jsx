"use client";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* ────────────────────────────────────────────────────────────
   2.5D "3D portrait": a dense plane displaced by a depth map,
   lit by the cursor, with a holographic scan-in reveal.
   ──────────────────────────────────────────────────────────── */

const vertexShader = /* glsl */ `
  uniform sampler2D uDepth;
  uniform float uStrength;
  uniform float uTime;
  uniform float uBreath;
  varying vec2 vUv;
  varying float vDepth;

  void main() {
    vUv = uv;
    float d = texture2D(uDepth, uv).r;
    vDepth = d;
    vec3 p = position;
    p.z += d * uStrength;
    // subtle "breathing" on the chest / shoulders
    p.z += sin(uTime * 1.4) * 0.012 * d * smoothstep(0.75, 0.2, uv.y) * uBreath;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uMap;
  uniform sampler2D uDepth;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uReveal;
  uniform vec2 uTexel;
  varying vec2 vUv;
  varying float vDepth;

  void main() {
    vec4 tex = texture2D(uMap, vUv);

    // soft fade where the body is cropped at the bottom edge
    float bottomFade = smoothstep(0.0, 0.14, vUv.y);
    float alpha = tex.a * bottomFade;

    // holographic scan-in (bottom → top)
    float front = uReveal * 1.15 - 0.075;
    float revealed = step(vUv.y, front);
    float scanLine = smoothstep(0.06, 0.0, abs(vUv.y - front)) * (1.0 - step(1.0, uReveal));
    alpha *= max(revealed, scanLine * 0.9);
    if (alpha < 0.01) discard;

    // normal from depth gradient (smooth, sampled from the blurred depth map)
    float dx = texture2D(uDepth, vUv + vec2(uTexel.x, 0.0)).r - texture2D(uDepth, vUv - vec2(uTexel.x, 0.0)).r;
    float dy = texture2D(uDepth, vUv + vec2(0.0, uTexel.y)).r - texture2D(uDepth, vUv - vec2(0.0, uTexel.y)).r;
    vec3 n = normalize(vec3(-dx * 6.0, -dy * 6.0, 1.0));

    vec3 L = normalize(vec3(uMouse.x * 1.2, uMouse.y * 1.2, 0.9));
    float diff = max(dot(n, L), 0.0);
    float rim = pow(1.0 - n.z, 1.6);

    vec3 col = tex.rgb;
    col *= 0.88 + diff * 0.22;                                  // cursor key light
    vec3 rimCol = mix(vec3(0.13, 0.83, 0.93), vec3(0.65, 0.55, 0.98), vUv.x);
    col += rimCol * rim * 0.55;                                 // neon rim light
    col += vec3(0.4, 0.9, 1.0) * scanLine * 0.8;                // scan glow

    // faint hologram scanlines
    col *= 0.97 + 0.03 * sin(vUv.y * 900.0 + uTime * 4.0);

    gl_FragColor = vec4(col, alpha);
    #include <colorspace_fragment>
  }
`;

/* pointer shared between frames, normalized -1..1 over the whole window */
const pointer = { x: 0, y: 0 };

function PortraitMesh({ image, depth, reduce, onReady }) {
  const [map, depthMap] = useTexture([image, depth], ([m, d]) => {
    m.colorSpace = THREE.SRGBColorSpace;
    m.anisotropy = 4;
    d.colorSpace = THREE.NoColorSpace;
  });
  const group = useRef();
  const material = useRef();
  const start = useRef(null);

  const { width, height } = useMemo(() => {
    const aspect = map.image.width / map.image.height;
    const h = 2.45;
    return { width: h * aspect, height: h };
  }, [map]);

  const uniforms = useMemo(
    () => ({
      uMap: { value: map },
      uDepth: { value: depthMap },
      uStrength: { value: 0.42 },
      uTime: { value: 0 },
      uBreath: { value: reduce ? 0 : 1 },
      uMouse: { value: new THREE.Vector2(0.3, 0.4) },
      uReveal: { value: reduce ? 1 : 0 },
      uTexel: { value: new THREE.Vector2(2 / depthMap.image.width, 2 / depthMap.image.height) },
    }),
    [map, depthMap, reduce]
  );

  useEffect(() => {
    onReady?.();
  }, [onReady]);

  useFrame((state, dt) => {
    const u = material.current?.uniforms;
    if (!u || !group.current) return;
    const t = state.clock.elapsedTime;
    if (start.current === null) start.current = t;
    u.uTime.value = t;
    if (!reduce) u.uReveal.value = Math.min(1, (t - start.current) / 1.8);

    // light follows cursor (smoothed)
    const k = Math.min(1, dt * 4);
    u.uMouse.value.x += (pointer.x - u.uMouse.value.x) * k;
    u.uMouse.value.y += (pointer.y - u.uMouse.value.y) * k;

    if (reduce) return;
    // head-turn toward cursor + idle sway
    const g = group.current;
    const targetY = pointer.x * 0.38 + Math.sin(t * 0.6) * 0.06;
    const targetX = -pointer.y * 0.18 + Math.sin(t * 0.8) * 0.02;
    g.rotation.y += (targetY - g.rotation.y) * Math.min(1, dt * 3);
    g.rotation.x += (targetX - g.rotation.x) * Math.min(1, dt * 3);
    g.position.y = Math.sin(t * 1.1) * 0.04;
  });

  return (
    <group ref={group}>
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[width, height, 180, Math.round(180 / (width / height))]} />
        <shaderMaterial
          ref={material}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function OrbitRings({ reduce }) {
  const a = useRef();
  const b = useRef();
  useFrame((_, dt) => {
    if (reduce) return;
    if (a.current) a.current.rotation.z += dt * 0.25;
    if (b.current) b.current.rotation.z -= dt * 0.18;
  });
  return (
    <group position={[0, 0.35, -0.8]}>
      <mesh ref={a} rotation={[1.2, 0.2, 0]}>
        <torusGeometry args={[1.12, 0.006, 8, 160]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.55} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={b} rotation={[1.35, -0.35, 0]}>
        <torusGeometry args={[1.32, 0.004, 8, 160]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.45} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

export default function Portrait3D({ image, depth, active = true, onReady }) {
  const reduce = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useEffect(() => {
    const onMove = (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 5.4], fov: 30 }}
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Suspense fallback={null}>
        <OrbitRings reduce={reduce} />
        <PortraitMesh image={image} depth={depth} reduce={reduce} onReady={onReady} />
        <Sparkles count={40} scale={[3.2, 3.2, 1.5]} size={2.2} speed={reduce ? 0 : 0.35} color="#7dd3fc" opacity={0.7} />
      </Suspense>
    </Canvas>
  );
}

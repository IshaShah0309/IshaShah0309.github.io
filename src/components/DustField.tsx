"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { useMediaQuery, useMounted, seeded } from "@/lib/hooks";

/**
 * Motes of dust turning slowly in the lamplight. A real WebGL layer rather
 * than a CSS trick, because the parallax between near and far motes is what
 * gives the shelf its depth.
 */
function Motes({ count = 170 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const { positions, scales, speeds, phases } = useMemo(() => {
    // Seeded rather than Math.random: the field is identical every render,
    // which keeps this a pure computation.
    const rand = seeded(0x5eed1e);
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * 18;
      positions[i * 3 + 1] = (rand() - 0.5) * 11;
      positions[i * 3 + 2] = (rand() - 0.5) * 8;
      scales[i] = rand() * 0.7 + 0.25;
      speeds[i] = rand() * 0.14 + 0.03;
      phases[i] = rand() * Math.PI * 2;
    }
    return { positions, scales, speeds, phases };
  }, [count]);

  // A soft round sprite, a square point would read as a pixel, not a mote.
  const sprite = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d")!;
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255,236,190,1)");
    grad.addColorStop(0.35, "rgba(255,220,150,0.55)");
    grad.addColorStop(1, "rgba(255,210,140,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const geo = points.current?.geometry;
    if (!geo) return;
    const arr = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const y = i * 3 + 1;
      arr[y] += speeds[i] * 0.012;
      if (arr[y] > 5.8) arr[y] = -5.8;
      arr[i * 3] += Math.sin(t * 0.28 + phases[i]) * 0.0035;
    }
    geo.attributes.position.needsUpdate = true;

    // The whole field leans away from the pointer, cheap, convincing depth.
    if (points.current) {
      points.current.rotation.y +=
        (pointer.current.x * 0.09 - points.current.rotation.y) * 0.03;
      points.current.rotation.x +=
        (-pointer.current.y * 0.05 - points.current.rotation.x) * 0.03;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[scales, 1]} />
      </bufferGeometry>
      <pointsMaterial
        map={sprite}
        size={0.07}
        sizeAttenuation
        transparent
        opacity={0.34}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function DustField({ className = "" }: { className?: string }) {
  const mounted = useMounted();
  const calm = useMediaQuery("(prefers-reduced-motion: reduce)");
  const small = useMediaQuery("(max-width: 767px)");

  if (!mounted || calm || small) return null;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
    >
      <Canvas
        camera={{ position: [0, 0, 9], fov: 55 }}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        dpr={[1, 1.5]}
        frameloop="always"
      >
        <Motes />
      </Canvas>
    </div>
  );
}

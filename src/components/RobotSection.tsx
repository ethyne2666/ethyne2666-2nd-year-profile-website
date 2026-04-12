import { useRef, useEffect, Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

/* ═══════════════════════════════════════════════════════════════════════════
   RobotSection.tsx  — Cinematic 3-panel scroll experience
   • Robot rotates 360° driven by scroll + idle spin
   • Emissive colour shifts green → cyan → blue as you scroll
   • Background atmosphere hue-shifts dynamically
   • 220-particle floating field (colour-synced)
   • 3 pulsing energy rings at robot base
   • Dim grid floor
   • Scanline + grain overlays
   • Mobile-centred & responsive
═══════════════════════════════════════════════════════════════════════════ */

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/* ── Camera keyframes ─────────────────────────────────────────────────── */
const CAM_KEYS = [
  { pos: new THREE.Vector3(2.4, 1.8, 2.6),   target: new THREE.Vector3(0.2,  0.6, 0) },
  { pos: new THREE.Vector3(0.0, 0.8, 3.4),   target: new THREE.Vector3(0.0,  0.7, 0) },
  { pos: new THREE.Vector3(-2.6, -0.4, 2.0), target: new THREE.Vector3(-0.5, 0.4, 0) },
];

/* ── Colour ramps ─────────────────────────────────────────────────────── */
const EM_BASE = [
  new THREE.Color("#003d1a"),
  new THREE.Color("#002244"),
  new THREE.Color("#001433"),
];

/* ════════════════════════════════════════════════════════════════════════
   PARTICLES
════════════════════════════════════════════════════════════════════════ */
const Particles = ({ scrollT }: { scrollT: React.MutableRefObject<number> }) => {
  const COUNT   = 220;
  const meshRef = useRef<THREE.Points>(null!);

  const { basePos, speeds, offsets } = useMemo(() => {
    const basePos = new Float32Array(COUNT * 3);
    const speeds  = new Float32Array(COUNT);
    const offsets = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      basePos[i * 3]     = (Math.random() - 0.5) * 12;
      basePos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      basePos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
      speeds[i]  = 0.2 + Math.random() * 0.6;
      offsets[i] = Math.random() * Math.PI * 2;
    }
    return { basePos, speeds, offsets };
  }, []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(basePos.slice(), 3));
    return g;
  }, [basePos]);

  const mat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: 0x00ff99,
        size: 0.035,
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t   = clock.getElapsedTime();
    const arr = meshRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < COUNT; i++) {
      arr[i * 3]     = basePos[i * 3]     + Math.cos(t * speeds[i] * 0.5 + offsets[i]) * 0.12;
      arr[i * 3 + 1] = basePos[i * 3 + 1] + Math.sin(t * speeds[i]       + offsets[i]) * 0.25;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;

    const s = scrollT.current;
    const c = s < 0.5
      ? new THREE.Color().lerpColors(new THREE.Color("#00ff99"), new THREE.Color("#00ccff"), s * 2)
      : new THREE.Color().lerpColors(new THREE.Color("#00ccff"), new THREE.Color("#4466ff"), (s - 0.5) * 2);
    mat.color.copy(c);
    meshRef.current.rotation.y = t * 0.03;
  });

  return <points ref={meshRef} geometry={geo} material={mat} />;
};

/* ════════════════════════════════════════════════════════════════════════
   ENERGY RINGS
════════════════════════════════════════════════════════════════════════ */
const EnergyRings = ({ scrollT }: { scrollT: React.MutableRefObject<number> }) => {
  const r1 = useRef<THREE.Mesh>(null!);
  const r2 = useRef<THREE.Mesh>(null!);
  const r3 = useRef<THREE.Mesh>(null!);

  const m1 = useMemo(() => new THREE.MeshBasicMaterial({ color: 0x00ff88, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }), []);
  const m2 = useMemo(() => new THREE.MeshBasicMaterial({ color: 0x00ccff, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }), []);
  const m3 = useMemo(() => new THREE.MeshBasicMaterial({ color: 0x4488ff, transparent: true, opacity: 0.14, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }), []);

  const g1 = useMemo(() => new THREE.RingGeometry(0.9,  0.96, 80), []);
  const g2 = useMemo(() => new THREE.RingGeometry(1.3,  1.34, 80), []);
  const g3 = useMemo(() => new THREE.RingGeometry(1.75, 1.79, 80), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const s = scrollT.current;
    if (r1.current) { r1.current.rotation.z =  t * 0.8; r1.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.08); }
    if (r2.current) { r2.current.rotation.z = -t * 0.5; r2.current.scale.setScalar(1 + Math.sin(t * 1.1 + 1) * 0.06); }
    if (r3.current) { r3.current.rotation.z =  t * 0.3; r3.current.scale.setScalar(1 + Math.sin(t * 0.7 + 2) * 0.10); }
    const pulse = 0.15 + Math.sin(t * 2) * 0.08;
    m1.opacity = pulse + s * 0.15;
    m2.opacity = pulse * 0.65;
  });

  return (
    <group position={[0, -1.0, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <mesh ref={r1} geometry={g1} material={m1} />
      <mesh ref={r2} geometry={g2} material={m2} />
      <mesh ref={r3} geometry={g3} material={m3} />
    </group>
  );
};

/* ════════════════════════════════════════════════════════════════════════
   GRID FLOOR
════════════════════════════════════════════════════════════════════════ */
const GridFloor = () => {
  const ref = useRef<THREE.GridHelper>(null!);
  useFrame(({ clock }) => {
    if (ref.current) {
      const mat = ref.current.material as THREE.Material & { opacity: number };
      mat.opacity = 0.07 + Math.sin(clock.getElapsedTime() * 0.6) * 0.03;
    }
  });
  return <gridHelper ref={ref} args={[20, 30, "#00ff88", "#003322"]} position={[0, -1.03, 0]} />;
};

/* ════════════════════════════════════════════════════════════════════════
   CAMERA RIG
════════════════════════════════════════════════════════════════════════ */
const CameraRig = ({ scrollT }: { scrollT: React.MutableRefObject<number> }) => {
  const { camera } = useThree();
  const sPos = useRef(new THREE.Vector3(2.4, 1.8, 2.6));
  const sTgt = useRef(new THREE.Vector3(0.2, 0.6, 0));

  useFrame(() => {
    const t = easeInOutCubic(THREE.MathUtils.clamp(scrollT.current, 0, 1));
    let seg: number, lt: number;
    if (t < 0.5) { seg = 0; lt = t / 0.5; } else { seg = 1; lt = (t - 0.5) / 0.5; }
    const e = easeInOutCubic(lt);
    const dp = new THREE.Vector3().lerpVectors(CAM_KEYS[seg].pos,    CAM_KEYS[seg + 1].pos,    e);
    const dt = new THREE.Vector3().lerpVectors(CAM_KEYS[seg].target, CAM_KEYS[seg + 1].target, e);
    sPos.current.lerp(dp, 0.055);
    sTgt.current.lerp(dt, 0.055);
    camera.position.copy(sPos.current);
    camera.lookAt(sTgt.current);
  });
  return null;
};

/* ════════════════════════════════════════════════════════════════════════
   ROBOT
════════════════════════════════════════════════════════════════════════ */
const Robot = ({ scrollT }: { scrollT: React.MutableRefObject<number> }) => {
  const { scene }  = useGLTF("/robot.glb");
  const groupRef   = useRef<THREE.Group>(null!);
  const clock      = useRef(0);
  const meshes     = useRef<THREE.Mesh[]>([]);
  const curEmissive = useRef(new THREE.Color("#003d1a"));

  useEffect(() => {
    const found: THREE.Mesh[] = [];
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const mat  = mesh.material as THREE.MeshStandardMaterial;
        if (mat) {
          mat.roughness         = 0.38;
          mat.metalness         = 0.72;
          mat.emissive          = new THREE.Color("#003d1a");
          mat.emissiveIntensity = 0.55;
          mat.envMapIntensity   = 1.6;
          mat.needsUpdate       = true;
          found.push(mesh);
        }
      }
    });
    meshes.current = found;
  }, [scene]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    clock.current += delta;
    const s = THREE.MathUtils.clamp(scrollT.current, 0, 1);

    // Full 360° scroll rotation + constant slow idle spin
    groupRef.current.rotation.y = s * Math.PI * 2 + clock.current * 0.18;

    // Breathing
    groupRef.current.position.y = Math.sin(clock.current * 1.1) * 0.022;

    // Emissive colour shift
    const tgt = s < 0.5
      ? new THREE.Color().lerpColors(EM_BASE[0], EM_BASE[1], s * 2)
      : new THREE.Color().lerpColors(EM_BASE[1], EM_BASE[2], (s - 0.5) * 2);
    curEmissive.current.lerp(tgt, 0.04);

    const intensity = 0.45 + Math.sin(clock.current * 2.2) * 0.15;
    meshes.current.forEach((mesh) => {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.emissive.copy(curEmissive.current);
      mat.emissiveIntensity = intensity;
    });
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={9.0} position={[0, -1.0, 0]} />
    </group>
  );
};

/* ════════════════════════════════════════════════════════════════════════
   LIGHTS
════════════════════════════════════════════════════════════════════════ */
const Lights = ({ scrollT }: { scrollT: React.MutableRefObject<number> }) => {
  const kl = useRef<THREE.DirectionalLight>(null!);
  const fl = useRef<THREE.DirectionalLight>(null!);

  useFrame(({ clock }) => {
    const s = scrollT.current;
    const t = clock.getElapsedTime();
    if (kl.current) {
      const c = s < 0.5
        ? new THREE.Color().lerpColors(new THREE.Color("#7dd3fc"), new THREE.Color("#38bdf8"), s * 2)
        : new THREE.Color().lerpColors(new THREE.Color("#38bdf8"), new THREE.Color("#818cf8"), (s - 0.5) * 2);
      kl.current.color.copy(c);
      kl.current.intensity = 2.0 + Math.sin(t * 1.8) * 0.3;
    }
    if (fl.current) {
      const c = s < 0.5
        ? new THREE.Color().lerpColors(new THREE.Color("#34d399"), new THREE.Color("#22d3ee"), s * 2)
        : new THREE.Color().lerpColors(new THREE.Color("#22d3ee"), new THREE.Color("#6366f1"), (s - 0.5) * 2);
      fl.current.color.copy(c);
    }
  });

  return (
    <>
      <ambientLight intensity={0.18} />
      <directionalLight ref={kl} position={[4, 5, 3]}   intensity={2.2} color="#7dd3fc" />
      <directionalLight ref={fl} position={[-3, 1, 2]}  intensity={1.0} color="#34d399" />
      <directionalLight        position={[0, 3, -4]}    intensity={0.7} color="#ffffff" />
      <pointLight position={[0, -1.5, 1.5]}  intensity={0.6} color="#10b981" distance={7} />
      <pointLight position={[2, 2, -2]}      intensity={0.4} color="#38bdf8" distance={6} />
      <spotLight position={[-3, -1, 2]} intensity={1.6} color="#38bdf8" angle={0.4} penumbra={0.7} distance={9} />
    </>
  );
};

/* ════════════════════════════════════════════════════════════════════════
   MAIN SECTION
════════════════════════════════════════════════════════════════════════ */
const RobotSection = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollT    = useRef(0);
  const bgRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect    = el.getBoundingClientRect();
      const winH    = window.innerHeight;
      const total   = rect.height - winH;
      const elapsed = -rect.top;
      scrollT.current = THREE.MathUtils.clamp(elapsed / total, 0, 1);

      // Shift background glow hue with scroll
      if (bgRef.current) {
        const s  = scrollT.current;
        const r1 = Math.round(THREE.MathUtils.lerp(56,  99, s));
        const g1 = Math.round(THREE.MathUtils.lerp(189, 102, s));
        const b1 = Math.round(THREE.MathUtils.lerp(248, 241, s));
        const r2 = Math.round(THREE.MathUtils.lerp(16,  67, s));
        const g2 = Math.round(THREE.MathUtils.lerp(185, 56, s));
        const b2 = Math.round(THREE.MathUtils.lerp(129, 202, s));
        bgRef.current.style.background = [
          `radial-gradient(ellipse 70% 55% at 20% 50%, rgba(${r1},${g1},${b1},0.11) 0%, transparent 65%)`,
          `radial-gradient(ellipse 55% 45% at 80% 50%, rgba(${r2},${g2},${b2},0.09) 0%, transparent 65%)`,
          `radial-gradient(ellipse 40% 30% at 50% 90%, rgba(0,255,136,0.05) 0%, transparent 60%)`,
        ].join(",");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    /* 300vh outer wrapper — 3 full screens of scroll travel */
    <div ref={wrapperRef} id="robot" className="relative w-full" style={{ height: "300vh" }}>

      {/* Sticky viewport */}
      <div className="sticky top-0 w-full overflow-hidden" style={{ height: "100vh" }}>

        {/* Dynamic background glow */}
        <div ref={bgRef} className="absolute inset-0" />

        {/* Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.045) 2px, rgba(0,0,0,0.045) 4px)",
          }}
        />

        {/* Film grain */}
        <div
          className="absolute inset-0 pointer-events-none z-20 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />

        {/* CHARAN watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <span
            style={{
              fontFamily:       "'Bebas Neue', 'Impact', sans-serif",
              fontSize:         "clamp(5rem, 26vw, 21rem)",
              color:            "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.04)",
              letterSpacing:    "-0.02em",
              lineHeight:       1,
            }}
          >
            CHARAN
          </span>
        </div>

        {/* Canvas */}
        <Canvas
          className="absolute inset-0 w-full h-full"
          camera={{ position: [2.4, 1.8, 2.6], fov: 42, near: 0.1, far: 120 }}
          gl={{
            antialias: true,
            alpha: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.25,
          }}
          dpr={[1, 2]}
        >
          <Lights scrollT={scrollT} />

          <Suspense fallback={null}>
            <Robot scrollT={scrollT} />
            <EnergyRings scrollT={scrollT} />
            <Particles scrollT={scrollT} />
            <GridFloor />
            <ContactShadows
              position={[0, -1.03, 0]}
              opacity={0.5}
              scale={6}
              blur={3}
              far={3}
              color="#000000"
            />
            <Environment preset="night" />
          </Suspense>

          <CameraRig scrollT={scrollT} />
        </Canvas>

        {/* Top-left title */}
        <div
          className="absolute top-0 left-0 z-30 pointer-events-none select-none"
          style={{ padding: "clamp(1.2rem, 4vw, 2.5rem)" }}
        >
          <p
            style={{
              fontFamily:    "monospace",
              fontSize:      "clamp(0.55rem, 1.1vw, 0.75rem)",
              color:         "#10b981",
              letterSpacing: "0.28em",
              marginBottom:  "0.5rem",
              opacity:       0.8,
              textTransform: "uppercase",
            }}
          >
            CHARAN / Co-Developer
          </p>
          <h2
            style={{
              fontFamily:    "'Bebas Neue', 'Impact', sans-serif",
              fontSize:      "clamp(2.8rem, 9vw, 7.5rem)",
              color:         "white",
              lineHeight:    0.9,
              letterSpacing: "-0.02em",
              textShadow:    "0 0 80px rgba(56,189,248,0.45), 0 0 160px rgba(56,189,248,0.15)",
              whiteSpace:    "pre-line",
            }}
          >
            {`MEET\nANDY`}
          </h2>
          <p
            className="pacifico-regular"
            style={{
              fontSize:   "clamp(0.85rem, 2vw, 1.5rem)",
              color:      "#10b981",
              marginTop:  "0.5rem",
              textShadow: "0 0 24px rgba(16,185,129,0.65)",
            }}
          >
            My robotic co-developer
          </p>
        </div>

        {/* Bottom-right progress dots */}
        <div className="absolute bottom-10 right-6 md:right-10 z-30 pointer-events-none flex flex-col gap-2.5 items-center">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: "5px", height: "5px",
                borderRadius: "50%",
                background: "#10b981",
                opacity: 0.45,
              }}
            />
          ))}
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none z-20"
          style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--background)))" }}
        />
      </div>
    </div>
  );
};

useGLTF.preload("/robot.glb");
export default RobotSection;
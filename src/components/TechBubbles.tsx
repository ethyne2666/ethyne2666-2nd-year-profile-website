import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   TechBubbles.tsx
   Physics bubble field — uses YOUR actual /public/logos/ images.
   File: src/components/TechBubbles.tsx
───────────────────────────────────────────────────────────────────────────── */

/* ── Map each tech to its EXACT filename in /public/logos/ ─────────────────── */
const TECHS: { name: string; logo: string; accent: string }[] = [
  { name: "React",       logo: "/logos/react.png",      accent: "#61DAFB" },
  { name: "Next.js",     logo: "/logos/next.png",       accent: "#ffffff" },
  { name: "TypeScript",  logo: "/logos/typescript.png", accent: "#3178C6" },
  { name: "Node.js",     logo: "/logos/node.jpg",       accent: "#83CD29" },
  { name: "Django",      logo: "/logos/django.svg",     accent: "#44B78B" },
  { name: "Spring Boot", logo: "/logos/spring.png",     accent: "#6DB33F" },
  { name: "Java",        logo: "/logos/java.png",       accent: "#EA2D2E" },
  { name: "Docker",      logo: "/logos/docker.jpg",     accent: "#2396ED" },
  { name: "MongoDB",     logo: "/logos/mongodb.png",    accent: "#439934" },
  { name: "PostgreSQL",  logo: "/logos/postgress.png",  accent: "#336791" },
  { name: "MySQL",       logo: "/logos/mysql.png",      accent: "#00618A" },
  { name: "Redis",       logo: "/logos/css.jpg",        accent: "#D82C20" }, // swap if you add redis
  { name: "Nginx",       logo: "/logos/nginx.png",      accent: "#009639" },
  { name: "AWS EC2",     logo: "/logos/ec2.png",        accent: "#FF9900" },
  { name: "Linux",       logo: "/logos/linux.png",      accent: "#f59e0b" },
  { name: "Git",         logo: "/logos/yaml.png",       accent: "#F34F29" }, // swap for git if added
  { name: "Figma",       logo: "/logos/figma.avif",     accent: "#A259FF" },
  { name: "Postman",     logo: "/logos/postman.png",    accent: "#FF6C37" },
  { name: "Sentry",      logo: "/logos/sentry.png",     accent: "#FB4226" },
  { name: "JWT",         logo: "/logos/jwt.png",        accent: "#FB015B" },
  { name: "CSS3",        logo: "/logos/css.jpg",        accent: "#1572B6" },
  { name: "YAML",        logo: "/logos/yaml.png",       accent: "#CB171E" },
];

/* ── Bubble type ─────────────────────────────────────────────────────────── */
interface Bubble {
  id: number;
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  name: string;
  logo: string;
  accent: string;
  img: HTMLImageElement | null;
  scale: number;
  mx: number; my: number;
}

/* ── Component ─────────────────────────────────────────────────────────────── */
const TechBubbles = () => {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const bubblesRef  = useRef<Bubble[]>([]);
  const rafRef      = useRef<number>(0);
  const hoveredRef  = useRef<number | null>(null);
  const grabbedRef  = useRef<number | null>(null);
  const mouseRef    = useRef({ x: 0, y: 0 });
  const [tooltip, setTooltip] = useState<{ name: string; x: number; y: number; accent: string } | null>(null);
  const [visible, setVisible] = useState(false);
  const sectionRef  = useRef<HTMLDivElement>(null);
  const isMobile    = typeof window !== "undefined" && window.innerWidth < 640;

  /* entrance */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* preload all images */
    const loaded: Record<string, HTMLImageElement> = {};
    TECHS.forEach(({ logo }) => {
      if (!loaded[logo]) {
        const img = new Image();
        img.src = logo;
        loaded[logo] = img;
      }
    });

    const W = () => canvas.width;
    const H = () => canvas.height;

    /* on mobile use fewer, smaller bubbles */
    const isMob = window.innerWidth < 640;
    const subset = isMob ? TECHS.slice(0, 14) : TECHS;

    bubblesRef.current = subset.map((t, i) => {
      const minR = isMob ? 28 : 34;
      const maxR = isMob ? 38 : 50;
      const r = minR + Math.random() * (maxR - minR);
      return {
        id: i,
        x:  r + Math.random() * (W() - r * 2),
        y:  r + Math.random() * (H() - r * 2),
        vx: (Math.random() - 0.5) * 1.1,
        vy: (Math.random() - 0.5) * 1.1,
        r, name: t.name, logo: t.logo, accent: t.accent,
        img: loaded[t.logo] || null,
        scale: 0, mx: 0, my: 0,
      };
    });

    /* ── draw one bubble ── */
    const drawBubble = (ctx: CanvasRenderingContext2D, b: Bubble) => {
      const isHov  = hoveredRef.current  === b.id;
      const isGrab = grabbedRef.current  === b.id;
      const acc    = b.accent;

      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.scale(b.scale, b.scale);

      /* outer glow */
      const glowR = b.r + (isHov || isGrab ? 20 : 12);
      const gAlpha = isHov || isGrab ? "88" : "33";
      const grd = ctx.createRadialGradient(0, 0, b.r * 0.5, 0, 0, glowR);
      grd.addColorStop(0, acc + "00");
      grd.addColorStop(0.6, acc + gAlpha);
      grd.addColorStop(1, acc + "00");
      ctx.beginPath();
      ctx.arc(0, 0, glowR, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      /* glass body */
      const body = ctx.createRadialGradient(-b.r * 0.3, -b.r * 0.3, 0, 0, 0, b.r);
      body.addColorStop(0, "rgba(255,255,255,0.16)");
      body.addColorStop(0.45, "rgba(14,14,22,0.84)");
      body.addColorStop(1,    "rgba(8,8,14,0.94)");
      ctx.beginPath();
      ctx.arc(0, 0, b.r, 0, Math.PI * 2);
      ctx.fillStyle = body;
      ctx.fill();

      /* border ring */
      ctx.strokeStyle = isHov || isGrab ? acc : acc + "55";
      ctx.lineWidth   = isHov || isGrab ? 2.5 : 1.4;
      ctx.stroke();

      /* inner specular */
      const shine = ctx.createRadialGradient(-b.r * 0.35, -b.r * 0.4, 0, -b.r * 0.35, -b.r * 0.4, b.r * 0.6);
      shine.addColorStop(0, "rgba(255,255,255,0.22)");
      shine.addColorStop(1, "rgba(255,255,255,0)");
      ctx.beginPath();
      ctx.arc(0, 0, b.r, 0, Math.PI * 2);
      ctx.fillStyle = shine;
      ctx.fill();

      /* logo clipped to inner circle */
      if (b.img && b.img.complete && b.img.naturalWidth > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(0, 0, b.r * 0.66, 0, Math.PI * 2);
        ctx.clip();
        const sz = b.r * 1.1;
        ctx.drawImage(b.img, -sz / 2, -sz / 2, sz, sz);
        ctx.restore();
      }

      ctx.restore();
    };

    const GRAVITY  = 0.022;
    const DAMPING  = 0.986;
    const SPRING   = 0.16;

    const loop = () => {
      const ctx = canvas.getContext("2d")!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const bs = bubblesRef.current;

      /* update physics */
      bs.forEach((b) => {
        if (b.scale < 1) b.scale = Math.min(1, b.scale + 0.035);

        if (grabbedRef.current === b.id) {
          const tx = mouseRef.current.x - b.mx;
          const ty = mouseRef.current.y - b.my;
          b.vx += (tx - b.x) * SPRING;
          b.vy += (ty - b.y) * SPRING;
        } else {
          b.vy += GRAVITY;
        }

        b.vx *= DAMPING;
        b.vy *= DAMPING;
        b.x  += b.vx;
        b.y  += b.vy;

        const cW = canvas.width, cH = canvas.height;
        if (b.x - b.r < 0)   { b.x = b.r;       b.vx =  Math.abs(b.vx) * 0.55; }
        if (b.x + b.r > cW)  { b.x = cW - b.r;  b.vx = -Math.abs(b.vx) * 0.55; }
        if (b.y - b.r < 0)   { b.y = b.r;       b.vy =  Math.abs(b.vy) * 0.55; }
        if (b.y + b.r > cH)  { b.y = cH - b.r;  b.vy = -Math.abs(b.vy) * 0.55; }
      });

      /* bubble–bubble collisions */
      for (let i = 0; i < bs.length; i++) {
        for (let j = i + 1; j < bs.length; j++) {
          const a = bs[i], b2 = bs[j];
          const dx   = b2.x - a.x, dy = b2.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const min  = a.r + b2.r + 1;
          if (dist < min && dist > 0) {
            const nx = dx / dist, ny = dy / dist;
            const ov = min - dist;
            const tot = a.r + b2.r;
            a.x  -= nx * ov * (b2.r / tot);
            a.y  -= ny * ov * (b2.r / tot);
            b2.x += nx * ov * (a.r / tot);
            b2.y += ny * ov * (a.r / tot);
            const dvx = b2.vx - a.vx, dvy = b2.vy - a.vy;
            const dot = dvx * nx + dvy * ny;
            if (dot < 0) {
              const imp = (2 * dot) / (1 / a.r + 1 / b2.r);
              a.vx  += (imp / a.r)  * nx;
              a.vy  += (imp / a.r)  * ny;
              b2.vx -= (imp / b2.r) * nx;
              b2.vy -= (imp / b2.r) * ny;
            }
          }
        }
      }

      bs.forEach((b) => drawBubble(ctx, b));
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* ── helpers ── */
  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    if ("touches" in e && e.touches.length > 0) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: (e as React.MouseEvent).clientX - rect.left, y: (e as React.MouseEvent).clientY - rect.top };
  };

  const hitTest = (x: number, y: number) =>
    bubblesRef.current.find((b) => {
      const dx = b.x - x, dy = b.y - y;
      return Math.sqrt(dx * dx + dy * dy) <= b.r;
    }) ?? null;

  /* ── mouse ── */
  const onMouseMove = (e: React.MouseEvent) => {
    const { x, y } = getPos(e);
    mouseRef.current = { x, y };
    if (grabbedRef.current !== null) return;
    const hit = hitTest(x, y);
    hoveredRef.current = hit?.id ?? null;
    if (hit) {
      setTooltip({ name: hit.name, x: hit.x, y: hit.y - hit.r - 14, accent: hit.accent });
      canvasRef.current!.style.cursor = "grab";
    } else {
      setTooltip(null);
      canvasRef.current!.style.cursor = "default";
    }
  };

  const onMouseDown = (e: React.MouseEvent) => {
    const { x, y } = getPos(e);
    const hit = hitTest(x, y);
    if (hit) {
      grabbedRef.current = hit.id;
      hit.mx = x - hit.x;
      hit.my = y - hit.y;
      canvasRef.current!.style.cursor = "grabbing";
    }
  };

  const onMouseUp = () => {
    grabbedRef.current = null;
    canvasRef.current!.style.cursor = "default";
  };

  /* ── touch ── */
  const onTouchStart = (e: React.TouchEvent) => {
    const { x, y } = getPos(e);
    const hit = hitTest(x, y);
    if (hit) {
      grabbedRef.current = hit.id;
      hit.mx = x - hit.x;
      hit.my = y - hit.y;
      setTooltip({ name: hit.name, x: hit.x, y: hit.y - hit.r - 14, accent: hit.accent });
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const { x, y } = getPos(e);
    mouseRef.current = { x, y };
    if (grabbedRef.current !== null) {
      const b = bubblesRef.current.find(b => b.id === grabbedRef.current);
      if (b) setTooltip({ name: b.name, x: b.x, y: b.y - b.r - 14, accent: b.accent });
    }
  };

  const onTouchEnd = () => {
    grabbedRef.current = null;
    setTooltip(null);
  };

  return (
    <div
      ref={sectionRef}
      id="tech-bubbles"
      className="relative w-full overflow-hidden"
      style={{
        height: "clamp(380px, 55vh, 600px)",
        background: "hsl(var(--background))",
        opacity: visible ? 1 : 0,
        transition: "opacity 1s ease",
      }}
    >
      {/* header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex flex-col items-center pt-6 pointer-events-none select-none">
        <h2
          className="font-black leading-none tracking-tighter text-center"
          style={{
            fontFamily: "'Bebas Neue', 'Impact', sans-serif",
            fontSize: "clamp(2rem, 6vw, 5rem)",
            color: "white",
            letterSpacing: "0.1em",
          }}
        >
          SKILLS UNIVERSE
        </h2>
        <p
          className="pacifico-regular text-center"
          style={{
            fontSize: "clamp(0.9rem, 2.2vw, 1.6rem)",
            color: "#38bdf8",
            marginTop: "-0.1em",
            lineHeight: 1.3,
          }}
        >
          Drag &amp; play with my tech
        </p>
      </div>

      {/* canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ touchAction: "none" }}
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />

      {/* tooltip */}
      {tooltip && (
        <div
          className="absolute z-20 pointer-events-none px-3 py-1.5 rounded-lg text-xs font-mono
                     font-semibold whitespace-nowrap"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, -100%)",
            background: "rgba(0,0,0,0.88)",
            border: `1px solid ${tooltip.accent}66`,
            color: tooltip.accent,
            boxShadow: `0 4px 20px ${tooltip.accent}33`,
          }}
        >
          {tooltip.name}
        </div>
      )}

      {/* bottom hint */}
      <p
        className="absolute bottom-3 left-0 right-0 text-center pointer-events-none"
        style={{
          color: "rgba(255,255,255,0.14)",
          fontSize: "0.62rem",
          fontFamily: "monospace",
          letterSpacing: "0.14em",
        }}
      >
        DRAG · HOVER · TOUCH SUPPORTED
      </p>
    </div>
  );
};

export default TechBubbles;
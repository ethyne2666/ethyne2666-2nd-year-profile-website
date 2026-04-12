import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   REAL SVG LOGOS — inline, no external CDN needed
   Each logo is the actual brand SVG path(s), simplified to stay compact.
───────────────────────────────────────────────────────────────────────────── */

const Logo = {
  /* ── Languages ── */
  Python: () => (
    <svg viewBox="0 0 128 128" className="w-8 h-8">
      <path fill="#3776AB" d="M63.39 1.988c-4.44.02-8.68.4-12.43 1.07C39.82 5.13 37.75 9.8 37.75 18.24v10.56h26.25v3.52H27.39c-7.64 0-14.33 4.59-16.42 13.33-2.41 9.96-2.52 16.18 0 26.57 1.87 7.73 6.34 13.24 13.98 13.24h9.03V74.13c0-8.68 7.5-16.33 16.42-16.33h26.22c7.3 0 13.11-6.02 13.11-13.35V18.24c0-7.1-6.01-12.44-13.11-13.19a95.38 95.38 0 0 0-13.23-.988zm-14.2 8.16c2.71 0 4.92 2.2 4.92 4.92s-2.2 4.93-4.92 4.93a4.93 4.93 0 0 1-4.93-4.93 4.93 4.93 0 0 1 4.93-4.92z" />
      <path fill="#FFD43B" d="M91.74 29.3v11.33c0 9.05-7.67 16.66-16.42 16.66H49.1c-7.17 0-13.11 6.15-13.11 13.35v25.01c0 7.1 6.18 11.28 13.11 13.35 8.3 2.44 16.27 2.88 26.22 0 6.61-1.91 13.11-5.76 13.11-13.35v-10h-26.2v-3.52h39.33c7.64 0 10.49-5.33 13.11-13.33 2.73-8.24 2.61-16.17 0-26.57-1.87-7.53-5.46-13.33-13.11-13.33H91.74zm-14.74 64.4a4.93 4.93 0 0 1 4.93 4.93 4.93 4.93 0 0 1-4.93 4.92 4.92 4.92 0 0 1-4.92-4.92 4.92 4.92 0 0 1 4.92-4.93z" />
    </svg>
  ),
  JavaScript: () => (
    <svg viewBox="0 0 128 128" className="w-8 h-8">
      <path fill="#F7DF1E" d="M2 1h125v125H2z" />
      <path d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z" />
    </svg>
  ),
  TypeScript: () => (
    <img src="/logos/typescript.png" alt="TypeScript" className="w-8 h-8 object-contain" />
  ),
  Java: () => (
    <img src="/logos/java.png" alt="Java" className="w-8 h-8 object-contain" />
  ),
  Cpp: () => (
    <svg viewBox="0 0 128 128" className="w-8 h-8">
      <path fill="#00599C" d="M117.5 33.5l.3-.2c-.6-1.1-1.5-2.1-2.4-2.6L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.3.9 3.4l-.2.1c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c.1-.9-.1-1.9-.4-2.6zm-53.5 70c-21.8 0-39.5-17.7-39.5-39.5S42.2 24.5 64 24.5c14.7 0 27.5 8.1 34.1 20l-13 7.5c-3.8-6.8-11.1-11.4-19.1-11.4-12.3 0-22.3 10-22.3 22.3s10 22.3 22.3 22.3c8.2 0 15.3-4.4 19.2-11l13.1 7.6C91.3 95.5 78.5 103.5 64 103.5z" />
      <path fill="#00599C" d="M85.6 67.2H80v-5.6h-5.6V56h5.6v-5.6H80V56h5.6v5.6H80v5.6h5.6zm13.3 0h-5.6v-5.6h-5.6V56h5.6v-5.6h5.6V56h5.6v5.6h-5.6z" />
    </svg>
  ),
  /* ── Frontend ── */
  React: () => (
    <img src="/logos/react.png" alt="React" className="w-8 h-8 object-contain" />
  ),
  NextJs: () => (
    <img src="/logos/next.png" alt="Next.js" className="w-8 h-8 object-contain" />
  ),
  Tailwind: () => (
    <svg viewBox="0 0 128 128" className="w-8 h-8">
      <path fill="#38BDF8" d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.536-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.745-12.207-8.66C55.128 71.372 47.862 64 32.004 64z" />
    </svg>
  ),
  HTML5: () => (
    <svg viewBox="0 0 128 128" className="w-8 h-8">
      <path fill="#E44D26" d="M19.037 113.876L9.032 1.661h109.936l-10.016 112.198-45.019 12.48z" />
      <path fill="#F16529" d="M64 116.8l36.378-10.086 8.559-95.878H64z" />
      <path fill="#EBEBEB" d="M64 52.455H45.788L44.53 38.361H64V24.599H29.489l.33 3.692 3.382 37.927H64zm0 35.743l-.061.017-15.327-4.14-.979-10.975H33.816l1.928 21.609 28.193 7.826.063-.017z" />
      <path fill="#fff" d="M63.952 52.455v13.763h16.947l-1.597 17.849-15.35 4.143v14.319l28.215-7.82.207-2.325 3.234-36.233.335-3.696h-3.708zm0-27.856v13.762h33.244l.276-3.092.628-6.978.329-3.692z" />
    </svg>
  ),
  CSS3: () => (
    <img src="/logos/css.jpg" alt="CSS3" className="w-8 h-8 object-contain" />
  ),
  /* ── Backend ── */
  NodeJs: () => (
    <img src="/logos/node.jpg" alt="Node.js" className="w-8 h-8 object-contain" />
  ),
  Express: () => (
    <svg viewBox="0 0 128 128" className="w-8 h-8">
      <path fill="white" d="M126.67 98.44c-4.56 1.16-7.38.05-9.91-3.75-5.68-8.51-11.95-16.63-18-24.9-.78-1.07-1.59-2.12-2.6-3.45C89 76 81.85 85.2 75.14 94.77c-2.4 3.42-4.92 4.91-9.4 3.7l26.92-36.13L67.6 29.71c4.31-.84 7.29-.41 9.93 3.45 5.83 8.52 12.26 16.63 18.67 25.21 6.45-8.55 12.8-16.67 18.8-25.11 2.41-3.42 5-4.72 9.33-3.46-3.28 4.35-6.49 8.63-9.72 12.88-4.36 5.73-8.64 11.53-13.16 17.14-1.61 2.01-1.61 3.17-.08 5.2C109.9 76 118.16 87.1 126.67 98.44zM1.33 61.74c.72-3.61 1.2-7.29 2.2-10.83 6-21.43 30.6-30.34 47.5-17.06C60.93 41.64 63.39 52.62 62.9 65H7.1c-.84 22.21 15.15 35.62 35.53 28.78 7.15-2.4 11.36-8 13.47-15 1.07-3.51 2.84-4.06 6.14-3.06-1.69 8.76-5.52 16.08-13.52 20.66-12 6.86-29.13 6.24-39.14-1.36-12.28-9.3-8.76-28.75-8.25-33.28zm6.parses-9.85h43.35c-.62-16.36-11.45-25.7-24.53-24.44-13.8 1.32-18.63 9.45-18.82 24.44z" />
    </svg>
  ),
  Django: () => (
    <img src="/logos/django.svg" alt="Django" className="w-8 h-8 object-contain" />
  ),
  SpringBoot: () => (
    <img src="/logos/spring.png" alt="Spring Boot" className="w-8 h-8 object-contain" />
  ),
  /* ── Databases ── */
  MongoDB: () => (
    <img src="/logos/mongodb.png" alt="MongoDB" className="w-8 h-8 object-contain" />
  ),
  PostgreSQL: () => (
    <img src="/logos/postgress.png" alt="PostgreSQL" className="w-8 h-8 object-contain" />
  ),
  MySQL: () => (
    <img src="/logos/mysql.png" alt="MySQL" className="w-8 h-8 object-contain" />
  ),
  Redis: () => (
    <svg viewBox="0 0 128 128" className="w-8 h-8">
      <path fill="#A41E11" d="M121.8 93.1c-6.7 3.5-41.4 17.7-48.8 21.6-7.4 3.8-11.5 3.8-17.3 1S9.3 99.4 2.6 95.9c-3.3-1.7-3.4-3.7-.1-5.4l47.8-20c6.7-2.8 11-3.1 17.5-.3 6.5 2.8 49 18.8 55.1 21.8 3.6 1.6 3.6 3.7 0 5.1h-.1z" />
      <path fill="#D82C20" d="M121.8 74.4c-6.7 3.5-41.4 17.7-48.8 21.6-7.4 3.8-11.5 3.8-17.3 1S9.3 80.7 2.6 77.2c-3.3-1.7-3.4-3.7-.1-5.4l47.8-20c6.7-2.8 11-3.1 17.5-.3 6.5 2.8 49 18.8 55.1 21.8 3.6 1.6 3.6 3.7 0 5.1h-.1z" />
      <path fill="#A41E11" d="M121.8 56c-6.7 3.5-41.4 17.7-48.8 21.6-7.4 3.8-11.5 3.8-17.3 1S9.3 62.3 2.6 58.8c-3.3-1.7-3.4-3.7-.1-5.4l47.8-20c6.7-2.8 11-3.1 17.5-.3 6.5 2.8 49 18.8 55.1 21.8 3.6 1.6 3.6 3.7 0 5.1H121.8z" />
      <path fill="#D82C20" d="M121.8 37.9c-6.7 3.5-41.4 17.8-48.8 21.6C65.6 63.3 61.5 63.4 55.7 60.6 49.9 57.8 9.3 43.2 2.6 39.7c-3.3-1.7-3.4-3.7-.1-5.4l47.8-20C57 11.5 61.3 11.2 67.8 14c6.5 2.8 49 18.8 55.1 21.8 3.6 1.7 3.6 3.7 0 5.1h-.1z" />
      <path fill="#fff" d="M80.4 26.1L67.6 21l-3.7 8.6-4.1-9.4-14.6 5.7 10.8 6.5-11.7 4.5 13.6 4.8 3.8-8.5 4 9.3 14.5-5.5-10.8-5.5z" />
      <ellipse fill="#fff" cx="96.4" cy="20.9" rx="6.5" ry="3.5" />
      <ellipse fill="#7A0C00" cx="96.4" cy="20.1" rx="6.5" ry="3.5" />
      <path fill="#AD2115" d="M102.9 20.1v3.5c0 1.9-2.9 3.5-6.5 3.5s-6.5-1.6-6.5-3.5v-3.5h13z" />
    </svg>
  ),
  /* ── DevOps / Tools ── */
  Docker: () => (
    <img src="/logos/docker.jpg" alt="Docker" className="w-8 h-8 object-contain" />
  ),
  AWS: () => (
    <img src="/logos/ec2.png" alt="AWS" className="w-15 h-15 object-contain" />
  ),
  Git: () => (
    <svg viewBox="0 0 128 128" className="w-8 h-8">
      <path fill="#F34F29" d="M124.742 58.378L69.625 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.685 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314 2.703 2.706 3.462 6.607 2.293 9.993L87.42 55.529c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679-3.78 3.78-9.901 3.78-13.683 0-2.842-2.844-3.545-7.019-2.105-10.521L68.578 47.933l-.002 34.341a9.757 9.757 0 0 1 2.559 1.828c3.779 3.777 3.779 9.898 0 13.683-3.779 3.777-9.904 3.777-13.679 0-3.778-3.785-3.778-9.906 0-13.683a9.65 9.65 0 0 1 3.167-2.11V47.333a9.581 9.581 0 0 1-3.167-2.111c-2.862-2.86-3.551-7.06-2.083-10.576L40.836 20.01 3.264 57.581a8.133 8.133 0 0 0 0 11.499l55.117 55.114c3.174 3.174 8.32 3.174 11.499 0l54.858-54.858a8.135 8.135 0 0 0 .004-11.958z" />
    </svg>
  ),
  Linux: () => (
    <img src="/logos/linux.png" alt="Linux" className="w-8 h-8 object-contain" />
  ),
  Nginx: () => (
    <img src="/logos/nginx.png" alt="Nginx" className="w-8 h-8 object-contain" />
  ),
  Vercel: () => (
    <svg viewBox="0 0 128 128" className="w-8 h-8">
      <path fill="white" d="M64 8L2 118h124L64 8z" />
    </svg>
  ),
  GitHub: () => (
    <svg viewBox="0 0 128 128" className="w-8 h-8">
      <path fill="white" d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z" />
    </svg>
  ),
  Postman: () => (
    <img src="/logos/postman.png" alt="Postman" className="w-8 h-8 object-contain" />
  ),
  Sentry: () => (
    <img src="/logos/sentry.png" alt="Sentry" className="w-8 h-8 object-contain" />
  ),
  JWT: () => (
    <img src="/logos/jwt.png" alt="JWT" className="w-8 h-8 object-contain" />
  ),
  YAML: () => (
    <img src="/logos/yaml.png" alt="YAML" className="w-8 h-8 object-contain" />
  ),
  Figma: () => (
    <img src="/logos/figma.avif" alt="Figma" className="w-8 h-8 object-contain" />
  ),
};

/* ─── Category definitions ─────────────────────────────────────────────────── */
type AccentKey = "frontend" | "backend" | "database" | "devops" | "languages";

const ACCENT: Record<AccentKey, string> = {
  languages: "#f59e0b",
  frontend: "#38bdf8",
  backend: "#a78bfa",
  database: "#34d399",
  devops: "#fb923c",
};

interface TechItem { name: string; logo: () => JSX.Element; desc: string; }
interface Category { id: AccentKey; label: string; icon: string; items: TechItem[]; }

const categories: Category[] = [
  {
    id: "languages",
    label: "Languages",
    icon: "{ }",
    items: [
      { name: "Python", logo: Logo.Python, desc: "AI scripts, Django, automation" },
      { name: "JavaScript", logo: Logo.JavaScript, desc: "Full-stack, Node, browser APIs" },
      { name: "TypeScript", logo: Logo.TypeScript, desc: "Type-safe React & Node projects" },
      { name: "Java", logo: Logo.Java, desc: "Spring Boot microservices" },
      { name: "C / C++", logo: Logo.Cpp, desc: "Embedded systems, competitive prog" },
      { name: "HTML5", logo: Logo.HTML5, desc: "Semantic markup, accessibility" },
      { name: "CSS3", logo: Logo.CSS3, desc: "Animations, responsive layouts" },
      { name: "YAML", logo: Logo.YAML, desc: "Docker Compose, CI/CD config" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: "◈",
    items: [
      { name: "React", logo: Logo.React, desc: "SPA, hooks, context, portals" },
      { name: "Next.js", logo: Logo.NextJs, desc: "SSR, SSG, App Router" },
      { name: "Tailwind", logo: Logo.Tailwind, desc: "Utility-first, custom design tokens" },
      { name: "TypeScript", logo: Logo.TypeScript, desc: "Prop types, strict mode" },
      { name: "Figma", logo: Logo.Figma, desc: "UI design & prototyping" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "⚙",
    items: [
      { name: "Node.js", logo: Logo.NodeJs, desc: "Event-driven, REST & WebSockets" },
      { name: "Express", logo: Logo.Express, desc: "Middleware, routing, APIs" },
      { name: "Django", logo: Logo.Django, desc: "Admin panel, ORM, auth" },
      { name: "Spring Boot", logo: Logo.SpringBoot, desc: "Java microservices, REST APIs" },
      { name: "JWT / Auth", logo: Logo.JWT, desc: "Refresh tokens, OAuth flows" },
      { name: "Nginx", logo: Logo.Nginx, desc: "Reverse proxy, load balancing" },
    ],
  },
  {
    id: "database",
    label: "Databases",
    icon: "▦",
    items: [
      { name: "MongoDB", logo: Logo.MongoDB, desc: "NoSQL, Atlas, aggregation" },
      { name: "PostgreSQL", logo: Logo.PostgreSQL, desc: "Relational, ACID, JSON columns" },
      { name: "MySQL", logo: Logo.MySQL, desc: "Structured data, stored procs" },
      { name: "Redis", logo: Logo.Redis, desc: "Caching, pub/sub, sessions" },
    ],
  },
  {
    id: "devops",
    label: "DevOps & Tools",
    icon: "◎",
    items: [
      { name: "Docker", logo: Logo.Docker, desc: "Containers, Compose, multi-stage" },
      { name: "AWS EC2", logo: Logo.AWS, desc: "VM deploy, S3, IAM basics" },
      { name: "Git", logo: Logo.Git, desc: "Branching, PRs, rebasing" },
      { name: "GitHub", logo: Logo.GitHub, desc: "CI, Actions, open source" },
      { name: "Vercel", logo: Logo.Vercel, desc: "Frontend deploys, preview URLs" },
      { name: "Linux", logo: Logo.Linux, desc: "Ubuntu, shell scripting, cron" },
      { name: "Sentry", logo: Logo.Sentry, desc: "Error tracking, performance" },
      { name: "Postman", logo: Logo.Postman, desc: "API testing, collections" },
    ],
  },
];

/* ─── Component ────────────────────────────────────────────────────────────── */
const TechStackSection = () => {
  const [active, setActive] = useState(0);
  const [animDir, setAnimDir] = useState<"left" | "right">("right");
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const total = categories.length;

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const go = useCallback((dir: "left" | "right") => {
    if (animating) return;
    setAnimDir(dir);
    setAnimating(true);
    setTimeout(() => {
      setActive((p) => dir === "right" ? (p + 1) % total : (p - 1 + total) % total);
      setAnimating(false);
    }, 280);
  }, [animating, total]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go("right");
      if (e.key === "ArrowLeft") go("left");
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [go]);

  const cat = categories[active];
  const accent = ACCENT[cat.id];

  return (
    <section
      id="tech-stack"
      ref={sectionRef}
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: "hsl(var(--background))" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 60%, ${accent}10 0%, transparent 70%)`,
          transition: "background 0.7s ease",
        }}
      />

      {/* ── Header ── */}
      <div
        className="text-center mb-14 relative z-10"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <h2
          className="font-black leading-none tracking-tighter"
          style={{
            fontFamily: "'Bebas Neue', 'Impact', sans-serif",
            fontSize: "clamp(3.5rem, 11vw, 9rem)",
            color: "white",
          }}
        >
          TECH STACK
        </h2>
        <p
          className="pacifico-regular"
          style={{
            fontSize: "clamp(1.4rem, 4vw, 3rem)",
            color: accent,
            transition: "color 0.5s ease",
            marginTop: "-0.25em",
            lineHeight: 1.3,
          }}
        >
          Tools &amp; Technologies
        </p>
        <div
          className="mx-auto mt-4 h-px w-16 rounded-full opacity-50"
          style={{ background: accent, transition: "background 0.5s ease" }}
        />
      </div>

      {/* ── Carousel ── */}
      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Prev */}
        <button
          onClick={() => go("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20
                     -translate-x-3 sm:-translate-x-12
                     w-10 h-10 rounded-full flex items-center justify-center
                     border transition-all duration-200 hover:scale-110 active:scale-95"
          style={{
            borderColor: `${accent}50`,
            background: "rgba(0,0,0,0.7)",
            color: accent,
            boxShadow: `0 0 20px ${accent}20`,
          }}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            border: `1px solid ${accent}30`,
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(16px)",
            boxShadow: `0 0 60px ${accent}15, inset 0 1px 0 rgba(255,255,255,0.05)`,
            opacity: animating ? 0 : 1,
            transform: animating
              ? `translateX(${animDir === "right" ? "-50px" : "50px"}) scale(0.98)`
              : "translateX(0) scale(1)",
            transition: "opacity 0.28s ease, transform 0.28s ease, border-color 0.6s, box-shadow 0.6s",
          }}
        >
          {/* Card header */}
          <div
            className="flex items-center gap-4 px-8 py-5"
            style={{ borderBottom: `1px solid ${accent}18` }}
          >
            <span
              className="text-2xl font-black"
              style={{ color: accent, fontFamily: "monospace", lineHeight: 1 }}
            >
              {cat.icon}
            </span>
            <div>
              <h3
                className="font-black text-2xl leading-none"
                style={{
                  fontFamily: "'Bebas Neue', 'Impact', sans-serif",
                  color: "white",
                  letterSpacing: "0.05em",
                }}
              >
                {cat.label}
              </h3>
              <p className="text-xs font-mono mt-0.5" style={{ color: `${accent}90` }}>
                {cat.items.length} technologies
              </p>
            </div>
            {/* Pill progress */}
            <div className="ml-auto flex gap-1">
              {categories.map((c, i) => (
                <div
                  key={c.id}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? "24px" : "6px",
                    background: i === active ? accent : "rgba(255,255,255,0.12)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Grid of tech items */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {cat.items.map((item, i) => (
                <div
                  key={item.name}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="group relative flex flex-col items-center gap-2.5 px-3 py-4 rounded-xl cursor-default
                             transition-all duration-200"
                  style={{
                    border: hoveredItem === item.name ? `1px solid ${accent}60` : "1px solid rgba(255,255,255,0.06)",
                    background: hoveredItem === item.name ? `${accent}10` : "rgba(255,255,255,0.02)",
                    transform: hoveredItem === item.name ? "translateY(-3px)" : "translateY(0)",
                    boxShadow: hoveredItem === item.name ? `0 8px 24px ${accent}18` : "none",
                    animationDelay: `${i * 40}ms`,
                  }}
                >
                  {/* Logo */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                    style={{
                      background: "#111",
                      border: `1px solid ${accent}20`,
                    }}
                  >
                    <item.logo />
                  </div>

                  {/* Name */}
                  <span
                    className="text-xs font-semibold text-center leading-tight transition-colors duration-200"
                    style={{
                      color: hoveredItem === item.name ? "white" : "#d1d5db",
                      fontFamily: "monospace",
                    }}
                  >
                    {item.name}
                  </span>

                  {/* Desc tooltip on hover */}
                  {hoveredItem === item.name && (
                    <span
                      className="text-xs text-center leading-tight"
                      style={{ color: `${accent}cc` }}
                    >
                      {item.desc}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Next */}
        <button
          onClick={() => go("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20
                     translate-x-3 sm:translate-x-12
                     w-10 h-10 rounded-full flex items-center justify-center
                     border transition-all duration-200 hover:scale-110 active:scale-95"
          style={{
            borderColor: `${accent}50`,
            background: "rgba(0,0,0,0.7)",
            color: accent,
            boxShadow: `0 0 20px ${accent}20`,
          }}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* ── Dot indicators ── */}
      <div className="flex justify-center items-center gap-2.5 mt-10 relative z-10">
        {categories.map((c, i) => (
          <button
            key={c.id}
            onClick={() => {
              if (i === active || animating) return;
              setAnimDir(i > active ? "right" : "left");
              setAnimating(true);
              setTimeout(() => { setActive(i); setAnimating(false); }, 280);
            }}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === active ? "30px" : "10px",
              height: "10px",
              background: i === active ? accent : "rgba(255,255,255,0.15)",
              border: `1px solid ${i === active ? accent : "rgba(255,255,255,0.1)"}`,
            }}
            title={c.label}
          />
        ))}
      </div>

      {/* ── Category labels row (clickable) ── */}
      <div className="flex flex-wrap justify-center gap-2 mt-6 relative z-10">
        {categories.map((c, i) => (
          <button
            key={c.id}
            onClick={() => {
              if (i === active || animating) return;
              setAnimDir(i > active ? "right" : "left");
              setAnimating(true);
              setTimeout(() => { setActive(i); setAnimating(false); }, 280);
            }}
            className="px-3 py-1 rounded-full text-xs font-mono transition-all duration-200"
            style={{
              background: i === active ? `${ACCENT[c.id]}20` : "rgba(255,255,255,0.04)",
              border: `1px solid ${i === active ? ACCENT[c.id] : "rgba(255,255,255,0.1)"}`,
              color: i === active ? ACCENT[c.id] : "#6b7280",
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Nav hint */}
      <p className="text-center text-xs font-mono text-gray-600 mt-5 relative z-10 tracking-widest uppercase">
        ← → keys · click dots · or tap category labels
      </p>
    </section>
  );
};

export default TechStackSection;
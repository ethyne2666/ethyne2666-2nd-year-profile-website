import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useLocation } from "react-router-dom";

const PageTransition = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const previousPath = useRef(location.pathname);
  const [showTransition, setShowTransition] = useState(false);
  const [transitionKey, setTransitionKey] = useState(0);

  useLayoutEffect(() => {
    const from = previousPath.current;
    const to = location.pathname;

    previousPath.current = to;

    const isHomePlaygroundNavigation =
      (from === "/" && to === "/playground") ||
      (from === "/playground" && to === "/");

    if (isHomePlaygroundNavigation && !prefersReducedMotion) {
      setTransitionKey((key) => key + 1);
      setShowTransition(true);
    } else {
      setShowTransition(false);
    }
  }, [location.pathname, prefersReducedMotion]);

  return (
    <>
      {/* Leave the page wrapper untransformed so fixed nav menus stay in place */}
      <div className="relative">{children}</div>

      {showTransition && (
        <motion.div
          key={transitionKey}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-neutral-950"
          initial={{ x: "100%" }}
          animate={{ x: ["100%", "0%", "0%", "-100%"] }}
          transition={{
            duration: 0.95,
            times: [0, 0.38, 0.68, 1],
            ease: [0.76, 0, 0.24, 1],
          }}
          onAnimationComplete={() => setShowTransition(false)}
        >
          <div className="relative px-6 text-center text-white">
            <motion.p
              className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-white/50 sm:text-xs"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, -8] }}
              transition={{ duration: 0.8, times: [0, 0.25, 0.7, 1] }}
            >
              Changing perspective
            </motion.p>

            <motion.div
              className="font-black uppercase leading-[0.78] tracking-[-0.08em]"
              style={{ fontSize: "clamp(4rem, 17vw, 12rem)" }}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0.94, 1, 1, 1.03],
              }}
              transition={{ duration: 0.8, times: [0, 0.25, 0.7, 1] }}
            >
              <span className="block">Charan</span>
              <span className="block text-white/35">Kumar</span>
            </motion.div>

            <motion.div
              className="mx-auto mt-7 h-px w-28 bg-white/60"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: [0, 1, 1, 0] }}
              transition={{ duration: 0.8, times: [0, 0.3, 0.7, 1] }}
            />
          </div>
        </motion.div>
      )}
    </>
  );
};

export default PageTransition;
import { useEffect, useRef, useState } from "react";

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

export default function useScrollProgress() {
  const [state, setState] = useState({ progress: 0, scrollY: 0 });

  const targetP = useRef(0);
  const currentP = useRef(0);

  const targetY = useRef(0);
  const currentY = useRef(0);

  const raf = useRef(null);

  useEffect(() => {
    const scroller =
      document.querySelector("[data-scroll-container]") || window;

    const getScrollValues = () => {
      if (scroller === window) {
        const scrollTop = window.scrollY || 0;
        const height =
          document.documentElement.scrollHeight - window.innerHeight;
        return { scrollTop, height };
      } else {
        const scrollTop = scroller.scrollTop || 0;
        const height = scroller.scrollHeight - scroller.clientHeight;
        return { scrollTop, height };
      }
    };

    const tick = () => {
      // Smooth toward targets (spring-ish)
      currentP.current += (targetP.current - currentP.current) * 0.10;
      currentY.current += (targetY.current - currentY.current) * 0.12;

      setState({
        progress: currentP.current,
        scrollY: currentY.current,
      });

      raf.current = requestAnimationFrame(tick);
    };

    const updateTarget = () => {
      const { scrollTop, height } = getScrollValues();
      const safeHeight = Math.max(height, 1);

      targetY.current = scrollTop;
      targetP.current = clamp(scrollTop / safeHeight, 0, 1);

      // ensure RAF loop is running
      if (!raf.current) raf.current = requestAnimationFrame(tick);
    };

    const scrollEl = scroller === window ? window : scroller;
    scrollEl.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", updateTarget);

    const ro = new ResizeObserver(updateTarget);
    if (scroller === window) ro.observe(document.documentElement);
    else ro.observe(scroller);

    // start
    updateTarget();

    return () => {
      scrollEl.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", updateTarget);
      ro.disconnect();
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = null;
    };
  }, []);

  return state; // { progress: 0..1, scrollY: px }
}

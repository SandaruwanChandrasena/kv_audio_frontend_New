import { useEffect, useRef, useState } from "react";

export default function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  const target = useRef(0);
  const current = useRef(0);
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
      // smoothing
      current.current += (target.current - current.current) * 0.08;
      setProgress(current.current);

      // keep animating until close enough
      if (Math.abs(target.current - current.current) > 0.0005) {
        raf.current = requestAnimationFrame(tick);
      } else {
        raf.current = null;
      }
    };

    const updateTarget = () => {
      const { scrollTop, height } = getScrollValues();

      // IMPORTANT: if the page is short, height can be 0 and progress becomes stuck.
      const safeHeight = Math.max(height, 1);

      target.current = scrollTop / safeHeight;

      if (!raf.current) raf.current = requestAnimationFrame(tick);
    };

    const scrollEl = scroller === window ? window : scroller;
    scrollEl.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", updateTarget);

    // Update if content height changes (route change, async loads, etc.)
    const ro = new ResizeObserver(() => updateTarget());

    if (scroller === window) {
      ro.observe(document.documentElement);
    } else {
      ro.observe(scroller);
    }

    // init
    updateTarget();

    return () => {
      scrollEl.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", updateTarget);
      ro.disconnect();
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return progress; // 0..1
}

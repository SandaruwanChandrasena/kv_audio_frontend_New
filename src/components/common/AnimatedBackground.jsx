// src/components/common/AnimatedBackground.jsx
import { useEffect, useRef, useState } from "react";
import useScrollProgress from "../../hooks/useScrollProgress";

// ✅ helpers (define ONCE, outside component)
const clamp = (n, a, b) => {
  if (!Number.isFinite(n)) return a;
  return Math.max(a, Math.min(b, n));
};

const lerp = (a, b, t) => a + (b - a) * t;

export default function AnimatedBackground() {
  const pRaw = useScrollProgress(); // can be undefined/NaN briefly
  const p = clamp(Number.isFinite(pRaw) ? pRaw : 0, 0, 1);

  // Disk spin (continuous) + scroll controls speed
  const spinRef = useRef(0);
  const lastRef = useRef(typeof performance !== "undefined" ? performance.now() : 0);
  const rafSpin = useRef(null);

  // Needle spring (angle + lift)
  const armAngleRef = useRef(16);
  const armAngleVRef = useRef(0);
  const armLiftRef = useRef(0); // 0..1 (1 lifted, 0 playing)
  const armLiftVRef = useRef(0);

  const [render, setRender] = useState({
    spin: 0,
    armAngle: 16,
    armLift: 0,
  });

  // Continuous spin loop
  useEffect(() => {
    const tick = (now) => {
      const last = lastRef.current || now;
      const dt = Math.min(0.05, (now - last) / 1000);
      lastRef.current = now;

      // speed in deg/sec
      const base = 30; // idle spin
      const boost = 320 * p; // faster as scroll down
      const wobble = Math.sin(now / 450) * (0.6 + 1.2 * p);
      const speed = base + boost + wobble;

      spinRef.current = (spinRef.current + speed * dt) % 360;

      setRender((prev) => ({ ...prev, spin: spinRef.current }));
      rafSpin.current = requestAnimationFrame(tick);
    };

    rafSpin.current = requestAnimationFrame(tick);
    return () => {
      if (rafSpin.current) cancelAnimationFrame(rafSpin.current);
      rafSpin.current = null;
    };
  }, [p]);

  // Tonearm spring loop
  useEffect(() => {
    let rafId;

    const stiffness = 0.10; // smooth
    const damping = 0.78; // stable

    const tick = () => {
      const targetAngle = lerp(10, 34, p); // inward as scroll
      const targetLift = lerp(1, 0, p); // lifted at top, down at bottom

      // angle spring
      const da = targetAngle - armAngleRef.current;
      armAngleVRef.current = armAngleVRef.current * damping + da * stiffness;
      armAngleRef.current += armAngleVRef.current;

      // lift spring
      const dl = targetLift - armLiftRef.current;
      armLiftVRef.current = armLiftVRef.current * damping + dl * stiffness;
      armLiftRef.current += armLiftVRef.current;

      armLiftRef.current = clamp(armLiftRef.current, 0, 1);

      setRender((prev) => ({
        ...prev,
        armAngle: armAngleRef.current,
        armLift: armLiftRef.current,
      }));

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [p]);

  // lift transforms (visible)
  const liftY = -18 * render.armLift; // higher when lifted
  const liftTilt = 12 * render.armLift; // degrees

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-slate-50" />

      {/* Centered turntable scene */}
      <div
        className="absolute left-1/2 top-1/2"
        style={{ transform: "translate(-50%, -50%)", willChange: "transform" }}
      >
        <div className="relative h-190 w-190">
          {/* ===== VINYL (spins) ===== */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              transform: `rotate(${render.spin}deg)`,
              willChange: "transform",
              background:
                "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.20), rgba(255,255,255,0) 42%)," +
                "radial-gradient(circle at 70% 76%, rgba(255,255,255,0.10), rgba(0,0,0,0) 50%)," +
                "radial-gradient(circle at 50% 50%, rgba(26,26,26,1), rgba(6,6,6,1))",
              boxShadow: "0 22px 70px rgba(15, 23, 42, 0.14)",
            }}
          >
            {/* grooves */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, rgba(0,0,0,0) 5px, rgba(0,0,0,0) 10px)",
                opacity: 0.22,
                mixBlendMode: "screen",
              }}
            />
            <div className="absolute inset-10 rounded-full border border-white/10" />

            {/* label */}
            <div
              className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 40% 35%, rgba(16,185,129,0.22), rgba(15, 23, 42, 0.95) 72%)",
                border: "1px solid rgba(255,255,255,0.10)",
                boxShadow: "inset 0 0 0 6px rgba(255,255,255,0.03)",
              }}
            />
            <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-200/85" />
            <div className="absolute inset-6 rounded-full border border-white/10" />
          </div>

          {/* ===== TONEARM ===== */}
          <div className="absolute -right-8 top-28">
            <div className="relative">
              {/* base shadow */}
              <div
                className="absolute -inset-6 rounded-2xl blur-xl"
                style={{
                  background: "rgba(15, 23, 42, 0.06)",
                  opacity: clamp(0.9 - render.armLift * 0.35, 0, 1),
                }}
              />

              {/* pivot base */}
              <div
                className="relative h-16 w-16 rounded-full border border-white/50 shadow-sm"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.95), rgba(148,163,184,0.70) 60%, rgba(71,85,105,0.45))",
                }}
              />
              <div
                className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.85), rgba(15,23,42,0.55))",
                }}
              />

              {/* arm assembly */}
              <div
                className="absolute left-1/2 top-1/2 origin-left"
                style={{
                  transform: `translateY(calc(-50% + ${liftY}px)) rotate(${render.armAngle}deg) perspective(900px) rotateX(${liftTilt}deg)`,
                  willChange: "transform",
                }}
              >
                {/* main arm */}
                <div
                  className="relative h-2.5 w-75 rounded-full border border-white/50 shadow-sm"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(203,213,225,0.75) 45%, rgba(100,116,139,0.55))",
                  }}
                >
                  <div
                    className="absolute left-2 right-2 top-px h-0.5 rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,255,255,0.7), rgba(255,255,255,0))",
                      opacity: 0.8,
                    }}
                  />
                </div>

                {/* headshell */}
                <div
                  className="absolute right-5 top-1/2 -translate-y-1/2 h-8 w-14 rounded-lg border border-white/45 shadow-sm"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.80), rgba(226,232,240,0.70), rgba(100,116,139,0.45))",
                  }}
                />

                {/* cartridge */}
                <div
                  className="absolute right-1.5 top-1/2 translate-y-1.5 h-6 w-9 rounded-md border border-white/30 shadow-sm"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(30,41,59,0.85), rgba(15,23,42,0.75))",
                    opacity: clamp(0.95 - render.armLift * 0.25, 0, 1),
                  }}
                />

                {/* stylus */}
                <div className="absolute -right-2.5 top-1/2 translate-y-4.5">
                  <div
                    className="h-3.5 w-0.5 rounded-full"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.8), rgba(71,85,105,0.7))",
                      boxShadow: "0 3px 10px rgba(15,23,42,0.25)",
                      transform: "rotate(18deg)",
                      transformOrigin: "top",
                      opacity: clamp(0.95 - render.armLift * 0.25, 0, 1),
                    }}
                  />
                  <div
                    className="-mt-0.5 -ml-0.5 h-1.5 w-1.5 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(15,23,42,0.6))",
                      transform: "translateX(1px)",
                      opacity: clamp(0.95 - render.armLift * 0.25, 0, 1),
                    }}
                  />
                </div>
              </div>

              {/* cue lever */}
              <div
                className="absolute right-2 top-14 h-10 w-2 rounded-full"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.75), rgba(100,116,139,0.55))",
                  transform: `translateY(${render.armLift * 3}px)`,
                  opacity: 0.6,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Glass / blur layer */}
      <div className="absolute inset-0 backdrop-blur-[2px]" />

      {/* subtle tint + vignette */}
      <div className="absolute inset-0 bg-slate-900/2" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(255,255,255,0) 40%, rgba(15,23,42,0.04) 100%)",
        }}
      />
    </div>
  );
}

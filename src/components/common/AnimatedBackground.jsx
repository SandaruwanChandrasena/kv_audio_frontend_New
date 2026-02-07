import { useEffect, useRef, useState } from "react";
import useScrollProgress from "../../hooks/useScrollProgress";

const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const lerp = (a, b, t) => a + (b - a) * t;

export default function AnimatedBackground() {
  const pRaw = useScrollProgress(); // 0..1
  const p = clamp(pRaw, 0, 1);

  // Disk spin (continuous) + scroll controls speed (and tiny pitch wobble)
  const spinRef = useRef(0);
  const lastRef = useRef(typeof performance !== "undefined" ? performance.now() : 0);
  const rafSpin = useRef(null);

  // Needle spring (more realistic "drop" as you scroll)
  const armRef = useRef(0);
  const armVRef = useRef(0);
  const rafArm = useRef(null);

  const [render, setRender] = useState({
    spin: 0,     // disk rotation
    arm: 16,     // tonearm angle
  });

  // Continuous spin loop
  useEffect(() => {
    const tick = (now) => {
      const last = lastRef.current || now;
      const dt = Math.min(0.05, (now - last) / 1000); // seconds, capped
      lastRef.current = now;

      // Speed: base + boost with scroll progress (deg/sec)
      const base = 35;              // idle spin speed
      const boost = 240 * p;        // faster as you scroll down
      const wobble = Math.sin(now / 450) * (0.6 + 1.2 * p); // subtle "analog" pitch wobble
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

  // Needle spring to a target angle based on scroll (like lowering onto record)
  useEffect(() => {
    const targetArm = lerp(10, 28, p); // start slightly away -> move inward

    const stiffness = 0.10;
    const damping = 0.74;

    const tick = () => {
      const da = targetArm - armRef.current;
      armVRef.current = armVRef.current * damping + da * stiffness;
      armRef.current += armVRef.current;

      setRender((prev) => ({ ...prev, arm: armRef.current }));

      if (Math.abs(da) > 0.01 || Math.abs(armVRef.current) > 0.01) {
        rafArm.current = requestAnimationFrame(tick);
      } else {
        rafArm.current = null;
      }
    };

    if (!rafArm.current) rafArm.current = requestAnimationFrame(tick);

    return () => {
      if (rafArm.current) cancelAnimationFrame(rafArm.current);
      rafArm.current = null;
    };
  }, [p]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* base */}
      <div className="absolute inset-0 bg-slate-50" />

      {/* centered scene */}
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          transform: "translate(-50%, -50%)",
          willChange: "transform",
        }}
      >
        <div className="relative h-[760px] w-[760px]">
          {/* ===== VINYL (spins) ===== */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              transform: `rotate(${render.spin}deg)`,
              willChange: "transform",
              background:
                // realistic vinyl lighting + deep blacks
                "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.20), rgba(255,255,255,0) 42%)," +
                "radial-gradient(circle at 70% 76%, rgba(255,255,255,0.10), rgba(0,0,0,0) 50%)," +
                "radial-gradient(circle at 50% 50%, rgba(26,26,26,1), rgba(6,6,6,1))",
              boxShadow: "0 22px 70px rgba(15, 23, 42, 0.14)",
            }}
          >
            {/* grooves: lots of subtle rings (looks more real than a few borders) */}
            <div className="absolute inset-0 rounded-full"
              style={{
                background:
                  "repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, rgba(0,0,0,0) 5px, rgba(0,0,0,0) 10px)",
                opacity: 0.22,
                mixBlendMode: "screen",
              }}
            />
            {/* subtle inner matte ring */}
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
            {/* hole */}
            <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-200/85" />
            {/* highlight ring */}
            <div className="absolute inset-6 rounded-full border border-white/10" />
          </div>

          {/* ===== TONEARM (does NOT spin; sits above vinyl) ===== */}
          <div className="absolute -right-8 top-28">
            <div className="relative">
              {/* base plate shadow */}
              <div className="absolute -inset-6 rounded-2xl bg-slate-900/5 blur-xl" />

              {/* pivot base (metal) */}
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
                  transform: `translateY(-50%) rotate(${render.arm}deg)`,
                  willChange: "transform",
                }}
              >
                {/* main arm (metal tube) */}
                <div
                  className="relative h-[10px] w-[300px] rounded-full border border-white/50 shadow-sm"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(203,213,225,0.75) 45%, rgba(100,116,139,0.55))",
                  }}
                >
                  {/* thin top highlight */}
                  <div
                    className="absolute left-2 right-2 top-[1px] h-[2px] rounded-full"
                    style={{
                      background: "linear-gradient(90deg, rgba(255,255,255,0.7), rgba(255,255,255,0))",
                      opacity: 0.8,
                    }}
                  />
                </div>

                {/* headshell (flat piece near the end) */}
                <div
                  className="absolute right-[20px] top-1/2 -translate-y-1/2 h-8 w-14 rounded-lg border border-white/45 shadow-sm"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.80), rgba(226,232,240,0.70), rgba(100,116,139,0.45))",
                  }}
                />

                {/* cartridge (small box under headshell) */}
                <div
                  className="absolute right-[6px] top-1/2 translate-y-[6px] h-6 w-9 rounded-md border border-white/30 shadow-sm"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(30,41,59,0.85), rgba(15,23,42,0.75))",
                  }}
                />

                {/* stylus + needle */}
                <div className="absolute right-[-10px] top-1/2 translate-y-[18px]">
                  {/* needle shaft */}
                  <div
                    className="h-[14px] w-[2px] rounded-full"
                    style={{
                      background: "linear-gradient(180deg, rgba(255,255,255,0.8), rgba(71,85,105,0.7))",
                      boxShadow: "0 3px 10px rgba(15,23,42,0.25)",
                      transform: "rotate(18deg)",
                      transformOrigin: "top",
                    }}
                  />
                  {/* tiny tip */}
                  <div
                    className="mt-[-2px] ml-[-2px] h-[6px] w-[6px] rounded-full"
                    style={{
                      background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(15,23,42,0.6))",
                      transform: "translateX(1px)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* optional subtle blobs */}
          <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-emerald-200/16 blur-3xl" />
          <div className="absolute bottom-0 -right-40 h-[420px] w-[420px] rounded-full bg-slate-300/18 blur-3xl" />
        </div>
      </div>
    </div>
  );
}

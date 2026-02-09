const steps = [
  { num: "1", title: "Choose gear", desc: "Pick products and rental duration." },
  { num: "2", title: "Pick up", desc: "Collect from our store location." },
  { num: "3", title: "Return", desc: "Drop it off when you’re done." },
];

export default function HowItWorks() {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-semibold text-slate-900">
        How it works
      </h2>
      <p className="text-sm text-blue-600 border p-1 rounded-xl bg-blue-100 inline-block mt-1">
        Three simple steps. No confusion. No paperwork drama.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <div
            key={s.num}
            className="
              group relative overflow-hidden rounded-2xl border border-white/40
              bg-white/70 p-6 backdrop-blur-xl
              shadow-sm transition
              hover:-translate-y-1 hover:shadow-lg
            "
          >
            {/* subtle gradient glow */}
            <div
              className="pointer-events-none absolute -inset-1 opacity-0 transition group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(circle at top left, rgba(16,185,129,0.18), transparent 60%)",
              }}
            />

            {/* step badge */}
            <div className="relative z-10 flex items-center gap-4">
              <div
                className="
                  grid h-10 w-10 place-items-center rounded-xl
                  bg-emerald-600 text-sm font-semibold text-white
                  shadow-md
                "
              >
                {s.num}
              </div>

              <h3 className="text-sm font-semibold text-slate-900">
                {s.title}
              </h3>
            </div>

            <p className="relative z-10 mt-4 text-sm leading-relaxed text-slate-600">
              {s.desc}
            </p>

            {/* bottom accent line */}
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-linear-to-r from-emerald-400/0 via-emerald-400/40 to-emerald-400/0" />
          </div>
        ))}
      </div>
    </section>
  );
}

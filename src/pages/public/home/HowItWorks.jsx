const steps = [
  { num: "1", title: "Choose gear", desc: "Pick products and rental duration." },
  { num: "2", title: "Pick up", desc: "Collect from our store location." },
  { num: "3", title: "Return", desc: "Drop it off when you’re done." },
];

export default function HowItWorks() {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold">How it works</h2>
      <p className="mt-1 text-sm text-slate-500">Three simple steps, no confusion.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.num} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-50 text-sm font-semibold text-emerald-700">
                {s.num}
              </div>
              <div className="text-sm font-semibold">{s.title}</div>
            </div>
            <p className="mt-3 text-sm text-slate-500">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

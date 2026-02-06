const items = [
  { title: "Quality Checked", desc: "Every item is tested before pickup." },
  { title: "Student Friendly Rates", desc: "Clear pricing you can afford." },
  { title: "Easy Setup", desc: "Simple guide included with rentals." },
];

export default function WhyChooseUs() {
  return (
    <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Why choose us?</h2>
      <p className="mt-1 text-sm text-slate-500">
        We remove the common fears people have when renting.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {items.map((i) => (
          <div key={i.title} className="rounded-2xl border border-slate-200 p-5">
            <div className="text-sm font-semibold">{i.title}</div>
            <div className="mt-1 text-sm text-slate-500">{i.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

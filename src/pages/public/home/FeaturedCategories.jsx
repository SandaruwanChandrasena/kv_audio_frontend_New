import { Link } from "react-router-dom";

const cats = [
  { title: "Parties & Events", desc: "Big speakers, lights, bass-heavy setups", to: "/products" },
  { title: "Meetings & Lectures", desc: "Mics, small amps, portable audio", to: "/products" },
  { title: "Bands & Live Music", desc: "Mixers, stands, cables, stage gear", to: "/products" },
];

export default function FeaturedCategories() {
  return (
    <section className="mt-10">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Find your setup fast</h2>
          <p className="text-sm text-slate-500">Choose a category to avoid overload.</p>
        </div>
        <Link to="/products" className="text-sm font-medium text-emerald-700 hover:text-emerald-800">
          View all →
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {cats.map((c) => (
          <Link
            key={c.title}
            to={c.to}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-base font-semibold text-slate-900">{c.title}</div>
                <div className="mt-1 text-sm text-slate-500">{c.desc}</div>
              </div>
              <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-700 grid place-items-center transition group-hover:bg-emerald-100">
                →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";
import { Speaker, Mic, Music } from "lucide-react";

const cats = [
  {
    title: "Parties & Events",
    desc: "Big speakers, lights, bass-heavy setups",
    to: "/products",
    Icon: Speaker,
    animation: "group-hover:animate-pulse",
  },
  {
    title: "Meetings & Lectures",
    desc: "Mics, small amps, portable audio",
    to: "/products",
    Icon: Mic,
    animation: "group-hover:animate-bounce",
  },
  {
    title: "Bands & Live Music",
    desc: "Mixers, stands, cables, stage gear",
    to: "/products",
    Icon: Music,
    animation: "group-hover:rotate-6",
  },
];

export default function FeaturedCategories() {
  return (
    <section className="mt-10">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Find your setup fast</h2>
          <p className="text-sm text-slate-500">
            Choose a category to avoid overload.
          </p>
        </div>

        <Link
          to="/products"
          className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
        >
          View all →
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {cats.map(({ title, desc, to, Icon, animation }) => (
          <Link
            key={title}
            to={to}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              {/* ICON */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-100">
                <Icon
                  size={22}
                  className={`transition-transform duration-300 ${animation}`}
                />
              </div>

              {/* TEXT */}
              <div className="flex-1">
                <div className="text-base font-semibold text-slate-900">
                  {title}
                </div>
                <div className="mt-1 text-sm text-slate-500">{desc}</div>
              </div>

              {/* ARROW */}
              <div className="mt-1 text-slate-400 transition group-hover:text-emerald-600">
                →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

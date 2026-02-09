import { Link } from "react-router-dom";
import { Speaker, Mic, Music, ArrowRight } from "lucide-react";

const cats = [
  {
    title: "Parties & Events",
    desc: "Big speakers, lights, bass-heavy setups",
    to: "/products",
    Icon: Speaker,
  },
  {
    title: "Meetings & Lectures",
    desc: "Mics, small amps, portable audio",
    to: "/products",
    Icon: Mic,
  },
  {
    title: "Bands & Live Music",
    desc: "Mixers, stands, cables, stage gear",
    to: "/products",
    Icon: Music,
  },
];

export default function FeaturedCategories() {
  return (
    <section className="mt-12">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Find your setup fast
          </h2>
          <p className="rounded-full border border-emerald-200 bg-emerald-50 text-xs font-medium text-emerald-700 px-2 py-1">
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

      <div className="grid gap-5 md:grid-cols-3">
        {cats.map(({ title, desc, to, Icon }) => (
          <Link
            key={title}
            to={to}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition
                       hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              {/* ICON BOX */}
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl
                           bg-emerald-50 text-emerald-700 transition
                           group-hover:bg-emerald-100"
              >
                {/* subtle rotate/scale instead of bounce */}
                <Icon className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3" size={22} />
              </div>

              {/* TEXT */}
              <div className="flex-1">
                <div className="text-base font-semibold text-slate-900">
                  {title}
                </div>
                <div className="mt-2 text-sm text-slate-500 leading-relaxed">
                  {desc}
                </div>
              </div>

              {/* ARROW (aligned) */}
              <div className="mt-1 text-slate-400 transition group-hover:text-emerald-700">
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

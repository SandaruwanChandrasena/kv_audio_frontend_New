import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/common/Button.jsx";

// Demo items for now (later replace with API)
const demo = [
  {
    key: "jbl-partybox",
    name: "JBL PartyBox Speaker",
    tag: "Best Seller",
    price: "from Rs. 1500/day",
    note: "Big bass • Parties & events",
  },
  {
    key: "wired-mic",
    name: "Wired Microphone",
    tag: "Best Value",
    price: "from Rs. 200/day",
    note: "Meetings • Lectures",
  },
  {
    key: "mixer-6ch",
    name: "6-Channel Mixer",
    tag: "Pro Choice",
    price: "from Rs. 800/day",
    note: "Bands • Live music",
  },
  {
    key: "speaker-stand",
    name: "Speaker Stand (Pair)",
    tag: "Must Have",
    price: "from Rs. 300/day",
    note: "Stability • Safe setup",
  },
];

function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="h-32 w-full rounded-xl bg-slate-200" />
      <div className="mt-4 space-y-2">
        <div className="h-4 w-3/4 rounded bg-slate-200" />
        <div className="h-3 w-1/2 rounded bg-slate-200" />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="h-4 w-24 rounded bg-slate-200" />
        <div className="h-6 w-16 rounded-full bg-emerald-100" />
      </div>
      <div className="mt-4 h-9 w-full rounded-xl bg-slate-200" />
    </div>
  );
}

function TagPill({ text }) {
  const style =
    text === "Best Seller"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : text === "Best Value"
      ? "bg-indigo-50 text-indigo-700 border-indigo-200"
      : "bg-slate-50 text-slate-700 border-slate-200";

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-medium ${style}`}>
      {text}
    </span>
  );
}

export default function PopularProducts() {
  const [loading, setLoading] = useState(true);

  // simulate loading now (later replace with API fetch)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="popular-products" className="mt-10">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Popular rentals</h2>
          <p className="text-sm text-slate-500">
            Quick picks to reduce searching — see prices first.
          </p>
        </div>

        <Link 
          to="/products"
          className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
        >
          View all →
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
          : demo.map((p) => (
              <div
                key={p.key}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                {/* image placeholder */}
                <div className="h-32 w-full rounded-xl bg-slate-100 transition group-hover:bg-slate-200" />

                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold text-slate-900">{p.name}</div>
                    <div className="mt-1 text-sm text-slate-500">{p.note}</div>
                  </div>
                  <TagPill text={p.tag} />
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm font-semibold text-slate-900">{p.price}</div>
                  <span className="text-xs text-slate-500">★ 4.8</span>
                </div>

                <div className="mt-auto pt-4">
                  <Link to={`/products/${p.key}`}>
                    <Button className="w-full">View</Button>
                  </Link>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
}

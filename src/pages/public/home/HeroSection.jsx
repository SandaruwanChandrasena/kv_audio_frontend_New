import { Link } from "react-router-dom";
import Button from "../../../components/common/Button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-100 blur-3xl" />
      <div className="absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-slate-100 blur-3xl" />

      <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            Audio Rentals • Fast Pickup • Student Friendly
          </p>

          <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
            Turn Up the Volume. <br /> Rent Professional Audio Gear Today.
          </h1>

          <p className="mt-4 max-w-xl text-slate-500">
            Speakers, microphones, mixers, and everything you need for parties, events,
            meetings, and live music — with clear pricing and availability.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/products">
              <Button className="px-6">Browse Products</Button>
            </Link>
            <Link to="/products">
              <Button variant="ghost" className="px-6">
                See Popular Gear
              </Button>
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-600">
            <span className="rounded-full bg-slate-100 px-3 py-1">✔ Quality Checked</span>
            <span className="rounded-full bg-slate-100 px-3 py-1">✔ Easy Pickup</span>
            <span className="rounded-full bg-slate-100 px-3 py-1">✔ Flexible Pricing</span>
          </div>
        </div>

        {/* Visual placeholder (replace with real image later) */}
        <div className="relative">
          <div className="aspect-4/3 w-full rounded-3xl border border-slate-200 bg-slate-100" />
          <div className="absolute bottom-4 left-4 rounded-2xl bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
            <div className="text-sm font-semibold">Best Seller</div>
            <div className="text-sm text-slate-500">Party speakers & mics</div>
          </div>
        </div>
      </div>
    </section>
  );
}

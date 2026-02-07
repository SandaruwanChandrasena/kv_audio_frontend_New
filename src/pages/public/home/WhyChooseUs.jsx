import {
  ShieldCheck,
  Wallet,
  Wrench,
} from "lucide-react";

const items = [
  {
    title: "Quality Checked",
    desc: "Every item is tested before pickup.",
    icon: ShieldCheck,
  },
  {
    title: "Student Friendly Rates",
    desc: "Clear pricing you can afford.",
    icon: Wallet,
  },
  {
    title: "Easy Setup",
    desc: "Simple guide included with rentals.",
    icon: Wrench,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">
        Why choose us?
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        We remove the common fears people have when renting.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {items.map((i) => {
          const Icon = i.icon;

          return (
            <div
              key={i.title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition
                         hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* icon */}
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center
                              rounded-xl bg-emerald-50 text-emerald-700
                              transition group-hover:scale-110">
                <Icon size={20} />
              </div>

              <div className="text-sm font-semibold text-slate-900">
                {i.title}
              </div>
              <div className="mt-1 text-sm text-slate-500">
                {i.desc}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

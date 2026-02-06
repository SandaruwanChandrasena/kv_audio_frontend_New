import { THEME } from "../../utils/theme.jsx";

export default function Home() {
  return (
    <div className="space-y-4">
      <div className={`${THEME.card} p-6`}>
        <h2 className="text-xl font-semibold">Products</h2>
        <p className="mt-1 text-sm text-slate-500">
          This page will show product list from backend soon.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className={`${THEME.card} p-4`}>
            <div className="h-32 rounded-xl bg-slate-100" />
            <div className="mt-4 flex items-start justify-between gap-3">
              <div>
                <div className="font-semibold">Product {i}</div>
                <div className="text-sm text-slate-500">
                  Hourly / Half-day / Full-day
                </div>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                Available
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { ADMIN_THEME } from "../../utils/adminTheme";

function StatCard({ title, value, note }) {
  return (
    <div className={ADMIN_THEME.card + " p-5"}>
      <div className="text-sm text-slate-400">{title}</div>
      <div className="mt-2 text-2xl font-semibold text-slate-100">{value}</div>
      {note ? <div className="mt-2 text-xs text-slate-500">{note}</div> : null}
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-slate-100">Overview</h1>
        <p className="text-sm text-slate-400">
          Track rentals, inventory, and customers.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Active Rentals" value="12" note="Currently rented items" />
        <StatCard title="Inventory Items" value="86" note="Total products in shop" />
        <StatCard title="Overdue" value="2" note="Needs follow-up today" />
      </div>

      {/* Tables / sections */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className={ADMIN_THEME.card + " p-5"}>
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-slate-100">Recent Rentals</div>
            <div className="text-xs text-slate-400">Last 7 days</div>
          </div>

          <div className="mt-4 space-y-3">
            {[
              { name: "JBL PartyBox 310", user: "Kasun", status: "Active" },
              { name: "Shure SM58 Mic", user: "Nimal", status: "Returned" },
              { name: "Yamaha Mixer MG10", user: "Sahan", status: "Overdue" },
            ].map((r, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/30 p-3"
              >
                <div>
                  <div className="text-sm text-slate-100">{r.name}</div>
                  <div className="text-xs text-slate-400">Customer: {r.user}</div>
                </div>
                <span
                  className={[
                    "rounded-full px-3 py-1 text-xs border",
                    r.status === "Active"
                      ? "border-emerald-600/40 bg-emerald-600/10 text-emerald-300"
                      : r.status === "Overdue"
                      ? "border-rose-600/40 bg-rose-600/10 text-rose-300"
                      : "border-slate-700 bg-slate-900/40 text-slate-300",
                  ].join(" ")}
                >
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={ADMIN_THEME.card + " p-5"}>
          <div className="text-sm font-medium text-slate-100">Low Stock Alerts</div>
          <div className="mt-4 space-y-3">
            {[
              { item: "XLR Cable (10m)", left: 3 },
              { item: "Mic Stand", left: 2 },
              { item: "Extension Cord", left: 1 },
            ].map((x, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/30 p-3"
              >
                <div className="text-sm text-slate-100">{x.item}</div>
                <div className="text-xs text-slate-400">{x.left} left</div>
              </div>
            ))}
          </div>

          <button className={`mt-4 w-full ${ADMIN_THEME.button.base} ${ADMIN_THEME.button.primary}`}>
            Restock Items
          </button>
        </div>
      </div>
    </div>
  );
}

import { ADMIN_THEME } from "../../utils/adminTheme.jsx";

function StatCard({ title, value, note }) {
  return (
    <div className={`${ADMIN_THEME.card} p-5`}>
      <div className={`text-sm ${ADMIN_THEME.muted}`}>{title}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      {note ? <div className={`mt-2 text-xs ${ADMIN_THEME.muted}`}>{note}</div> : null}
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Overview</h1>
        <p className={`text-sm ${ADMIN_THEME.muted}`}>
          Today’s status of your audio rental shop.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Active Rentals" value="12" note="Currently rented items" />
        <StatCard title="Returns Due" value="5" note="Due in next 24h" />
        <StatCard title="Total Products" value="86" note="Speakers, mics, mixers..." />
        <StatCard title="Revenue (Month)" value="LKR 245,000" note="Estimate" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className={`${ADMIN_THEME.card} p-5`}>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Recent Rentals</h2>
            <span className={`text-xs ${ADMIN_THEME.muted}`}>Last 7 days</span>
          </div>

          <div className="mt-4 space-y-3">
            {[
              { name: "Shure SM58 Mic", customer: "Kasun", status: "Active" },
              { name: "Yamaha MG10XU Mixer", customer: "Nimali", status: "Due" },
              { name: "JBL EON Speaker", customer: "Amal", status: "Returned" },
            ].map((r, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/30 px-3 py-2"
              >
                <div>
                  <div className="text-sm font-medium">{r.name}</div>
                  <div className={`text-xs ${ADMIN_THEME.muted}`}>{r.customer}</div>
                </div>
                <div className="text-xs text-slate-300">{r.status}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${ADMIN_THEME.card} p-5`}>
          <h2 className="font-semibold">Low Stock Alerts</h2>
          <p className={`mt-1 text-sm ${ADMIN_THEME.muted}`}>
            Items that need maintenance or restock.
          </p>

          <ul className="mt-4 space-y-3">
            <li className="rounded-xl border border-slate-800 bg-slate-950/30 px-3 py-2">
              <div className="text-sm font-medium">XLR Cable (3m)</div>
              <div className={`text-xs ${ADMIN_THEME.muted}`}>Only 2 left</div>
            </li>
            <li className="rounded-xl border border-slate-800 bg-slate-950/30 px-3 py-2">
              <div className="text-sm font-medium">Wireless Mic Battery</div>
              <div className={`text-xs ${ADMIN_THEME.muted}`}>Replace soon</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

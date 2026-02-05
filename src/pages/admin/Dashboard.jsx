import { THEME } from "../../utils/theme.jsx";

export default function Dashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className={`${THEME.card} p-4`}>
        <div className="text-sm text-slate-500">Users</div>
        <div className="mt-1 text-2xl font-semibold">—</div>
      </div>
      <div className={`${THEME.card} p-4`}>
        <div className="text-sm text-slate-500">Products</div>
        <div className="mt-1 text-2xl font-semibold">—</div>
      </div>
      <div className={`${THEME.card} p-4`}>
        <div className="text-sm text-slate-500">Categories</div>
        <div className="mt-1 text-2xl font-semibold">—</div>
      </div>
    </div>
  );
}

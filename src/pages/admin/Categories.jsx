import { THEME } from "../../utils/theme.jsx";

export default function Categories() {
  return (
    <div className={`${THEME.card} p-6`}>
      <h2 className="text-lg font-semibold">Categories</h2>
      <p className="mt-1 text-sm text-slate-500">Admin category CRUD UI here.</p>
    </div>
  );
}

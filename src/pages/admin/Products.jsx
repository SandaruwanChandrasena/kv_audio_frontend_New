import { THEME } from "../../utils/theme.jsx";

export default function Products() {
  return (
    <div className={`${THEME.card} p-6`}>
      <h2 className="text-lg font-semibold">Products</h2>
      <p className="mt-1 text-sm text-slate-500">Admin product CRUD UI here.</p>
    </div>
  );
}

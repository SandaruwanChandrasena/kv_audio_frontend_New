import { THEME } from "../../utils/theme.jsx";

export default function ProductDetails() {
  return (
    <div className={`${THEME.card} p-6`}>
      <h2 className="text-xl font-semibold">Product Details</h2>
      <p className="mt-1 text-sm text-slate-500">
        This will show one product by key later.
      </p>
    </div>
  );
}

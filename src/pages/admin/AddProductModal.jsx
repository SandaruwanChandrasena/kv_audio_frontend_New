import { useEffect, useState } from "react";
import { ADMIN_THEME } from "../../utils/adminTheme.jsx";
import AdminInput from "../../components/admin/AdminInput.jsx";
import AdminButton from "../../components/admin/AdminButton.jsx";
import { getCategories } from "../../api/categories";
import { addProduct } from "../../api/products";

export default function AddProductModal({ open, onClose, onCreated }) {
  const [cats, setCats] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    key: "",
    name: "",
    description: "",
    dimensions: "",
    categoryId: "",

    productImagesText: "", // comma separated

    totalQty: 1,
    minHours: 3,

    hourly: 0,
    halfDay: 0,
    fullDay: 0,

    availability: true,
  });

  useEffect(() => {
    if (!open) return;

    (async () => {
      setLoadingCats(true);
      try {
        const data = await getCategories(); // public route
        setCats(data.categories ?? []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingCats(false);
      }
    })();
  }, [open]);

  if (!open) return null;

  const setVal = (name, value) => setForm((p) => ({ ...p, [name]: value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const images = form.productImagesText
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean);

      const payload = {
        key: form.key,
        name: form.name,
        description: form.description,
        dimensions: form.dimensions,
        categoryId: form.categoryId || undefined,
        productImages: images.length ? images : undefined,
        totalQty: Number(form.totalQty),
        minHours: Number(form.minHours),
        pricing: {
          hourly: Number(form.hourly),
          halfDay: Number(form.halfDay),
          fullDay: Number(form.fullDay),
        },
        availability: !!form.availability,
      };

      const res = await addProduct(payload);

      // reset
      setForm({
        key: "",
        name: "",
        description: "",
        dimensions: "",
        categoryId: "",
        productImagesText: "",
        totalQty: 1,
        minHours: 3,
        hourly: 0,
        halfDay: 0,
        fullDay: 0,
        availability: true,
      });

      onCreated?.(res.product);
      onClose?.();
    } catch (err) {
      const msg = err?.response?.data?.message || "Add product failed";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => !saving && onClose?.()}
      />

      {/* modal */}
      <div className={`${ADMIN_THEME.card} relative w-full max-w-3xl p-5`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Add Product</h2>
            <p className={`text-sm ${ADMIN_THEME.muted}`}>
              Create a new item in your rental shop.
            </p>
          </div>

          <AdminButton variant="ghost" onClick={() => !saving && onClose?.()}>
            ✕
          </AdminButton>
        </div>

        {error ? (
          <div className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        ) : null}

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          {/* top grid */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <AdminInput
              value={form.key}
              onChange={(e) => setVal("key", e.target.value)}
              placeholder="KEY (unique)"
            />
            <AdminInput
              value={form.name}
              onChange={(e) => setVal("name", e.target.value)}
              placeholder="Product Name"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <AdminInput
              value={form.dimensions}
              onChange={(e) => setVal("dimensions", e.target.value)}
              placeholder="Dimensions (ex: 30cm x 20cm)"
            />

            <select
              value={form.categoryId}
              onChange={(e) => setVal("categoryId", e.target.value)}
              className={ADMIN_THEME.input}
              disabled={loadingCats}
            >
              <option value="" className="bg-slate-950">
                {loadingCats ? "Loading categories..." : "Select category (optional)"}
              </option>

              {cats.map((c) => (
                <option key={c._id} value={c._id} className="bg-slate-950">
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <textarea
            value={form.description}
            onChange={(e) => setVal("description", e.target.value)}
            placeholder="Description"
            className={`${ADMIN_THEME.input} min-h-[90px]`}
          />

          <AdminInput
            value={form.productImagesText}
            onChange={(e) => setVal("productImagesText", e.target.value)}
            placeholder="Image URLs (comma separated) - optional"
          />

          {/* qty + minHours */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <AdminInput
              type="number"
              value={form.totalQty}
              onChange={(e) => setVal("totalQty", e.target.value)}
              placeholder="Total Qty"
            />
            <AdminInput
              type="number"
              value={form.minHours}
              onChange={(e) => setVal("minHours", e.target.value)}
              placeholder="Min Hours"
            />
          </div>

          {/* pricing */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <AdminInput
              type="number"
              value={form.hourly}
              onChange={(e) => setVal("hourly", e.target.value)}
              placeholder="Hourly Price"
            />
            <AdminInput
              type="number"
              value={form.halfDay}
              onChange={(e) => setVal("halfDay", e.target.value)}
              placeholder="Half-Day Price"
            />
            <AdminInput
              type="number"
              value={form.fullDay}
              onChange={(e) => setVal("fullDay", e.target.value)}
              placeholder="Full-Day Price"
            />
          </div>

          {/* availability */}
          <label className="flex items-center gap-2 text-sm text-slate-200">
            <input
              type="checkbox"
              checked={form.availability}
              onChange={(e) => setVal("availability", e.target.checked)}
              className="h-4 w-4 accent-emerald-600"
            />
            Available for rental
          </label>

          <div className="flex justify-end gap-2 pt-2">
            <AdminButton variant="ghost" type="button" onClick={() => !saving && onClose?.()}>
              Cancel
            </AdminButton>
            <AdminButton type="submit" disabled={saving}>
              {saving ? "Saving..." : "Create Product"}
            </AdminButton>
          </div>
        </form>
      </div>
    </div>
  );
}

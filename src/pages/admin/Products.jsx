import { useEffect, useMemo, useState } from "react";
import { ADMIN_THEME } from "../../utils/adminTheme.jsx";
import AdminInput from "../../components/admin/AdminInput.jsx";
import AdminButton from "../../components/admin/AdminButton.jsx";
import { getProducts } from "../../api/products";

function Th({ children }) {
  return (
    <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
      {children}
    </th>
  );
}

// ✅ Badge uses availability (true/false)
function Badge({ availability }) {
  const label = availability ? "Available" : "Not Available";

  const cls = availability
    ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/20"
    : "bg-rose-500/15 text-rose-300 border-rose-500/20";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${cls}`}
    >
      {label}
    </span>
  );
}

export default function Products() {
  // ✅ DB products
  const [dbProducts, setDbProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI filters
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All"); // Available / Not Available
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState("asc"); // asc | desc

  // ✅ Fetch products from backend
  useEffect(() => {
    (async () => {
      try {
        const data = await getProducts();
        setDbProducts(data.products ?? []);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ✅ Convert backend product shape -> admin table row shape
  const rows = useMemo(() => {
    return dbProducts.map((p) => ({
      id: p.key || p._id,
      name: p.name || "—",
      category: p.category?.name || "—",
      price: p.pricing?.fullDay ?? 0, // per day
      stock: p.totalQty ?? 0,
      availability: !!p.availability, // true/false
      _raw: p,
    }));
  }, [dbProducts]);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(rows.map((p) => p.category))).filter(
      (x) => x && x !== "—"
    );
    return ["All", ...unique];
  }, [rows]);

  const statuses = ["All", "Available", "Not Available"];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = rows.filter((p) => {
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        String(p.id).toLowerCase().includes(q);

      const matchesCategory = category === "All" ? true : p.category === category;

      const uiStatus = p.availability ? "Available" : "Not Available";
      const matchesStatus = status === "All" ? true : uiStatus === status;

      return matchesQuery && matchesCategory && matchesStatus;
    });

    list.sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      const av = a[sortKey];
      const bv = b[sortKey];

      if (typeof av === "string") return av.localeCompare(bv) * dir;
      return (av - bv) * dir;
    });

    return list;
  }, [rows, query, category, status, sortKey, sortDir]);

  function toggleSort(nextKey) {
    if (sortKey === nextKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(nextKey);
      setSortDir("asc");
    }
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold">Products</h1>
          <p className={`text-sm ${ADMIN_THEME.muted}`}>
            Search, filter, and manage your rental items.
          </p>
        </div>

        <AdminButton className="sm:w-auto w-full">+ Add Product</AdminButton>
      </div>

      {/* Controls */}
      <div className={`${ADMIN_THEME.card} p-4`}>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
          {/* Search */}
          <div className="md:col-span-6">
            <label className={`mb-1 block text-xs ${ADMIN_THEME.muted}`}>
              Search
            </label>
            <AdminInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, category, or ID..."
            />
          </div>

          {/* Category */}
          <div className="md:col-span-3">
            <label className={`mb-1 block text-xs ${ADMIN_THEME.muted}`}>
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={ADMIN_THEME.input}
            >
              {categories.map((c) => (
                <option key={c} value={c} className="bg-slate-950">
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="md:col-span-3">
            <label className={`mb-1 block text-xs ${ADMIN_THEME.muted}`}>
              Availability
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={ADMIN_THEME.input}
            >
              {statuses.map((s) => (
                <option key={s} value={s} className="bg-slate-950">
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Actions row */}
          <div className="md:col-span-12 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pt-2">
            <div className={`text-sm ${ADMIN_THEME.muted}`}>
              {loading ? (
                <>Loading…</>
              ) : (
                <>
                  Showing{" "}
                  <span className="text-slate-200 font-medium">
                    {filtered.length}
                  </span>{" "}
                  items
                </>
              )}
            </div>

            <div className="flex gap-2">
              <AdminButton
                variant="ghost"
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                  setStatus("All");
                  setSortKey("name");
                  setSortDir("asc");
                }}
              >
                Reset
              </AdminButton>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className={`${ADMIN_THEME.card} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-950/40">
              <tr className={`border-b ${ADMIN_THEME.divider}`}>
                <Th>ID</Th>
                <Th>
                  <button
                    onClick={() => toggleSort("name")}
                    className="inline-flex items-center gap-1 hover:text-slate-200"
                  >
                    Name{" "}
                    {sortKey === "name" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                  </button>
                </Th>
                <Th>Category</Th>
                <Th>
                  <button
                    onClick={() => toggleSort("price")}
                    className="inline-flex items-center gap-1 hover:text-slate-200"
                  >
                    Price{" "}
                    {sortKey === "price" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                  </button>
                </Th>
                <Th>
                  <button
                    onClick={() => toggleSort("stock")}
                    className="inline-flex items-center gap-1 hover:text-slate-200"
                  >
                    Stock{" "}
                    {sortKey === "stock" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                  </button>
                </Th>
                <Th>Availability</Th>
                <Th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Actions
                </Th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-sm text-slate-400"
                  >
                    Loading products…
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-sm text-slate-400"
                  >
                    No products found.
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr
                    key={p.id}
                    className={`border-b ${ADMIN_THEME.divider} hover:bg-slate-950/30 transition`}
                  >
                    <td className="px-4 py-3 text-sm text-slate-300">{p.id}</td>
                    <td className="px-4 py-3 text-sm font-medium text-slate-100">
                      {p.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-300">
                      {p.category}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-300">
                      LKR {Number(p.price).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-300">{p.stock}</td>
                    <td className="px-4 py-3">
                      <Badge availability={p.availability} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <AdminButton variant="ghost" className="px-3 py-1.5 text-sm">
                          Edit
                        </AdminButton>
                        <AdminButton variant="danger" className="px-3 py-1.5 text-sm">
                          Delete
                        </AdminButton>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

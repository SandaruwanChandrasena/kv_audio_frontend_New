import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import { getProducts } from "../../api/products";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [search, setSearch] = useState("");
  const [selectedCats, setSelectedCats] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  // fetch products from backend
  useEffect(() => {
    (async () => {
      try {
        const data = await getProducts();
        setProducts(data.products ?? []);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // categories from DB
  const allCategories = useMemo(() => {
    const set = new Set(products.map((p) => p.category?.name).filter(Boolean));
    return Array.from(set).sort();
  }, [products]);

  // pricing.fullDay is used as "price/day"
  const prices = useMemo(
    () => products.map((p) => p.pricing?.fullDay ?? 0),
    [products]
  );

  const minPossible = prices.length ? Math.min(...prices) : 0;
  const maxPossible = prices.length ? Math.max(...prices) : 0;

  // set initial min/max after loading
  useEffect(() => {
    setMinPrice(minPossible);
    setMaxPrice(maxPossible);
  }, [minPossible, maxPossible]);

  const toggleCategory = (cat) => {
    setSelectedCats((prev) =>
      prev.includes(cat) ? prev.filter((x) => x !== cat) : [...prev, cat]
    );
  };

  const resetFilters = () => {
    setSearch("");
    setSelectedCats([]);
    setMinPrice(minPossible);
    setMaxPrice(maxPossible);
  };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const name = p.name ?? "";
      const categoryName = p.category?.name ?? "";
      const price = p.pricing?.fullDay ?? 0;

      const matchesSearch =
        !search.trim() || name.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCats.length === 0 || selectedCats.includes(categoryName);

      const matchesPrice =
        price >= Number(minPrice) && price <= Number(maxPrice);

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, search, selectedCats, minPrice, maxPrice]);

  if (loading) return <div className="p-6 text-slate-600">Loading…</div>;

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      {/* LEFT FILTER BAR */}
      <aside className="sticky top-6 self-start max-h-[85vh] overflow-hidden rounded-xl border border-slate-200 bg-white/90 p-3 shadow-sm backdrop-blur">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold">Filters</h2>
            <p className="text-[11px] text-slate-500">
              Narrow down your products.
            </p>
          </div>
          <button
            onClick={resetFilters}
            className="text-xs font-medium text-emerald-700 hover:text-emerald-800"
          >
            Reset
          </button>
        </div>

        {/* Search */}
        <div className="mt-3">
          <label className="text-xs font-medium text-slate-700">Search</label>
          <div className="mt-2">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mt-3">
          <div className="text-xs font-medium text-slate-700">Categories</div>
          <div className="mt-2 max-h-40 overflow-y-auto pr-1">
            <div className="space-y-1">
              {allCategories.map((cat) => {
                const checked = selectedCats.includes(cat);
                return (
                  <label
                    key={cat}
                    className="flex cursor-pointer items-center justify-between rounded-lg border border-slate-200 bg-white/70 px-3 py-1.5 hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleCategory(cat)}
                        className="h-4 w-4 accent-emerald-600"
                      />
                      <span className="text-sm text-slate-800">{cat}</span>
                    </div>
                    <span className="text-xs text-slate-500">
                      {products.filter((p) => p.category?.name === cat).length}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Price range */}
        <div className="mt-3">
          <div className="text-xs font-medium text-slate-700">
            Price range (per day)
          </div>

          <div className="mt-2 grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-500">Min</label>
              <Input
                type="number"
                value={minPrice}
                min={minPossible}
                max={maxPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs text-slate-500">Max</label>
              <Input
                type="number"
                value={maxPrice}
                min={minPrice}
                max={maxPossible}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-3">
            <input
              type="range"
              min={minPossible}
              max={maxPossible}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full accent-emerald-600"
            />
            <div className="mt-1 flex justify-between text-xs text-slate-500">
              <span>Rs. {minPossible}</span>
              <span>Rs. {maxPossible}</span>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50/90 p-3">
          <div className="text-sm font-semibold text-emerald-700">
            {filtered.length} product(s) found
          </div>
        </div>
      </aside>

      {/* RIGHT PRODUCTS GRID */}
      <section className="relative flex flex-col rounded-3xl border border-slate-200 bg-white/60 shadow-sm backdrop-blur">
        <div className="z-10 rounded-t-3xl border-b border-slate-200 bg-white/85 p-4 backdrop-blur sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">Products</h1>
              <p className="mt-2 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                Browse and filter by category and price.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-2 py-1">
              <Button variant="ghost" onClick={resetFilters}>
                Clear filters
              </Button>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-8 text-slate-600 backdrop-blur">
              No products match your filters.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <div
                  key={p.key}
                  className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="h-32 rounded-xl bg-slate-100 overflow-hidden">
                    <img
                      src={p.productImages?.[0]}
                      alt={p.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-slate-900">
                        {p.name}
                      </div>
                      <div className="mt-1 text-sm text-slate-500">
                        {p.category?.name}
                      </div>
                    </div>

                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                      {p.status}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm font-semibold text-slate-900">
                      Rs. {p.pricing?.fullDay}/day
                    </div>
                  </div>

                  <div className="mt-auto pt-4">
                    <Link to={`/products/${p.key}`}>
                      <Button className="w-full">View</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

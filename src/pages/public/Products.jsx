import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";

// Demo products (replace with backend later)
const DEMO_PRODUCTS = [
  { key: "jbl-partybox", name: "JBL PartyBox Speaker", category: "Speakers", price: 1500, rating: 4.8 },
  { key: "wired-mic", name: "Wired Microphone", category: "Microphones", price: 200, rating: 4.7 },
  { key: "wireless-mic", name: "Wireless Microphone", category: "Microphones", price: 600, rating: 4.8 },
  { key: "mixer-6ch", name: "6-Channel Mixer", category: "Mixers", price: 800, rating: 4.6 },
  { key: "speaker-stand", name: "Speaker Stand (Pair)", category: "Accessories", price: 300, rating: 4.5 },
  { key: "cables-pack", name: "Cables Pack", category: "Accessories", price: 150, rating: 4.4 },
];

export default function Products() {
  // categories derived from data
  const allCategories = useMemo(() => {
    const set = new Set(DEMO_PRODUCTS.map((p) => p.category));
    return Array.from(set).sort();
  }, []);

  const prices = useMemo(() => DEMO_PRODUCTS.map((p) => p.price), []);
  const minPossible = Math.min(...prices);
  const maxPossible = Math.max(...prices);

  // filters
  const [search, setSearch] = useState("");
  const [selectedCats, setSelectedCats] = useState([]); // array of category names
  const [minPrice, setMinPrice] = useState(minPossible);
  const [maxPrice, setMaxPrice] = useState(maxPossible);

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
    return DEMO_PRODUCTS.filter((p) => {
      const matchesSearch =
        !search.trim() || p.name.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCats.length === 0 || selectedCats.includes(p.category);

      const matchesPrice = p.price >= Number(minPrice) && p.price <= Number(maxPrice);

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [search, selectedCats, minPrice, maxPrice]);

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      {/* LEFT FILTER BAR */}
      <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-base font-semibold">Filters</h2>
            <p className="text-xs text-slate-500">Narrow down your products.</p>
          </div>
          <button
            onClick={resetFilters}
            className="text-xs font-medium text-emerald-700 hover:text-emerald-800"
          >
            Reset
          </button>
        </div>

        {/* Search */}
        <div className="mt-4">
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
        <div className="mt-5">
          <div className="text-xs font-medium text-slate-700">Categories</div>
          <div className="mt-2 space-y-2">
            {allCategories.map((cat) => {
              const checked = selectedCats.includes(cat);
              return (
                <label
                  key={cat}
                  className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 px-3 py-2 hover:bg-slate-50"
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
                    {DEMO_PRODUCTS.filter((p) => p.category === cat).length}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Price range */}
        <div className="mt-5">
          <div className="text-xs font-medium text-slate-700">Price range (per day)</div>

          <div className="mt-3 grid grid-cols-2 gap-3">
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

          {/* Optional quick slider (max) */}
          <div className="mt-4">
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
        <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <div className="text-sm font-semibold text-emerald-700">
            {filtered.length} product(s) found
          </div>
          <div className="mt-1 text-xs text-emerald-700/80">
            Adjust filters to refine.
          </div>
        </div>
      </aside>

      {/* RIGHT PRODUCTS GRID */}
      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">Products</h1>
            <p className="text-sm text-slate-500">
              Browse and filter by category and price.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <Button variant="ghost" onClick={resetFilters}>
              Clear filters
            </Button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-slate-600">
            No products match your filters.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <div
                key={p.key}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="h-32 rounded-xl bg-slate-100" />

                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold text-slate-900">{p.name}</div>
                    <div className="mt-1 text-sm text-slate-500">{p.category}</div>
                  </div>

                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    ★ {p.rating}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm font-semibold text-slate-900">
                    Rs. {p.price}/day
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
      </section>
    </div>
  );
}

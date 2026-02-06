import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const navItemClass =
  "px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-emerald-700 font-medium";

const activeNavItemClass =
  "px-4 py-2 rounded-lg font-medium bg-slate-100 text-emerald-700";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    navigate(`/products?search=${encodeURIComponent(query)}`);
    setMobileOpen(false);
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 shrink-0">
            <div className="rounded-xl bg-emerald-600 p-2.5 shadow-md">
              <span className="text-2xl text-white">🎧</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold text-slate-900">KV Audio</h1>
              <p className="text-xs text-slate-500">Premium Audio Rentals</p>
            </div>
          </Link>

          {/* Search Bar (Hover Expand - Desktop) */}
          <form onSubmit={onSubmit} className="hidden md:flex" role="search">
            <div
              className="
                group flex items-center
                w-12 hover:w-85 focus-within:w-85
                transition-all duration-300 ease-out
                overflow-hidden
                rounded-full
                border border-slate-200
                bg-slate-50
                shadow-sm
                hover:shadow-md
                focus-within:ring-2 focus-within:ring-emerald-500
              "
            >
              {/* Icon */}
              <span className="px-3 py-1 text-lg text-slate-500">🔍</span>

              {/* Input */}
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                type="text"
                placeholder="Search equipment..."
                className="
                  w-full bg-transparent
                  text-sm text-slate-700
                  placeholder-slate-400
                  focus:outline-none
                  opacity-0 group-hover:opacity-100 focus:opacity-100
                  transition-opacity duration-200
                "
              />

              {/* Button */}
              <button
                type="submit"
                className="
                
                  mx-2 
                  rounded-full
                  bg-emerald-600
                  px-4 py-1
                  text-sm font-semibold text-white
                  hover:bg-emerald-700
                "
              >
                Search
              </button>
            </div>
          </form>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-1 md:flex">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? activeNavItemClass : navItemClass
              }
            >
              Home
            </NavLink>

            <div className="relative group">
              <button className="flex items-center px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-emerald-700 font-medium">
                Equipment
                <span className="ml-2 text-xs">▾</span>
              </button>

              <div className="absolute left-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                <div className="py-2">
                  {[
                    ["speakers", "🔊 Speakers & PA"],
                    ["microphones", "🎤 Microphones"],
                    ["mixers", "🎚️ Mixers & Processors"],
                    ["lighting", "💡 Lighting"],
                  ].map(([key, label]) => (
                    <Link
                      key={key}
                      to={`/products?category=${key}`}
                      className="block mx-2 px-4 py-3 rounded-lg text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                isActive ? activeNavItemClass : navItemClass
              }
            >
              Pricing
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? activeNavItemClass : navItemClass
              }
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? activeNavItemClass : navItemClass
              }
            >
              Contact
            </NavLink>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3 shrink-0">
            <Link
              to="/cart"
              className="relative p-2.5 rounded-lg hover:bg-slate-100"
            >
              🛒
              <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                3
              </span>
            </Link>

            <Link
              to="/contact"
              className="hidden md:block bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-semibold shadow-md hover:bg-emerald-700"
            >
              Book Now
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2.5 rounded-lg hover:bg-slate-100"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden border-t border-slate-200 ${mobileOpen ? "" : "hidden"}`}
      >
        <div className="px-4 py-4 space-y-3">
          <form onSubmit={onSubmit} className="flex">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search equipment..."
              className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500"
            />
            <button className="ml-2 px-4 rounded-lg bg-emerald-600 text-white font-semibold">
              Search
            </button>
          </form>

          {["/", "/pricing", "/about", "/contact"].map((path) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-100"
            >
              {path === "/" ? "Home" : path.replace("/", "")}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

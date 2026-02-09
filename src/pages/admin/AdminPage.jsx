import { Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./Dashboard";
import Users from "./Users";
import Products from "./Products";
import { ADMIN_THEME } from "../../utils/adminTheme.jsx";

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      end={to === "/admin"}
      className={({ isActive }) =>
        [
          "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition",
          isActive
            ? "bg-emerald-600/15 text-emerald-300 border border-emerald-600/30"
            : "text-slate-200 hover:bg-slate-800/60 border border-transparent",
        ].join(" ")
      }
    >
      <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
      {label}
    </NavLink>
  );
}

export default function AdminPage() {
  return (
    <div className={ADMIN_THEME.page}>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-slate-800 bg-slate-950/60 p-4 md:block">
          <div className="mb-6">
            <div className="text-lg font-semibold text-slate-100">
              Audio Rental Admin
            </div>
            <div className="text-xs text-slate-400">
              Manage users, products, rentals
            </div>
          </div>

          <nav className="space-y-2">
            <NavItem to="/admin" label="Dashboard" />
            <NavItem to="/admin/users" label="Users" />
            <NavItem to="/admin/products" label="Products" />
          </nav>

          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <div className="text-sm font-medium text-slate-100">Quick Tip</div>
            <div className="mt-1 text-xs text-slate-400">
              Keep your stock updated to avoid double bookings.
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1">
          {/* Topbar */}
          <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/60 backdrop-blur">
            <div className={`${ADMIN_THEME.container} flex items-center gap-3 py-4`}>
              <div className="font-semibold text-slate-100">Admin Dashboard</div>

              <div className="ml-auto flex items-center gap-2">
                <input
                  className={`hidden md:block md:w-72 ${ADMIN_THEME.input}`}
                  placeholder="Search users / products..."
                />
                <button className={`${ADMIN_THEME.button.base} ${ADMIN_THEME.button.ghost}`}>
                  Settings
                </button>
                <button className={`${ADMIN_THEME.button.base} ${ADMIN_THEME.button.primary}`}>
                  New Rental
                </button>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className={`${ADMIN_THEME.container} py-6`}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/products" element={<Products />} />
              <Route path="*" element={<div className="text-slate-300">Admin page not found</div>} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

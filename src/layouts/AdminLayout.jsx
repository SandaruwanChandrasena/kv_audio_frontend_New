import { Outlet, NavLink } from "react-router-dom";
import { THEME } from "../utils/theme.jsx";

const linkBase =
  "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition";

export default function AdminLayout() {
  return (
    <div className={`min-h-screen ${THEME.colors?.admin?.appBg || "bg-slate-100"}`}>
      <div className="flex">
        <aside className="min-h-screen w-64 bg-slate-900 text-slate-100">
          <div className="px-4 py-5">
            <div className="text-lg font-semibold">Admin Panel</div>
            <div className="text-xs text-slate-300">KV Audio Rentals</div>
          </div>

          <nav className="px-3 space-y-1">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `${linkBase} ${isActive ? "bg-emerald-600 text-white" : "text-slate-200 hover:bg-slate-800"}`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? "bg-emerald-600 text-white" : "text-slate-200 hover:bg-slate-800"}`
              }
            >
              Users
            </NavLink>

            <NavLink
              to="/admin/products"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? "bg-emerald-600 text-white" : "text-slate-200 hover:bg-slate-800"}`
              }
            >
              Products
            </NavLink>

            <NavLink
              to="/admin/categories"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? "bg-emerald-600 text-white" : "text-slate-200 hover:bg-slate-800"}`
              }
            >
              Categories
            </NavLink>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-lg font-semibold">Admin</div>
            <div className="text-sm text-slate-500">
              Manage users, products, and categories.
            </div>
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  );
}

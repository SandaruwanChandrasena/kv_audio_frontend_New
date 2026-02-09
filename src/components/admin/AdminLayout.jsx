import { NavLink, Outlet } from "react-router-dom";
import { ADMIN_THEME } from "../../utils/adminTheme.jsx";
import AdminButton from "./AdminButton.jsx";

function Item({ to, label }) {
  return (
    <NavLink
      to={to}
      end={to === "/admin"}
      className={({ isActive }) =>
        [
          "block rounded-xl px-3 py-2 text-sm font-medium transition",
          isActive ? "bg-emerald-500/15 text-emerald-300" : "text-slate-200 hover:bg-slate-800",
        ].join(" ")
      }
    >
      {label}
    </NavLink>
  );
}

export default function AdminLayout() {
  return (
    <div className={ADMIN_THEME.page}>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className={`hidden md:flex md:w-64 md:flex-col ${ADMIN_THEME.panel}`}>
          <div className={`p-4 border-b ${ADMIN_THEME.divider}`}>
            <div className="text-lg font-semibold">Audio Rental Admin</div>
            <div className={`text-xs ${ADMIN_THEME.muted}`}>Manage your shop</div>
          </div>

          <nav className="p-3 space-y-1">
            <Item to="/admin" label="Dashboard" />
            <Item to="/admin/users" label="Users" />
            <Item to="/admin/products" label="Products" />
            <Item to="/admin/rentals" label="Rentals" />
            <Item to="/admin/returns" label="Returns" />
          </nav>

          <div className="mt-auto p-4 border-t border-slate-800">
            <AdminButton variant="ghost" className="w-full">
              Logout
            </AdminButton>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1">
          {/* Topbar */}
          <header className={`sticky top-0 z-20 border-b ${ADMIN_THEME.divider} bg-slate-950/70 backdrop-blur`}>
            <div className={`${ADMIN_THEME.container} flex items-center justify-between py-3`}>
              <div>
                <div className="text-sm font-semibold">Admin Dashboard</div>
                <div className={`text-xs ${ADMIN_THEME.muted}`}>Audio rental shop</div>
              </div>

              <div className="flex items-center gap-2">
                <AdminButton variant="ghost">Notifications</AdminButton>
                <AdminButton>New Rental</AdminButton>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className={`${ADMIN_THEME.container} py-6`}>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

import { Outlet, Link } from "react-router-dom";
import { THEME } from "../utils/theme.jsx";
import Button from "../components/common/Button.jsx";

export default function PublicLayout() {
  return (
    <div className={THEME.page}>
      <header className="border-b border-slate-200 bg-white">
        <div className={`${THEME.container} flex h-16 items-center justify-between`}>
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-emerald-600" />
            <span className="text-lg font-semibold">KV Audio Rentals</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className={`${THEME.container} py-10`}>
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className={`${THEME.container} py-6 text-sm text-slate-500`}>
          © {new Date().getFullYear()} KV Audio Rentals
        </div>
      </footer>
    </div>
  );
}

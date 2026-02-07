import { useState } from "react";
import { Link } from "react-router-dom";

import { THEME } from "../../utils/theme.jsx";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: login logic
    console.log("login:", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Overlay so AnimatedBackground doesn't overpower the UI */}
      <div className="fixed inset-0 bg-slate-950/10 backdrop-blur-[1px]" />

      <div className="relative w-full max-w-md">
        <div
          className={`${THEME.card} p-8`}
          style={{
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-slate-900">Login</h1>
            <p className="mt-1 text-sm text-slate-600">
              Welcome back — please sign in to continue.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={onChange}
              required
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={onChange}
              required
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-200"
                />
                Remember me
              </label>

              <button
                type="button"
                className="text-emerald-700 hover:underline"
                onClick={() => console.log("forgot password")}
              >
                Forgot password?
              </button>
            </div>

            <Button type="submit" variant="primary" className="w-full">
              Sign in
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-emerald-700 hover:underline"
            >
              Create one
            </Link>
          </div>
        </div>

        {/* small footer under card */}
        <p className="mt-4 text-center text-xs text-slate-700/70">
          © {new Date().getFullYear()} Your App
        </p>
      </div>
    </div>
  );
}

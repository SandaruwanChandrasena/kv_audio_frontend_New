import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { THEME } from "../../utils/theme.jsx";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import { login } from "../../api/auth";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login(form);

      // ✅ save token so future requests include it
      localStorage.setItem("token", data.token);

      // (optional) store basic user info
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ if backend says restricted, you can show message (still logged in)
      if (data.restricted) {
        alert(data.restrictedMessage || "Your account is restricted.");
      }

      // ✅ route based on role
      if (data.user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed. Try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
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

          {error ? (
            <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          ) : null}

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

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
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

        <p className="mt-4 text-center text-xs text-slate-700/70">
          © {new Date().getFullYear()} Your App
        </p>
      </div>
    </div>
  );
}

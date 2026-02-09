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

      // ✅ SAVE TOKEN
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      console.log("TOKEN SAVED:", localStorage.getItem("token"));

      if (data.user?.role === "admin") navigate("/admin");
      else navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
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
          style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(12px)" }}
        >
          <h1 className="text-2xl font-semibold text-slate-900">Login</h1>

          {error && (
            <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4 mt-6">
            <Input
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              required
            />

            <Input
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              required
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            Don’t have an account?{" "}
            <Link to="/register" className="font-medium text-emerald-700 hover:underline">
              Create one
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

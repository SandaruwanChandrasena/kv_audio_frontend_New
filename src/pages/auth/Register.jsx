import { useState } from "react";
import { Link } from "react-router-dom";

import { THEME } from "../../utils/theme.jsx";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: connect backend auth
    console.log("register:", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* overlay for AnimatedBackground */}
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
            <h1 className="text-2xl font-semibold text-slate-900">
              Create account
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Fill in your details to get started.
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

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="First name"
                name="firstName"
                placeholder="John"
                value={form.firstName}
                onChange={onChange}
                required
              />

              <Input
                label="Last name"
                name="lastName"
                placeholder="Doe"
                value={form.lastName}
                onChange={onChange}
                required
              />
            </div>

            <Input
              label="Phone number"
              name="phone"
              type="tel"
              placeholder="+94 xxx xxx xxxx"
              value={form.phone}
              onChange={onChange}
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Create a strong password"
              value={form.password}
              onChange={onChange}
              required
            />

            <Input
              label="Confirm password"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={onChange}
              required
            />

            <Button type="submit" variant="primary" className="w-full">
              Create account
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-emerald-700 hover:underline"
            >
              Sign in
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

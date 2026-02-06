import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        {/* Top Section */}
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="rounded-xl bg-emerald-600 p-2.5 shadow-md">
                <span className="text-2xl text-white">🎧</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">KV Audio</h3>
                <p className="text-xs text-slate-400">Premium Audio Rentals</p>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Professional audio equipment rentals for events, concerts, and productions.
              Reliable gear with clear pricing.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-emerald-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-slate-400 hover:text-emerald-400">
                  Equipment
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-slate-400 hover:text-emerald-400">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-emerald-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>📍 Sound City, Sri Lanka</li>
              <li>📞 +94 xx xxx xxxx</li>
              <li>✉️ support@kvaudio.com</li>
              <li>🕒 Mon – Sat: 9AM – 8PM</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} KV Audio. All rights reserved.</p>

          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-emerald-400">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-emerald-400">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

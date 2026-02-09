export const ADMIN_THEME = {
  page: "min-h-screen bg-slate-950 text-slate-100",
  container: "mx-auto w-full max-w-7xl px-4",

  // dark card surface
  card:
    "rounded-2xl border border-slate-800 bg-slate-900/60 shadow-sm backdrop-blur",

  // subtle panel (like sidebar)
  panel: "border border-slate-800 bg-slate-900",

  // text helpers
  muted: "text-slate-400",
  heading: "text-slate-100",
  divider: "border-slate-800",

  button: {
    base:
      "inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium transition active:scale-[0.98] focus:outline-none focus:ring-2",
    primary:
      "bg-emerald-500 text-slate-950 hover:bg-emerald-400 focus:ring-emerald-300/30",
    ghost:
      "bg-transparent text-slate-100 hover:bg-slate-800 focus:ring-slate-700/50",
    danger:
      "bg-rose-500 text-slate-950 hover:bg-rose-400 focus:ring-rose-300/30",
  },

  input:
    "w-full rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-2 text-slate-100 outline-none " +
    "placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300/25",
};

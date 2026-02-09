export const ADMIN_THEME = {
  page: "min-h-screen bg-slate-950 text-slate-100",
  container: "mx-auto w-full max-w-7xl px-4",

  // surfaces
  card:
    "rounded-2xl border border-slate-800 bg-slate-900/60 shadow-sm backdrop-blur",

  // text
  muted: "text-slate-400",
  heading: "text-slate-100",

  // buttons
  button: {
    base: "inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium transition active:scale-[0.98]",
    primary:
      "bg-emerald-600 text-white hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/30",
    ghost:
      "bg-transparent text-slate-100 hover:bg-slate-800/60 border border-slate-800",
  },

  input:
    "w-full rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 text-slate-100 outline-none " +
    "placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400/30",
};

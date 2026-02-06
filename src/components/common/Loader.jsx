export default function Loader({ size = "md", className = "" }) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-10 w-10",
    xl: "h-14 w-14",
  };

  return (
    <div
      className={`inline-block ${sizes[size] || sizes.md} animate-spin rounded-full border-2 border-slate-200 border-t-emerald-600 ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}

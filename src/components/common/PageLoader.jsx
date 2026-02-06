import Loader from "./Loader.jsx";

export default function PageLoader({ label = "Loading..." }) {
  return (
    <div className="min-h-[60vh] w-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader size="lg" />
        <p className="text-sm text-slate-500">{label}</p>
      </div>
    </div>
  );
}

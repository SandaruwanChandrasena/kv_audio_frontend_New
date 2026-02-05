import { THEME } from "../../utils/theme.jsx";

export default function Users() {
  return (
    <div className={`${THEME.card} p-6`}>
      <h2 className="text-lg font-semibold">Users</h2>
      <p className="mt-1 text-sm text-slate-500">Admin user management table here.</p>
    </div>
  );
}

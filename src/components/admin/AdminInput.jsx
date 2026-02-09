import { ADMIN_THEME } from "../../utils/adminTheme.jsx";

export default function AdminInput({ className = "", ...props }) {
  return <input className={`${ADMIN_THEME.input} ${className}`} {...props} />;
}

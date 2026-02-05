import { THEME } from "../../utils/theme.jsx";

export default function Input({ className = "", ...props }) {
  return <input className={`${THEME.input} ${className}`} {...props} />;
}

import { THEME } from "../../utils/theme.jsx";

export default function Button({
  variant = "primary",
  className = "",
  ...props
}) {
  const variantClass = variant === "ghost" ? THEME.button.ghost : THEME.button.primary;

  return (
    <button className={`${THEME.button.base} ${variantClass} ${className}`} {...props} />
  );
}

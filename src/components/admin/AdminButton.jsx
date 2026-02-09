import { ADMIN_THEME } from "../../utils/adminTheme.jsx";

export default function AdminButton({
  variant = "primary",
  className = "",
  ...props
}) {
  const map = {
    primary: ADMIN_THEME.button.primary,
    ghost: ADMIN_THEME.button.ghost,
    danger: ADMIN_THEME.button.danger,
  };

  const variantClass = map[variant] ?? ADMIN_THEME.button.primary;

  return (
    <button
      className={`${ADMIN_THEME.button.base} ${variantClass} ${className}`}
      {...props}
    />
  );
}

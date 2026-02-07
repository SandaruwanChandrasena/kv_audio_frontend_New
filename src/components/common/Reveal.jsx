import useInView from "../../hooks/useInView.jsx";

export default function Reveal({ children, className = "" }) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={[
        "transition-all duration-700 ease-out",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

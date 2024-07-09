export default function Button({
  onClick,
  iconDelta,
  icon,
  className,
}: {
  onClick: () => void;
  iconDelta?: "minus" | "plus";
  icon: string;
  className?: string;
}) {
  return (
    <button
      className={`bg-amber-600 hover:bg-amber-700 text-slate-50 py-1 px-2 rounded inline-flex mr-4 ${className}`}
      onClick={onClick}
    >
      {iconDelta ? <i className={`bx bx-${iconDelta} bx-sm`}></i> : null}
      <i className={`bx bx-${icon} bx-sm`}></i>
    </button>
  );
}

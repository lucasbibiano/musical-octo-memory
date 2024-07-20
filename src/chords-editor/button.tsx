export default function Button({
  onClick,
  iconDelta,
  icon,
  copy,
}: {
  onClick: () => void;
  iconDelta?: "minus" | "plus";
  icon: string;
  copy?: string;
  fit?: boolean;
}) {
  return (
    <button
      className={`bg-amber-600 hover:bg-amber-700 text-slate-50 py-1 px-2 inline-flex justify-end items-center justify-self-end`}
      onClick={onClick}
    >
      <span className="mr-2">{copy}</span>
      {iconDelta ? <i className={`bx bx-${iconDelta} bx-sm`}></i> : null}
      <i className={`bx ${icon} bx-sm`}></i>
    </button>
  );
}

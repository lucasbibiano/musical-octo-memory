type EditorType = {
  value: string;
  setValue: (string: string) => void;
};

export function Editor({ value, setValue }: EditorType) {
  return (
    <textarea
      className="no-scrollbar grow border-2 border-zinc-600 p-1"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

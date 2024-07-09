type EditorType = {
  value: string;
  setValue: (string: string) => void;
};

export function Editor({ value, setValue }: EditorType) {
  return (
    <textarea
      className={`overflow-x-scroll no-scrollbar grow`}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

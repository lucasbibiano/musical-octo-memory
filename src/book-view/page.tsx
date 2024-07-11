import { useState } from "react";
import { Renderer } from "./renderer";

export function Page() {
  const [entries, setEntries] = useState<string[]>([]);
  const [isEditMode, setIsEditMode] = useState(entries.length === 0);

  return (
    <>
      {isEditMode ? (
        <textarea
          className="mx-auto w-4/6 h-[400px] no-scrollbar grow border-2 border-zinc-600 p-1"
          value={entries.join("\n")}
          onChange={(e) => setEntries(e.target.value.split("\n"))}
        />
      ) : (
        <Renderer entries={entries} />
      )}

      <button
        className="fixed bottom-4 right-4 p-4 rounded-full bg-blue-600 text-white"
        onClick={() => setIsEditMode((actual) => !actual)}
      >
        {isEditMode ? (
          <i className={`bx bx-notepad bx-sm`}></i>
        ) : (
          <i className={`bx bx-edit-alt bx-sm`}></i>
        )}
      </button>
    </>
  );
}

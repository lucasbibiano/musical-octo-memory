import { useState } from "react";
import { Renderer } from "./renderer";

export function Page() {
  const [entries, setEntries] = useState<string[]>([]);
  const [isEditMode, setIsEditMode] = useState(entries.length === 0);

  const print = () => {
    setIsEditMode(false);
    setTimeout(() => window.print());
  };

  return (
    <>
      {isEditMode ? (
        <div className="mx-auto w-8/12 mt-8 text-center">
          <h2 className="text-2xl mb-2">
            Copy and paste chord urls here to create a view of multiple chords
            display
          </h2>
          <textarea
            className="w-full h-[400px] no-scrollbar grow border-2 border-zinc-600 p-1 mb-2"
            value={entries.join("\n")}
            onChange={(e) => setEntries(e.target.value.split("\n"))}
          />
          <div className="w-full flex justify-end print:hidden">
            <button
              className="p-4 bg-orange-600 text-white font-semibold rounded-md"
              onClick={print}
            >
              Print
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4 print:p-0">
          <Renderer entries={entries} />
        </div>
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

      {!isEditMode ? (
        <button
          className="fixed bottom-24 right-4 p-4 bg-orange-600 text-white font-semibold rounded-md"
          onClick={print}
        >
          Print
        </button>
      ) : null}
    </>
  );
}

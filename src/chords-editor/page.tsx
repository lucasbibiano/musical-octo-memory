import SongDetailsConfigProvider from "./context";
import Header from "./header";
import { Renderer } from "./renderer";
import { Editor } from "./editor";
import { useState } from "react";
import { useEncodedParams } from "../lib/utils";

export function Page() {
  const [isEditMode, setIsEditMode] = useState(false);
  const { result, setEncodedParam } = useEncodedParams();

  return (
    <SongDetailsConfigProvider
      rawSong={result}
      onChange={(data) => setEncodedParam(data)}
    >
      <div className="flex flex-col py-2 px-4 md:py-4 md:px-8 min-h-screen">
        <Header />

        {isEditMode ? (
          <Editor value={result} setValue={(data) => setEncodedParam(data)} />
        ) : (
          <Renderer />
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
      </div>
    </SongDetailsConfigProvider>
  );
}

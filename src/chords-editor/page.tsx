import SongDetailsConfigProvider from "./context";
import Header from "./header";
import { Renderer } from "./renderer";
import { Editor } from "./editor";
import { useState } from "react";
import { useEncodedParams } from "../lib/utils";

export function Page() {
  const [isEditMode, setIsEditMode] = useState(false);
  const { result: songChords, setEncodedParam: setSongChords } =
    useEncodedParams("c");
  const { result: songName, setEncodedParam: setSongName } =
    useEncodedParams("n");

  return (
    <SongDetailsConfigProvider
      rawSong={songChords}
      onChange={(data) => setSongChords(data)}
    >
      <div className="flex flex-col py-2 px-4 md:py-4 md:px-8 min-h-screen">
        <Header
          isEditMode={isEditMode}
          songName={songName}
          onChangeSongName={(newName) => setSongName(newName)}
        />

        {isEditMode ? (
          <Editor value={songChords} setValue={(data) => setSongChords(data)} />
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

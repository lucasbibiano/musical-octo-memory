import SongDetailsConfigProvider from "./context";
import Header from "./header";
import { Renderer } from "./renderer";
import { Editor } from "./editor";
import { useEffect, useState } from "react";
import { useEncodedParams } from "../lib/utils";
import { useDebounce } from "@uidotdev/usehooks";

export function Page() {
  const { result: songChordsParam, setEncodedParam: setSongChordsParam } =
    useEncodedParams("c");
  const { result: songNameParam, setEncodedParam: setSongNameParam } =
    useEncodedParams("n");

  const [songChords, setSongChords] = useState(songChordsParam);
  const [songName, setSongName] = useState(songNameParam);

  const [isEditMode, setIsEditMode] = useState(false);

  const debouncedParamsChange = useDebounce({ songChords, songName }, 500);

  useEffect(() => {
    setSongChordsParam(debouncedParamsChange.songChords);
    setSongNameParam(debouncedParamsChange.songName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParamsChange]);

  useEffect(() => {
    if (songChordsParam || songNameParam) {
      setSongChords(songChordsParam);
      setSongName(songNameParam);
    }
  }, [songChordsParam, songNameParam]);

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
          className="fixed bottom-4 right-4 p-4 rounded-full bg-blue-600 text-white print:hidden"
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

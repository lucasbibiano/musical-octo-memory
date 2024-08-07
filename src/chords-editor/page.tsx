import SongDetailsConfigProvider from "./context";
import { Renderer } from "./renderer";
import { Editor } from "./editor";
import { useEffect, useState } from "react";
import { useEncodedParams } from "../lib/utils";
import Actions from "./actions";
import { useDebouncedCallback } from "use-debounce";

export function Page() {
  const { result: songChordsParam, setEncodedParam: setSongChordsParam } =
    useEncodedParams("c");
  const { result: songNameParam, setEncodedParam: setSongNameParam } =
    useEncodedParams("n");

  const [songChords, setSongChords] = useState(songChordsParam);
  const [songName, setSongName] = useState(songNameParam);

  const [isEditMode, setIsEditMode] = useState(false);

  const debouncedSetUrl = useDebouncedCallback(({ songChords, songName }) => {
    if (songChords !== songChordsParam) {
      setSongChordsParam(songChords);
    }

    if (songName !== songNameParam) {
      setSongNameParam(songName);
    }
  }, 500);

  useEffect(() => {
    if (window.self !== window.top) {
      return;
    }

    debouncedSetUrl({ songChords, songName });
  }, [debouncedSetUrl, songChords, songName]);

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
      <Actions isEditMode={isEditMode} setEditMode={setIsEditMode} />

      <div className="flex flex-col py-2 px-4 md:py-4 md:px-8 min-h-screen">
        <div className="mb-4">
          {isEditMode ? (
            <input
              className="border-2 border-zinc-600 p-1 w-full"
              value={songName}
              onChange={(e) => setSongName(e.target.value)}
            />
          ) : (
            <h1 className="font-bold text-2xl">{songName}</h1>
          )}
        </div>

        {isEditMode ? (
          <Editor value={songChords} setValue={(data) => setSongChords(data)} />
        ) : (
          <Renderer />
        )}
      </div>
    </SongDetailsConfigProvider>
  );
}

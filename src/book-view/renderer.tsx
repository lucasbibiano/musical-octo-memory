import { useEffect, useState } from "react";
import SongDetailsConfigProvider from "../chords-editor/context";

import { Renderer as SongRenderer } from "../chords-editor/renderer";
import { decompressAndDecode } from "../lib/compressor";

export function Renderer({ entries }: { entries: string[] }) {
  const [decodedEntries, setDecodedEntries] = useState<
    { name: string; chords: string }[]
  >([]);

  useEffect(() => {
    async function execute() {
      const decoded = await Promise.all(
        entries.map(async (entry) => {
          const url = new URL(entry);
          const params = new URLSearchParams(url.search);
          const rawSong = params.get("c") || "";
          const rawSongName = params.get("n") || "";

          const songName = await decompressAndDecode(rawSongName);
          const chords = await decompressAndDecode(rawSong);

          return { name: songName, chords };
        })
      );

      setDecodedEntries(
        decoded.map(({ name, chords }) => ({
          name: name || "",
          chords: chords || "",
        }))
      );
    }

    execute();
  }, [entries]);

  return (
    <>
      {decodedEntries.map((entry) => {
        return (
          <div key={entry.name} className="print:min-h-screen">
            <div className="border-t-4 border-gray-800 p-4 print:hidden"></div>

            <SongDetailsConfigProvider
              rawSong={entry.chords}
              onChange={(chords) => {
                setDecodedEntries((actual) =>
                  actual.map((actualEntry) => {
                    if (actualEntry.name === entry.name) {
                      return { ...actualEntry, chords };
                    }

                    return actualEntry;
                  })
                );
              }}
            >
              <h1 className="font-bold text-2xl text-center">{entry.name}</h1>
              <SongRenderer />
            </SongDetailsConfigProvider>
          </div>
        );
      })}
    </>
  );
}

import { useEffect, useState } from "react";
import SongDetailsConfigProvider from "../chords-editor/context";
import Header from "../chords-editor/header";

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
          <div className="min-h-screen" key={entry.name}>
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
              <Header
                isEditMode={false}
                songName={entry.name}
                onChangeSongName={() => {}}
              />
              <SongRenderer />
            </SongDetailsConfigProvider>
          </div>
        );
      })}
    </>
  );
}

import { useContext } from "react";
import { SongDetailsConfigContext } from "./context";
import { parseChordsLine } from "../lib/song-parser";

export function Renderer() {
  const { songData, fontSizeClass, columnsClass } = useContext(
    SongDetailsConfigContext
  );

  const { chords, meta } = songData;

  return (
    <div
      className={`font-mono overflow-x-scroll no-scrollbar grow ${columnsClass} ${fontSizeClass}`}
    >
      {meta.map((part) => (
        <div
          key={part.start + " - " + part.end}
          className="w-full break-inside-avoid-column mb-8"
        >
          <div>
            {part.meta === "bridge" ? (
              <div className="mb-2 italic">Ponte: </div>
            ) : null}

            {chords.slice(part.start, part.end + 1).map((line, index) => {
              const parsedLine = parseChordsLine(line, part.meta);

              return (
                <div
                  key={part.start + " - " + index}
                  className={`whitespace-nowrap`}
                >
                  <p className="leading-4 mb-2">
                    {part.meta === "intro" ? <span>Intro: </span> : null}
                    <span className="font-bold whitespace-pre">
                      {parsedLine.chords}
                    </span>
                  </p>
                  <p
                    className={`leading-4 mb-4 ${
                      part.meta === "chorus" ? "italic" : null
                    }`}
                  >
                    {parsedLine.lyrics}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

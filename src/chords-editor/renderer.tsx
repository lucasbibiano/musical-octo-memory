import { useContext } from "react";
import { SongDetailsConfigContext } from "./context";
import { parseChordsLine } from "../lib/song-parser";

import "./renderer.css";

export function Renderer() {
  const { songData, fontSizeClass, columnsClass, lyricsOnly } = useContext(
    SongDetailsConfigContext
  );

  const { chords, meta } = songData;

  const intro = meta.find((part) => part.meta === "intro");

  return (
    <div className="font-mono no-scrollbar grow">
      {intro && !lyricsOnly
        ? chords.slice(intro.start, intro.end + 1).map((line) => {
            const parsedLine = parseChordsLine(line, intro.meta);

            return (
              <div key="intro" className={`whitespace-nowrap`}>
                <p className="leading-4 mb-2">
                  <span>Intro: </span>
                  <span className="font-bold whitespace-pre">
                    {parsedLine.chords}
                  </span>
                </p>
                <p className={`leading-4 mb-4`}>{parsedLine.lyrics}</p>
              </div>
            );
          })
        : null}

      <div className={`${columnsClass} ${fontSizeClass}`}>
        {meta.map((part) => (
          <div
            key={part.start + " - " + part.end}
            className="w-full break-inside-avoid-column mb-8"
          >
            <div>
              {part.meta === "bridge" && !lyricsOnly ? (
                <div className="mb-2 italic">Ponte: </div>
              ) : null}

              {chords.slice(part.start, part.end + 1).map((line, index) => {
                const parsedLine = parseChordsLine(line, part.meta);

                return (
                  <div
                    key={part.start + " - " + index}
                    className={`whitespace-nowrap`}
                  >
                    {!lyricsOnly ? (
                      <p className="leading-4 mb-2">
                        <span className="font-bold whitespace-pre">
                          {parsedLine.chords}
                        </span>
                      </p>
                    ) : null}
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
    </div>
  );
}

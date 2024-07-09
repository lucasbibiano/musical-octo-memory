import { createContext, useState } from "react";
import { changeChordsKey, parseSongChords } from "../lib/song-parser";

export type SongData = {
  chords: string[];
  meta: {
    meta: string;
    start: number;
    end: number;
  }[];
};

export const SongDetailsConfigContext = createContext<{
  songData: SongData;
  fontSizeClass: string;
  columnsClass: string;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  increaseColumns: () => void;
  decreaseColumns: () => void;
  keyUp: () => void;
  keyDown: () => void;
}>({
  songData: { chords: [], meta: [] },
  fontSizeClass: "text-base",
  columnsClass: "columns-1",
  increaseFontSize: () => {},
  decreaseFontSize: () => {},
  increaseColumns: () => {},
  decreaseColumns: () => {},
  keyUp: () => {},
  keyDown: () => {},
});

const POSSIBLE_FONT_SIZES = [
  "xs",
  "sm",
  "base",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
  "6xl",
  "7xl",
  "8xl",
  "9xl",
];

const MAX_COLUMNS = 4;

export default function SongDetailsConfigProvider({
  rawSong,
  onChange,
  children,
}: {
  rawSong: string;
  onChange: (song: string) => void;
  children: React.ReactNode;
}) {
  const songData = parseSongChords(rawSong);

  const [fontSize, setFontSize] = useState(2);
  const [columns, setColumns] = useState(1);

  const fontSizeClass = "text-" + POSSIBLE_FONT_SIZES[fontSize];
  const columnsClass = "columns-" + columns;

  const increaseFontSize = () =>
    setFontSize((actual) =>
      Math.min(POSSIBLE_FONT_SIZES.length - 1, actual + 1)
    );

  const decreaseFontSize = () =>
    setFontSize((actual) => Math.max(0, actual - 1));

  const increaseColumns = () =>
    setColumns((actual) => Math.min(MAX_COLUMNS, actual + 1));

  const decreaseColumns = () => setColumns((actual) => Math.max(1, actual - 1));

  const keyUp = () => {
    onChange(changeChordsKey(rawSong, 1));
  };

  const keyDown = () => {
    onChange(changeChordsKey(rawSong, -1));
  };

  return (
    <SongDetailsConfigContext.Provider
      value={{
        songData,
        fontSizeClass,
        columnsClass,
        increaseFontSize,
        decreaseFontSize,
        increaseColumns,
        decreaseColumns,
        keyUp,
        keyDown,
      }}
    >
      {children}
    </SongDetailsConfigContext.Provider>
  );
}

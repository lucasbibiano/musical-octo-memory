import { SongData } from "../chords-editor/context";
import { changeKey } from "./utils";

const META_REGEX = /^\([a-z]*\)$/;

export function parseSongChords(chords: string): SongData {
  const chordsResult: string[] = [];
  const chordsPartMetaResult: { meta: string; start: number; end: number }[] =
    [];
  const lines = chords.trim().split("\n");

  let shouldBreakPart = true;
  let chordPartMeta = {
    meta: "",
    start: -1,
    end: 0,
  };
  let metaIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (shouldBreakPart) {
      const lineMetaMatches = line.match(META_REGEX);

      chordPartMeta.meta = (lineMetaMatches ? lineMetaMatches[0] : "").slice(
        1,
        -1
      );
      chordPartMeta.start = metaIndex;
      shouldBreakPart = false;

      if (!lineMetaMatches) {
        chordsResult.push(line);
        metaIndex++;
      }

      continue;
    }

    if (line === "") {
      chordPartMeta.end = metaIndex - 1;
      chordsPartMetaResult.push({ ...chordPartMeta });
      shouldBreakPart = true;
      chordPartMeta = {
        meta: "",
        start: 0,
        end: 0,
      };

      continue;
    }

    chordsResult.push(line);
    metaIndex++;
  }

  chordPartMeta.end = metaIndex;
  chordsPartMetaResult.push(chordPartMeta);

  return { chords: chordsResult, meta: chordsPartMetaResult };
}

export function parseChordsLine(
  line: string,
  meta: string
): {
  chords: string;
  lyrics: string;
} {
  if (!line) {
    return { chords: "", lyrics: "" };
  }

  let chords = "";
  let lyrics = "";

  let chordIndex = 0;
  let nextBracket = line.indexOf("[", 0);

  let lastChord = "";

  while (nextBracket !== -1) {
    const nextBracketEnd = line.indexOf("]", nextBracket);
    const chord = line.slice(nextBracket + 1, nextBracketEnd);

    const lyricsToAdd = line.slice(chordIndex, nextBracket);
    lyrics += lyricsToAdd;

    const spacesToAdd = Math.max(
      meta === "intro" && chordIndex !== 0 ? 2 : 0,
      lyricsToAdd.length - lastChord.length
    );
    chords += " ".repeat(spacesToAdd) + chord;

    chordIndex = nextBracketEnd + 1;
    nextBracket = line.indexOf("[", chordIndex);

    lastChord = chord;
  }

  lyrics += line.slice(chordIndex);

  return { chords, lyrics };
}

export function changeChordsKey(chords: string, delta: number) {
  const chordRegex = /\[(.*?)\]/g;

  const transposedChords = chords.replace(chordRegex, (_match, chord) => {
    const transposedChord = changeKey(chord, delta);
    return `[${transposedChord}]`;
  });

  return transposedChords;
}

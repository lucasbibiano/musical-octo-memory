import { Dispatch, SetStateAction, useContext, useState } from "react";
import { SongDetailsConfigContext } from "./context";
import Button from "./button";

const DEFAULT_COPY_URL_COPY = "Copy URL";

export default function Actions({
  isEditMode,
  setEditMode,
}: {
  isEditMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
}) {
  const [help, setHelp] = useState(false);
  const [hide, setHide] = useState(false);

  const [copyButtonCopy, setCopyButtonCopy] = useState(DEFAULT_COPY_URL_COPY);

  const {
    decreaseFontSize,
    increaseFontSize,
    decreaseColumns,
    increaseColumns,
    keyDown,
    keyUp,
    lyricsOnly,
    setLyricsOnly,
  } = useContext(SongDetailsConfigContext);

  return (
    <div className="fixed right-0 top-1/3 grid grid-cols-1 gap-y-2 print:hidden">
      <Button
        onClick={() => setHelp((old) => !old)}
        icon="bx-help-circle"
        copy={help ? "Help" : undefined}
      />
      {!hide ? (
        <>
          <Button
            onClick={decreaseFontSize}
            iconDelta="minus"
            icon="bx-font-size"
            copy={help ? "Decrease font size" : undefined}
          />
          <Button
            onClick={increaseFontSize}
            iconDelta="plus"
            icon="bx-font-size"
            copy={help ? "Increase font size" : undefined}
          />
          <Button
            onClick={decreaseColumns}
            iconDelta="minus"
            icon="bx-columns"
            copy={help ? "Less columns" : undefined}
          />
          <Button
            onClick={increaseColumns}
            iconDelta="plus"
            icon="bx-columns"
            copy={help ? "More columns" : undefined}
          />
          <Button
            onClick={keyDown}
            iconDelta="minus"
            icon="bx-music"
            copy={help ? "Decrease key" : undefined}
          />
          <Button
            onClick={keyUp}
            iconDelta="plus"
            icon="bx-music"
            copy={help ? "Increase key" : undefined}
          />
          <Button
            onClick={() => setEditMode((old) => !old)}
            icon={isEditMode ? "bx-notepad" : "bx-edit-alt"}
            copy={help ? "Edit mode" : undefined}
          />
          <Button
            onClick={() => setLyricsOnly((old) => !old)}
            icon={lyricsOnly ? "bxs-playlist" : "bx-message-alt-dots"}
            copy={
              help
                ? lyricsOnly
                  ? "Lyrics and chords"
                  : "Lyrics only"
                : undefined
            }
          />
        </>
      ) : null}
      <Button
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setCopyButtonCopy("URL Copied!");
          setTimeout(() => setCopyButtonCopy(DEFAULT_COPY_URL_COPY), 3000);
        }}
        icon={"bx-share"}
        copy={
          help || copyButtonCopy !== DEFAULT_COPY_URL_COPY
            ? copyButtonCopy
            : undefined
        }
      />
      <Button
        onClick={() => setHide((old) => !old)}
        icon={hide ? "bx-left-arrow-alt" : "bx-right-arrow-alt"}
        copy={help ? (hide ? "Show menu" : "Hide menu") : undefined}
      />
    </div>
  );
}

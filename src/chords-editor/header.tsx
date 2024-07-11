import { useContext } from "react";
import { SongDetailsConfigContext } from "./context";
import Button from "./button";

export default function Header({
  isEditMode,
  songName,
  onChangeSongName,
}: {
  isEditMode: boolean;
  songName: string;
  onChangeSongName: (value: string) => void;
}) {
  const {
    decreaseFontSize,
    increaseFontSize,
    decreaseColumns,
    increaseColumns,
    keyDown,
    keyUp,
  } = useContext(SongDetailsConfigContext);

  return (
    <div className="flex flex-col-reverse gap-y-4 md:flex-row md:justify-between mb-4 md:h-[42px]">
      <div className="h-100 flex items-center w-full mr-4">
        {isEditMode ? (
          <input
            className="border-2 border-zinc-600 p-1 w-full"
            value={songName}
            onChange={(e) => onChangeSongName(e.target.value)}
          />
        ) : (
          <h1 className="font-bold text-2xl">{songName}</h1>
        )}
      </div>

      <div className="h-100 flex items-center shrink-0 justify-end print:hidden">
        <Button onClick={decreaseFontSize} iconDelta="minus" icon="font-size" />
        <Button onClick={increaseFontSize} iconDelta="plus" icon="font-size" />
        <Button onClick={decreaseColumns} iconDelta="minus" icon="columns" />
        <Button onClick={increaseColumns} iconDelta="plus" icon="columns" />
        <Button onClick={keyDown} iconDelta="minus" icon="music" />
        <Button onClick={keyUp} iconDelta="plus" icon="music" />
      </div>
    </div>
  );
}

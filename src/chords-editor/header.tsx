import { useContext } from "react";
import { SongDetailsConfigContext } from "./context";
import Button from "./button";

export default function Header() {
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
      <div className="h-100 flex items-center">
        <h2
          className={`font-semibold text-2xl lg:text-3xl line-clamp-1 p-0 mr-4`}
        >
          xdd
        </h2>
      </div>

      <div className="h-100 flex items-center shrink-0 justify-end">
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

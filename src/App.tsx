import { useEffect, useState } from "react";
import { Page as ChordsPage } from "./chords-editor";
import { Page as BookPage } from "./book-view";

function App() {
  const [mode, setMode] = useState<"chords" | "book">("chords");

  useEffect(() => {
    const url = new URL(window.location.href);
    setMode(url.searchParams.get("c") ? "chords" : "book");
  }, []);

  return mode === "chords" ? <ChordsPage /> : <BookPage />;
}

export default App;

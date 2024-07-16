import { Page as ChordsPage } from "./chords-editor";
import { Page as BookPage } from "./book-view";

import { createHashRouter, RouterProvider } from "react-router-dom";

const router = createHashRouter([
  {
    path: "/",
    element: <ChordsPage />,
  },
  {
    path: "/print",
    element: <BookPage />,
  },
]);

function App() {
  return (
    <div className="bg-white text-black">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

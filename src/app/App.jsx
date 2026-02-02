import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>ROUTER DIRECT TEST</h1>,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

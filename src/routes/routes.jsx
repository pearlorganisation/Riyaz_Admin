import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
]);

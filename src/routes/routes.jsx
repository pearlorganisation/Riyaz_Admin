import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
 
export const AppRoutes = () => {
  // const { isAdminLoggedIn } = useSelector((state) => state?.auth);

  const router = createBrowserRouter([
    {
      path: "/",
      element:  <Login />,
      children:
        [
          { index: true, element: <Dashboard /> },
        ]
    },
  ]);

  return <RouterProvider router={router} />;
};
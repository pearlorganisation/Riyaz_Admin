import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import { useSelector } from "react-redux";
import Layout from "../components/Layouts/Layout"
import Users from "../pages/Users/users";
export const AppRoutes = () => {
  const { isAdminLoggedIn } = useSelector((state) => state?.auth);

  const router = createBrowserRouter([
    {
      path: "/",
      element:isAdminLoggedIn ? <Layout /> :  <Login />,
      children: isAdminLoggedIn ?
        [
          { index: true, element: <Dashboard /> },
          {path:"users", element:<Users />}
        ]:[]
    },
  ]);

  return <RouterProvider router={router} />;
};
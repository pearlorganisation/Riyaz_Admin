import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import { useSelector } from "react-redux";
import Layout from "../components/Layouts/Layout"
import Users from "../pages/Users/users";
import Contacts from "../pages/Contacts/Contacts";
import Bookings from "../pages/Bookings/Bookings";
import Reviews from "../pages/Reviews/Reviews";
import VehiclesList from "../pages/Vehicles/VehiclesList";
import AddVehicle from "../pages/Vehicles/AddVehicle";
import UpdateVehicle from "../pages/Vehicles/UpdateVehicle";
export const AppRoutes = () => {
  const { isAdminLoggedIn } = useSelector((state) => state?.auth);

  const router = createBrowserRouter([
    {
      path: "/",
      element:isAdminLoggedIn ? <Layout /> :  <Login />,
      children: isAdminLoggedIn ?
        [
          {index: true, element: <Dashboard />},
          {path:"users", element:<Users />},
          {path:"contacts", element:<Contacts />},
          {path:"bookings", element:<Bookings />},
          {path:"reviews", element:<Reviews />},
          {path:"vehicles", element:<VehiclesList />},
          {path:"add-vehicle", element:<AddVehicle />},
          {path:"update-vehicle/:id", element:<UpdateVehicle />}
        ]:[]
    },
  ]);

  return <RouterProvider router={router} />;
};
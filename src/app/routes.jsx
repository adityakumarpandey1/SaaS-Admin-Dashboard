import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/public/Landing";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Overview from "../pages/dashboard/Overview";
import Users from "../pages/dashboard/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path:"/dashboard",
    element:<DashboardLayout/>,
    children:[
      {
        index:true,
        element:<Overview/>,
      },
      {
        path:"users",
        element:<Users />
      },
    ],
  },
]);

export default router;

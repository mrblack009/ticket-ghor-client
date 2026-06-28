import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            index: true,
            Component: Home,
        }
    ]
  },
  {
    path:"/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register
  }
]);

export default router;
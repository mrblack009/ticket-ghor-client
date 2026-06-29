import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import UserProfile from "../pages/Dashboard/UsersDashbord/UserProfile";
import MyBookedTickets from "../pages/Dashboard/UsersDashbord/MyBookedTickets";
import TransactionHistory from "../pages/Dashboard/UsersDashbord/TransactionHistory";
import AdminProfile from "../pages/Dashboard/AdminDashboard/AdminProfile";
import ManageTickets from "../pages/Dashboard/AdminDashboard/ManageTickets";
import ManageUsers from "../pages/Dashboard/AdminDashboard/ManageUsers";
import AddTicket from "../pages/Dashboard/VendorDashboard/AddTicket";
import MyAddedTickets from "../pages/Dashboard/VendorDashboard/MyAddedTickets";
import RequestedBookings from "../pages/Dashboard/VendorDashboard/RequestedBookings";
import RevenueOverview from "../pages/Dashboard/VendorDashboard/RevenueOverview";
import AdvertiseTickets from "../pages/Dashboard/AdminDashboard/AdvertiseTickets";
import TicketDetails from "../pages/AllTicketPages/TicketDetails";
import AllTicketsPage2 from "../pages/AllTicketPages/AllTicketPage2";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import VendorRoute from "./VendorRoute";
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/all-tickets",
        Component: AllTicketsPage2,
      },
      {
        path: "/ticket/:id",
        element: (
          <PrivateRoute>
            {" "}
            <TicketDetails />{" "}
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <UserProfile />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "booked-tickets",
        element: (
          <PrivateRoute>
            <MyBookedTickets />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "checkout/:id",
        element: (
          <PrivateRoute>
            <CheckoutPage />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "transaction-history",
        element: (
          <PrivateRoute>
            <TransactionHistory />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "admin-profile",
        element: (
          <AdminRoute>
            <AdminProfile />
          </AdminRoute>
        ),
      },
      {
        path: "manage-tickets",
        element: (
          <AdminRoute>
            <ManageTickets />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "advertise-tickets",
        element: (
          <AdminRoute>
            <AdvertiseTickets />{" "}
          </AdminRoute>
        ),
      },
      {
        path: "vendor-profile",
        element: (
          <VendorRoute>
            <UserProfile />
          </VendorRoute>
        ),
      },
      {
        path: "add-ticket",
        element: (
          <VendorRoute>
            <AddTicket />
          </VendorRoute>
        ),
      },
      {
        path: "my-added-tickets",
        element: (
          <VendorRoute>
            <MyAddedTickets />
          </VendorRoute>
        ),
      },
      {
        path: "requested-bookings",
        element: (
          <VendorRoute>
            <RequestedBookings />
          </VendorRoute>
        ),
      },
      {
        path: "revenue-overview",
        element: (
          <VendorRoute>
            <RevenueOverview />
          </VendorRoute>
        ),
      },
    ],
  },
]);

export default router;

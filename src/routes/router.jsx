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
          Component: TicketDetails,
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
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        index:true,
        Component: UserProfile,
      },
      {
        path:"booked-tickets",
        Component: MyBookedTickets,
      },
      {
        path:"transaction-history",
        Component: TransactionHistory,
      },
      {
        path:"admin-profile",
        Component: AdminProfile,
      },
      {
        path:"manage-tickets",
        Component: ManageTickets,
      },
      {
        path:"manage-users",
        Component: ManageUsers,
      },
      {
        path:"vendor-profile",
        Component: UserProfile,
      },
      {
        path:"add-ticket",
        Component: AddTicket,
      },
      {
        path:"my-added-tickets",
        Component: MyAddedTickets,
      },
      {
        path:"requested-bookings",
        Component: RequestedBookings,
      },
      {
        path:"revenue-overview",
        Component: RevenueOverview,
      },
      {
        path:"advertise-tickets",
        Component: AdvertiseTickets,
      },

    ]
  }
]);

export default router;
import { Link, NavLink, Outlet } from "react-router";
import Logo from "../components/Shared/Logo/Logo";
import "./Dashboard.css";

import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";

const DashboardLayout = () => {
  const { user } = useUser();
  const { logOut } = useAuth();
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen">
      <div className="md:col-span-3 bg-secondary text-white flex flex-col">
        <div className="px-10 my-6">
          <Logo logoFooter={true} />
        </div>
        <ul className="flex flex-col gap-4">
          {/* users sidebar */}
          {user?.role == "user" && (
            <>
              <NavLink className="py-3 px-10 font-bold" to="/dashboard">
                User Profile
              </NavLink>
              <NavLink
                className="py-3 px-10 font-bold"
                to="/dashboard/booked-tickets"
              >
                My Book Tickets
              </NavLink>
              <NavLink
                className="py-3 px-10 font-bold"
                to="transaction-history"
              >
                Transaction History
              </NavLink>
            </>
          )}

          {/* admin sidebar */}
          {user?.role == "admin" && (
            <>
              <NavLink className="py-3 px-10 font-bold" to="admin-profile">
                Admin Profile
              </NavLink>
              <NavLink className="py-3 px-10 font-bold" to="manage-tickets">
                Manage Tickets
              </NavLink>
              <NavLink className="py-3 px-10 font-bold" to="manage-users">
                Manage Users
              </NavLink>
              <NavLink className="py-3 px-10 font-bold" to="advertise-tickets">
                Advertise Tickets
              </NavLink>
            </>
          )}

          {/* Vendor Sidebar */}
          {user?.role == "vendor" && (
            <>
              <NavLink className="py-3 px-10 font-bold" to="vendor-profile">
                Vendor Profile
              </NavLink>
              <NavLink className="py-3 px-10 font-bold" to="add-ticket">
                Add Ticket
              </NavLink>
              <NavLink className="py-3 px-10 font-bold" to="my-added-tickets">
                My Added Tickets
              </NavLink>
              <NavLink className="py-3 px-10 font-bold" to="requested-bookings">
                Requested Bookings
              </NavLink>
              <NavLink className="py-3 px-10 font-bold" to="revenue-overview">
                Revenue Overview
              </NavLink>
            </>
          )}
        </ul>
        <div className="mt-auto p-10">
          <Link
            to="/"
            className="py-3 px-10 font-bold block bg-white/20 text-center mb-4"
          >
            Home
          </Link>
          <button
            className="w-full bg-primary text-white py-3 rounded-md text-lg font-bold border border-primary/20 cursor-pointer hover:text-primary hover:bg-white duration-300 transition-all ease-in-out"
            onClick={() => logOut()}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="grid-cols-1 col-span-9">
        <div className="p-8">
          <h2 className="text-2xl font-bold">My Profile</h2>
          <span className="divider"></span>
        </div>
        <div className="px-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

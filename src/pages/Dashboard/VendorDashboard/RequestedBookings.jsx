import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import Loader from "../../../components/Shared/Loader/Loader";
import {
  FaUser,
  FaTicketAlt,
  FaCoins,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
} from "react-icons/fa";
import {
  getVendorBookings,
  updateBookingStatus,
} from "../../../api/ticketsApi";
import useAuth from "../../../hooks/useAuth";

const RequestedBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all incoming requested bookings tied to this specific logged-in vendor account
  useEffect(() => {
    if (user?.email) {
      getVendorBookings(user.email)
        .then((data) => {
          setBookings(data || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching bookings:", err);
          setLoading(false);
        });
    }
  }, [user]);

  // Handle the patch mutation event when a vendor clicks Accept or Reject
  const handleStatusChange = async (id, status) => {
    try {
      // This will now automatically call the correct separate backend route via ticketsApi
      const res = await updateBookingStatus(id, status);

      if (res.success || res.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: `Booking ${status === "accepted" ? "Accepted" : "Rejected"}`,
          timer: 1500,
          showConfirmButton: false,
        });

        // Instant UI update without reloading
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === id
              ? { ...booking, bookingStatus: status }
              : booking,
          ),
        );
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: err.message || "Something went wrong",
      });
    }
  };

  // Status mapping helper function for beautiful badge representations
  const renderStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="badge badge-warning gap-1 text-xs font-bold py-2.5 uppercase text-white">
            <FaHourglassHalf /> Pending
          </span>
        );
      case "accepted":
        return (
          <span className="badge badge-success gap-1 text-xs font-bold py-2.5 uppercase text-white">
            <FaCheckCircle /> Accepted
          </span>
        );
      case "rejected":
        return (
          <span className="badge badge-error gap-1 text-xs font-bold py-2.5 uppercase text-white">
            <FaTimesCircle /> Rejected
          </span>
        );
      case "paid":
        return (
          <span className="badge badge-info gap-1 text-xs font-bold py-2.5 uppercase text-white">
            <FaCheckCircle /> Paid
          </span>
        );
      default:
        return (
          <span className="badge badge-ghost py-2.5 uppercase text-xs">
            {status}
          </span>
        );
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-base-100 shadow-xl rounded-2xl border border-base-200 mt-10">
      {/* Page Header Titles */}
      <div className="mb-6">
        <h2 className="text-3xl font-black tracking-tight text-center">
          Requested Bookings
        </h2>
        <p className="text-center text-sm text-gray-400 mt-1">
          Manage and review all ticket booking requests from users.
        </p>
      </div>

      {/* Data Presentation Table View responsive block Container */}
      <div className="overflow-x-auto w-full rounded-xl border border-base-200">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200 text-sm">
              <th>
                <div className="flex items-center gap-1.5">
                  <FaUser /> User Info
                </div>
              </th>
              <th>
                <div className="flex items-center gap-1.5">
                  <FaTicketAlt /> Ticket Title
                </div>
              </th>
              <th className="text-center">Booking Quantity</th>
              <th>
                <div className="flex items-center gap-1.5">
                  <FaCoins /> Total Price
                </div>
              </th>
              <th className="text-center">Actions / Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-10 text-gray-400 font-medium"
                >
                  No booking requests available at this moment.
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="hover:bg-base-200/50 transition-colors"
                >
                  {/* User Profile Columns */}
                  <td>
                    <div className="font-bold text-base">
                      {booking.userName || "Guest User"}
                    </div>
                    <div className="text-xs opacity-60 font-semibold">
                      {booking.userEmail}
                    </div>
                  </td>

                  {/* Associated Ticket Info References */}
                  <td className="font-semibold text-primary max-w-xs truncate">
                    {booking.ticketTitle}
                  </td>

                  {/* Order Ticket Volume Counters */}
                  <td className="text-center font-extrabold text-base">
                    {booking.quantity}
                  </td>

                  {/* Consolidated Invoice Pricing metrics */}
                  <td className="font-bold text-success text-base">
                    {/* Kept fallback calculation safe but preferred backend calculated booking.totalPrice if exists */}
                    $
                    {Number(
                      booking.totalPrice || booking.price * booking.quantity,
                    ).toFixed(2)}
                  </td>

                  {/* Conditional Render Operations Grid Matrix */}
                  <td>
                    <div className="flex gap-2 justify-center items-center min-h-[40px]">
                      {/* 🛠️ FIX: Only hide action options if status moves out of the initial 'pending' state */}
                      {booking.bookingStatus !== "pending" ? (
                        renderStatusBadge(booking.bookingStatus)
                      ) : (
                        <>
                          <button
                            onClick={() =>
                              handleStatusChange(booking._id, "accepted")
                            }
                            className="btn btn-sm btn-success text-white px-4 font-bold shadow-md shadow-success/20 transition-all hover:scale-105"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(booking._id, "rejected")
                            }
                            className="btn btn-sm btn-error text-white px-4 font-bold shadow-md shadow-error/20 transition-all hover:scale-105"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedBookings;

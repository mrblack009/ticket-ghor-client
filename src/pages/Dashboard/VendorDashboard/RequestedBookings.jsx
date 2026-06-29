import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { getVendorBookings, updateBookingStatus } from "../../../api/ticketsApi";
import Loader from "../../../components/Shared/Loader/Loader";


const RequestedBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // প্রথমবার পেজ লোড হলে ভেন্ডরের ইমেইল দিয়ে বুকিং রিকোয়েস্টগুলো আনা
  useEffect(() => {
    if (user?.email) {
      getVendorBookings(user.email)
        .then((data) => {
          setBookings(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching bookings:", err);
          setLoading(false);
        });
    }
  }, [user]);

  // Accept এবং Reject হ্যান্ডলার (Technique 1: Reload-less State Update)
  const handleStatusChange = async (id, status) => {
    try {
      const res = await updateBookingStatus(id, status);
      
      // আপনার ব্যাকএন্ড রেসপন্স যদি modifiedCount বা success রিটার্ন করে
      if (res.modifiedCount > 0 || res.success) {
        Swal.fire({
          icon: "success",
          title: `Booking ${status === "accepted" ? "Accepted" : "Rejected"}`,
          timer: 1500,
          showConfirmButton: false,
        });
        
        // 🔥 রিলোড ছাড়া ইনস্ট্যান্ট ফ্রন্টএন্ড স্টেট আপডেট
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === id ? { ...booking, bookingStatus: status } : booking
          )
        );
      } else {
        throw new Error("Failed to update status in database");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: err.message || "Something went wrong",
      });
    }
  };

  if (loading) {
    return <Loader />
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-base-100 shadow-xl rounded-2xl border border-base-200 mt-10">
      <div className="mb-6">
        <h2 className="text-3xl font-black tracking-tight text-center">
          Requested Bookings
        </h2>
        <p className="text-center text-sm text-gray-400 mt-1">
          Manage and review all ticket booking requests from users.
        </p>
      </div>
      
      <div className="overflow-x-auto w-full rounded-xl border border-base-200">
        <table className="table w-full">
          {/* Table Head */}
          <thead>
            <tr className="bg-base-200 text-sm">
              <th>User Info</th>
              <th>Ticket Title</th>
              <th className="text-center">Booking Quantity</th>
              <th>Total Price</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-400 font-medium">
                  No booking requests available at this moment.
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-base-200/50 transition-colors">
                  {/* User name/email */}
                  <td>
                    <div className="font-bold text-base">{booking.userName || "Guest User"}</div>
                    <div className="text-xs opacity-60 font-semibold">{booking.userEmail}</div>
                  </td>
                  
                  {/* Ticket title */}
                  <td className="font-semibold text-primary max-w-xs truncate">
                    {booking.ticketTitle}
                  </td>
                  
                  {/* Booking Quantity */}
                  <td className="text-center font-extrabold text-base">
                    {booking.quantity}
                  </td>
                  
                  {/* Total price (unit price * Booking Quantity) */}
                  <td className="font-bold text-success text-base">
                    ${(Number(booking.price) * Number(booking.quantity)).toFixed(2)}
                  </td>
                  
                  {/* Actions Column */}
                  <td>
                    <div className="flex gap-2 justify-center items-center min-h-[40px]">
                      {/* যদি আগে থেকেই স্ট্যাটাস থাকে কিংবা ইনস্ট্যান্ট চেঞ্জ হয় */}
                      {booking.bookingStatus ? (
                        <span className={`badge p-3 font-bold uppercase text-xs tracking-wider text-white shadow-sm ${
                          booking.bookingStatus === "accepted" ? "badge-success" : "badge-error"
                        }`}>
                          {booking.bookingStatus}
                        </span>
                      ) : (
                        <>
                          <button
                            onClick={() => handleStatusChange(booking._id, "accepted")}
                            className="btn btn-sm btn-success text-white px-4 font-bold shadow-md shadow-success/20 transition-all hover:scale-105"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleStatusChange(booking._id, "rejected")}
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
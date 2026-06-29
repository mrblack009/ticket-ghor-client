import { useEffect, useState } from "react";

import { FaClock, FaMapMarkerAlt, FaCheckCircle, FaHourglassHalf, FaTimesCircle, FaCreditCard } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import api from "../../../api/api";

// Separate Timer Component for maintaining isolated interval countdowns
const BookingCountdown = ({ departureTime, status }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    // Requirement check: Remove countdown if vendor rejects the request
    if (status === "rejected") {
      setTimeLeft("");
      return;
    }

    const interval = setInterval(() => {
      const difference = new Date(departureTime) - new Date();

      if (difference <= 0) {
        setTimeLeft("Expired");
        setIsPast(true);
        clearInterval(interval);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [departureTime, status]);

  if (status === "rejected" || !timeLeft) return null;

  return (
    <div className={`text-xs font-mono font-bold flex items-center gap-1.5 p-2 rounded-lg border ${
      isPast ? "bg-error/10 text-error border-error/20" : "bg-info/10 text-info border-info/20"
    }`}>
      <FaClock className={isPast ? "" : "animate-pulse"} />
      <span>{timeLeft}</span>
    </div>
  );
};

const MyBookedTickets = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      api.get(`/my-bookings/${user.email}`)
        .then((res) => {
          setBookings(res.data || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  const handlePaymentRedirect = (bookingId) => {
    // Redirects user to Stripe checkout page/route passing the booking object context
    window.location.href = `/checkout/${bookingId}`;
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending": return <span className="badge badge-warning font-bold uppercase gap-1 text-[10px] py-2.5 px-3"><FaHourglassHalf /> Pending</span>;
      case "accepted": return <span className="badge badge-info text-white font-bold uppercase gap-1 text-[10px] py-2.5 px-3"><FaCheckCircle /> Accepted</span>;
      case "rejected": return <span className="badge badge-error text-white font-bold uppercase gap-1 text-[10px] py-2.5 px-3"><FaTimesCircle /> Rejected</span>;
      case "paid": return <span className="badge badge-success text-white font-bold uppercase gap-1 text-[10px] py-2.5 px-3"><FaCheckCircle /> Paid</span>;
      default: return <span className="badge badge-ghost font-bold uppercase text-[10px] py-2.5 px-3">{status}</span>;
    }
  };

  if (loading) return <div className="flex justify-center items-center py-32"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-black tracking-tight">My Booked Tickets</h2>
        <p className="text-gray-400 mt-2 text-sm">Track real-time approval status, timelines, and manage purchase completions.</p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-base-200 rounded-2xl border border-dashed border-base-300">
          <p className="text-xl font-semibold text-gray-400">You haven't booked any tickets yet.</p>
        </div>
      ) : (
        /* 🚀 Requirement rule: Render items inside a 3 column grid layout grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookings.map((booking) => {
            const isDeparturePassed = new Date(booking.departure) <= new Date();
            const showPayButton = booking.bookingStatus === "accepted" && !isDeparturePassed;

            return (
              <div key={booking._id} className="card bg-base-100 border border-base-200 shadow-xl overflow-hidden rounded-2xl flex flex-col justify-between">
                <div>
                  {/* Media / Image Box */}
                  <figure className="h-44 bg-base-300">
                    <img src={booking.image || "https://placehold.co/600x400"} alt={booking.ticketTitle} className="w-full h-full object-cover" />
                  </figure>

                  {/* Main Information body */}
                  <div className="card-body p-6 space-y-3.5">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="card-title text-xl font-extrabold line-clamp-1">{booking.ticketTitle}</h3>
                      {getStatusBadge(booking.bookingStatus)}
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 bg-base-200/60 p-2.5 rounded-xl">
                      <FaMapMarkerAlt className="text-error" />
                      <span className="truncate">{booking.from} ➔ {booking.to}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs font-medium border-y border-base-200 py-3">
                      <div>
                        <span className="text-gray-400 block uppercase tracking-wider text-[10px]">Quantity</span>
                        <span className="font-bold text-base-content text-sm">{booking.quantity} Tickets</span>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-400 block uppercase tracking-wider text-[10px]">Total Bill</span>
                        <span className="font-black text-success text-sm">${Number(booking.totalPrice).toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Requirement rule: Live countdown timer setup based on conditions */}
                    <BookingCountdown departureTime={booking.departure} status={booking.bookingStatus} />
                  </div>
                </div>

                {/* Conditional Call to Actions (CTA) Footer block */}
                <div className="px-6 pb-6 pt-2 mt-auto">
                  {showPayButton ? (
                    <button
                      onClick={() => handlePaymentRedirect(booking._id)}
                      className="btn btn-primary btn-block font-bold gap-2 text-sm shadow-md"
                    >
                      <FaCreditCard /> Pay Now
                    </button>
                  ) : booking.bookingStatus === "accepted" && isDeparturePassed ? (
                    <button disabled className="btn btn-block btn-disabled text-xs font-bold uppercase tracking-wider">
                      Payment Expired (Departure Passed)
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookedTickets;
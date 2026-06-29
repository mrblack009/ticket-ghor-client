import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import { FaClock, FaMapMarkerAlt, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import api from "../../api/api";
import useAuth from "../../hooks/useAuth";

const TicketDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState("");
  const [isPast, setIsPast] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // 1. Fetch individual ticket details on component mount
  useEffect(() => {
    api.get(`/tickets/${id}`)
      .then((res) => {
        setTicket(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // 2. Real-time dynamic countdown logic towards departure
  useEffect(() => {
    if (!ticket?.departure) return;

    const interval = setInterval(() => {
      const difference = new Date(ticket.departure) - new Date();

      if (difference <= 0) {
        setTimeLeft("Departure time has passed");
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
  }, [ticket]);

  // 3. Handle processing and saving of booking request inside Modal 
  const onBookingSubmit = async (data) => {
    try {
      const bookingInfo = {
        ticketId: ticket._id,
        ticketTitle: ticket.title,
        price: Number(ticket.price),
        quantity: Number(data.bookingQuantity),
        userEmail: user?.email,
        userName: user?.displayName || "Anonymous",
        vendorEmail: ticket.vendorEmail,
        image: ticket?.image,
        from: ticket?.from,
        to: ticket?.to,
        departure: ticket?.departure,
        bookingStatus: "pending", // Initially assigned a pending state
        createdAt: new Date().toISOString(),
      };

      const res = await api.post("/bookings", bookingInfo);

      if (res.data.insertedId || res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Booking Requested Successfully!",
          text: "Check status on 'My Booked Tickets' page.",
          timer: 2000,
          showConfirmButton: false,
        });
        
        // Terminate modal views and reset fields
        document.getElementById("booking_modal").close();
        reset();
        
        // Immediate redirect route to requested orders panel
        navigate("/dashboard/booked-tickets"); 
      }
    } catch (err) {
      Swal.fire("Failed!", err.message, "error");
    }
  };

  if (loading) return <div className="flex justify-center items-center py-32"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
  if (!ticket) return <div className="text-center py-20 text-error font-bold">Ticket not found!</div>;

  // Evaluation criteria flags for disabled buttons 
  const isStockOut = ticket.quantity === 0;
  const isBookingDisabled = isPast || isStockOut;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="card lg:card-side bg-base-100 shadow-2xl border border-base-200 overflow-hidden rounded-2xl">
        {/* Banner/Ticket display image media */}
        <figure className="lg:w-1/2 h-72 lg:h-auto bg-base-300">
          <img src={ticket.image} alt={ticket.title} className="w-full h-full object-cover" />
        </figure>

        {/* Content presentation grid details */}
        <div className="card-body lg:w-1/2 p-8 space-y-4">
          <h2 className="card-title text-3xl font-black">{ticket.title}</h2>
          
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 bg-base-200 p-3 rounded-xl">
            <FaMapMarkerAlt className="text-error" />
            <span>{ticket.from} ➔ {ticket.to}</span>
            <span className="badge badge-sm badge-outline ml-auto">{ticket.transport}</span>
          </div>

          {/* Graphical Clock / Timer Tracker display panel */}
          <div className={`p-4 rounded-xl flex items-center gap-3 border font-mono text-sm font-bold ${
            isPast ? "bg-error/10 text-error border-error/20" : "bg-info/10 text-info border-info/20"
          }`}>
            <FaClock className="animate-pulse" />
            <span>{isPast ? "Expired:" : "Time Left for Departure:"} {timeLeft}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-base-200/50 p-4 rounded-xl text-center">
            <div>
              <span className="text-xs text-gray-400 font-bold block uppercase">Price per unit</span>
              <span className="text-2xl font-black text-success">${Number(ticket.price).toFixed(2)}</span>
            </div>
            <div>
              <span className="text-xs text-gray-400 font-bold block uppercase">Available Stock</span>
              <span className={`text-xl font-black ${isStockOut ? "text-error" : "text-base-content"}`}>
                {ticket.quantity} Pcs
              </span>
            </div>
          </div>

          {/* Perks inclusion details */}
          {ticket.perks && ticket.perks.length > 0 && (
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase block mb-2">Available Perks</span>
              <div className="flex flex-wrap gap-2">
                {ticket.perks.map((perk, i) => (
                  <span key={i} className="badge badge-primary badge-sm font-bold gap-1 p-2.5">
                    <FaCheckCircle size={10} /> {perk}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Conditional action buttons wrapper */}
          <div className="card-actions pt-4">
            <button
              disabled={isBookingDisabled}
              onClick={() => document.getElementById("booking_modal").showModal()}
              className="btn btn-primary btn-block font-bold text-lg shadow-lg shadow-primary/20"
            >
              {isStockOut ? "Stock Out" : isPast ? "Booking Closed" : "Book Now"}
            </button>
          </div>
        </div>
      </div>

      {/* 📋 4. BOOKING MODAL (DaisyUI Responsive Dialog Setup) */}
      <dialog id="booking_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box p-6 rounded-2xl border border-base-200">
          <h3 className="font-black text-xl mb-2">Confirm Your Booking</h3>
          <p className="text-sm text-gray-400 mb-4">Ticket: <strong className="text-primary">{ticket.title}</strong></p>
          
          <form onSubmit={handleSubmit(onBookingSubmit)} className="space-y-4">
            <div>
              <label className="label font-bold text-sm">Enter Ticket Quantity</label>
              <input
                type="number"
                placeholder="How many tickets do you need?"
                className="input input-bordered w-full rounded-xl focus:outline-primary"
                {...register("bookingQuantity", {
                  required: "Quantity is required",
                  min: { value: 1, message: "Minimum booking quantity is 1" },
                  max: { 
                    value: ticket.quantity, 
                    message: `Booking quantity can't be greater than available stock (${ticket.quantity})` 
                  }
                })}
              />
              {/* Form Validation Exception Feedback block */}
              {errors.bookingQuantity && (
                <p className="text-error text-xs mt-1 flex items-center gap-1 font-semibold">
                  <FaExclamationTriangle size={10} /> {errors.bookingQuantity.message}
                </p>
              )}
            </div>

            {/* Modal Dialog Actions footer */}
            <div className="flex gap-3 justify-end pt-2">
              <button 
                type="button" 
                onClick={() => { document.getElementById("booking_modal").close(); reset(); }} 
                className="btn btn-ghost font-bold"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary px-6 font-bold">
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default TicketDetails;
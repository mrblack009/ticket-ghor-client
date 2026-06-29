import { useEffect, useState } from "react";

/* ---------------- Ticket Countdown ---------------- */

const TicketCountdown = ({ departureTime, status }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [isPassed, setIsPassed] = useState(false);

  useEffect(() => {
    if (status === "rejected") return;

    const timer = setInterval(() => {
      const difference = new Date(departureTime) - new Date();

      if (difference <= 0) {
        setTimeLeft("Departure time passed");
        setIsPassed(true);
        clearInterval(timer);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, [departureTime, status]);

  if (status === "rejected") return null;

  return (
    <div
      className={`mt-3 rounded-lg p-2 text-center text-xs font-semibold ${
        isPassed
          ? "bg-error/10 text-error"
          : "bg-warning/10 text-warning"
      }`}
    >
      ⏱️ {timeLeft}
    </div>
  );
};

/* ---------------- My Booked Tickets ---------------- */

const MyBookedTickets = () => {
  const bookings = [
    {
      _id: "b1",
      ticketTitle: "Green Line Scania Multi-Axle",
      image:
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=400&h=250&q=80",
      bookingQuantity: 2,
      unitPrice: 1200,
      from: "Dhaka",
      to: "Cox's Bazar",
      departureDateTime: "2026-07-15T22:00:00",
      status: "accepted",
    },
    {
      _id: "b2",
      ticketTitle: "Suborna Express AC Snigdha",
      image:
        "https://images.unsplash.com/photo-1515165504669-423042d330d6?auto=format&fit=crop&w=400&h=250&q=80",
      bookingQuantity: 1,
      unitPrice: 800,
      from: "Dhaka",
      to: "Chittagong",
      departureDateTime: "2026-06-10T07:00:00",
      status: "pending",
    },
  ];

  const statusStyles = {
    pending: "badge badge-warning",
    accepted: "badge badge-success",
    rejected: "badge badge-error",
    paid: "badge badge-info",
  };

  const handlePayment = (bookingId, amount) => {
    console.log(bookingId, amount);
    alert(`Redirecting to payment for ৳${amount}`);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">My Booked Tickets</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {bookings.map((ticket) => {
          const totalPrice =
            ticket.bookingQuantity * ticket.unitPrice;

          const isExpired =
            new Date(ticket.departureDateTime) < new Date();

          return (
            <div
              key={ticket._id}
              className="card bg-base-100 shadow-xl border border-base-300"
            >
              <figure>
                <img
                  src={ticket.image}
                  alt={ticket.ticketTitle}
                  className="h-52 w-full object-cover"
                />
              </figure>

              <div className="card-body">
                <h2 className="card-title">
                  {ticket.ticketTitle}
                </h2>

                <p>
                  📍 {ticket.from} → {ticket.to}
                </p>

                <p className="text-sm opacity-70">
                  📅{" "}
                  {new Date(
                    ticket.departureDateTime
                  ).toLocaleString("en-BD", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>

                <div className="divider my-1"></div>

                <div className="flex justify-between">
                  <span>
                    Qty: <b>{ticket.bookingQuantity}</b>
                  </span>

                  <span className="font-bold text-primary">
                    ৳ {totalPrice}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Status</span>

                  <span className={statusStyles[ticket.status]}>
                    {ticket.status}
                  </span>
                </div>

                <TicketCountdown
                  departureTime={ticket.departureDateTime}
                  status={ticket.status}
                />

                {ticket.status === "accepted" && (
                  <button
                    disabled={isExpired}
                    onClick={() =>
                      handlePayment(ticket._id, totalPrice)
                    }
                    className={`btn mt-4 ${
                      isExpired
                        ? "btn-disabled"
                        : "btn-primary"
                    }`}
                  >
                    {isExpired
                      ? "Expired"
                      : "💳 Pay Now"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyBookedTickets;
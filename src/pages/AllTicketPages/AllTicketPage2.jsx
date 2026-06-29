import { Link } from "react-router"; // Adjust imports based on your router version
import { FaBus, FaTrain, FaShip, FaPlane, FaMapMarkerAlt, FaClock, FaCheckCircle } from "react-icons/fa";
import useAllTickets from "../../hooks/useAllTickets";

const AllTicketsPage2 = () => {
  const { tickets, loading, error } = useAllTickets();

  // 🛡️ Filter only admin-approved tickets
  const approvedTickets = tickets.filter(
    (ticket) => ticket.verificationStatus === "approved"
  );

  // Function to render dynamic transport icon based on transport type
  const getTransportIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "bus": return <FaBus className="text-primary" />;
      case "train": return <FaTrain className="text-secondary" />;
      case "launch": return <FaShip className="text-accent" />;
      case "plane": return <FaPlane className="text-info" />;
      default: return <FaBus className="text-primary" />;
    }
  };

  // Function to format departure date and time cleanly
  const formatDeparture = (dateTimeString) => {
    if (!dateTimeString) return "N/A";
    const date = new Date(dateTimeString);
    return date.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // Loading state handler
  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Error state handler
  if (error) {
    return (
      <div className="text-center py-20 text-error">
        <p className="text-xl font-bold">Failed to load tickets</p>
        <p className="text-sm opacity-70">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header Section */}
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-black tracking-tight">Available Tickets</h2>
        <p className="text-gray-400 mt-2 text-sm md:text-base">
          Browse through all admin-approved routes and secure your journey instantly.
        </p>
      </div>

      {/* Empty State Layout */}
      {approvedTickets.length === 0 ? (
        <div className="text-center py-20 bg-base-200 rounded-2xl border border-dashed border-base-300">
          <p className="text-xl font-semibold text-gray-400">No approved tickets available right now.</p>
        </div>
      ) : (
        /* 🚀 Responsive 3-Column Grid Layout */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {approvedTickets.map((ticket) => (
            <div 
              key={ticket._id} 
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200 group overflow-hidden"
            >
              {/* Ticket Media/Image Content */}
              <figure className="relative h-52 overflow-hidden bg-base-300">
                <img 
                  src={ticket.image} 
                  alt={ticket.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Transport Badge Overlay */}
                <div className="absolute top-4 left-4 bg-base-100/90 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-md flex items-center gap-2 text-sm font-bold">
                  {getTransportIcon(ticket.transport)}
                  <span>{ticket.transport}</span>
                </div>
              </figure>

              {/* Card Main Info */}
              <div className="card-body p-6 space-y-4">
                <h3 className="card-title text-xl font-extrabold line-clamp-1 group-hover:text-primary transition-colors">
                  {ticket.title}
                </h3>

                {/* Routing Row (From ➔ To) */}
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 bg-base-200/60 p-2.5 rounded-xl">
                  <FaMapMarkerAlt className="text-error flex-shrink-0" />
                  <span className="truncate">{ticket.from}</span>
                  <span className="text-primary mx-1">➔</span>
                  <span className="truncate">{ticket.to}</span>
                </div>

                {/* Inventory Pricing Details Grid */}
                <div className="grid grid-cols-2 gap-4 border-b border-base-200 pb-3">
                  <div>
                    <span className="text-xs text-gray-400 block font-medium uppercase tracking-wider">Price (per unit)</span>
                    <span className="text-xl font-black text-success">${Number(ticket.price).toFixed(2)}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400 block font-medium uppercase tracking-wider">Available Qty</span>
                    <span className="text-lg font-bold text-base-content">{ticket.quantity} Pcs</span>
                  </div>
                </div>

                {/* Schedule Metrics */}
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
                  <FaClock size={14} className="text-info" />
                  <span>Departure: {formatDeparture(ticket.departure)}</span>
                </div>

                {/* Perks Checklist badging */}
                {ticket.perks && ticket.perks.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {ticket.perks.map((perk, idx) => (
                      <span 
                        key={idx} 
                        className="badge badge-sm bg-primary/10 text-primary border-none font-bold text-[10px] px-2 py-2 uppercase tracking-wide flex items-center gap-1"
                      >
                        <FaCheckCircle size={8} /> {perk}
                      </span>
                    ))}
                  </div>
                )}

                {/* Detail View Action Call */}
                <div className="card-actions pt-2">
                  <Link 
                    to={`/ticket/${ticket._id}`} 
                    className="btn btn-primary btn-block rounded-xl font-bold shadow-lg shadow-primary/20 transition-all hover:translate-y-[-2px]"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTicketsPage2;
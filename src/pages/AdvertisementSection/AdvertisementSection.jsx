import { Link } from "react-router"; 
import Loader from "../../components/Shared/Loader/Loader";
import useAllTickets from "../../hooks/useAllTickets"; 

const AdvertisementSectionSection = () => {
  const { tickets = [], loading, error } = useAllTickets();

  // 🛡️ Filter approved tickets AND check if isAdvertise is true
  const advertisedTickets = tickets.filter(
    (ticket) => 
      ticket.verificationStatus === "approved" && 
      (ticket.isAdvertised === true || ticket.isAdvertised === "true") 
  );

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-red-500">Something went wrong!</p>;
  

  if (advertisedTickets.length === 0) return null; 

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <span className="badge badge-secondary font-bold uppercase tracking-wider px-4 py-3 mb-3">
          📢 Featured Promotions
        </span>
        <h2 className="text-4xl font-black tracking-tight">
          Exclusive Sponsored Offers
        </h2>
        <p className="text-gray-400 mt-2">
          Grab these limited-time deals picked out specially for you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {advertisedTickets.map((ticket) => (
          <div
            key={ticket._id}
            className="card bg-base-100 border border-base-200 shadow-2xl hover:scale-[1.02] transition-all rounded-2xl overflow-hidden"
          >
            <figure className="h-52 relative">
              <img
                src={ticket.image || "https://placehold.co/600x400"}
                alt={ticket.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 badge badge-secondary font-bold">
                ${Number(ticket.price).toFixed(2)}
              </div>
            </figure>
            <div className="card-body p-6 space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="card-title font-black text-xl truncate max-w-[200px]">
                  {ticket.title}
                </h3>
                <span className="badge badge-outline font-semibold text-xs uppercase">
                  {ticket.transport}
                </span>
              </div>

              <div className="text-sm text-gray-400 font-medium">
                📍 {ticket.from} ➔ {ticket.to}
              </div>

              {/* Perks Grid */}
              <div className="flex flex-wrap gap-1.5 py-1">
                {ticket.perks?.map((perk, idx) => (
                  <span
                    key={idx}
                    className="bg-base-200 text-base-content text-[11px] font-bold px-2.5 py-1 rounded-md"
                  >
                    ✨ {perk}
                  </span>
                ))}
              </div>

              <div className="border-t border-base-200 my-2 pt-3 flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-400 font-semibold">
                    Available Seats
                  </p>
                  <p className="text-sm font-black text-primary">
                    {ticket.quantity} Left
                  </p>
                </div>
                <Link
                  to={`/ticket/${ticket._id}`}
                  className="btn btn-secondary btn-sm rounded-xl font-bold"
                >
                  See Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvertisementSectionSection;
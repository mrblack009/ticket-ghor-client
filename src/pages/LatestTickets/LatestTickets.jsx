
import { Link } from "react-router";
import Loader from "../../components/Shared/Loader/Loader";
import useAllTickets from "../../hooks/useAllTickets"; 

const LatestTickets = () => {
  
  const { tickets = [], loading, error } = useAllTickets();

  
  const approvedTickets = tickets
    .filter((ticket) => ticket.verificationStatus === "approved") 
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) 
    .slice(0, 8); 

  if (loading) return <Loader />;
  

  if (error) return <p className="text-center text-red-500 my-10">Something went wrong!</p>;


  if (approvedTickets.length === 0) {
    return <p className="text-center text-gray-500 my-10">No verified trips available right now.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 bg-base-200/30 rounded-3xl my-10">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black tracking-tight">Recently Added Trips</h2>
        <p className="text-gray-400 mt-2">Explore the freshest active routes and journeys updated just now.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {approvedTickets.map((ticket) => (
          <div key={ticket._id} className="card bg-base-100 border border-base-200 shadow-md hover:shadow-xl transition-all rounded-xl overflow-hidden">
            <figure className="h-40 relative">
              <img src={ticket.image || "https://placehold.co/600x400"} alt={ticket.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 badge badge-primary font-bold">${Number(ticket.price).toFixed(2)}</div>
            </figure>
            <div className="p-4 space-y-2">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-primary">{ticket.transport}</span>
              <h3 className="font-bold text-base text-base-content truncate">{ticket.title}</h3>
              <p className="text-xs text-gray-400 font-medium">📍 {ticket.from} to {ticket.to}</p>

              
              <div className="flex flex-wrap gap-1 pt-1 h-6 overflow-hidden">
                {ticket.perks && ticket.perks.length > 0 ? (
                  ticket.perks.slice(0, 2).map((perk, idx) => (
                    <span key={idx} className="bg-base-200 text-base-content text-[10px] font-medium px-2 py-0.5 rounded">
                      • {perk}
                    </span>
                  ))
                ) : (
                  <span className="text-[10px] text-gray-400 italic">Standard Service</span>
                )}
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-base-200 mt-2">
                <span className="text-xs text-gray-400 font-bold">{ticket.quantity} Tickets Left</span>
                <Link to={`/ticket/${ticket._id}`} className="btn btn-primary btn-xs rounded-lg font-bold px-3">
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

export default LatestTickets;
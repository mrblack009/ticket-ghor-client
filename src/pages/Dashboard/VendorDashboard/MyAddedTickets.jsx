import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { deleteTicket, getVendorTickets } from "../../../api/ticketsApi";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../components/Shared/Loader/Loader";


const MyAddedTickets = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      getVendorTickets(user.email)
        .then((data) => {
          setTickets(data);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteTicket(id);
          if (res.deletedCount > 0) {
            Swal.fire("Deleted!", "Your ticket has been deleted.", "success");
            setTickets(tickets.filter((ticket) => ticket._id !== id));
          }
        } catch (err) {
          Swal.fire("Failed!", err.message, "error");
        }
      }
    });
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-8 text-center">My Added Tickets</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => {
          const isRejected = ticket.verificationStatus === "rejected";
          
          // স্ট্যাটাস কালার কন্ডিশন
          const statusBadge = 
            ticket.verificationStatus === "approved" ? "badge-success" : 
            ticket.verificationStatus === "rejected" ? "badge-error" : "badge-warning";

          return (
            <div key={ticket._id} className="card bg-base-100 shadow-xl border border-base-200">
              <figure className="px-4 pt-4 h-48">
                <img src={ticket.image} alt={ticket.title} className="rounded-xl h-full w-full object-cover" />
              </figure>
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <h2 className="card-title text-xl font-bold">{ticket.title}</h2>
                  <span className={`badge ${statusBadge} uppercase text-xs font-bold p-3`}>
                    {ticket.verificationStatus}
                  </span>
                </div>
                
                <p className="text-sm text-gray-500 font-semibold">{ticket.from} ➔ {ticket.to}</p>
                <div className="flex justify-between my-2 bg-base-200 p-2 rounded-lg text-sm">
                  <span>Price: <strong>${ticket.price}</strong></span>
                  <span>Qty: <strong>{ticket.quantity}</strong></span>
                </div>

                <div className="card-actions justify-between mt-4">
                  {/* Update Button */}
                  <button 
                    disabled={isRejected}
                    onClick={() => Swal.fire("Redirecting...", "Open your update modal/page here", "info")}
                    className="btn btn-sm btn-outline btn-info flex-1"
                  >
                    Update
                  </button>
                  
                  {/* Delete Button */}
                  <button 
                    disabled={isRejected}
                    onClick={() => handleDelete(ticket._id)}
                    className="btn btn-sm btn-error flex-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyAddedTickets;
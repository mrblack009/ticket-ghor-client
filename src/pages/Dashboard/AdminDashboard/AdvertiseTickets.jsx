import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getApprovedTickets, toggleTicketAdvertisement } from "../../../api/ticketsApi";

const AdvertiseTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getApprovedTickets()
      .then((data) => {
        setTickets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleAdvertiseToggle = async (id, currentStatus) => {
    // ১. বর্তমানে কয়টি টিকিট অলরেডি অ্যাডভার্টাইজড আছে তা বের করা
    const currentlyAdvertisedCount = tickets.filter(t => t.isAdvertised).length;
    const newStatus = !currentStatus;

    // 🛑 রুলস গার্ড: যদি অলরেডি ৬টা থাকে এবং এডমিন আরেকটি নতুন অ্যাড করতে চায়
    if (newStatus && currentlyAdvertisedCount >= 6) {
      Swal.fire({
        icon: "warning",
        title: "Limit Exceeded!",
        text: "You cannot advertise more than 6 tickets at a time. Please unadvertise a ticket first.",
      });
      return;
    }

    try {
      const res = await toggleTicketAdvertisement(id, newStatus);
      if (res.modifiedCount > 0 || res.success) {
        Swal.fire({
          icon: "success",
          title: newStatus ? "Ticket Added to Advertisement" : "Ticket Removed from Advertisement",
          timer: 1500,
          showConfirmButton: false,
        });

        // 🔥 Reload-less State Update
        setTickets((prev) =>
          prev.map((ticket) =>
            ticket._id === id ? { ...ticket, isAdvertised: newStatus } : ticket
          )
        );
      }
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg text-secondary"></span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-base-100 rounded-2xl border border-base-200 shadow-xl max-w-5xl mx-auto mt-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-black">Advertise Tickets</h2>
          <p className="text-sm text-gray-400">Manage promotional slides on the homepage hero section.</p>
        </div>
        {/* লাইভ কাউন্টার ডিসপ্লে */}
        <div className="badge badge-secondary p-4 gap-2 font-bold text-sm">
          📢 Active Ads: {tickets.filter(t => t.isAdvertised).length} / 6
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-base-200">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200 text-sm">
              <th>Ticket Details</th>
              <th>Transport</th>
              <th>Price</th>
              <th className="text-center">Advertise Status</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-10 text-gray-400">No approved tickets found to advertise.</td>
              </tr>
            ) : (
              tickets.map((ticket) => (
                <tr key={ticket._id} className="hover">
                  <td>
                    <div className="flex items-center gap-3">
                      <img src={ticket.image} alt="" className="w-16 h-10 object-cover rounded-lg" />
                      <div>
                        <div className="font-bold">{ticket.title}</div>
                        <div className="text-xs opacity-50">{ticket.from} to {ticket.to}</div>
                      </div>
                    </div>
                  </td>
                  <td className="font-semibold text-primary">{ticket.transport}</td>
                  <td className="font-bold">${ticket.price}</td>
                  <td>
                    <div className="flex justify-center items-center">
                      {/* 🔄 Beautiful Tailwind Toggle Button */}
                      <label className="cursor-pointer label gap-4 bg-base-200 px-4 py-2 rounded-xl border border-base-300">
                        <span className={`text-xs font-bold uppercase ${ticket.isAdvertised ? "text-secondary" : "text-gray-400"}`}>
                          {ticket.isAdvertised ? "Advertised" : "Off"}
                        </span>
                        <input
                          type="checkbox"
                          className="toggle toggle-secondary"
                          checked={ticket.isAdvertised || false}
                          onChange={() => handleAdvertiseToggle(ticket._id, ticket.isAdvertised)}
                        />
                      </label>
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

export default AdvertiseTickets;
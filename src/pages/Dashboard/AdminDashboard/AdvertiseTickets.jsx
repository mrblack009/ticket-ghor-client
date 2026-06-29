import Swal from "sweetalert2";
import { toggleTicketAdvertisement } from "../../../api/ticketsApi";
import Loader from "../../../components/Shared/Loader/Loader";
import useAllTickets from "../../../hooks/useAllTickets";

const AdvertiseTickets = () => {
  const { tickets, loading, setTickets } = useAllTickets();

  // Only approved tickets can be advertised
  const approvedTickets = tickets.filter(
    (ticket) => ticket.verificationStatus === "approved"
  );

  // Toggle advertisement status
  const handleAdvertiseToggle = async (id, currentStatus) => {
    const currentlyAdvertisedCount = tickets.filter(
      (t) => t.isAdvertised
    ).length;

    const newStatus = !currentStatus;

    // Maximum 6 advertisements allowed
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
          title: newStatus
            ? "Ticket Added to Advertisement"
            : "Ticket Removed from Advertisement",
          timer: 1500,
          showConfirmButton: false,
        });

        // Instant UI update without reload
        setTickets((prevTickets) =>
          prevTickets.map((ticket) =>
            ticket._id === id
              ? { ...ticket, isAdvertised: newStatus }
              : ticket
          )
        );
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: err.message,
      });
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-6 bg-base-100 rounded-2xl border border-base-200 shadow-xl max-w-5xl mx-auto mt-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-black">Advertise Tickets</h2>
          <p className="text-sm text-gray-400">
            Manage promotional slides on the homepage hero section.
          </p>
        </div>

        <div className="badge badge-secondary p-4 gap-2 font-bold text-sm">
          📢 Active Ads: {tickets.filter((t) => t.isAdvertised).length} / 6
        </div>
      </div>

      {/* Table */}
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
            {approvedTickets.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-10 text-gray-400 font-medium"
                >
                  No approved tickets found to advertise.
                </td>
              </tr>
            ) : (
              approvedTickets.map((ticket) => (
                <tr
                  key={ticket._id}
                  className="hover:bg-base-200/30 transition-colors"
                >
                  <td>
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          ticket.image ||
                          "https://placehold.co/150x100"
                        }
                        alt={ticket.title}
                        className="w-16 h-10 object-cover rounded-lg bg-base-300"
                      />

                      <div>
                        <div className="font-bold text-base-content">
                          {ticket.title}
                        </div>

                        <div className="text-xs opacity-50 font-medium">
                          {ticket.from} → {ticket.to}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="font-semibold text-primary">
                    {ticket.transport}
                  </td>

                  <td className="font-bold text-success">
                    ${Number(ticket.price || 0).toFixed(2)}
                  </td>

                  <td>
                    <div className="flex justify-center items-center">
                      <label className="cursor-pointer label gap-4 bg-base-200 px-4 py-2 rounded-xl border border-base-300 hover:bg-base-300/50">
                        <span
                          className={`text-xs font-bold uppercase tracking-wider ${
                            ticket.isAdvertised
                              ? "text-secondary"
                              : "text-gray-400"
                          }`}
                        >
                          {ticket.isAdvertised
                            ? "Advertised"
                            : "Off"}
                        </span>

                        <input
                          type="checkbox"
                          className="toggle toggle-secondary"
                          checked={!!ticket.isAdvertised}
                          onChange={() =>
                            handleAdvertiseToggle(
                              ticket._id,
                              !!ticket.isAdvertised
                            )
                          }
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
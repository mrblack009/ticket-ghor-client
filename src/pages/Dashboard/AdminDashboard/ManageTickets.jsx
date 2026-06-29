import Swal from "sweetalert2";
import useAllTickets from "../../../hooks/useAllTickets";
import { updateTicketVerification } from "../../../api/ticketsApi";
import Loader from "../../../components/Shared/Loader/Loader";

const ManageTickets = () => {
  const { tickets, setTickets, loading } = useAllTickets();
  console.log(tickets);

  const handleStatusChange = async (id, status) => {
    // ইউজার থেকে কনফার্মেশন নেওয়ার জন্য SweetAlert2 পপআপ
    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `You want to mark this ticket as ${status}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: status === "approved" ? "#22c55e" : "#ef4444", // স্ট্যাটাস অনুযায়ী বাটনের কালার চেঞ্জ
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Yes, ${status}!`,
    });

    if (result.isConfirmed) {
      try {
        // ব্যাকএন্ড API কল করা হচ্ছে
        const response = await updateTicketVerification(id, status);

        if (response.modifiedCount > 0 || response.success) {
          // UI (State) আপডেট করা হচ্ছে যাতে রিলোড ছাড়াই ডাটা চেঞ্জ দেখা যায়
          const updatedTickets = tickets.map((ticket) =>
            ticket._id === id
              ? { ...ticket, verificationStatus: status }
              : ticket,
          );
          setTickets(updatedTickets);

          // সফল হওয়ার মেসেজ
          Swal.fire({
            title: "Updated!",
            text: `Ticket has been ${status} successfully.`,
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      } catch (error) {
        console.error("Error updating ticket status:", error);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong while updating the status.",
          icon: "error",
        });
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-6 bg-base-100 rounded-2xl border border-base-200 shadow-xl max-w-6xl mx-auto mt-10">
      <div className="mb-6">
        <h2 className="text-2xl font-black">Manage Vendor Tickets</h2>
        <p className="text-sm text-gray-400 mt-1">
          Review, approve, or reject tickets posted by platform vendors.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-base-200">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200 text-sm">
              <th>Image & Title</th>
              <th>Vendor Email</th>
              <th>Route / Transport</th>
              <th>Price</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-400">
                  No tickets available in the system.
                </td>
              </tr>
            ) : (
              tickets.map((ticket) => (
                <tr
                  key={ticket._id}
                  className="hover:bg-base-200/40 transition-colors"
                >
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={ticket.image} alt={ticket.title} />
                        </div>
                      </div>
                      <div className="font-bold max-w-[180px] truncate">
                        {ticket.title}
                      </div>
                    </div>
                  </td>
                  <td className="text-sm font-medium opacity-75">
                    {ticket.vendorEmail}
                  </td>
                  <td>
                    <div className="text-xs font-bold text-secondary">
                      {ticket.transport}
                    </div>
                    <div className="text-xs opacity-50">
                      {ticket.from} ➔ {ticket.to}
                    </div>
                  </td>
                  <td className="font-bold text-base">${ticket.price}</td>
                  <td>
                    <span
                      className={`badge uppercase text-[10px] font-extrabold px-3 py-2 tracking-wider ${
                        ticket.verificationStatus === "approved"
                          ? "badge-success text-white"
                          : ticket.verificationStatus === "rejected"
                            ? "badge-error text-white"
                            : "badge-warning"
                      }`}
                    >
                      {ticket.verificationStatus || "pending"}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2 justify-center">
                      <button
                        disabled={ticket.verificationStatus === "approved"}
                        onClick={() =>
                          handleStatusChange(ticket._id, "approved")
                        }
                        className="btn btn-xs btn-success text-white px-3 font-bold transition-all disabled:opacity-30"
                      >
                        Approve
                      </button>
                      <button
                        disabled={ticket.verificationStatus === "rejected"}
                        onClick={() =>
                          handleStatusChange(ticket._id, "rejected")
                        }
                        className="btn btn-xs btn-error text-white px-3 font-bold transition-all disabled:opacity-30"
                      >
                        Reject
                      </button>
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

export default ManageTickets;

import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import api from "../../../api/api";
import { FaReceipt, FaCalendarAlt, FaTicketAlt, FaDollarSign } from "react-icons/fa";

const TransactionHistory = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      api.get(`/my-payments/${user.email}`)
        .then((res) => {
          setPayments(res.data || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) return <div className="flex justify-center items-center py-32"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header Info */}
      <div className="mb-8">
        <h2 className="text-3xl font-black tracking-tight">Transaction History</h2>
        <p className="text-sm text-gray-400 mt-1">Review your successful purchase logs and billing payment records processed via Stripe.</p>
      </div>

      {/* Responsive Payments Table Layout */}
      <div className="overflow-x-auto rounded-2xl border border-base-200 shadow-xl bg-base-100">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200/80 text-sm">
              <th><div className="flex items-center gap-1.5"><FaReceipt /> Transaction ID</div></th>
              <th><div className="flex items-center gap-1.5"><FaTicketAlt /> Ticket Title</div></th>
              <th><div className="flex items-center gap-1.5"><FaDollarSign /> Amount Paid</div></th>
              <th><div className="flex items-center gap-1.5"><FaCalendarAlt /> Payment Date</div></th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-12 text-gray-400 font-medium">
                  No verified billing records found in your archive.
                </td>
              </tr>
            ) : (
              payments.map((pay) => (
                <tr key={pay._id} className="hover:bg-base-200/40 transition-colors">
                  <td className="font-mono font-bold text-xs text-primary tracking-wide">
                    {pay.transactionId}
                  </td>
                  <td className="font-bold text-base-content max-w-[240px] truncate">
                    {pay.ticketTitle}
                  </td>
                  <td className="font-extrabold text-success">
                    ${Number(pay.amount).toFixed(2)}
                  </td>
                  <td className="text-xs font-semibold text-gray-400">
                    {new Date(pay.paymentDate).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
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

export default TransactionHistory;
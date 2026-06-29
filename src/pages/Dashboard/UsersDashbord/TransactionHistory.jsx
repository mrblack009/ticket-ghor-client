import React from 'react';

const TransactionHistory = () => {
  // ডামি স্ট্রাইপ ট্রানজেকশন হিস্ট্রি ডাটা
  const transactions = [
    {
      transactionId: "tx_1N2b3c4d5e6f",
      amount: 2400,
      ticketTitle: "Green Line Scania Multi-Axle",
      paymentDate: "2026-06-25"
    },
    {
      transactionId: "tx_9Z8y7x6w5v4u",
      amount: 1500,
      ticketTitle: "US-Bangla Airlines (DAC-CGP)",
      paymentDate: "2026-06-20"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">Transaction History</h3>
      
      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-xs uppercase font-semibold tracking-wider">
              <th className="p-4 rounded-l-lg">Transaction ID</th>
              <th className="p-4">Ticket Title</th>
              <th className="p-4">Amount</th>
              <th className="p-4 rounded-r-lg">Payment Date</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100">
            {transactions.map((tx) => (
              <tr key={tx.transactionId} className="hover:bg-gray-50/70 transition-colors">
                <td className="p-4 font-mono text-xs text-indigo-600 font-bold">{tx.transactionId}</td>
                <td className="p-4 font-medium text-gray-800">{tx.ticketTitle}</td>
                <td className="p-4 font-bold text-blue-600">৳{tx.amount}</td>
                <td className="p-4 text-gray-500">{new Date(tx.paymentDate).toLocaleDateString()}</td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-8 text-gray-400">
                  No successful transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { FaTicketAlt, FaShoppingBag, FaDollarSign } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import api from "../../../api/api";
import Loader from "../../../components/Shared/Loader/Loader";


const RevenueOverview = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalTickets: 0, totalSold: 0, totalRevenue: 0 });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      // সার্ভার থেকে ভেন্ডরের রেভিনিউ এবং টিকিট ডাটা আনা
      api.get(`/vendor/revenue/${user.email}`)
        .then((res) => {
          const tickets = res.data || [];
          
          // ১. কার্ডের জন্য টোটাল হিসাব বের করা
          let totalTickets = 0;
          let totalSold = 0;
          let totalRevenue = 0;

          const formattedChartData = tickets.map((ticket) => {
            const soldCount = ticket.sold || 0;
            const revenue = soldCount * Number(ticket.price);

            totalTickets += Number(ticket.quantity);
            totalSold += soldCount;
            totalRevenue += revenue;

            // চার্টের জন্য ডেটা ফরম্যাট করা (টিকিটের নাম ছোট করে দেখানো যাতে চার্ট সুন্দর লাগে)
            return {
              name: ticket.title.length > 15 ? ticket.title.slice(0, 12) + "..." : ticket.title,
              "Tickets Added": ticket.quantity,
              "Tickets Sold": soldCount,
              "Revenue ($)": revenue,
            };
          });

          setStats({ totalTickets, totalSold, totalRevenue });
          setChartData(formattedChartData);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error loading revenue stats:", err);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return <Loader />
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 mt-10">
      <div>
        <h2 className="text-3xl font-black tracking-tight text-center md:text-left">
          Revenue Overview
        </h2>
        <p className="text-sm text-gray-400 mt-1 text-center md:text-left">
          Track your ticket statistics, sales volume, and total earnings at a glance.
        </p>
      </div>

      {/* 📈 1. STATS CARDS LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Tickets Card */}
        <div className="flex items-center justify-between p-6 bg-base-100 border border-base-200 shadow-xl rounded-2xl">
          <div>
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Total Tickets Added</p>
            <h3 className="text-3xl font-black mt-1 text-primary">{stats.totalTickets}</h3>
          </div>
          <div className="p-4 bg-primary/10 text-primary rounded-xl">
            <FaTicketAlt size={28} />
          </div>
        </div>

        {/* Total Sold Card */}
        <div className="flex items-center justify-between p-6 bg-base-100 border border-base-200 shadow-xl rounded-2xl">
          <div>
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Total Tickets Sold</p>
            <h3 className="text-3xl font-black mt-1 text-secondary">{stats.totalSold}</h3>
          </div>
          <div className="p-4 bg-secondary/10 text-secondary rounded-xl">
            <FaShoppingBag size={28} />
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="flex items-center justify-between p-6 bg-base-100 border border-base-200 shadow-xl rounded-2xl">
          <div>
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Total Revenue</p>
            <h3 className="text-3xl font-black mt-1 text-success">${stats.totalRevenue.toFixed(2)}</h3>
          </div>
          <div className="p-4 bg-success/10 text-success rounded-xl">
            <FaDollarSign size={28} />
          </div>
        </div>
      </div>

      {/* 📊 2. CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Ticket Analytics (Bar Chart) */}
        <div className="p-6 bg-base-100 border border-base-200 shadow-xl rounded-2xl">
          <h4 className="text-lg font-bold mb-4 text-gray-500 uppercase tracking-wide">Ticket Inventory vs Sales</h4>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="name" stroke="#888888" fontSize={11} tickLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#1f2937", borderRadius: "12px", border: "none", color: "#fff" }} />
                <Legend />
                <Bar dataKey="Tickets Added" fill="hsl(var(--p))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Tickets Sold" fill="hsl(var(--s))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Generation (Area Chart) */}
        <div className="p-6 bg-base-100 border border-base-200 shadow-xl rounded-2xl">
          <h4 className="text-lg font-bold mb-4 text-gray-500 uppercase tracking-wide">Revenue Performance ($)</h4>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="name" stroke="#888888" fontSize={11} tickLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#1f2937", borderRadius: "12px", border: "none", color: "#fff" }} />
                <Legend />
                <Area type="monotone" dataKey="Revenue ($)" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RevenueOverview;
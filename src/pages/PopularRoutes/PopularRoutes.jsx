import { FaBus, FaTrain, FaPlane } from "react-icons/fa";

const PopularRoutes = () => {
  const routes = [
    { id: 1, from: "Dhaka", to: "Cox's Bazar", icon: <FaBus />, time: "8-9 Hours", price: "Starts from 750 tk" },
    { id: 2, from: "Dhaka", to: "Sylhet", icon: <FaTrain />, time: "6 Hours", price: "Starts from $550 tk" },
    { id: 3, from: "Dhaka", to: "Chittagong", icon: <FaPlane />, time: "45 Mins", price: "Starts from 500 tk" },
    { id: 4, from: "Dhaka", to: "Rajshahi", icon: <FaBus />, time: "5-6 Hours", price: "Starts from 400 tk" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-black tracking-tight">🔥 Trending Travel Routes</h2>
        <p className="text-gray-400 mt-2">Most frequently booked transport corridors across the country right now.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {routes.map((route) => (
          <div key={route.id} className="p-6 bg-base-100 border border-base-200 hover:border-primary/50 shadow-lg rounded-2xl flex items-center gap-4 transition-all group">
            <div className="p-4 bg-primary/10 text-primary rounded-xl group-hover:bg-primary group-hover:text-primary-content transition-all">
              {route.icon}
            </div>
            <div>
              <h4 className="font-bold text-lg">{route.from} ➔ {route.to}</h4>
              <p className="text-xs text-gray-400 font-medium">⏳ Average {route.time}</p>
              <p className="text-xs font-bold text-success mt-0.5">{route.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularRoutes;
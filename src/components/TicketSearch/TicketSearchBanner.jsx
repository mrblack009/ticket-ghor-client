import { useState } from "react";
import { FaBus, FaTrain, FaPlane } from "react-icons/fa";

const TicketSearchBanner = () => {
  const [activeTab, setActiveTab] = useState("bus");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", {
      transport: activeTab,
      from: fromLocation,
      to: toLocation,
    });
  };

  return (
    <div className="w-full md:max-w-5xl mx-auto px-4 mt-6">
      <div className="bg-base-100 rounded-2xl border border-base-200 shadow-2xl p-4 md:p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 bg-base-200/60 p-1.5 rounded-xl gap-2 mb-4">
          <button
            onClick={() => setActiveTab("bus")}
            className={`flex items-center justify-center gap-2 py-3 text-sm font-bold uppercase tracking-wider rounded-lg transition-all ${
              activeTab === "bus"
                ? "bg-base-100 text-success border border-base-200 shadow-md"
                : "text-gray-500 hover:bg-base-200"
            }`}
          >
            <FaBus className={activeTab === "bus" ? "text-success" : ""} /> Bus
          </button>

          <button
            onClick={() => setActiveTab("train")}
            className={`flex items-center justify-center gap-2 py-3 text-sm font-bold uppercase tracking-wider rounded-lg transition-all ${
              activeTab === "train"
                ? "bg-base-100 text-primary border border-base-200 shadow-md"
                : "text-gray-500 hover:bg-base-200"
            }`}
          >
            <FaTrain className={activeTab === "train" ? "text-primary" : ""} />{" "}
            Train
          </button>

          <button
            onClick={() => setActiveTab("flight")}
            className={`flex items-center justify-center gap-2 py-3 text-sm font-bold uppercase tracking-wider rounded-lg transition-all ${
              activeTab === "flight"
                ? "bg-base-100 text-secondary border border-base-200 shadow-md"
                : "text-gray-500 hover:bg-base-200"
            }`}
          >
            <FaPlane
              className={activeTab === "flight" ? "text-secondary" : ""}
            />{" "}
            Flight
          </button>
        </div>

        <form
          onSubmit={handleSearch}
          className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
        >
          {/* From Input Field */}
          <div className="md:col-span-5 relative">
            <input
              type="text"
              placeholder="From"
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
              className="input input-bordered w-full h-12 rounded-xl text-base focus:outline-none focus:border-primary/50 font-medium"
              required
            />
          </div>

          <div className="md:col-span-5 relative">
            <input
              type="text"
              placeholder="To"
              value={toLocation}
              onChange={(e) => setToLocation(e.target.value)}
              className="input input-bordered w-full h-12 rounded-xl text-base focus:outline-none focus:border-primary/50 font-medium"
              required
            />
          </div>

          <div className="md:col-span-2 w-full">
            <button
              type="submit"
              className="btn border-none w-full h-12 min-h-[48px] rounded-xl text-base font-black text-white bg-primary hover:opacity-95 transition-all shadow-md capitalize"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketSearchBanner;

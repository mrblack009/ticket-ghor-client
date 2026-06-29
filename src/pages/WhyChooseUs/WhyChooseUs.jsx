import { FaShieldAlt, FaClock, FaHeadset, FaPercent } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    { id: 1, title: "100% Secure Payments", desc: "All transactions are fully integrated and heavily encrypted via Stripe protocol architecture.", icon: <FaShieldAlt size={24} />, color: "text-success bg-success/10" },
    { id: 2, title: "Instant Vendor Booking", desc: "No middleman delay. Your vendor approves your reservation request directly within minutes.", icon: <FaClock size={24} />, color: "text-primary bg-primary/10" },
    { id: 3, title: "Best Price Discounts", desc: "Enjoy continuous promotion vouchers and optimal seat pricing available nowhere else.", icon: <FaPercent size={24} />, color: "text-secondary bg-secondary/10" },
    { id: 4, title: "24/7 Dedicated Support", desc: "Our live customer service helpdesk remains online round-the-clock to manage disputes.", icon: <FaHeadset size={24} />, color: "text-warning bg-warning/10" },
  ];

  return (
    <div className="bg-base-200/50 py-16 rounded-[40px] max-w-7xl mx-auto px-4 my-10">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h2 className="text-3xl font-black tracking-tight">Why Book With TicketBari?</h2>
        <p className="text-sm text-gray-400 mt-2">Providing a modern decentralized system for purchasing verified transportation logs globally.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feat) => (
          <div key={feat.id} className="text-center p-6 bg-base-100 rounded-2xl border border-base-200/60 shadow-xl flex flex-col items-center space-y-3">
            <div className={`p-4 rounded-2xl ${feat.color}`}>
              {feat.icon}
            </div>
            <h3 className="font-extrabold text-lg text-base-content pt-1">{feat.title}</h3>
            <p className="text-xs text-gray-400 font-medium leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
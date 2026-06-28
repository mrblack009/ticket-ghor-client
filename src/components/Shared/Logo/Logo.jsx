import { FaBusAlt } from "react-icons/fa";

const Logo = ({ className, logoFooter }) => {
  return (
    <div className={`flex items-end ${className}`}>
      {logoFooter ? (
        <>
          <FaBusAlt className="text-primary w-6 h-6 md:w-10 md:h-10" />
          <h2 className="md:text-2xl font-bold ml-1 text-white">TicketGhor</h2>
        </>
      ) : (
        <>
          <FaBusAlt className="text-primary w-6 h-6 md:w-10 md:h-10" />
          <h2 className="md:text-2xl font-bold ml-1 text-secondary">
            TicketGhor
          </h2>
        </>
      )}
    </div>
  );
};

export default Logo;

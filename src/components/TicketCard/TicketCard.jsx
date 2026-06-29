const TicketCard = ({ticket}) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src={ticket.image} className="h-52 w-full object-cover" />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{ticket.title}</h2>

        <p>
          {ticket.from} → {ticket.to}
        </p>

        <p>{ticket.transport}</p>

        <p>৳ {ticket.price}</p>

        <p>Quantity : {ticket.quantity}</p>

        <StatusBadge status={ticket.verificationStatus} />
      </div>
    </div>
  );
};

export default TicketCard;

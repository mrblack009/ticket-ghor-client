import api from "./api";


// Add Ticket
export const addTicket = async (ticketData) => {
  const res = await api.post("/tickets", ticketData);
  return res.data;
};

// Get Vendor Tickets
export const getVendorTickets = async (email) => {
  const res = await api.get(`/tickets/vendor/${email}`);
  return res.data;
};

// Delete Ticket
export const deleteTicket = async (id) => {
  const res = await api.delete(`/tickets/${id}`);
  return res.data;
};

// Update Ticket
export const updateTicket = async (id, data) => {
  const res = await api.patch(`/tickets/${id}`, data);
  return res.data;
};

// Get All Booking Requests for a Specific Vendor
export const getVendorBookings = async (vendorEmail) => {
  const res = await api.get(`/bookings/vendor/${vendorEmail}`);
  return res.data;
};


// Update Booking Status based on Vendor action (Accept / Reject)
export const updateBookingStatus = async (id, status) => {
  // Requirement rule: Hit separate endpoints based on the action status string
  const endpoint = status === "accepted" 
    ? `/bookings/accept/${id}` 
    : `/bookings/reject/${id}`;

  const response = await api.patch(endpoint);
  return response.data;
};

// ----- Admins -------

// --- Manage Tickets API ---
export const getAllTicketsForAdmin = async () => {
  const res = await api.get("/tickets/admin");
  return res.data;
};

//  (Approved / Rejected)
export const updateTicketVerification = async (id, verificationStatus) => {
  const res = await api.patch(`/tickets/admin/status/${id}`, { verificationStatus });
  return res.data;
};
// Approve Ticket
export const approveTicket = async (id) => {
  const { data } = await api.patch(`/tickets/approve/${id}`);
  return data;
};

// Reject Ticket
export const rejectTicket = async (id) => {
  const { data } = await api.patch(`/tickets/reject/${id}`);
  return data;
};




// --- Advertise Tickets API ---
export const getApprovedTickets = async () => {
  const response = await api.get("/approved-tickets");
  return response.data || []; 
};

// (Advertise / Unadvertise)
export const toggleTicketAdvertisement = async (id, isAdvertised) => {
  const res = await api.patch(`tickets/advertise/${id}`, { isAdvertised });
  return res.data;
};
import { useState, useEffect, useCallback } from "react";
// আপনার ডিরেক্টরি অনুযায়ী সঠিক পাথটি নিশ্চিত করুন (ticketsApi অথবা adminApi)
import { getAllTicketsForAdmin } from "../api/ticketsApi"; 

const useAllTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ডাটা ফেচ করার মূল ফাংশন
  const fetchTickets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllTicketsForAdmin();
      // যেহেতু এপিআই ফাংশন থেকে সরাসরি res.data পাঠানো হচ্ছে, তাই এখানে সরাসরি data বসবে
      setTickets(data || []); 
    } catch (err) {
      console.error("Error loading all tickets:", err);
      setError(err.message || "Failed to fetch tickets");
    } finally {
      setLoading(false);
    }
  }, []);

  // প্রথমবার হুকটি কল হলে ডাটা লোড হবে
  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  // কম্পোনেন্টে ব্যবহারের জন্য রিটার্ন অবজেক্ট
  return { 
    tickets, 
    setTickets, 
    loading, 
    error, 
    refetch: fetchTickets 
  };
};

export default useAllTickets;
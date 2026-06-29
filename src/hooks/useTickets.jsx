import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { getVendorTickets } from "../api/ticketsApi";

const useTickets = () => {
  const { user } = useAuth();

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const refetch = async () => {
    try {
      setLoading(true);

      const data = await getVendorTickets(user.email);

      setTickets(data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      refetch();
    }
  }, [user]);

  return {
    tickets,
    loading,
    refetch,
  };
};

export default useTickets;
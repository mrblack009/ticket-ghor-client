import { useEffect, useState } from "react";
import { getUsers } from "../api/usersApi";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const refetch = async () => {
    try {
      setLoading(true);

      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return {
    users,
    loading,
    refetch,
  };
};

export default useUsers;
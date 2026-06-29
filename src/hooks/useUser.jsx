import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { getUserByEmail } from "../api/usersApi";



const useUser = () => {
  // get users from auth
  const { user: authUser } = useAuth();

  //   create a state to store tasks data
  const [user, setUser] = useState(null);

  //create a state to Loader
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);

        const data = await getUserByEmail(authUser?.email);

        setUser(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (authUser?.email) {
      fetchTasks();
    }
  }, [authUser?.email]);

  return {
    user,
    loading,
    setUser,
  };
};

export default useUser;

import { useQuery } from "@tanstack/react-query";


import api from "../api/api";
import useAuth from "./useAuth";

const useRole = () => {
    const { user, loading } = useAuth();

    const { data: role, isLoading: isRoleLoading } = useQuery({
        queryKey: [user?.email, "userRole"],
       
        enabled: !loading && !!user?.email, 
        queryFn: async () => {
          
            const res = await api.get(`users/${user.email}`);
            return res.data?.role; 
        }
    });

    return [role, isRoleLoading];
};

export default useRole;
import { Navigate, useLocation } from "react-router";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Shared/Loader/Loader";


const AdminRoute = ({ children }) => {
    const { user, loading: authLoading } =  useAuth();
    const [role, isRoleLoading] = useRole(); 
    const location = useLocation();
    
 
    if (authLoading || isRoleLoading) {
        return <Loader />;
    }

   
    if (user && role === "admin") {
        return children;
    }

  
    return <Navigate to="/" state={location.pathname} replace></Navigate>;
};

export default AdminRoute;
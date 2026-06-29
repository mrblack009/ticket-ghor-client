import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loader from "../components/Shared/Loader/Loader";

const VendorRoute = ({ children }) => {
    const { user, loading: authLoading } = useAuth();
    const [role, isRoleLoading] = useRole();
    const location = useLocation();
    
    if (authLoading || isRoleLoading) {
        return <Loader />;
    }


    if (user && role === "vendor") {
        return children;
    }

    return <Navigate to="/" state={location.pathname} replace></Navigate>;
};

export default VendorRoute;
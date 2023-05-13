import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth";

const RoutePrivate = () => {
    const { auth, loading } = useAuth();

    if (loading) {
        return;
    }

    return <>{auth._id ? <Outlet /> : <Navigate to="/" />}</>;
};

export default RoutePrivate;

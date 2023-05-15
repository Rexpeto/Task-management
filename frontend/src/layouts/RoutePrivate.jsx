import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const RoutePrivate = () => {
    const { auth, loading } = useAuth();

    if (loading) {
        return;
    }

    return (
        <>
            {auth._id ? (
                <div>
                    <Header />
                    <div className="md:flex md:min-h-screen pt-[4rem]">
                        <Sidebar />
                        <main>
                            <Outlet />
                        </main>
                    </div>
                </div>
            ) : (
                <Navigate to="/" />
            )}
        </>
    );
};

export default RoutePrivate;

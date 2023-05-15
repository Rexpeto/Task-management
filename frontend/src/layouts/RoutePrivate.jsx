import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { ToastContainer } from "react-toastify";

const RoutePrivate = () => {
    const { auth, loading } = useAuth();

    if (loading) {
        return;
    }

    return (
        <>
            {auth._id ? (
                <div>
                    <ToastContainer theme="dark" />
                    <Header />
                    <div className="md:flex md:min-h-screen pt-[4rem]">
                        <Sidebar />
                        <main className="p-4 w-full">
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

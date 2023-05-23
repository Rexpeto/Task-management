import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

const RoutePrivate = () => {
    const { auth, loading } = useAuth();
    const [dropdown, setDropdown] = useState(false);

    if (loading) {
        return;
    }

    return (
        <>
            {auth._id ? (
                <div>
                    <ToastContainer theme="dark" />
                    <Header setDropdown={setDropdown} dropdown={dropdown} />
                    <div
                        className="md:flex md:min-h-screen pt-[4rem]"
                        onClick={() => setDropdown(false)}
                    >
                        <Sidebar />
                        <main className="p-4 md:pl-[13rem] w-full">
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

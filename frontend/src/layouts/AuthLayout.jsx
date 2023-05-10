import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthLayout = () => {
    return (
        <main className="flex justify-center items-center min-h-screen">
            <ToastContainer theme="dark" />
            <Outlet />
        </main>
    );
};

export default AuthLayout;

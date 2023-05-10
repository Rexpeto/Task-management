import { Outlet } from "react-router";

const AuthLayout = () => {
    return (
        <main className="flex justify-center items-center min-h-screen">
            <Outlet />
        </main>
    );
};

export default AuthLayout;

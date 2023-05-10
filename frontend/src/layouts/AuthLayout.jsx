import { Outlet } from "react-router";

const AuthLayout = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <Outlet />
        </div>
    );
};

export default AuthLayout;

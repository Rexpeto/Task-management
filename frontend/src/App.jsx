import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import NewPassword from "./pages/auth/NewPassword";
import ConfirmAccount from "./pages/auth/ConfirmAccount";
import RoutePrivate from "./layouts/RoutePrivate";
import Project from "./pages/admin/Project";

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<AuthLayout />}>
                        <Route index element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="forgotPass" element={<ForgotPassword />} />
                        <Route
                            path="forgotPass/:token"
                            element={<NewPassword />}
                        />
                        <Route
                            path="confirm/:id"
                            element={<ConfirmAccount />}
                        />
                    </Route>

                    <Route path="/project" element={<RoutePrivate />}>
                        <Route index element={<Project />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { ProjectProvider } from "./context/ProjectProvider";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import NewPassword from "./pages/auth/NewPassword";
import ConfirmAccount from "./pages/auth/ConfirmAccount";
import RoutePrivate from "./layouts/RoutePrivate";
import Projects from "./pages/admin/Projects";
import NewProject from "./pages/admin/NewProject";
import Project from "./pages/admin/Project";
import UpdateProject from "./pages/admin/UpdateProject";

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ProjectProvider>
                    <Routes>
                        <Route path="/" element={<AuthLayout />}>
                            <Route index element={<Login />} />
                            <Route path="register" element={<Register />} />
                            <Route
                                path="forgotPass"
                                element={<ForgotPassword />}
                            />
                            <Route
                                path="forgotPass/:token"
                                element={<NewPassword />}
                            />
                            <Route
                                path="confirm/:id"
                                element={<ConfirmAccount />}
                            />
                        </Route>

                        <Route path="/projects" element={<RoutePrivate />}>
                            <Route index element={<Projects />} />
                            <Route path="newProject" element={<NewProject />} />
                            <Route path=":id" element={<Project />} />
                            <Route
                                path="edit/:id"
                                element={<UpdateProject />}
                            />
                        </Route>
                    </Routes>
                </ProjectProvider>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;

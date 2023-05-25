import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clientAxios from "../config/clientAxios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const authenticator = async () => {
            const token = localStorage.getItem("access_token");

            if (!token) {
                setLoading(false);
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            try {
                const { data } = await clientAxios("/user/perfil", config);
                setAuth(data);
            } catch (error) {
                setAuth({});
            }

            setLoading(false);
        };

        authenticator();
    }, []);

    const signOut = () => {
        localStorage.removeItem("access_token");
        setAuth({});
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ setAuth, auth, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

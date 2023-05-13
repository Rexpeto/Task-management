import { createContext, useState, useEffect } from "react";
import clientAxios from "../config/clientAxios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    useEffect(() => {
        const authenticator = async () => {
            const token = localStorage.getItem("access_token");

            if (!token) {
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

                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };

        authenticator();
    }, []);

    return (
        <AuthContext.Provider value={{ setAuth, auth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

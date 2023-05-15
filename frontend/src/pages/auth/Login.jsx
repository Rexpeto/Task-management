import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import clientAxios from "../../config/clientAxios";
import useAuth from "../../hook/useAuth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setAuth, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.warn("Debe colocar un correo");
            return;
        }

        if (!password) {
            toast.warn("Debe colocar la contraseña");
            return;
        }

        try {
            const { data } = await clientAxios.post("/user/login", {
                email,
                password,
            });

            localStorage.setItem("access_token", data.token);
            setAuth(data);
            navigate("/project");
        } catch ({ response: { data } }) {
            setPassword("");
            toast.warn(data.msg);
        }
    };

    return (
        <div className="max-w-sm w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-6">Iniciar Sesión</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Correo
                    </label>
                    <input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value.toLowerCase())}
                        value={email}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 transition duration-150 outline-none"
                        placeholder="nombre@dominio.com"
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) =>
                            setPassword(e.target.value.toLowerCase())
                        }
                        value={password}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 transition duration-150 outline-none"
                    />
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 transition duration-150"
                >
                    Iniciar
                </button>
                <div className="flex flex-row gap-3 justify-center mt-6 items-center">
                    <Link
                        className="hover:text-blue-600 transition duration-150"
                        to="register"
                    >
                        Registrarse
                    </Link>
                    <Link
                        className="hover:text-blue-600 transition duration-150"
                        to="forgotPass"
                    >
                        Olvidé mi contraseña
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;

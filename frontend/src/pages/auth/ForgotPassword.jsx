import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handlerSubmit = async (e) => {
        e.preventDefault();

        if (email === "") {
            toast.warn("Debe colocar el correo de su cuenta");
            return;
        }

        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/user/forgotPass`,
                { email: email.toLocaleLowerCase() }
            );

            setEmail("");
            toast.success(data.msg);
        } catch ({ response: { data } }) {
            toast.error(data.msg);
        }
    };

    return (
        <div className="max-w-sm w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-6">Recuperar contraseña</h3>
            <form onSubmit={handlerSubmit}>
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 transition duration-150 outline-none"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="nombre@dominio.com"
                    />
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 transition duration-150"
                >
                    Recuperar
                </button>
                <div className="flex flex-row gap-3 justify-center mt-6">
                    <Link
                        className="hover:text-blue-600 transition duration-150"
                        to="/"
                    >
                        ¿Ya recuerdas tu contraseña? iniciar sesión
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;

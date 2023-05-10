import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        r_password: "",
    });

    const inputChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handdlerSubmit = (e) => {
        e.preventDefault();

        const { name, email, password, r_password } = user;

        //? Validate
        if (!name || !email || !password || !r_password) {
            toast.warn("Todos los campos son obligatorios!!");
            return;
        }

        if (password.length <= 8) {
            toast.warn("La contraseña debe ser mayor a 8 carácteres");
            return;
        }

        if (password !== r_password) {
            toast.warn("Las contraseñas no son iguales");
            return;
        }
    };

    return (
        <div className="max-w-sm w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-6">Registrarse</h3>
            <form onSubmit={handdlerSubmit}>
                <div className="mb-6">
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Nombre
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={(e) => inputChange(e)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 transition duration-150 outline-none"
                        placeholder="Nombre"
                    />
                </div>
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
                        name="email"
                        onChange={(e) => inputChange(e)}
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
                        name="password"
                        onChange={(e) => inputChange(e)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 transition duration-150 outline-none"
                        placeholder="*****"
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="r_password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Repite la Contraseña
                    </label>
                    <input
                        type="password"
                        id="r_password"
                        name="r_password"
                        onChange={(e) => inputChange(e)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 transition duration-150 outline-none"
                        placeholder="*****"
                    />
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 transition duration-150"
                >
                    Registrar
                </button>
                <div className="flex flex-row gap-3 justify-center mt-6">
                    <Link
                        className="hover:text-blue-600 transition duration-150"
                        to="/"
                    >
                        ¿Ya tienes una cuenta? iniciar sesión
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Register;

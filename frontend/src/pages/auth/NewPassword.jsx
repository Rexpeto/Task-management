import { useEffect, useState } from "react";
import { useParams, redirect, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const NewPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [validate, setValidate] = useState(false);
    const [passwordModify, setPasswordModify] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const { data } = await axios(
                    `${
                        import.meta.env.VITE_BACKEND_URL
                    }/user/checkPass/${token}`
                );
                setValidate(true);
            } catch ({ response }) {
                return redirect("/");
            }
        };

        checkToken();
    }, []);

    const handlerSubmit = async (e) => {
        e.preventDefault();

        if (!password || !password2) {
            toast.warn("Debe colocar una contraseña");
            return;
        }

        if (password.length < 6 || password2.length < 6) {
            toast.warn("La contraseña debe de contener minimo 6 carácteres");
            return;
        }

        if (password !== password2) {
            toast.warn("Las contraseñas no coinciden");
            return;
        }

        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/user/resetPass/${token}`,
                { password }
            );
            toast.success(data.msg);
            setPassword("");
            setPassword2("");
            setPasswordModify(true);
        } catch ({ response }) {
            console.log({ response });
        }
    };

    return validate ? (
        passwordModify ? (
            <Link
                to="/"
                className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white outline-none transition duration-150"
            >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 font-semibold">
                    Iniciar Sesión
                </span>
            </Link>
        ) : (
            <div className="max-w-sm w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h3 className="text-lg font-bold mb-6">
                    Restablecer contraseña
                </h3>
                <form onSubmit={handlerSubmit}>
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
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 transition duration-150 outline-none"
                            placeholder="Contraseña"
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
                            onChange={(e) => setPassword2(e.target.value)}
                            value={password2}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 transition duration-150 outline-none"
                            placeholder="Contraseña"
                        />
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 transition duration-150"
                    >
                        Restablecer
                    </button>
                </form>
            </div>
        )
    ) : (
        <div className="flex flex-col gap-4 items-center">
            <h1 className="font-bold text-4xl">Error</h1>
            <Link
                to="/"
                className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white outline-none transition duration-150"
            >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 font-semibold">
                    Iniciar Sesión
                </span>
            </Link>
        </div>
    );
};

export default NewPassword;

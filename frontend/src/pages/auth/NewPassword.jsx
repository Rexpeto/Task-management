const NewPassword = () => {
    return (
        <div className="max-w-sm w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-6">Restablecer contraseña</h3>
            <form>
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 transition duration-150 outline-none"
                        placeholder="Contraseña"
                        required
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 transition duration-150 outline-none"
                        placeholder="Contraseña"
                        required
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
    );
};

export default NewPassword;

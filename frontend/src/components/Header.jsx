import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hook/useAuth";
import { RiSearchLine, RiArrowDropDownLine } from "react-icons/ri";

const Header = () => {
    const [dropdown, setDropdown] = useState(false);
    const { auth } = useAuth();

    return (
        <header className="px-4 py-3 bg-gray-800 fixed w-full z-10">
            <div className="md:flex md:justify-between">
                <Link to="/projects" className="flex gap-2 items-center">
                    <img src="favicon.svg" alt="logo" />
                    <h2 className="font-semibold">Vypers</h2>
                </Link>

                <form className="min-w-[50rem]">
                    <div className="flex">
                        <div className="relative w-full">
                            <input
                                type="search"
                                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 rounded-l-lg transition outline-none duration-150"
                                placeholder="Buscar"
                            />
                            <button
                                type="submit"
                                className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 outline-none dark:bg-blue-600 dark:hover:bg-blue-700 transition duration-150"
                            >
                                <RiSearchLine className="text-xl" />
                            </button>
                        </div>
                    </div>
                </form>

                <div className="flex">
                    <div
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => setDropdown(!dropdown)}
                    >
                        <img
                            type="button"
                            className="w-8 h-8 rounded"
                            src="profile.jpg"
                            alt="User"
                        />
                        <p className="capitalize">{auth.name}</p>
                        <RiArrowDropDownLine
                            className={`${
                                dropdown ? "rotate-[180deg]" : "rotate-0"
                            } transition duration-150`}
                        />
                    </div>

                    <div
                        className={`z-10 ${
                            dropdown ? "visible" : "hidden"
                        } top-[3.5rem] right-2 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-800/80 dark:divide-gray-600 transition-all duration-150 overflow-hidden`}
                    >
                        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            <div className="capitalize">{auth.name}</div>
                            <div className="font-medium truncate">
                                {auth.email}
                            </div>
                        </div>
                        <div className="py-1">
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white transition duration-150"
                            >
                                Cerrar sesión
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

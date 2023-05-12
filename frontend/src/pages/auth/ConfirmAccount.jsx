import { useEffect, useState } from "react";
import { TbUserCheck, TbUserX } from "react-icons/tb";
import { Link, useParams } from "react-router-dom";
import clientAxios from "../../config/clientAxios";

const ConfirmAccount = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        const confirm = async () => {
            try {
                const { data, status } = await clientAxios(
                    `/user/confirm/${id}`
                );

                setUser({
                    msg: data?.msg,
                    status,
                });
            } catch ({ response: { data }, response: { status } }) {
                setUser({
                    msg: data.msg,
                    status,
                });
            }
        };
        confirm();
    }, []);

    return (
        <div className="flex flex-col gap-4 items-center">
            <div className="flex sm:items-center gap-4">
                {user.status !== 403 ? (
                    <TbUserCheck className="text-6xl dark:text-white" />
                ) : (
                    <TbUserX className="text-6xl dark:text-white" />
                )}
                <h2 className="text-2xl font-bold">{user.msg}</h2>
            </div>
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

export default ConfirmAccount;

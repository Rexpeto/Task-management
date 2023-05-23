import { formatDate } from "../helpers/formatDate";
import useProject from "../hook/useProject";
import useAdmin from "../hook/useAdmin";

const CardTask = ({ task }) => {
    const { name, description, deadline, priority, status, complete } = task;
    const { handleModalEditTask, handleModalDelete, changeStatusTask } =
        useProject();
    const admin = useAdmin();

    const Priority = {
        Baja: "bg-blue-500",
        Media: "bg-yellow-500",
        Alta: "bg-red-500",
    };

    return (
        <div className="flex justify-between items-center w-full p-6 border bg-gray-800 rounded-lg shadow dark:border-gray-700">
            <div className="flex gap-2">
                <div>
                    <h3 className="font-bold text-xl first-letter:uppercase">
                        {name}
                    </h3>
                    <p className="text-md">{description}</p>
                    <p>
                        Fecha de entrega:{" "}
                        <span className="font-bold">
                            {formatDate(deadline.split("T")[0].split("-"))}
                        </span>
                    </p>
                </div>
                <div className="flex flex-col gap-4 justify-center relative">
                    <div className="flex justify-between items-center gap-2">
                        <p className="font-bold">Prioridad:</p>
                        <span
                            title={priority}
                            className={`w-5 h-5 right-[-2rem] top-[0.1rem] ${Priority[priority]} border-2 border-white dark:border-gray-800 rounded-full`}
                        ></span>
                    </div>
                    {status && (
                        <div className="flex justify-between items-center gap-2">
                            <p className="font-bold">Completado por: </p>
                            <img
                                src="../../public/profile.jpg"
                                alt={complete?.name}
                                title={complete?.name}
                                className="w-10 h-10 border border-white rounded-full dark:border-gray-800"
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="flex gap-2">
                {admin && (
                    <button
                        className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-600 to-green-500 group-hover:from-blue-600 group-hover:to-green-500 hover:text-white dark:text-white outline-none transition-all duration-150"
                        onClick={() => handleModalEditTask(task)}
                    >
                        <span className="relative w-full p-2 transition-all ease-in duration-75 bg-white dark:bg-gray-800 rounded-md group-hover:bg-opacity-0">
                            Editar
                        </span>
                    </button>
                )}

                <button
                    className={`relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br ${
                        status
                            ? "from-red-600 to-orange-500 group-hover:from-red-600 group-hover:to-orange-500"
                            : "from-blue-600 to-cyan-500 group-hover:from-blue-600 group-hover:to-cyan-500"
                    } hover:text-white dark:text-white outline-none transition-all duration-150`}
                    onClick={() => changeStatusTask(task._id, status)}
                >
                    <span className="relative w-full p-2 transition-all ease-in duration-75 bg-white dark:bg-gray-800 rounded-md group-hover:bg-opacity-0">
                        {status ? "Incompleta" : "Completada"}
                    </span>
                </button>

                {admin && (
                    <button
                        className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-600 to-red-700 group-hover:from-red-600 group-hover:to-red-500 hover:text-white dark:text-white outline-none transition-all duration-150"
                        onClick={() => handleModalDelete(task)}
                    >
                        <span className="relative w-full p-2 transition-all ease-in duration-75 bg-white dark:bg-gray-800 rounded-md group-hover:bg-opacity-0">
                            Eliminar
                        </span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default CardTask;

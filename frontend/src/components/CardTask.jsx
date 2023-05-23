import { formatDate } from "../helpers/formatDate";
import useProject from "../hook/useProject";
import useAdmin from "../hook/useAdmin";

const CardTask = ({ task }) => {
    const { name, description, deadline, priority, status } = task;
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
                <div className="flex justify-center relative">
                    <p className="font-bold">Prioridad:</p>
                    <span
                        title={priority}
                        className={`absolute w-5 h-5 right-[-2rem] top-[0.1rem] ${Priority[priority]} border-2 border-white dark:border-gray-800 rounded-full`}
                    ></span>
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

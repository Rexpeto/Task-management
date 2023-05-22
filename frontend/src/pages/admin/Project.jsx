import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { MdEditNote, MdAssignmentAdd } from "react-icons/md";
import { RxCommit } from "react-icons/rx";
import useProject from "../../hook/useProject";
import useAdmin from "../../hook/useAdmin";
import ModalFormTask from "../../components/ModalFormTask";
import CardTask from "../../components/CardTask";
import ModalDelete from "../../components/ModalDelete";
import CardCollaborator from "../../components/CardCollaborator";
import ModalDeleteCollaborator from "../../components/ModalDeleteCollaborator";

const Project = () => {
    const { id } = useParams();
    const { getProject, project, loading, handleModalTask } = useProject();

    useEffect(() => {
        getProject(id);
    }, []);

    const { name, description, tasks, collaborators } = project;
    const admin = useAdmin();

    return loading ? (
        <div className="w-full h-full flex items-center justify-center">
            <span className="loader"></span>
        </div>
    ) : (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="first-letter:uppercase font-bold text-2xl">
                        {name}
                    </h1>
                    <p className=" text-gray-300 first-letter:uppercase">
                        {description}
                    </p>
                </div>
                {admin && (
                    <Link
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition duration-150"
                        to={`/projects/edit/${id}`}
                    >
                        <p>Editar</p>
                        <MdEditNote className="text-3xl" />
                    </Link>
                )}
            </div>
            {admin && (
                <button
                    onClick={handleModalTask}
                    className="flex items-center gap-4 p-2 border border-gray-300 text-gray-300 rounded w-[10rem] hover:border-blue-600 hover:bg-blue-600 hover:text-white shadow transition duration-150"
                    type="button"
                >
                    <MdAssignmentAdd className="text-xl" />
                    Nueva tarea
                </button>
            )}
            {tasks.length ? (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Tareas</h2>
                    <div className="flex flex-col gap-4">
                        {tasks.map((task) => (
                            <CardTask task={task} key={task._id} />
                        ))}
                    </div>
                </div>
            ) : (
                <h2>No hay tareas disponibles</h2>
            )}
            <div className="flex items-center justify-between mt-10">
                <h2 className="text-xl font-semibold">Colaboradores</h2>
                {admin && (
                    <Link
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition duration-150"
                        to={`/projects/add-collaborators/${id}`}
                    >
                        <p>Añadir</p>
                        <RxCommit className="text-2xl" />
                    </Link>
                )}
            </div>
            {collaborators?.length ? (
                <div className="grid grid-cols-4 gap-4">
                    {collaborators.map((user) => (
                        <CardCollaborator user={user} key={user._id} />
                    ))}
                </div>
            ) : (
                <h2>No hay colaboradores</h2>
            )}
            <ModalDelete />
            <ModalFormTask />
            <ModalDeleteCollaborator />
        </div>
    );
};

export default Project;

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdEditNote, MdAssignmentAdd } from "react-icons/md";
import useProject from "../../hook/useProject";
import ModalFormTask from "../../components/ModalFormTask";

const Project = () => {
    const { id } = useParams();
    const { getProject, project, loading, handleModalTask } = useProject();
    const [modal, setModal] = useState(false);

    useEffect(() => {
        getProject(id);
    }, []);

    const { name, description } = project;

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
                <Link
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition duration-150"
                    to={`/projects/edit/${id}`}
                >
                    <p>Editar</p>
                    <MdEditNote className="text-3xl" />
                </Link>
            </div>
            <button
                onClick={handleModalTask}
                className="flex items-center gap-4 p-2 border border-gray-300 text-gray-300 rounded w-[10rem] hover:border-blue-600 hover:bg-blue-600 hover:text-white shadow transition duration-150"
                type="button"
            >
                <MdAssignmentAdd className="text-xl" />
                Nueva tarea
            </button>
            <ModalFormTask modal={modal} setModal={setModal} />
        </div>
    );
};

export default Project;

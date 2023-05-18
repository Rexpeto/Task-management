import { useEffect } from "react";
import useProject from "../../hook/useProject";
import FormProject from "../../components/FormProject";
import { useParams } from "react-router-dom";
import { MdDeleteSweep } from "react-icons/md";

const UpdateProject = () => {
    const { id } = useParams();
    const { project, getProject, loading, deleteProject } = useProject();
    const { name } = project;

    useEffect(() => {
        getProject(id);
    }, []);

    const handleClick = async () => {
        if (confirm("¿Desea eliminar este proyecto?")) {
            await deleteProject(id);
        }
    };

    return loading ? (
        <div className="w-full h-full flex items-center justify-center">
            <span className="loader"></span>
        </div>
    ) : (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">{`Editar proyecto ${name}`}</h1>
                <button
                    className="flex items-center gap-2  hover:text-red-600 transition duration-150"
                    onClick={handleClick}
                >
                    Eliminar
                    <MdDeleteSweep className="text-2xl" />
                </button>
            </div>
            <div className="flex mt-10">
                <FormProject />
            </div>
        </div>
    );
};

export default UpdateProject;

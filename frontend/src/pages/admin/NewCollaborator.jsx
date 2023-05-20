import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProject from "../../hook/useProject";
import FormCollaborator from "../../components/FormCollaborator";

const NewCollaborator = () => {
    const { id } = useParams();
    const { getProject, project, loading } = useProject();

    useEffect(() => {
        getProject(id);
    }, []);

    return loading ? (
        <div className="w-full h-full flex items-center justify-center">
            <span className="loader"></span>
        </div>
    ) : (
        <>
            <h1 className="text-2xl font-bold">Nuevo colaborador(a)</h1>
            <div className="flex gap-2 mt-2">
                <h2 className="first-letter:uppercase font-semibold text-lg">
                    {project.name}
                </h2>
                <p className="first-letter:uppercase text-gray-500">
                    {project.clients}
                </p>
            </div>
            <div className="mt-5">
                <FormCollaborator />
            </div>
        </>
    );
};

export default NewCollaborator;

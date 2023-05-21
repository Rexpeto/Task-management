import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProject from "../../hook/useProject";
import FormCollaborator from "../../components/FormCollaborator";
import CardCollaborator from "../../components/CardCollaborator";
import ModalDeleteCollaborator from "../../components/ModalDeleteCollaborator";

const NewCollaborator = () => {
    const { id } = useParams();
    const { getProject, project, loading, collaborator } = useProject();

    useEffect(() => {
        getProject(id);
    }, []);

    return (
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
            {loading ? (
                <div className="w-full h-full flex items-center justify-center">
                    <span className="loader"></span>
                </div>
            ) : (
                <div className="mt-5">
                    <FormCollaborator />
                    {collaborator.length ? (
                        <div className="grid grid-cols-4 gap-4 mt-5">
                            {collaborator.map((user) => (
                                <CardCollaborator user={user} key={user._id} />
                            ))}
                        </div>
                    ) : null}
                    <ModalDeleteCollaborator />
                </div>
            )}
        </>
    );
};

export default NewCollaborator;

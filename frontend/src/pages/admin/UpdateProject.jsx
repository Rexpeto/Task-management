import { useEffect } from "react";
import useProject from "../../hook/useProject";
import { useParams } from "react-router-dom";
import FormProject from "../../components/FormProject";

const UpdateProject = () => {
    const { id } = useParams();
    const { project, getProject, loading } = useProject();
    const { name } = project;

    useEffect(() => {
        getProject(id);
    }, []);

    return loading ? (
        <div className="w-full h-full flex items-center justify-center">
            <span className="loader"></span>
        </div>
    ) : (
        <div>
            <h1 className="text-2xl font-bold">{`Editar proyecto ${name}`}</h1>
            <div className="flex mt-10">
                <FormProject />
            </div>
        </div>
    );
};

export default UpdateProject;

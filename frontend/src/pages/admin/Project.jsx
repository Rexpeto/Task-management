import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProject from "../../hook/useProject";

const Project = () => {
    const { id } = useParams();
    const { getProject, project, loading } = useProject();

    useEffect(() => {
        getProject(id);
    }, []);

    return loading ? (
        <div className="w-full h-full flex items-center justify-center">
            <span class="loader"></span>
        </div>
    ) : (
        <div>
            <h1 className="first-letter:uppercase font-bold text-2xl">
                {project?.name}
            </h1>
        </div>
    );
};

export default Project;

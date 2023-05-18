import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { MdEditNote } from "react-icons/md";
import useProject from "../../hook/useProject";

const Project = () => {
    const { id } = useParams();
    const { getProject, project, loading } = useProject();

    useEffect(() => {
        getProject(id);
    }, []);

    const { name, description } = project;

    return loading ? (
        <div className="w-full h-full flex items-center justify-center">
            <span className="loader"></span>
        </div>
    ) : (
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
    );
};

export default Project;

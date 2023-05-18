import { createContext, useState, useEffect } from "react";
import clientAxiosPrivate from "../config/clientAxiosPrivate";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState({});
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const token = localStorage.getItem("access_token");

    useEffect(() => {
        const getProject = async () => {
            try {
                if (!token) return;

                const { data } = await clientAxiosPrivate("/project");

                setProjects(data);
            } catch ({ response: { data } }) {
                toast.warn(data?.msg);
            }
        };

        getProject();
    }, []);

    const submitProject = async (project) => {
        if (!token) return;

        try {
            const { data } = await clientAxiosPrivate.post("/project", project);

            toast.success("Proyecto creado correctamente");
            setProjects([...projects, data]);
            navigate("/projects");
        } catch ({ response }) {
            toast.warn(response.data.msg);
        }
    };

    const getProject = async (id) => {
        setLoading(true);
        if (!token) return;

        try {
            const { data } = await clientAxiosPrivate(`/project/${id}`);
            setProject(data?.project);
        } catch ({ response }) {
            toast.error(response.data.msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProjectContext.Provider
            value={{ submitProject, projects, getProject, project, loading }}
        >
            {children}
        </ProjectContext.Provider>
    );
};

export default ProjectContext;

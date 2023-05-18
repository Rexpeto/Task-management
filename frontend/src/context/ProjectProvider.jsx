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

        if (project.id) {
            await editProject(project);
        } else {
            await createProject(project);
        }
    };

    const createProject = async (project) => {
        try {
            const { data } = await clientAxiosPrivate.post("/project", project);

            toast.success("Proyecto creado correctamente");
            setProjects([...projects, data]);
            navigate("/projects");
        } catch ({ response }) {
            toast.warn(response.data.msg);
        }
    };

    const editProject = async (project) => {
        try {
            const { data } = await clientAxiosPrivate.put(
                `/project/${project.id}`,
                project
            );

            toast.success("Proyecto editado correctamente");
            const updateProyects = projects.map((projectState) =>
                projectState._id === data._id ? data : projectState
            );
            setProjects(updateProyects);
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

    const deleteProject = async (id) => {
        if (!token) return;

        try {
            const { data } = await clientAxiosPrivate.post(`/project/${id}`);

            const updateProjects = projects.filter(
                (projectState) => projectState._id !== id
            );

            setProjects(updateProjects);

            toast.success(data.msg);
            navigate("/projects");
        } catch ({ response }) {
            toast.error(response.data.msg);
        }
    };

    return (
        <ProjectContext.Provider
            value={{
                submitProject,
                projects,
                getProject,
                project,
                loading,
                deleteProject,
            }}
        >
            {children}
        </ProjectContext.Provider>
    );
};

export default ProjectContext;

import { createContext, useState, useEffect } from "react";
import clientAxiosPrivate from "../config/clientAxiosPrivate";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
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

    return (
        <ProjectContext.Provider value={{ submitProject, projects }}>
            {children}
        </ProjectContext.Provider>
    );
};

export default ProjectContext;

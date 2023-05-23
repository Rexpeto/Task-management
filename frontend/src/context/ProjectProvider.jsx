import { createContext, useState, useEffect } from "react";
import clientAxiosPrivate from "../config/clientAxiosPrivate";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState({});
    const [loading, setLoading] = useState(true);
    const [modalFormTask, setModalFormTask] = useState(false);
    const [modalDelete, setModdalDelete] = useState(false);
    const [task, setTask] = useState({});
    const [collaborator, setCollaborator] = useState([]);
    const [modalCollaborator, setModalCollaborator] = useState(false);

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
            setProject(data.project);
        } catch ({ response }) {
            toast.error(response.data.msg);
            navigate("/projects");
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

    const handleModalTask = () => {
        setModalFormTask(!modalFormTask);
        setTask({});
    };

    const submitTask = async ({
        id,
        name,
        description,
        deadline,
        priority,
    }) => {
        const task = {
            id,
            name,
            description,
            deadline,
            priority,
            project: project._id,
        };

        if (!token) return;

        if (id) {
            await editTask(task);
        } else {
            await setTaskApi(task);
        }
    };

    const setTaskApi = async (task) => {
        try {
            const { data } = await clientAxiosPrivate.post("/task", task);

            handleModalTask();

            const updateProject = { ...project };
            updateProject.tasks = [...project.tasks, data];

            setProject(updateProject);
            toast.success("Tarea agregada con exito");
        } catch ({ response }) {
            toast.error(response.data.msg);
        }
    };

    const editTask = async (task) => {
        try {
            const { data } = await clientAxiosPrivate.put(
                `/task/${task.id}`,
                task
            );

            handleModalTask();

            const updateProject = { ...project };
            updateProject.tasks = updateProject.tasks.map((taskState) =>
                taskState._id === data._id ? data : taskState
            );

            setProject(updateProject);
            toast.success("Tarea actualizada con exito");
        } catch ({ response }) {
            toast.error(response.data.msg);
        }
    };

    const deleteTask = async (id) => {
        if (!token) return;

        try {
            const { data } = await clientAxiosPrivate.post(`/task/${id}`);
            toast.success(data.msg);

            const updateProject = { ...project };
            updateProject.tasks = updateProject.tasks.filter(
                (taskState) => taskState._id !== id
            );

            setProject(updateProject);
            setModdalDelete(false);
        } catch ({ response }) {
            toast.error(response.data.msg);
        }
    };

    const handleModalEditTask = (task) => {
        setTask(task);
        setModalFormTask(true);
    };

    const handleModalDelete = (task) => {
        setTask(task);
        setModdalDelete(!modalDelete);
    };

    const submitCollaborator = async (email) => {
        if (!token) return;
        setLoading(true);

        try {
            const { data } = await clientAxiosPrivate.post(
                `/project/search-collaborators/1`,
                {
                    email,
                }
            );

            setCollaborator([data]);
            setLoading(false);
        } catch ({ response }) {
            toast.error(response.data.msg);
            setLoading(false);
        }
    };

    const addCollaborator = async (collaborator) => {
        if (!token) return;

        try {
            const { data } = await clientAxiosPrivate.post(
                `/project/add-collaborators/${project._id}`,
                { collaborators: collaborator.email }
            );

            const updateProject = { ...project };
            updateProject.collaborators.push(collaborator);

            const updateProyects = projects.map((projectState) =>
                projectState._id === updateProject._id
                    ? updateProject
                    : projectState
            );

            setProjects(updateProyects);

            toast.success(data.msg);
        } catch ({ response }) {
            toast.error(response.data.msg);
        }
    };

    const handleModalCollaborator = (collaborator) => {
        setModalCollaborator(!modalCollaborator);
        setCollaborator(collaborator);
    };

    const deleteCollaborator = async () => {
        try {
            const { data } = await clientAxiosPrivate.post(
                `/project/delete-collaborators/${project._id}`,
                collaborator
            );

            const updateProject = { ...project };
            updateProject.collaborators = updateProject.collaborators.filter(
                (collaboratorState) =>
                    collaboratorState._id !== collaborator._id
            );

            setProject(updateProject);

            const updateProyects = projects.map((projectState) =>
                projectState._id === updateProject._id
                    ? updateProject
                    : projectState
            );

            setProjects(updateProyects);

            toast.success(data.msg);

            setModalCollaborator(false);
            setCollaborator({});
        } catch ({ response }) {
            toast.error(response.data.msg);
            setModalCollaborator(false);
            setCollaborator({});
        }
    };

    const changeStatusTask = async (id, status) => {
        if (!token) return;

        try {
            const { data } = await clientAxiosPrivate.post(
                `/task/status/${id}`,
                { status }
            );

            const updateProject = { ...project };

            updateProject.tasks = updateProject.tasks.map((taskState) =>
                taskState._id === data._id ? data : taskState
            );

            setProject(updateProject);
        } catch ({ response: { data } }) {
            toast.error(data.msg);
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
                handleModalTask,
                modalFormTask,
                submitTask,
                handleModalEditTask,
                task,
                handleModalDelete,
                modalDelete,
                deleteTask,
                submitCollaborator,
                collaborator,
                addCollaborator,
                modalCollaborator,
                handleModalCollaborator,
                deleteCollaborator,
                changeStatusTask,
            }}
        >
            {children}
        </ProjectContext.Provider>
    );
};

export default ProjectContext;

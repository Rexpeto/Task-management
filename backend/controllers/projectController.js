import Project from "../models/Project.js";
import User from "../models/User.js";

//? Get project the users
export const getProject = async (req, res) => {
    const { id } = req.params;

    try {
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            const project = await Project.findById(id.trim())
                .populate("tasks")
                .populate("collaborators", "name email");

            if (!project) {
                return res.status(404).json({ msg: "El proyecto no existe" });
            }

            if (project.creator.toString() !== req.user._id.toString()) {
                return res.status(401).json({ msg: "Acción no válida" });
            }

            res.status(200).json({ project });
        }
    } catch (error) {
        console.log(error);
    }
};

//? Get projects the users
export const getProjects = async (req, res) => {
    try {
        const project = await Project.find()
            .where("creator")
            .equals(req.user)
            .select("-tasks");
        res.status(200).json(project);
    } catch (error) {
        console.log(error);
    }
};

//? New project for user
export const newProject = async (req, res) => {
    const project = new Project(req.body);
    project.creator = req.user._id;

    try {
        const projectStorage = await project.save();
        res.status(200).json(projectStorage);
    } catch (error) {
        console.log(error);
    }
};

//? Edit project for user
export const editProject = async (req, res) => {
    const { id } = req.params;
    const { name, description, clients, deadline } = req.body;

    try {
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            const project = await Project.findById(id.trim());

            if (!project) {
                return res.status(404).json({ msg: "El proyecto no existe" });
            }

            if (project.creator.toString() !== req.user._id.toString()) {
                return res.status(401).json({ msg: "Acción no válida" });
            }

            project.name = name || project.name;
            project.description = description || project.description;
            project.clients = clients || project.clients;
            project.deadline = deadline || project.deadline;

            const projectStore = await project.save();
            res.status(200).json(projectStore);
        }
    } catch (error) {
        console.log(error);
    }
};

//? Delete project
export const deleteProject = async (req, res) => {
    const { projectId } = req.params;

    try {
        if (projectId.match(/^[0-9a-fA-F]{24}$/)) {
            const project = await Project.findById(projectId.trim());

            if (!project) {
                return res.status(404).json({ msg: "El proyecto no existe" });
            }

            if (project.creator.toString() !== req.user._id.toString()) {
                return res.status(401).json({ msg: "Acción no válida" });
            }

            await project.deleteOne();
            res.status(200).json({ msg: "Proyecto eliminado con exito" });
        }
    } catch (error) {
        console.log(error);
    }
};

//? Add collaborators
export const addCollaborators = async (req, res) => {
    const { collaborators } = req.body;
    const { id } = req.params;

    try {
        const project = await Project.findById(id);

        if (!project) {
            const error = new Error("Proyecto no encontrado");
            return res.status(404).json({ msg: error });
        }

        if (project.creator.toString() !== req.user._id.toString()) {
            const error = new Error("Acción no válida");
            return res.status(404).json({ msg: error });
        }

        const user = await User.findOne({ email: collaborators }).select(
            "-password -confirm -createdAt -updatedAt -token -__v"
        );

        if (!user) {
            res.status(404).json({
                msg: "Usuario no encontrado",
            });
            return;
        }

        if (project.creator.toString() === user._id.toString()) {
            return res.status(403).json({ msg: "No puede ser colaborador" });
        }

        if (project.collaborators.includes(user._id)) {
            return res.status(403).json({ msg: "Ya es un colaborador" });
        }

        project.collaborators.push(user._id);
        await project.save();

        res.status(200).json({ msg: "Colabolador agregado exitosamente" });
    } catch (error) {
        console.log(error);
    }
};

//? Search collaborators
export const searchCollaborators = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.status(404).json({ msg: "Debe colocar un email" });
        return;
    }

    try {
        const user = await User.findOne({ email }).select(
            "-password -confirm -createdAt -updatedAt -token -__v"
        );

        if (!user) {
            res.status(404).json({
                msg: "Usuario no existe o correo incorrecto",
            });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
};

//? Delete collaborators
export const deleteCollaborators = async (req, res) => {
    res.send("Hola");
};

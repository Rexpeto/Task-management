import Task from "../models/Task.js";
import Project from "../models/Project.js";

export const addTask = async (req, res) => {
    const { project } = req.body;

    if (!project) {
        res.status(404).json({ msg: "Debe colocar un proyecto" });
    }

    try {
        const existProject = await Project.findById(project);

        if (!existProject) {
            return res.status(404).json({ msg: "El proyecto no existe" });
        }

        if (req.user._id.toString() !== existProject.creator.toString()) {
            return res.status(403).json({ msg: "Acción no permitida" });
        }

        const taskStorage = await Task.create(req.body);

        res.status(200).json(taskStorage);
    } catch (error) {
        console.log(error);
    }
};

export const getTask = async (req, res) => {};

export const updateTask = async (req, res) => {};

export const deleteTask = async (req, res) => {};

export const changeStatus = async (req, res) => {};

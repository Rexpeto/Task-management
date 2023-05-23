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

        existProject.tasks.push(taskStorage._id);

        await existProject.save();

        res.status(200).json(taskStorage);
    } catch (error) {
        console.log(error);
    }
};

export const getTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findById(id).populate("project");

        if (!task) {
            return res.status(404).json({ msg: "Tarea no encontrada" });
        }

        if (task.project.creator.toString() !== req.user._id.toString()) {
            return res.status(403).json({ msg: "Acción no válida" });
        }

        res.status(200).json(task);
    } catch (error) {
        console.log(error);
    }
};

export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { name, description, priority, deadline } = req.body;

    try {
        const task = await Task.findById(id).populate("project");

        if (!task) {
            return res.status(404).json({ msg: "Tarea no encontrada" });
        }

        if (task.project.creator.toString() !== req.user._id.toString()) {
            return res.status(403).json({ msg: "Acción no válida" });
        }

        task.name = name || task.name;
        task.description = description || task.name;
        task.priority = priority || task.priority;
        task.deadline = deadline || task.deadline;

        const taskStorage = await task.save();

        res.status(200).json(taskStorage);
    } catch (error) {
        console.log(error);
    }
};

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id).populate("project");

        if (!task) {
            return res.status(404).json({ msg: "Tarea no encontrada" });
        }

        if (task.project.creator.toString() !== req.user._id.toString()) {
            return res.status(403).json({ msg: "Acción no válida" });
        }

        const project = await Project.findOne(task.project._id);
        project.tasks.pull(task._id);

        await Promise.allSettled([
            await project.save(),
            await task.deleteOne()
        ])

        res.status(200).json({ msg: "Eliminado con exito" });
    } catch (error) {
        console.log(error);
    }
};

export const changeStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const task = await Task.findById(id).populate("project");

        if (!task) {
            return res.status(404).json({ msg: "Tarea no encontrada" });
        }

        if (
            task.project.creator.toString() !== req.user._id.toString() &&
            !task.project.collaborators.some(
                (collaborator) =>
                    collaborator._id.toString() === req.user._id.toString()
            )
        ) {
            res.status(403).json({ msg: "Acción no válida" });
        }

        task.status = !status;
        task.complete = req.user._id;

        const newStatus = await task.save();
        res.status(200).json(newStatus);
    } catch (error) {
        console.log(error);
    }
};

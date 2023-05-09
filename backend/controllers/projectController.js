import Project from "../models/Project.js";

//? Get project the users
export const getProject = async (req, res) => {};

//? Get projects the users
export const getProjects = async (req, res) => {};

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
export const editProject = async (req, res) => {};

//? Delete project
export const deleteProject = async (req, res) => {};

//? Add collaborators
export const addCollaborators = async (req, res) => {};

//? Delete collaborators
export const deleteCollaborators = async (req, res) => {};

//? Get task
export const getTask = async (req, res) => {};

import { createContext, useState, useEffect } from "react";
import clientAxiosPrivate from "../config/clientAxiosPrivate";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("access_token");

    const submitProject = async (project) => {
        if (!token) return;

        try {
            const { data } = await clientAxiosPrivate.post("/project", project);

            toast.success("Proyecto creado correctamente");
            navigate("/project");
        } catch ({ response }) {
            toast.warn(response.data.msg);
        }
    };

    return (
        <ProjectContext.Provider value={{ submitProject }}>
            {children}
        </ProjectContext.Provider>
    );
};

export default ProjectContext;

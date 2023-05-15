import { createContext, useState, useEffect } from "react";
import clientAxios from "../config/clientAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    const navigate = useNavigate();

    const submitProject = async (project) => {
        const token = localStorage.getItem("access_token");

        if (!token) return;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const { data } = await clientAxios.post(
                "/project",
                project,
                config
            );

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

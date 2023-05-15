import { createContext, useState, useEffect } from "react";
import clientAxios from "../config/clientAxios";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    const submitProject = (project) => {
        console.log(project);
    };

    return (
        <ProjectContext.Provider value={{ submitProject }}>
            {children}
        </ProjectContext.Provider>
    );
};

export default ProjectContext;

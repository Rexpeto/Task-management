import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import useProject from "../hook/useProject";

const FormProject = () => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [clients, setClients] = useState("");
    const { submitProject, project } = useProject();

    useEffect(() => {
        if (id && project?.name) {
            setName(project?.name);
            setDescription(project?.description);
            setDeadline(project?.deadline.split("T")[0]);
            setClients(project?.clients);
        }
    }, [id]);

    const handlerSubmit = (e) => {
        e.preventDefault();

        if ([name, description, deadline, clients].includes("")) {
            toast.warn("Todos los campos son obligatorios");
            return;
        }

        submitProject({
            name: name.toLowerCase(),
            description: description.toLowerCase(),
            deadline,
            clients: clients.toLowerCase(),
        });
    };

    return (
        <form
            className="w-full bg-gray-800 p-4 rounded-md shadow-lg"
            onSubmit={handlerSubmit}
        >
            <div className="relative z-0 w-full mb-6 group">
                <input
                    type="name"
                    id="name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 outline-none  focus:border-blue-600 peer transition duration-150"
                    placeholder=" "
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    autoComplete="off"
                />
                <label
                    htmlFor="name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Nombre de proyecto
                </label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
                <textarea
                    id="description"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 outline-none  focus:border-blue-600 peer transition duration-150"
                    placeholder=" "
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    autoComplete="off"
                />
                <label
                    htmlFor="description"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Descripción
                </label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
                <input
                    type="date"
                    id="fecha-entrega"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 outline-none  focus:border-blue-600 peer transition duration-150"
                    onChange={(e) => setDeadline(e.target.value)}
                    value={deadline}
                />
                <label
                    htmlFor="fecha-entrega"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Fecha de entrega
                </label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
                <input
                    type="text"
                    id="clients"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 outline-none  focus:border-blue-600 peer transition duration-150"
                    placeholder=" "
                    autoComplete="off"
                    onChange={(e) => setClients(e.target.value)}
                    value={clients}
                />
                <label
                    htmlFor="clients"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Nombre de cliente
                </label>
            </div>

            <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 transition duration-150"
            >
                {id ? "Actualizar" : "Crear"}
            </button>
        </form>
    );
};

export default FormProject;

import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { toast } from "react-toastify";
import useProject from "../hook/useProject";

const FormCollaborator = () => {
    const [email, setEmail] = useState("");
    const { submitCollaborator } = useProject();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.warn("Debe colocar el email del colaborador");
            return;
        }

        submitCollaborator(email.toLowerCase());
        setEmail("");
    };

    return (
        <form className="min-w-[50rem]" onSubmit={handleSubmit}>
            <div className="flex">
                <div className="relative w-full">
                    <input
                        type="email"
                        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 rounded-l-lg transition outline-none duration-150"
                        placeholder="Email de colaborador(a)"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <button
                        type="submit"
                        className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 outline-none dark:bg-blue-600 dark:hover:bg-blue-700 transition duration-150"
                    >
                        <RiSearchLine className="text-xl" />
                    </button>
                </div>
            </div>
        </form>
    );
};

export default FormCollaborator;

import useProject from "../hook/useProject";
import useAdmin from "../hook/useAdmin";

const CardCollaborator = ({ user }) => {
    const { _id, name, email } = user;
    const { addCollaborator, project, handleModalCollaborator } = useProject();
    const admin = useAdmin();

    const collaborator = project.collaborators.filter(
        (item) => item._id === _id
    );

    return (
        <div className="md:max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="md:flex md:flex-col md:items-center p-3 md:py-10  md:gap-0">
                <div className="flex flex-row md:flex-col items-center gap-4 md:gap-0">
                    <img
                        className="w-24 h-24 mb-3 rounded-full shadow-lg"
                        src="../../public/profile.jpg"
                        alt={name}
                    />
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white first-letter:uppercase">
                        {name}
                    </h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        FullStack
                    </span>
                </div>
                {admin && (
                    <div className="flex mt-2 space-x-3 md:mt-6">
                        {collaborator[0]?._id === _id ? (
                            <button
                                type="button"
                                className="block w-full md:inline-flex md:items-center md:w-initial px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 outline-none dark:bg-red-600 dark:hover:bg-red-700 transition duration-150"
                                onClick={() =>
                                    handleModalCollaborator(collaborator[0])
                                }
                            >
                                Eliminar
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="block w-full md:inline-flex md:items-center md:w-initial px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 outline-none dark:bg-blue-600 dark:hover:bg-blue-700 transition duration-150"
                                onClick={() => addCollaborator(user)}
                            >
                                Agregar al proyecto
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardCollaborator;

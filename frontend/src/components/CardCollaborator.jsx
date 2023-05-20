import useProject from "../hook/useProject";

const CardCollaborator = ({ user }) => {
    const { name, email } = user;
    const { addCollaborator } = useProject();

    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center py-10">
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
                <div className="flex mt-4 space-x-3 md:mt-6">
                    <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 outline-none dark:bg-blue-600 dark:hover:bg-blue-700 transition duration-150"
                        onClick={() =>
                            addCollaborator({ collaborators: email })
                        }
                    >
                        Agregar al proyecto
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardCollaborator;

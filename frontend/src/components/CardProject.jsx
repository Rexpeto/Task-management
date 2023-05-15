const CardProject = ({ project }) => {
    return (
        <div className="block max-w-sm p-6  border bg-gradient-to-r from-cyan-500/70 to-blue-500/20 rounded-lg shadow dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white capitalize">
                {project.name}
            </h5>
            <p className="font-normal text-gray-100">{project.description}</p>
        </div>
    );
};

export default CardProject;

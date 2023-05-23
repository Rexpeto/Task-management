import CardProject from "../../components/CardProject";
import useProject from "../../hook/useProject";

const Projects = () => {
    const { projects } = useProject();

    return (
        <>
            <h1 className="text-2xl font-bold">Proyectos</h1>

            {projects.length ? (
                <div className="grid grid-cols-1 md:grid-cols-3 mt-5 gap-4">
                    {projects.map((project, index) => (
                        <CardProject project={project} key={index} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-2 items-center mt-5">
                    <h2 className="text-xl font-semibold">No hay proyectos</h2>
                    <p className="text-lg font-semibold">Agregue uno</p>
                </div>
            )}
        </>
    );
};

export default Projects;

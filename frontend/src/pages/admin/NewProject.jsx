import FormProject from "../../components/FormProject";

const NewProject = () => {
    return (
        <>
            <h1 className="text-2xl font-bold">Crear proyecto</h1>
            <div className="flex mt-10">
                <FormProject />
            </div>
        </>
    );
};

export default NewProject;

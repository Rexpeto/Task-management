import useProject from "../hook/useProject";
import { Fragment, useState } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const Search = () => {
    const [searching, setSearching] = useState("");
    const { handleSearch, search, projects } = useProject();

    const projectsFilter =
        searching === ""
            ? []
            : projects.filter((project) =>
                  project.name.toLowerCase().includes(searching.toLowerCase())
              );

    return (
        <Transition.Root
            show={search}
            as={Fragment}
            afterLeave={() => setSearching("")}
        >
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto mt-20 p-4 sm:p-20 md:p-20"
                onClose={handleSearch}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed inset-0 bg-gray-800 bg-opacity-80 transition-opacity" />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Combobox
                        as="div"
                        className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-lg bg-gray-600 shadow-2xl ring-1 transition-all"
                        onChange={(project) =>
                            (window.location = `/projects/${project._id}`)
                        }
                    >
                        <div className="relative">
                            <Combobox.Input
                                className="flex items-center gap-2 p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:text-gray-200 dark:focus:border-blue-500 rounded-l-lg transition outline-none duration-150"
                                placeholder="Buscar..."
                                onChange={(e) => setSearching(e.target.value)}
                            />
                        </div>
                        {projectsFilter.length > 0 && (
                            <Combobox.Options
                                static
                                className="max-h-72 scroll-py-2 overflow-y-auto text-md bg-gray-700 transition duration-150"
                            >
                                {projectsFilter.map((project) => (
                                    <Combobox.Option
                                        key={project._id}
                                        value={project}
                                        className={({ active }) =>
                                            classNames(
                                                "cursor-pointer first-letter:uppercase p-1.5 hover:bg-gray-600 transition duration-150"
                                            )
                                        }
                                    >
                                        {project.name}
                                    </Combobox.Option>
                                ))}
                            </Combobox.Options>
                        )}
                    </Combobox>
                </Transition.Child>
            </Dialog>
        </Transition.Root>
    );
};

export default Search;

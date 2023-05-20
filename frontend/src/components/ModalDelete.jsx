import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import useProject from "../hook/useProject";
import { toast } from "react-toastify";

const ModalDelete = () => {
    const { modalDelete, handleModalDelete, deleteTask, task } = useProject();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await deleteTask(task._id);
    };

    return (
        <Transition.Root show={modalDelete} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                onClose={handleModalDelete}
            >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-800/90 blur-4xl transition-opacity" />
                    </Transition.Child>

                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-gray-900 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div className="hidden sm:block absolute top-0 right-0 pt-2 pr-2">
                                <button
                                    type="button"
                                    className="bg-gray-900 rounded-md text-gray-400 hover:text-gray-500 outline-none transition duration-150"
                                    onClick={handleModalDelete}
                                >
                                    <span className="sr-only">Cerrar</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title
                                        as="h1"
                                        className="leading-6 font-bold text-white text-2xl"
                                    >
                                        ¿Estas seguro en eliminar esta tarea?
                                    </Dialog.Title>

                                    <form
                                        className="flex gap-4 mt-5"
                                        onSubmit={handleSubmit}
                                    >
                                        <button
                                            type="submit"
                                            className="text-white bg-red-700 hover:bg-red-800 outline-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center transition duration-150"
                                        >
                                            Si
                                        </button>
                                        <div
                                            className="text-white bg-green-700 hover:bg-green-800 outline-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center transition duration-150"
                                            onClick={() => handleModalDelete()}
                                        >
                                            No
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default ModalDelete;

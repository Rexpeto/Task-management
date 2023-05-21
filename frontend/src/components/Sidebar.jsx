import { Link } from "react-router-dom";
import { SiWheniwork } from "react-icons/si";

const Sidebar = () => {
    return (
        <aside className="fixed top-0 left-0 w-50 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-gray-800/90">
            <nav className="h-full pt-[5rem] px-3 py-4 overflow-y-auto">
                <Link
                    to="newProject"
                    className="flex items-center gap-3 py-2 px-2 rounded bg-gray-700/30 hover:bg-gray-700 transition duration-150"
                >
                    <SiWheniwork className="text-lg" />
                    Crear Proyecto
                </Link>
            </nav>
        </aside>
    );
};

export default Sidebar;

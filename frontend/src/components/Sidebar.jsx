import { Link } from "react-router-dom";
import { SiWheniwork } from "react-icons/si";

const Sidebar = () => {
    return (
        <aside className="w-[13.5rem] shadow bg-gray-800/50">
            <nav className="py-4 px-2">
                <Link
                    href="#"
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

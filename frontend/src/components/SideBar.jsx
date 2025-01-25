import { BadgePlus, CircleHelp, Home, Info, Menu, ShieldQuestion } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SideBar = ({ isExpanded, toggleSidebar }) => {
//   const [isExpanded, setIsExpanded] = useState(true);
    const location = useLocation();
  const navigate = useNavigate();


  const menuItems = [
    { icon: Home, label: "Home", path: "/" },
    // about page
    { icon: Info, label: "About", path: "/about" },
    // quiz page
    { icon: CircleHelp, label: "Quizzes", path: "/quizzes" },   
    // add quiz page
    { icon: BadgePlus, label: "Add Quiz", path: "/add-quiz" },
    // manage quizzes page
    { icon: ShieldQuestion, label: "Manage Quizzes", path: "/manage-quizzes" },

  ];

  return (
    <div
        className={`fixed top-0 left-0 bg-white text-gray-700 h-screen border-r transition-all duration-300 ${
            isExpanded ? "w-56" : "w-16"
        } z-30 flex flex-col border-r border-gray-200`}
        >

      <div className="p-4">
        <div>
            {isExpanded && <h1 className="text-2xl font-bold">Logo</h1>}
        </div>
        <button
            className="absolute top-4 right-4 cursor-pointer"
            aria-label="Toggle Sidebar"
            onClick={() => toggleSidebar()}
            >
            <Menu />
        </button>

        <nav className="space-y-2 pt-10">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                to={item.path}
                key={index}
                className={`flex items-center p-2 rounded-md ${
                  isActive ? "bg-gray-200" : ""
                }`}
              >
                <Icon size={20} className={isExpanded ? "mr-4" : ""}/>
                {isExpanded ? (
                    <span className="text-sm">{item.label}</span>
                  ) : (
                    // <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
                      {item.label}
                    </div>
                  )}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  );
};

export default SideBar;

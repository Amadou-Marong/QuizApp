import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useState } from "react";


const Layout = () => {
const [isExpanded, setIsExpanded] = useState(true);
const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
}
  return (
    <div>
      <SideBar isExpanded={isExpanded} toggleSidebar={toggleSidebar}/>
      {/* <main>
        <Outlet />
      </main> */}
      <div className={`transition-all duration-300 ${isExpanded ? 'ml-72' : 'ml-24'}`}>
        <main className="p-4 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

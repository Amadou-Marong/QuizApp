import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";


const Layout = ({sidebarExpanded, setSidebarExpanded}) => {
// const [isExpanded, setIsExpanded] = useState(true);
const toggleSidebar = () => {
  setSidebarExpanded(!sidebarExpanded);
}
  return (
    <div>
      <SideBar isExpanded={sidebarExpanded} toggleSidebar={toggleSidebar}/>
      {/* <main>
        <Outlet />
      </main> */}
      <div className={`transition-all duration-300 ${sidebarExpanded ? 'ml-72' : 'ml-24'}`}>
        <main className="p-4 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

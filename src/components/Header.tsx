
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex-1" />
        
        <nav className="flex items-center space-x-8">
          <Link to="/">
            <Button 
              variant="ghost"
              className={`relative px-0 py-2 text-gray-700 hover:text-gray-900 bg-transparent hover:bg-transparent ${
                location.pathname === "/" 
                  ? "text-gray-900 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-500" 
                  : ""
              }`}
            >
              首页
            </Button>
          </Link>
          
          <Link to="/my-projects">
            <Button 
              variant="ghost"
              className={`relative px-0 py-2 text-gray-700 hover:text-gray-900 bg-transparent hover:bg-transparent ${
                location.pathname === "/my-projects" 
                  ? "text-gray-900 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-500" 
                  : ""
              }`}
            >
              我的项目
            </Button>
          </Link>
        </nav>

        <div className="flex items-center ml-8">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

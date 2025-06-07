
import { Link, useLocation } from "react-router-dom";
import { Home, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">Nova</span>
          </Link>
        </div>
        
        <nav className="flex items-center space-x-1">
          <Link to="/">
            <Button 
              variant={location.pathname === "/" ? "default" : "ghost"}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                location.pathname === "/" 
                  ? "bg-gray-900 text-white" 
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Home size={16} />
              <span>首页</span>
            </Button>
          </Link>
          
          <Link to="/my-projects">
            <Button 
              variant={location.pathname === "/my-projects" ? "default" : "ghost"}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                location.pathname === "/my-projects" 
                  ? "bg-gray-900 text-white" 
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FolderOpen size={16} />
              <span>我的项目</span>
            </Button>
          </Link>
        </nav>

        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
          注册
        </Button>
      </div>
    </header>
  );
};

export default Header;

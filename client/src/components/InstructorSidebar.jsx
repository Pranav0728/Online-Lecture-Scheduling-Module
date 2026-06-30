import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSidebar } from '../context/SidebarContext';
import { FiHome, FiCalendar, FiLogOut, FiUser, FiMenu, FiX } from 'react-icons/fi';

function InstructorSidebar() {
  const { logout, user } = useAuth();
  const { isOpen, toggle, close } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggle}
        className="fixed top-4 left-4 z-50 bg-white p-2 rounded-xl shadow-lg border border-slate-200 md:hidden"
      >
        {isOpen ? <FiX className="w-6 h-6 text-slate-700" /> : <FiMenu className="w-6 h-6 text-slate-700" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200 min-h-screen flex flex-col transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
              <FiUser className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Instructor Panel</h2>
              <p className="text-xs text-slate-500">Welcome, {user?.name}</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/instructor/dashboard"
            onClick={close}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive('/instructor/dashboard')
                ? 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 font-semibold border border-green-200'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <FiHome className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          
          <Link
            to="/instructor/lectures"
            onClick={close}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive('/instructor/lectures')
                ? 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 font-semibold border border-green-200'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <FiCalendar className="w-5 h-5" />
            <span>My Lectures</span>
          </Link>
        </nav>
        
        <div className="p-4 border-t border-slate-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-slate-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all duration-200"
          >
            <FiLogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={close}
        />
      )}
    </>
  );
}

export default InstructorSidebar;
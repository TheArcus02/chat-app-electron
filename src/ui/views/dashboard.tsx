import { LogOut, Search, MessageSquare, User } from "lucide-react";
import { mockUsers } from "../mock/data";
import { useAuth } from "../context/auth-context";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { useState } from "react";

const Dashboard = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = mockUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    logout(); 
    navigate("/login"); 
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
    
      <div className="bg-gray-800 w-16 flex flex-col items-center space-y-4 py-4">
        <button className="btn btn-circle btn-sm bg-indigo-600 hover:bg-indigo-500">
          <MessageSquare size={20} />
        </button>
        <button className="btn btn-circle btn-sm bg-gray-700 hover:bg-gray-600">
          <User size={20} />
        </button>
        <button
          className="btn btn-circle btn-sm bg-gray-700 hover:bg-gray-600 mt-auto"
          onClick={handleLogout}
        >
          <LogOut size={20} />
        </button>
      </div>

      
      <div className="flex flex-col w-64 bg-gray-800 p-4">
        
        <div className="relative mb-4">
          <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            className="input input-bordered w-full bg-gray-700 text-white pl-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        
        <h3 className="text-lg font-semibold mb-2">Active Users</h3>
        <ul className="overflow-y-auto flex-1 space-y-2">
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              className={`relative flex items-center space-x-3 rounded-lg p-3 cursor-pointer transition-all ${
                location.pathname === `/chat/${user.id}`
                  ? "bg-indigo-600"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              <img
                className="w-10 h-10 rounded-full"
                src={`https://ui-avatars.com/api/?name=${user.name.replace(
                  / /g,
                  "+"
                )}`}
                alt={user.name}
              />
              <span className="font-medium">{user.name}</span>
              <Link
                className="absolute inset-0"
                to={`/chat/${user.id}`}
                aria-label={`Open chat with ${user.name}`}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="bg-gray-800 py-4 px-6 flex items-center justify-between shadow-md">
          <h1 className="text-2xl font-bold">
            {location.pathname.startsWith("/chat/")
              ? `Chat with ${
                  mockUsers.find(
                    (user) => `/chat/${user.id}` === location.pathname
                  )?.name || "Unknown"
                }`
              : "General Chat"}
          </h1>
          <span className="text-gray-400 text-sm">
            {location.pathname === "/" ? "Select a user to chat" : ""}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-gray-900">
          {location.pathname === "/" ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 text-center">
                Select a user from the sidebar to start chatting.
              </p>
            </div>
          ) : (
            <Outlet />
          )}
        </div>

        <div className="p-4 bg-gray-800">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Type a message..."
              className="input input-bordered flex-1 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="btn btn-primary btn-circle">
              <MessageSquare size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

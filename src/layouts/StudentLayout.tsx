// src/layouts/StudentLayout.tsx
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const StudentLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-blue-900 text-white p-6 space-y-6">
        <h2 className="text-xl font-bold">Student Dashboard</h2>
        <nav className="space-y-4">
          <Link to="/student/profile">Profile</Link>
          <Link to="/student/academic-records">Academic Records</Link>
        </nav>
        <button
          onClick={logout}
          className="mt-10 bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
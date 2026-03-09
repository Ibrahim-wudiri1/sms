// src/layouts/AdminLayout.tsx
import { Outlet, Link } from "react-router-dom";
import { Users, BookOpen, UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const AdminLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-6">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <nav className="space-y-4">
          <Link to="/admin/students" className="flex items-center gap-2">
            <Users size={18} /> Students
          </Link>
          <Link to="/admin/create-student" className="flex items-center gap-2">
            <UserPlus size={18} /> Create Student
          </Link>
          <Link to="/admin/create-course" className="flex items-center gap-2">
            <BookOpen size={18} /> Create Course 
          </Link>
          <Link to="/admin/courses" className="flex items-center gap-2">
            <BookOpen size={18} /> Courses 
          </Link>
          <Link to="/admin/enroll" className="flex items-center gap-2">
            <UserPlus size={18} /> Enroll Student 
          </Link>
          <Link to="/admin/enrollments" className="flex items-center gap-2">
            <Users size={18} /> Enrollments 
          </Link>
           <Link to="/admin/academic-records/add" className="flex items-center gap-2">
            <BookOpen size={18} />  Add Academic Record
          </Link>
          <Link to="/admin/academic-records" className="flex items-center gap-2">
            <BookOpen size={18} /> Academic Records 
          </Link>
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

export default AdminLayout;
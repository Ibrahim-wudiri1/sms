// src/layouts/AdminLayout.tsx
import {useState} from "react";
import { Link } from "react-router-dom";
import { Users, BookOpen, UserPlus, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const { logout } = useAuth();

  const Admin = [
    { name: "Students", path: "/admin/students", icon: <Users size={18} /> },
    { name: "Create Student", path: "/admin/create-student", icon: <UserPlus size={18} /> },
    { name: "Create Course", path: "/admin/create-course", icon: <BookOpen size={18} /> },
    { name: "Courses", path: "/admin/courses", icon: <BookOpen size={18} /> },
    { name: "Enroll Student", path: "/admin/enroll", icon: <UserPlus size={18} /> },
    { name: "Enrollments", path: "/admin/enrollments", icon: <Users size={18} /> },
    { name: "Add Academic Record", path: "/admin/academic-records/add", icon: <BookOpen size={18} /> },
    { name: "Academic Records", path: "/admin/academic-records", icon: <BookOpen size={18} /> },
    { name: "Exam Officer", path: "/admin/exam-officer", icon: <UserPlus size={18} /> },

  ]
  const ExamOfficer = [
    { name: "Students", path: "/exam-officer/students", icon: <Users size={18} /> },
    { name: "Create Student", path: "/exam-officer/create-student", icon: <UserPlus size={18} /> },
    { name: "Courses", path: "/exam-officer/courses", icon: <BookOpen size={18} /> },
    { name: "Enroll Student", path: "/exam-officer/enroll", icon: <UserPlus size={18} /> },
    { name: "Enrollments", path: "/exam-officer/enrollments", icon: <Users size={18} /> },
    { name: "Add Academic Record", path: "/exam-officer/academic-records/add", icon: <BookOpen size={18} /> },
    { name: "Academic Records", path: "/exam-officer/academic-records", icon: <BookOpen size={18} /> },
  ]
  return (

      <aside className="w-64 bg-gray-900 text-white p-6 space-y-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden bg-white-800 p-2 rounded"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h2 className="text-xl font-bold"> {user.role} Panel</h2>
        {user.role === "ADMIN" ? Admin.map((item) => (
         <nav key={item.name} className="space-y-4">
          <Link key={item.name} to={item.path} className="flex items-center gap-2">
            {item.icon} {item.name}
          </Link>
        </nav>
        )) : ExamOfficer.map((item) => (
        <nav key={item.name} className="space-y-4">
          <Link key={item.name} to={item.path} className="flex items-center gap-2">
            {item.icon} {item.name}
          </Link>
          </nav>
        ))}
        
        <button
          onClick={logout}
          className="mt-5 bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>
      </aside>
  );
};

export default SideBar;
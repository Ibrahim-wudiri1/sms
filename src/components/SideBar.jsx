// // src/layouts/AdminLayout.tsx
// import {useState} from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Users, BookOpen, UserPlus, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
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
    { name: "Exam Officers", path: "/admin/exam-officers", icon: <UserPlus size={18} /> },
  ];

  const ExamOfficer = [
    { name: "Students", path: "/exam-officer/students", icon: <Users size={18} /> },
    { name: "Courses", path: "/exam-officer/courses", icon: <BookOpen size={18} /> },
    { name: "Enrollments", path: "/exam-officer/enrollments", icon: <Users size={18} /> },
    { name: "Academic Records", path: "/exam-officer/academic-records", icon: <BookOpen size={18} /> },
  ];

  const menu = user.role === "ADMIN" ? Admin : ExamOfficer;

  return (
    <aside
      className={`bg-gray-900 text-white h-screen p-4 transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Toggle Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className={`font-bold ${!isOpen && "hidden"}`}>
          {user.role} Panel
        </h2>

        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* 🚨 Deactivated Exam Officer Notice */}
      {user.role === "EXAM_OFFICER" && user.isActive === false ? (
        <div className="bg-red-600 p-3 rounded text-sm text-center">
          Your account has been deactivated. Contact admin.
        </div>
      ) : (
        <>
          {/* Navigation */}
          <nav className="space-y-3">
            {menu.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition"
              >
                {item.icon}
                {isOpen && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <button
            onClick={logout}
            className="mt-6 w-full bg-red-600 px-4 py-2 rounded hover:bg-red-700"
          >
            {isOpen ? "Logout" : "🚪"}
          </button>
        </>
      )}
    </aside>
  );
};

export default SideBar;

// import { Link } from "react-router-dom";
// import { Users, BookOpen, UserPlus, Menu, X } from "lucide-react";
// import { useAuth } from "../context/AuthContext";

// const SideBar = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const user = JSON.parse(localStorage.getItem("user"));
//     const { logout } = useAuth();

//   const Admin = [
//     { name: "Students", path: "/admin/students", icon: <Users size={18} /> },
//     { name: "Create Student", path: "/admin/create-student", icon: <UserPlus size={18} /> },
//     { name: "Create Course", path: "/admin/create-course", icon: <BookOpen size={18} /> },
//     { name: "Courses", path: "/admin/courses", icon: <BookOpen size={18} /> },
//     { name: "Enroll Student", path: "/admin/enroll", icon: <UserPlus size={18} /> },
//     { name: "Enrollments", path: "/admin/enrollments", icon: <Users size={18} /> },
//     { name: "Add Academic Record", path: "/admin/academic-records/add", icon: <BookOpen size={18} /> },
//     { name: "Academic Records", path: "/admin/academic-records", icon: <BookOpen size={18} /> },
//     { name: "Exam Officer", path: "/admin/exam-officer", icon: <UserPlus size={18} /> },

//   ]
//   const ExamOfficer = [
//     { name: "Students", path: "/exam-officer/students", icon: <Users size={18} /> },
//     { name: "Create Student", path: "/exam-officer/create-student", icon: <UserPlus size={18} /> },
//     { name: "Courses", path: "/exam-officer/courses", icon: <BookOpen size={18} /> },
//     { name: "Enroll Student", path: "/exam-officer/enroll", icon: <UserPlus size={18} /> },
//     { name: "Enrollments", path: "/exam-officer/enrollments", icon: <Users size={18} /> },
//     { name: "Add Academic Record", path: "/exam-officer/academic-records/add", icon: <BookOpen size={18} /> },
//     { name: "Academic Records", path: "/exam-officer/academic-records", icon: <BookOpen size={18} /> },
//   ]
//   return (

//       <aside className="w-64 bg-gray-900 text-white p-6 space-y-6">
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="md:hidden bg-white-800 p-2 rounded"
//         >
//           {isOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//         <h2 className="text-xl font-bold"> {user.role} Panel</h2>
//         {user.role === "ADMIN" ? Admin.map((item) => (
//          <nav key={item.name} className="space-y-4">
//           <Link key={item.name} to={item.path} className="flex items-center gap-2">
//             {item.icon} {item.name}
//           </Link>
//         </nav>
//         )) : ExamOfficer.map((item) => (
//         <nav key={item.name} className="space-y-4">
//           <Link key={item.name} to={item.path} className="flex items-center gap-2">
//             {item.icon} {item.name}
//           </Link>
//           </nav>
//         ))}
        
//         <button
//           onClick={logout}
//           className="mt-5 bg-red-600 px-4 py-2 rounded"
//         >
//           Logout
//         </button>
//       </aside>
//   );
// };

// export default SideBar;
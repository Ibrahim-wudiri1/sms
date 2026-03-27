// src/pages/admin/CoursesList.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

interface Course {
  id: number;
  title: string;
  code: string;
  duration: number;
  createdAt: string;
}

const CoursesList = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await api.get("/admin/courses");
      setCourses(res.data);
    } catch {
      alert("Failed to load courses");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Courses</h1>

      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="p-3 text-left">Code</th>
              <th className="p-3 text-left">Course Name</th>
              <th className="p-3 text-left">Duration</th>
              <th className="p-3 text-left">Created</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-b hover:bg-gray-100">
                <td className="p-3">{course.code}</td>
                <td className="p-3">{course.title}</td>
                <td className="p-3">{course.duration}</td>
                <td className="p-3">
                  {new Date(course.createdAt).toLocaleDateString()}
                </td>

                <td className="p-3">
                  <button
                    onClick={() =>
                      navigate(`/admin/course/${course.id}/students`)
                    }
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    View Students
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoursesList;

// // src/pages/admin/CoursesList.tsx
// import { useEffect, useState } from "react";
// import api from "../../api/axios";

// interface Course {
//   id: number;
//   title: string;
//   code: string;
//   duration: number;
//   description?: string;
//   createdAt: string;
// }

// const CoursesList = () => {
//   const [courses, setCourses] = useState<Course[]>([]);

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const fetchCourses = async () => {
//     try {
//       const res = await api.get("/admin/courses");
//       setCourses(res.data);
//     } catch (err) {
//       alert("Failed to load courses");
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">Courses</h1>

//       <div className="bg-white shadow rounded overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-900 text-white">
//             <tr>
//               <th className="p-3 text-left">Code</th>
//               <th className="p-3 text-left">Course Name</th>
//               <th className="p-3 text-left">Duration (Weeks)</th>
//               <th className="p-3 text-left">Created</th>
//             </tr>
//           </thead>
//           <tbody>
//             {courses.map((course) => (
//               <tr key={course.id} className="border-b hover:bg-gray-100">
//                 <td className="p-3">{course.code}</td>
//                 <td className="p-3">{course.title}</td>
//                 <td className="p-3">{course.duration}</td>
//                 <td className="p-3">
//                   {new Date(course.createdAt).toLocaleDateString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {courses.length === 0 && (
//           <div className="p-4 text-center text-gray-500">
//             No courses available.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CoursesList;
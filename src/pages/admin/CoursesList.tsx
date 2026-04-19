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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/admin/courses");
      setCourses(res.data);
    } catch (err: any) {
      setError("Failed to load courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Courses</h1>
        <button
          onClick={() => navigate("/admin/create-course")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Course
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center min-h-64">
          <div className="flex items-center space-x-2">
            <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-gray-600">Loading courses...</span>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 text-left font-semibold text-gray-900">Code</th>
                <th className="p-4 text-left font-semibold text-gray-900">Course Name</th>
                <th className="p-4 text-left font-semibold text-gray-900">Duration</th>
                <th className="p-4 text-left font-semibold text-gray-900">Created</th>
                <th className="p-4 text-left font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>

            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">{course.code}</td>
                  <td className="p-4 text-gray-900">{course.title}</td>
                  <td className="p-4 text-gray-700">{course.duration} weeks</td>
                  <td className="p-4 text-gray-700">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => navigate(`/admin/course/${course.id}/students`)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      View Students
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {courses.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No courses found.
            </div>
          )}
        </div>
      )}
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
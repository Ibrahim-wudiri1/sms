// src/pages/admin/CoursesList.tsx
import { useEffect, useState } from "react";
import api from "../../api/axios";

interface Course {
  id: number;
  title: string;
  code: string;
  duration: number;
  description?: string;
  createdAt: string;
}

const CoursesList = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await api.get("/admin/courses");
      setCourses(res.data);
    } catch (err) {
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
              <th className="p-3 text-left">Duration (Weeks)</th>
              <th className="p-3 text-left">Created</th>
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
              </tr>
            ))}
          </tbody>
        </table>

        {courses.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No courses available.
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesList;
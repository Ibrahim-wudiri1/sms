// src/pages/admin/EnrollStudent.tsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../api/axios";

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  user: {
    serviceNumber: string;
  };
  enrollments: {
    id: number;
    status: string;
  }[];
}

interface Course {
  id: number;
  title: string;
  code: string;
}

interface EnrollmentForm {
  studentId: number;
  courseId: number;
  status: string;
}

const EnrollStudent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<EnrollmentForm>();
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeCourse, setActiveCourse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/admin/students/all");
      console.log("Fetched students: ", res.data);
      // Filter to only students who are not currently enrolled in an active course
      const inactiveStudents = res.data.filter((student: any) => 
        !student.enrollments.some((enrollment: any) => 
          enrollment.status === "ACTIVE" || enrollment.status === "RTU"
        )
      );
      setStudents(inactiveStudents);
    } catch (err: any) {
      setFeedback({ type: "error", message: "Failed to load students." });
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await api.get("/admin/courses");
      setCourses(res.data);
    } catch (err: any) {
      setFeedback({ type: "error", message: "Failed to load courses." });
    }
  };

  const onSubmit = async (data: EnrollmentForm) => {
    try {
      setLoading(true);
      setFeedback(null);
      await api.post("/admin/enroll", data);
      setFeedback({ type: "success", message: "Student enrolled successfully!" });
      setActiveCourse(null);
    } catch (err: any) {
      console.log("Error: ", err.response?.data?.message);
      setFeedback({ type: "error", message: err.response?.data?.message || "Enrollment failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Enroll Student</h1>

      {feedback && (
        <div
          className={`p-4 rounded mb-6 border-l-4 ${
            feedback.type === "success"
              ? "bg-green-50 border-green-500 text-green-800"
              : "bg-red-50 border-red-500 text-red-800"
          }`}
        >
          {feedback.message}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        {/* Select Student */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Student *</label>
          <select
            {...register("studentId", { required: "Please select a student" })}
            className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
              errors.studentId ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
            }`}
            disabled={loading}
          >
            <option value="">Select student</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.user.serviceNumber} - {student.firstName} {student.lastName}
              </option>
            ))}
          </select>
          {errors.studentId && (
            <p className="text-red-600 text-xs mt-1">{errors.studentId.message as string}</p>
          )}
        </div>

        {/* Show Active Course Warning */}
        {activeCourse && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded">
            Student currently enrolled in ACTIVE course: <strong>{activeCourse}</strong>
          </div>
        )}

        {/* Select Course */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Course *</label>
          <select
            {...register("courseId", { required: "Please select a course" })}
            className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
              errors.courseId ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
            }`}
            disabled={loading}
          >
            <option value="">Select course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.code} - {course.title}
              </option>
            ))}
          </select>
          {errors.courseId && (
            <p className="text-red-600 text-xs mt-1">{errors.courseId.message as string}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Enrollment Status *</label>
          <select
            {...register("status", { required: "Please select a status" })}
            className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
              errors.status ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
            }`}
            disabled={loading}
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="WITHDRAWN">WITHDRAWN</option>
            <option value="RTU">RTU</option>
          </select>
          {errors.status && (
            <p className="text-red-600 text-xs mt-1">{errors.status.message as string}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enrolling Student...
            </>
          ) : (
            "Enroll Student"
          )}
        </button>
      </form>
    </div>
  );
};

export default EnrollStudent;
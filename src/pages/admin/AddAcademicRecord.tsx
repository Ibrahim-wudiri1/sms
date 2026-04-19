import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../api/axios";

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  user: { serviceNumber: string };
}

interface Enrollment {
  id: number;
  course: { title: string; code: string };
}

interface FormData {
  studentId: number;
  enrollmentId: number;
  score: number;
  grade: string;
  remarks: string;
}

const AddAcademicRecord = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [students, setStudents] = useState<Student[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/admin/students/all");
      console.log("Fetched students:", res.data);
      setStudents(res.data);
    } catch (err: any) {
      setFeedback({ type: "error", message: "Failed to load students." });
    }
  };

  const fetchEnrollments = async (studentId: number) => {
    try {
      const res = await api.get(`/admin/enrollments/student/${studentId}`);
      console.log("Fetched enrollments:", res.data);
      setEnrollments(res.data);
    } catch (err: any) {
      console.error("Error fetching enrollments:", err);
      setFeedback({ type: "error", message: err.response?.data?.message || "Failed to load enrollments" });
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      setFeedback(null);
      await api.post("/admin/academic-records", data);
      setFeedback({ type: "success", message: "Academic record added successfully!" });
    } catch (err: any) {
      setFeedback({ type: "error", message: err.response?.data?.message || "Failed to add record. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Add Academic Record</h1>

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
        {/* Student */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Student *</label>
          <select
            {...register("studentId", { required: "Please select a student" })}
            className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
              errors.studentId ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
            }`}
            onChange={(e) => fetchEnrollments(Number(e.target.value))}
            disabled={loading}
          >
            <option value="">Select student</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.user.serviceNumber} - {s.firstName} {s.lastName}
              </option>
            ))}
          </select>
          {errors.studentId && (
            <p className="text-red-600 text-xs mt-1">{errors.studentId.message as string}</p>
          )}
        </div>

        {/* Enrollment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Course Enrollment *</label>
          <select
            {...register("enrollmentId", { required: "Please select a course enrollment" })}
            className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
              errors.enrollmentId ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
            }`}
            disabled={loading}
          >
            <option value="">Select course</option>
            {enrollments.map((e) => (
              <option key={e.id} value={e.id}>
                {e.course.code} - {e.course.title}
              </option>
            ))}
          </select>
          {errors.enrollmentId && (
            <p className="text-red-600 text-xs mt-1">{errors.enrollmentId.message as string}</p>
          )}
        </div>

        {/* Score */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Score *</label>
          <input
            type="number"
            {...register("score", { required: "Score is required", min: { value: 0, message: "Score must be at least 0" }, max: { value: 100, message: "Score cannot exceed 100" } })}
            placeholder="Score (0-100)"
            className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
              errors.score ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
            }`}
            disabled={loading}
          />
          {errors.score && (
            <p className="text-red-600 text-xs mt-1">{errors.score.message as string}</p>
          )}
        </div>

        {/* Grade */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Grade *</label>
          <input
            {...register("grade", { required: "Grade is required" })}
            placeholder="Grade (A, B, C...)"
            className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
              errors.grade ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
            }`}
            disabled={loading}
          />
          {errors.grade && (
            <p className="text-red-600 text-xs mt-1">{errors.grade.message as string}</p>
          )}
        </div>

        {/* Remarks */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Remarks (Optional)</label>
          <textarea
            {...register("remarks")}
            placeholder="Additional remarks"
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            disabled={loading}
          />
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
              Saving Record...
            </>
          ) : (
            "Save Record"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddAcademicRecord;
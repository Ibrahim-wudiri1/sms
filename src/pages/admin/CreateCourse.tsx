// src/pages/admin/CreateCourse.tsx
import { useForm } from "react-hook-form";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface CourseForm {
  title: string;
  code: string;
  duration: number;
  description?: string;
}

const CreateCourse = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<CourseForm>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const onSubmit = async (data: CourseForm) => {
    try {
      setLoading(true);
      setFeedback(null);
      console.log("Submitting course data:", data);
      await api.post("/admin/courses", data);
      setFeedback({ type: "success", message: "Course created successfully!" });
      setTimeout(() => navigate("/admin/courses"), 1500);
    } catch (err: any) {
      console.log("Error: ", err.response?.data?.message);
      setFeedback({ type: "error", message: err.response?.data?.message || "Failed to create course. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Create Course</h1>

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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Course Name *</label>
          <input
            {...register("title", { required: "Course name is required" })}
            className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
              errors.title ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="e.g. Advanced Military Policing"
            disabled={loading}
          />
          {errors.title && (
            <p className="text-red-600 text-xs mt-1">{errors.title.message as string}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Course Code *</label>
          <input
            {...register("code", { required: "Course code is required" })}
            className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
              errors.code ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="e.g. AMP-001"
            disabled={loading}
          />
          {errors.code && (
            <p className="text-red-600 text-xs mt-1">{errors.code.message as string}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Weeks) *</label>
          <input
            type="number"
            {...register("duration", { required: "Duration is required", min: { value: 1, message: "Duration must be at least 1 week" } })}
            className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
              errors.duration ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="e.g. 12"
            disabled={loading}
          />
          {errors.duration && (
            <p className="text-red-600 text-xs mt-1">{errors.duration.message as string}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
          <textarea
            {...register("description")}
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
              Creating Course...
            </>
          ) : (
            "Add Course"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
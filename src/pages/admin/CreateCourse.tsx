// src/pages/admin/CreateCourse.tsx
import { useForm } from "react-hook-form";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

interface CourseForm {
  title: string;
  code: string;
  duration: number;
  description?: string;
}

const CreateCourse = () => {
  const { register, handleSubmit } = useForm<CourseForm>();
  const navigate = useNavigate();

  const onSubmit = async (data: CourseForm) => {
    try {
      console.log("Submitting course data:", data);
      await api.post("/admin/courses", data);
      alert("Course created successfully");
      navigate("/admin/courses");
    } catch (err: any) {
      console.log("Error: ", err.response?.data?.message);
      alert(err.response?.data?.message || "Error creating course");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create Course</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow space-y-4 max-w-xl"
      >
        <div>
          <label className="block mb-1">Course Name</label>
          <input
            {...register("title", { required: true })}
            className="w-full border p-2 rounded"
            placeholder="e.g. Advanced Military Policing"
          />
        </div>

        <div>
          <label className="block mb-1">Course Code</label>
          <input
            {...register("code", { required: true })}
            className="w-full border p-2 rounded"
            placeholder="e.g. AMP-001"
          />
        </div>

        <div>
          <label className="block mb-1">Duration (Weeks)</label>
          <input
            type="number"
            {...register("duration", { required: true })}
            className="w-full border p-2 rounded"
            placeholder="e.g. 12"
          />
        </div>

        <div>
          <label className="block mb-1">Description (Optional)</label>
          <textarea
            {...register("description")}
            className="w-full border p-2 rounded"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          Create Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
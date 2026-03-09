// src/pages/admin/EditStudent.tsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

const EditStudent = () => {
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const res = await api.get(`/admin/students/${id}`);
      reset(res.data);
    } catch {
      alert("Failed to load student");
    }
  };

  const onSubmit = async (data: any) => {
    try {
      await api.put(`/admin/students/${id}`, data);
      alert("Student updated successfully");
      navigate("/admin/students");
    } catch (err: any) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Student</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow space-y-4 max-w-xl"
      >
        <input {...register("firstName")} className="border p-2 rounded w-full" />
        <input {...register("lastName")} className="border p-2 rounded w-full" />
        <input {...register("rank")} className="border p-2 rounded w-full" />
        <input {...register("batch")} className="border p-2 rounded w-full" />
        <input {...register("unit")} className="border p-2 rounded w-full" />
        <input {...register("phone")} className="border p-2 rounded w-full" />
        <input {...register("email")} className="border p-2 rounded w-full" />

        <button
          type="submit"
          className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          Update Student
        </button>
      </form>
    </div>
  );
};

export default EditStudent;